import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroSectionProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectCategory }) => {
  return (
    <section
      id="hero-section"
      className="relative w-full bg-[#708A74] text-white min-h-[520px] sm:min-h-[600px] md:min-h-[660px] lg:min-h-[720px] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Top Tagline / Category Sub-pills (No duplicate search or login buttons) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 z-30">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          <span>Artisanal Weaves • 100% Hand-Hooked Crochets</span>
        </div>

        {/* Quick Jump Category Chips */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs font-medium">
          <button
            onClick={() => onSelectCategory('clothing')}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white hover:text-[#708A74] text-white transition-all cursor-pointer"
          >
            Weaved Clothing
          </button>
          <button
            onClick={() => onSelectCategory('bags')}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white hover:text-[#708A74] text-white transition-all cursor-pointer"
          >
            Bags
          </button>
          <button
            onClick={() => onSelectCategory('purses')}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white hover:text-[#708A74] text-white transition-all cursor-pointer"
          >
            Purses
          </button>
          <button
            onClick={() => onSelectCategory('toys')}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white hover:text-[#708A74] text-white transition-all cursor-pointer"
          >
            Toys
          </button>
        </div>
      </div>

      {/* Center 3D Layer: Giant Condensed Background Typography + Overlapping Crochet Model */}
      <div className="relative flex-1 flex items-center justify-center w-full px-4 overflow-hidden pt-4 pb-0">
        {/* Layer 1: Giant White Condensed Typography */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none">
          <h1
            className="font-display text-[21vw] sm:text-[20vw] md:text-[19vw] lg:text-[18vw] leading-[0.8] tracking-tight text-white text-center w-full transform -translate-y-4 sm:-translate-y-6 md:-translate-y-8"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.12)' }}
          >
            SOFT HOOK
          </h1>
        </div>

        {/* Layer 2: Editorial Handcrafted Crochet Model overlapping the giant text */}
        <div className="relative z-20 flex flex-col items-center justify-end h-full max-h-[500px] sm:max-h-[580px] md:max-h-[640px] pointer-events-none mt-auto">
          {/* Floor soft oval shadow */}
          <div className="absolute bottom-2 sm:bottom-4 w-64 sm:w-80 md:w-96 h-8 bg-black/25 rounded-[100%] filter blur-lg -z-10" />

          {/* Model in Handcrafted Crochet Ensemble with elegant rounded bottom styling */}
          <div className="relative rounded-t-3xl sm:rounded-t-[36px] overflow-hidden shadow-2xl border-t border-x border-white/30 bg-stone-900/10">
            <img
              src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=85"
              alt="Model wearing handcrafted chunky crochet cardigan"
              className="h-[380px] sm:h-[460px] md:h-[520px] lg:h-[580px] w-auto object-cover object-top filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.25)]"
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#708A74] to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Bottom Action Strip */}
      <div className="relative z-20 w-full bg-gradient-to-t from-[#637d67] to-transparent py-4 px-6 flex items-center justify-center">
        <button
          onClick={() => onSelectCategory('all')}
          className="flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white transition-colors cursor-pointer"
        >
          <span>Explore All Crochets, Bags, Purses & Toys</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
