import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenLookbook?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onOpenLookbook,
}) => {
  return (
    <section
      id="hero-section"
      className="relative w-full overflow-hidden select-none"
    >
      {/* Container with rounded aesthetic matching the reference image */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/8.5] min-h-[460px] md:min-h-[540px] max-h-[720px] rounded-2xl md:rounded-[28px] overflow-hidden shadow-xl shadow-stone-900/10 border border-stone-200/40">
        
        {/* Photographic Background: 35mm golden hour coastal vintage aesthetic */}
        <div className="absolute inset-0 bg-[#E8DDD1]">
          <img
            src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=85"
            alt="Warm golden hour bike ride along the coastal dunes with artisanal crochet blanket in basket"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter saturate-[1.12] contrast-[1.03] brightness-[0.98]"
          />

          {/* Warm nostalgic film grain and golden hour tint overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/15 via-transparent to-orange-500/10 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 bg-stone-900/5 pointer-events-none film-grain opacity-70" />
        </div>

        {/* Handwritten text on upper left exactly matching the reference image:
            "nowhere to go,
               nothing to do" */}
        <div className="absolute top-8 sm:top-12 md:top-16 left-6 sm:left-12 md:left-18 z-10 max-w-sm sm:max-w-md pointer-events-none">
          <div className="transform -rotate-[2deg]">
            <p className="font-handwritten text-stone-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-normal drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)]">
              nowhere to go,
            </p>
            <p className="font-handwritten text-stone-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-normal pl-8 sm:pl-12 md:pl-16 drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)]">
              nothing to do
            </p>
          </div>
        </div>

        {/* Bottom subtle bar / badge & CTA */}
        <div className="absolute bottom-5 sm:bottom-7 left-6 sm:left-10 right-6 sm:right-10 z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-auto">
          {/* Subtle slow fashion statement */}
          <div className="bg-white/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/60 shadow-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#CE4326] animate-pulse" />
            <p className="text-[11px] sm:text-xs font-medium text-stone-800 tracking-wide">
              The Summer 1974 Collection • Hand-crocheted in small batches
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            {onOpenLookbook && (
              <button
                id="hero-lookbook-btn"
                onClick={onOpenLookbook}
                className="px-4 py-2 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white text-xs sm:text-sm font-medium backdrop-blur-md transition-all duration-200 flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Editorial Lookbook</span>
              </button>
            )}

            <button
              id="hero-shop-collection-btn"
              onClick={onExploreClick}
              className="px-5 py-2 rounded-full bg-white hover:bg-stone-50 text-stone-900 text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer group"
            >
              <span>Explore Crochets</span>
              <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5 text-stone-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
