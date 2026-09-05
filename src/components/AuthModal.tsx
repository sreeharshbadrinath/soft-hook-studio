import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LoginView } from './LoginView';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal } = useAuth();

  if (!isAuthModalOpen) return null;

  return (
    <div
      id="auth-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-stone-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={closeAuthModal}
    >
      <div
        id="auth-modal-inner"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl my-auto"
      >
        <LoginView onClose={closeAuthModal} showCloseButton={true} fullScreen={false} />
      </div>
    </div>
  );
};
