import React from 'react';
import { Heart, Sparkles, Shield, Feather, Scissors } from 'lucide-react';

interface ArtisanStorySectionProps {
  onOpenCommission: () => void;
}

export const ArtisanStorySection: React.FC<ArtisanStorySectionProps> = ({
  onOpenCommission,
}) => {
  return (
    <section
      id="artisan-story-section"
      className="py-12 sm:py-16 px-6 sm:px-10 max-w-7xl mx-auto border-t border-stone-200/80"
    >
      <div className="bg-[#F5ECE0] rounded-3xl p-6 sm:p-10 md:p-14 relative overflow-hidden border border-[#E9DFD0]">
        
        {/* Decorative background warmth */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/40 rounded-full filter blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-amber-800/20 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#CE4326]" />
            <span>The Soft Hook Truth</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 leading-tight">
            Machines cannot crochet. <br className="hidden sm:inline" />
            <span className="font-handwritten text-4xl sm:text-5xl text-[#CE4326] font-normal block sm:inline mt-1 sm:mt-0">
              Every loop is guided by human hands.
            </span>
          </h2>

          <p className="mt-4 text-stone-700 text-xs sm:text-sm leading-relaxed">
            Unlike commercial knitting, no industrial machine in the world can replicate the multidirectional tension and loops of true crochet. When you wear a piece from Soft Hook Studio, you are wearing hours of intentional human patience, slow rhythm, and artisan heritage.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8 sm:mt-12 relative z-10">
          <div className="bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-white/60 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#FDEEEB] text-[#CE4326] flex items-center justify-center mb-3">
              <Heart className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-stone-900">Ethical Fair Living Wages</h4>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
              We partner directly with female artisan collectives, paying above-market fair living wages with flexible studio hours.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-white/60 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#E8F0EA] text-[#3C5846] flex items-center justify-center mb-3">
              <Feather className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-stone-900">Zero Microplastics</h4>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
              100% natural, biodegradable fibers: GOTS certified Peruvian organic cotton, pure merino wool, and sun-dried French linen.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-white/60 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#FFF6E5] text-amber-700 flex items-center justify-center mb-3">
              <Shield className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-stone-900">Heirloom Longevity</h4>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
              Constructed with reinforced whipstitching and interlocking knots designed to be passed down through generations.
            </p>
          </div>
        </div>

        {/* Custom Commission Prompt */}
        <div className="mt-8 pt-6 border-t border-stone-300/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-2.5">
            <Scissors className="w-4 h-4 text-[#CE4326]" />
            <span className="text-xs sm:text-sm font-medium text-stone-800">
              Have a custom vision, size, or colorway in mind?
            </span>
          </div>

          <button
            id="open-custom-commission-btn"
            onClick={onOpenCommission}
            className="px-5 py-2 rounded-full bg-stone-900 hover:bg-[#CE4326] text-white text-xs font-semibold transition-all duration-200 shadow-sm cursor-pointer"
          >
            Start a Bespoke Commission
          </button>
        </div>
      </div>
    </section>
  );
};
