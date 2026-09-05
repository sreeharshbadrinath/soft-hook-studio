import React from 'react';

interface BrandLogoProps {
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ onClick, className = '', size = 'md' }) => {
  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const textSizes = {
    sm: 'text-xs tracking-[0.2em]',
    md: 'text-sm tracking-[0.22em]',
    lg: 'text-base tracking-[0.25em]',
  };

  return (
    <div
      id="brand-logo"
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none group ${className}`}
    >
      {/* Retro Sunset Striped Circular Icon matching reference image */}
      <div
        className={`relative ${iconSizes[size]} rounded-full overflow-hidden shadow-xs shrink-0 flex flex-col transition-transform duration-300 group-hover:scale-105`}
        title="Soft Hook Studio Emblem"
      >
        <div className="h-[25%] bg-[#CE4326] w-full" />
        <div className="h-[25%] bg-[#E56A2B] w-full" />
        <div className="h-[25%] bg-[#F3A536] w-full" />
        <div className="h-[25%] bg-[#FCE5B8] w-full" />
      </div>

      {/* Brand Wordmark */}
      <span className="font-display text-base sm:text-lg tracking-wider text-stone-900 group-hover:text-stone-950 transition-colors">
        SOFT HOOK
      </span>
    </div>
  );
};
