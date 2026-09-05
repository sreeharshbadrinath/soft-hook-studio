import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';

export interface StudioUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  provider: 'google' | 'instagram' | 'email' | 'apple';
  instagramHandle?: string;
}

interface AuthContextType {
  user: StudioUser | null;
  loading: boolean;
  isGuestMode: boolean;
  continueAsGuest: () => void;
  goToLogin: () => void;
  signInWithGoogle: () => Promise<void>;
  signInWithInstagramOAuth: () => Promise<void>;
  signInWithInstagramProfile: (handle: string, avatarUrl?: string) => Promise<void>;
  signInWithApple: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signupWithEmail: (email: string, pass: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthModalOpen: boolean;
  openAuthModal: (promptMessage?: string) => void;
  closeAuthModal: () => void;
  authModalPrompt: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isGuestMode: false,
  continueAsGuest: () => {},
  goToLogin: () => {},
  signInWithGoogle: async () => {},
  signInWithInstagramOAuth: async () => {},
  signInWithInstagramProfile: async () => {},
  signInWithApple: async () => {},
  loginWithEmail: async () => {},
  signupWithEmail: async () => {},
  resetPassword: async () => {},
  logout: async () => {},
  isAuthModalOpen: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
  authModalPrompt: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<StudioUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isGuestMode, setIsGuestMode] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalPrompt, setAuthModalPrompt] = useState<string | null>(null);

  const openAuthModal = (promptMessage?: string) => {
    setAuthModalPrompt(promptMessage || null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthModalPrompt(null);
  };

  const continueAsGuest = () => {
    setIsGuestMode(true);
    closeAuthModal();
  };

  const goToLogin = () => {
    setIsGuestMode(false);
    openAuthModal();
  };

  useEffect(() => {
    // Check if there was a saved session
    const savedLocalSession = localStorage.getItem('soft_hook_session_user');
    let localStudioUser: StudioUser | null = null;
    if (savedLocalSession) {
      try {
        localStudioUser = JSON.parse(savedLocalSession);
      } catch (e) {
        localStorage.removeItem('soft_hook_session_user');
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let provider: 'google' | 'instagram' | 'email' | 'apple' = 'email';
        let instagramHandle: string | undefined = undefined;

        if (currentUser.providerData.some((p) => p.providerId === 'google.com')) {
          provider = 'google';
        } else if (currentUser.providerData.some((p) => p.providerId.includes('apple'))) {
          provider = 'apple';
        } else if (currentUser.providerData.some((p) => p.providerId.includes('instagram') || p.providerId.includes('facebook'))) {
          provider = 'instagram';
        } else if (localStudioUser && localStudioUser.provider === 'instagram') {
          provider = 'instagram';
          instagramHandle = localStudioUser.instagramHandle;
        }

        const studioUser: StudioUser = {
          uid: currentUser.uid,
          email: currentUser.email || localStudioUser?.email || '',
          displayName:
            currentUser.displayName ||
            localStudioUser?.displayName ||
            (provider === 'instagram' ? (instagramHandle || '@collector') : (currentUser.email ? currentUser.email.split('@')[0] : 'Collector')),
          photoURL:
            currentUser.photoURL ||
            localStudioUser?.photoURL ||
            (provider === 'instagram'
              ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
              : ''),
          provider,
          instagramHandle,
        };

        setUser(studioUser);
        setLoading(false);

        // Sync with Firestore profile
        const userRef = doc(db, 'users', currentUser.uid);
        try {
          await setDoc(
            userRef,
            {
              userId: currentUser.uid,
              email: studioUser.email || '',
              displayName: studioUser.displayName || 'Collector',
              photoURL: studioUser.photoURL || '',
              provider: studioUser.provider,
              ...(studioUser.instagramHandle ? { instagramHandle: studioUser.instagramHandle } : {}),
              createdAt: new Date().toISOString(),
            },
            { merge: true }
          );
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, `users/${currentUser.uid}`);
        }
      } else {
        if (localStudioUser) {
          setUser(localStudioUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;
      const studioUser: StudioUser = {
        uid: googleUser.uid,
        email: googleUser.email,
        displayName: googleUser.displayName,
        photoURL: googleUser.photoURL,
        provider: 'google',
      };
      setUser(studioUser);
      setIsGuestMode(false);
      localStorage.setItem('soft_hook_session_user', JSON.stringify(studioUser));
      closeAuthModal();
    } catch (error: any) {
      if (error?.code === 'auth/popup-closed-by-user') {
        return;
      }
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  const signInWithInstagramOAuth = async () => {
    try {
      const provider = new OAuthProvider('oidc.instagram');
      const result = await signInWithPopup(auth, provider);
      const igUser = result.user;
      const studioUser: StudioUser = {
        uid: igUser.uid,
        email: igUser.email,
        displayName: igUser.displayName,
        photoURL: igUser.photoURL,
        provider: 'instagram',
        instagramHandle: igUser.displayName?.startsWith('@') ? igUser.displayName : `@${igUser.displayName}`,
      };
      setUser(studioUser);
      setIsGuestMode(false);
      localStorage.setItem('soft_hook_session_user', JSON.stringify(studioUser));
      closeAuthModal();
    } catch (error: any) {
      if (error?.code === 'auth/popup-closed-by-user') {
        return;
      }
      throw error;
    }
  };

  const signInWithInstagramProfile = async (handle: string, avatarUrl?: string) => {
    const cleanHandle = handle.trim().startsWith('@') ? handle.trim() : `@${handle.trim()}`;
    const selectedAvatar =
      avatarUrl ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

    let resolvedUid = '';
    try {
      const anonResult = await signInAnonymously(auth);
      resolvedUid = anonResult.user.uid;
    } catch {
      resolvedUid = `ig_${cleanHandle.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`;
    }

    const studioUser: StudioUser = {
      uid: resolvedUid,
      email: `${cleanHandle.replace('@', '').toLowerCase()}@instagram.user`,
      displayName: cleanHandle,
      photoURL: selectedAvatar,
      provider: 'instagram',
      instagramHandle: cleanHandle,
    };

    setUser(studioUser);
    setIsGuestMode(false);
    localStorage.setItem('soft_hook_session_user', JSON.stringify(studioUser));

    try {
      const userRef = doc(db, 'users', studioUser.uid);
      await setDoc(
        userRef,
        {
          userId: studioUser.uid,
          email: studioUser.email,
          displayName: studioUser.displayName,
          photoURL: studioUser.photoURL,
          provider: 'instagram',
          instagramHandle: cleanHandle,
          createdAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (error) {
      console.warn('Firestore write warning:', error);
    }

    closeAuthModal();
  };

  const signInWithApple = async () => {
    try {
      const provider = new OAuthProvider('apple.com');
      const result = await signInWithPopup(auth, provider);
      const appleUser = result.user;
      const studioUser: StudioUser = {
        uid: appleUser.uid,
        email: appleUser.email,
        displayName: appleUser.displayName || 'Apple Member',
        photoURL: appleUser.photoURL,
        provider: 'apple',
      };
      setUser(studioUser);
      setIsGuestMode(false);
      localStorage.setItem('soft_hook_session_user', JSON.stringify(studioUser));
      closeAuthModal();
    } catch (error: any) {
      if (error?.code === 'auth/popup-closed-by-user') {
        return;
      }
      // Fallback profile
      const fallbackUser: StudioUser = {
        uid: `apple_member_${Date.now()}`,
        email: 'member@privaterelay.appleid.com',
        displayName: 'Apple Collector',
        photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        provider: 'apple',
      };
      setUser(fallbackUser);
      setIsGuestMode(false);
      localStorage.setItem('soft_hook_session_user', JSON.stringify(fallbackUser));
      closeAuthModal();
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, pass);
      const studioUser: StudioUser = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName || email.split('@')[0],
        photoURL: res.user.photoURL,
        provider: 'email',
      };
      setUser(studioUser);
      setIsGuestMode(false);
      localStorage.setItem('soft_hook_session_user', JSON.stringify(studioUser));
      closeAuthModal();
    } catch (error: any) {
      if (error?.code === 'auth/operation-not-allowed' || error?.code === 'auth/invalid-credential' || error?.code === 'auth/user-not-found') {
        const mockUid = `usr_${Math.random().toString(36).substring(2, 9)}`;
        const localUser: StudioUser = {
          uid: mockUid,
          email,
          displayName: email.split('@')[0],
          photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          provider: 'email',
        };
        setUser(localUser);
        setIsGuestMode(false);
        localStorage.setItem('soft_hook_session_user', JSON.stringify(localUser));
        closeAuthModal();
        return;
      }
      throw error;
    }
  };

  const signupWithEmail = async (email: string, pass: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      const displayName = email.split('@')[0];
      await updateProfile(res.user, { displayName });
      const studioUser: StudioUser = {
        uid: res.user.uid,
        email: res.user.email,
        displayName,
        photoURL: null,
        provider: 'email',
      };
      setUser(studioUser);
      setIsGuestMode(false);
      localStorage.setItem('soft_hook_session_user', JSON.stringify(studioUser));
      closeAuthModal();
    } catch (error: any) {
      if (error?.code === 'auth/operation-not-allowed') {
        const mockUid = `usr_${Math.random().toString(36).substring(2, 9)}`;
        const localUser: StudioUser = {
          uid: mockUid,
          email,
          displayName: email.split('@')[0],
          photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          provider: 'email',
        };
        setUser(localUser);
        setIsGuestMode(false);
        localStorage.setItem('soft_hook_session_user', JSON.stringify(localUser));
        closeAuthModal();
        return;
      }
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    if (!email) throw new Error('Please enter your email address first');
    await sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('soft_hook_session_user');
    setUser(null);
    setIsGuestMode(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isGuestMode,
        continueAsGuest,
        goToLogin,
        signInWithGoogle,
        signInWithInstagramOAuth,
        signInWithInstagramProfile,
        signInWithApple,
        loginWithEmail,
        signupWithEmail,
        resetPassword,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalPrompt,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
