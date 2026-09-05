import React, { useState } from 'react';
import { Eye, EyeOff, Check, AlertCircle, X, ArrowRight, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Standard Google 'G' Vector Icon
export const GoogleIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

// Apple Logo Vector Icon
export const AppleIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.77 1.05-1.84.93-2.91-.91.04-2.06.62-2.71 1.39-.57.66-.99 1.74-.86 2.78 1.02.08 2.02-.49 2.64-1.26z" />
  </svg>
);

// Instagram Logo Vector Icon
export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

interface LoginViewProps {
  onClose?: () => void;
  showCloseButton?: boolean;
  fullScreen?: boolean;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onClose,
  showCloseButton = false,
  fullScreen = true,
}) => {
  const {
    signInWithGoogle,
    signInWithInstagramOAuth,
    signInWithInstagramProfile,
    signInWithApple,
    loginWithEmail,
    signupWithEmail,
    resetPassword,
    continueAsGuest,
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  // Instagram direct connection modal state
  const [isInstagramPromptOpen, setIsInstagramPromptOpen] = useState(false);
  const [instagramHandle, setInstagramHandle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    if (!email || !password) {
      setFeedback({ type: 'error', message: 'Please enter both email and password.' });
      return;
    }

    setIsLoading(true);
    try {
      if (mode === 'login') {
        await loginWithEmail(email, password);
      } else {
        await signupWithEmail(email, password);
      }
      if (onClose) onClose();
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err?.message || 'Authentication error. Please check your credentials.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setFeedback({ type: 'error', message: 'Please enter your email above, then click Forgot password.' });
      return;
    }
    try {
      await resetPassword(email);
      setFeedback({ type: 'success', message: 'Password reset link sent to your email.' });
    } catch (err: any) {
      setFeedback({ type: 'error', message: err?.message || 'Could not send password reset email.' });
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setFeedback(null);
    try {
      await signInWithGoogle();
      if (onClose) onClose();
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user') {
        setFeedback({ type: 'error', message: 'Google sign-in encountered an issue.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInstagramAuth = async () => {
    setIsLoading(true);
    setFeedback(null);
    try {
      await signInWithInstagramOAuth();
      if (onClose) onClose();
    } catch {
      setIsInstagramPromptOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleAuth = async () => {
    setIsLoading(true);
    setFeedback(null);
    try {
      await signInWithApple();
      if (onClose) onClose();
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user') {
        setFeedback({ type: 'error', message: 'Apple sign-in error.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInstagramHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instagramHandle.trim()) return;
    setIsLoading(true);
    try {
      await signInWithInstagramProfile(instagramHandle);
      setIsInstagramPromptOpen(false);
      if (onClose) onClose();
    } catch {
      setFeedback({ type: 'error', message: 'Could not connect Instagram account.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="login-view-root"
      className={
        fullScreen
          ? 'min-h-screen w-full bg-white grid grid-cols-1 md:grid-cols-2 relative'
          : 'relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200/90 grid grid-cols-1 md:grid-cols-2'
      }
    >
      {/* Optional Close Button */}
      {showCloseButton && onClose && (
        <button
          id="btn-close-login-view"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-600 hover:text-stone-950 shadow-sm backdrop-blur-xs transition-all cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* LEFT COLUMN: MINIMALIST CRAFTWORK THEMED FORM */}
      <div
        className={
          fullScreen
            ? 'min-h-screen w-full flex flex-col justify-center items-center p-6 sm:p-12 md:p-16 lg:p-20 overflow-y-auto bg-white'
            : 'p-6 sm:p-10 md:p-12 flex flex-col justify-center bg-white'
        }
      >
        <div className="w-full max-w-[340px] sm:max-w-[360px] my-auto py-4">
          {/* Header Typography matching screenshot: "Log in to" + "craftwork" / "soft hook studio" */}
          <div className="text-center mb-6">
            <p className="text-xs sm:text-sm font-normal text-stone-500 mb-1">
              {mode === 'login' ? 'Log in to' : 'Sign up for'}
            </p>
            <h1 className="text-2xl sm:text-[26px] font-bold text-stone-950 tracking-tight lowercase">
              soft hook studio
            </h1>
          </div>

          {/* Primary Top Dark Button: "Login with Google" matching screenshot */}
          <button
            id="btn-social-craft-google"
            type="button"
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-[#191919] hover:bg-black text-white text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2.5 shadow-xs cursor-pointer disabled:opacity-50"
          >
            <GoogleIcon className="w-4 h-4 shrink-0" />
            <span>Login with Google</span>
          </button>

          {/* Subtle line divider with "or" in the center matching screenshot */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-stone-400 font-normal">
                or
              </span>
            </div>
          </div>

          {/* Feedback banner if any */}
          {feedback && (
            <div
              className={`mb-4 p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                feedback.type === 'error'
                  ? 'bg-rose-50 border border-rose-200 text-rose-800'
                  : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              }`}
            >
              {feedback.type === 'error' ? (
                <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              ) : (
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Minimalist Input Fields with Mail & Lock icons matching screenshot */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email Field with Mail icon */}
            <div className="flex items-center px-3.5 rounded-xl border border-stone-200 hover:border-stone-300 focus-within:border-stone-400 focus-within:ring-2 focus-within:ring-stone-100 bg-white transition-all">
              <Mail className="w-4 h-4 text-stone-400 shrink-0 stroke-[1.5]" />
              <input
                id="input-craft-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full py-2.5 pl-2.5 pr-1 text-xs sm:text-sm text-stone-900 placeholder-stone-400 bg-transparent border-none outline-none focus:ring-0"
              />
            </div>

            {/* Password Field with Lock icon & Eye toggle */}
            <div className="flex items-center px-3.5 rounded-xl border border-stone-200 hover:border-stone-300 focus-within:border-stone-400 focus-within:ring-2 focus-within:ring-stone-100 bg-white transition-all">
              <Lock className="w-4 h-4 text-stone-400 shrink-0 stroke-[1.5]" />
              <input
                id="input-craft-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your Password"
                className="w-full py-2.5 pl-2.5 pr-1 text-xs sm:text-sm text-stone-900 placeholder-stone-400 bg-transparent border-none outline-none focus:ring-0"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 stroke-[1.5]" />
                ) : (
                  <Eye className="w-4 h-4 stroke-[1.5]" />
                )}
              </button>
            </div>

            {/* Light Grey Submit Button ("Log in" / "Sign up") matching screenshot */}
            <button
              id="btn-craft-submit"
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#EEEEEE] hover:bg-[#E2E2E4] text-stone-900 font-semibold text-xs sm:text-sm transition-colors cursor-pointer disabled:opacity-50 mt-1"
            >
              {isLoading
                ? 'Processing...'
                : mode === 'login'
                ? 'Log in'
                : 'Sign up'}
            </button>
          </form>

          {/* Under-button navigation links matching screenshot */}
          <div className="mt-5 text-center space-y-2">
            <div>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs text-stone-500 hover:text-stone-900 font-normal transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <p className="text-xs text-stone-500 font-normal">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setFeedback(null);
                }}
                className="font-bold text-stone-950 hover:underline cursor-pointer transition-all ml-0.5"
              >
                {mode === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>

          {/* Discreet social alternatives (Instagram & Apple) for complete account connectivity */}
          <div className="mt-6 pt-5 border-t border-stone-100 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleInstagramAuth}
              disabled={isLoading}
              title="Log in with Instagram"
              className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 text-[#E1306C] transition-colors cursor-pointer"
            >
              <InstagramIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleAppleAuth}
              disabled={isLoading}
              title="Log in with Apple"
              className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-900 transition-colors cursor-pointer"
            >
              <AppleIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Guest explore option */}
          <div className="mt-4 text-center">
            <button
              id="btn-guest-explore-craft"
              type="button"
              onClick={continueAsGuest}
              className="text-xs font-medium text-stone-400 hover:text-stone-800 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Explore collection as guest</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Instagram Username Prompt Dialog */}
        {isInstagramPromptOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl p-5 max-w-xs w-full shadow-2xl border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
                  <span>Connect Instagram</span>
                </div>
                <button
                  onClick={() => setIsInstagramPromptOpen(false)}
                  className="text-stone-400 hover:text-stone-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-stone-500">
                Enter your Instagram handle to sync orders & wishlist:
              </p>
              <form onSubmit={handleInstagramHandleSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="@your_handle"
                  value={instagramHandle}
                  onChange={(e) => setInstagramHandle(e.target.value)}
                  className="w-full bg-[#F2F1F3] rounded-lg px-3 py-2 text-xs text-stone-800 border border-stone-200 outline-none focus:border-stone-400"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
                >
                  Connect & Continue
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: PRESERVED EDITORIAL IMAGE WITH SUBTLE ARTISTIC TAG */}
      <div
        className={
          fullScreen
            ? 'relative hidden md:block w-full min-h-screen h-full sticky top-0 overflow-hidden bg-stone-900'
            : 'relative hidden md:block overflow-hidden bg-stone-900 min-h-[580px]'
        }
      >
        {/* Preserved High-Fashion Editorial Image as requested */}
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85"
          alt="Haute Couture Collection"
          className="w-full h-full object-cover object-center filter saturate-110 contrast-105"
        />

        {/* Artistic pastel wash gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40"
          style={{
            background:
              'radial-gradient(circle at 75% 35%, rgba(255, 182, 193, 0.7) 0%, rgba(254, 224, 71, 0.4) 30%, rgba(147, 240, 220, 0.6) 70%, transparent 100%)',
          }}
        />

        {/* Soft vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-stone-950/20 pointer-events-none" />

        {/* Top-Right Floating Gallery Box matching user reference screenshot */}
        <div className="absolute top-6 right-6 z-10 hidden lg:block">
          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/80 shadow-lg backdrop-blur-xs bg-black/40">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80"
              alt="Artisan detail preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom Left Badge matching screenshot "Temporal One by Clear Supply" */}
        <div className="absolute bottom-8 left-8 z-10 flex items-center gap-2.5 bg-black/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
          <div className="w-3 h-3 rounded-full bg-[#B388FF] shadow-xs shrink-0" />
          <span className="text-xs font-medium text-white/90 tracking-wide">
            Temporal One by Clear Supply
          </span>
        </div>
      </div>
    </div>
  );
};
