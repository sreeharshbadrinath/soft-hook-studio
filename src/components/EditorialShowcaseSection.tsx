import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';

interface EditorialShowcaseSectionProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onScrollToCatalog: () => void;
}

export const EditorialShowcaseSection: React.FC<EditorialShowcaseSectionProps> = ({
  onSelectCategory,
  onScrollToCatalog,
}) => {
  const handleDiscover = (category: ProductCategory) => {
    onSelectCategory(category);
    onScrollToCatalog();
  };

  return (
    <section id="editorial-showcase" className="w-full bg-[#FAF8F5] text-stone-900 overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. CROCHET & WEAVED CLOTHINGS */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-20 lg:py-24 border-b border-stone-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left: Model wearing crochet piece + Inset Texture Detail */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-end">
            <div className="sm:col-span-8 relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/5] bg-stone-100 shadow-lg group">
              <img
                src="/images/striped-halter-top.jpg"
                alt="Model in hand-crocheted striped halter top"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 to-transparent pointer-events-none" />
            </div>

            {/* Inset Texture / Woven Detail */}
            <div className="sm:col-span-4 space-y-3">
              <div className="rounded-xl overflow-hidden aspect-square bg-[#E9E4DC] border border-stone-300/80 shadow-md group relative">
                <img
                  src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=85"
                  alt="Open-lace crochet filet stitch texture"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold text-stone-800 tracking-wider">
                  SOFT HOOK
                </div>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">
                Egyptian mercerized cotton, open-lace filet weave gauge #03.
              </p>
            </div>
          </div>

          {/* Right: Bold Heading & Description */}
          <div className="lg:col-span-6 space-y-5 lg:pl-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#557059] border border-emerald-200/60 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pure Natural Fibers</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-[0.92] tracking-tight">
              CROCHET & WEAVED CLOTHINGS
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal max-w-xl">
              Immerse yourself in our collection of slow-fashion weaved wearables: open-lace polos, breezy halter tops, granny-square vests, chunky cable-knit cardigans, and wide-leg open-weave trousers. Handcrafted stitch by stitch for lightweight breathability and timeless style.
            </p>
            <div className="pt-2">
              <button
                id="btn-discover-clothing"
                onClick={() => handleDiscover('clothing')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all text-xs sm:text-sm font-semibold cursor-pointer group shadow-2xs"
              >
                <span>Discover Weaved Clothing</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CROCHET BAGS & MARKET TOTES */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-20 lg:py-24 border-b border-stone-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left: Bold Heading, Description & Inset Photo */}
          <div className="lg:col-span-5 space-y-5 lg:pr-6 order-2 lg:order-1">
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-stone-900 leading-[0.9] tracking-tight">
              HANDCRAFTED CROCHET BAGS
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal max-w-lg">
              From our viral 3D smiley granny square carryalls to French fishnet market totes and retro checkered shoulder baguettes. Sturdy double-strand cotton cord engineered to carry your daily treasures without sagging.
            </p>
            <div className="pt-1 pb-4">
              <button
                id="btn-discover-bags"
                onClick={() => handleDiscover('bags')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all text-xs sm:text-sm font-semibold cursor-pointer group shadow-2xs"
              >
                <span>Explore Bags Collection</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Inset editorial thumbnail */}
            <div className="w-40 sm:w-48 aspect-[3/4] rounded-xl overflow-hidden shadow-md border border-stone-300/80 bg-stone-200 group">
              <img
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80"
                alt="Retro checkered crochet shoulder bag"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right: Feature Image of Handcrafted Bag */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-[#708A74] shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1400&q=85"
                alt="Hand-crocheted artisan bags and market totes"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#708A74]/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. ARTISANAL CROCHET PURSES */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-20 lg:py-24 border-b border-stone-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left: Model / Product Shot */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/5] bg-[#EAE4DC] shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85"
                alt="Vintage brass kiss-lock crochet coin purse"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/15 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right: Heading & Description */}
          <div className="lg:col-span-6 space-y-5 lg:pl-6">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-[0.92] tracking-tight">
              HANDMADE CROCHET PURSES
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal max-w-xl">
              Heirloom treasures crafted with miniature precision. Explore our vintage brass kiss-lock coin purses, petal blossom envelope clutches, and macaron zip wristlets. Lined with Japanese cotton florals and finished with antique brass hardware.
            </p>
            <div className="pt-2">
              <button
                id="btn-discover-purses"
                onClick={() => handleDiscover('purses')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all text-xs sm:text-sm font-semibold cursor-pointer group shadow-2xs"
              >
                <span>Discover Crochet Purses</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. CROCHET TOYS & AMIGURUMI WIDE FEATURE BANNER */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#708A74] text-white py-14 sm:py-20 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          {/* Top Bar: Description on Left, Pill Button on Right */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 sm:pb-12">
            <p className="text-xs sm:text-sm text-stone-100 max-w-md font-normal leading-relaxed">
              Heirloom stuffed toys crocheted with dense amigurumi stitches, hypoallergenic organic bamboo cotton, and safety-locked eyes. Crafted to be cherished for generations.
            </p>
            <button
              id="btn-discover-toys"
              onClick={() => handleDiscover('toys')}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/80 bg-transparent hover:bg-white hover:text-[#708A74] text-white transition-all text-xs sm:text-sm font-medium cursor-pointer group shrink-0"
            >
              <span>Explore Crochet Toys</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Giant Condensed "TOYS" in Background + Toy Showcase in Foreground */}
          <div className="relative flex flex-col items-center justify-center pt-2 sm:pt-6">
            {/* Giant Background Word */}
            <div className="font-display text-[22vw] sm:text-[20vw] lg:text-[18vw] leading-[0.78] tracking-tight text-white/35 select-none text-center pointer-events-none -mb-10 sm:-mb-20 lg:-mb-28">
              TOYS
            </div>

            {/* Lineup of Crochet Toys */}
            <div className="relative z-10 w-full max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end justify-center pt-8">
                {/* Toy 1: Honey Bear */}
                <div
                  className="flex flex-col items-center group cursor-pointer bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/20 transition-transform duration-300 hover:-translate-y-2"
                  onClick={() => handleDiscover('toys')}
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=600&q=85"
                      alt="Barnaby Honey Bear Amigurumi Toy"
                      className="w-full h-full object-cover filter drop-shadow-md group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-xs font-semibold text-white">Barnaby the Honey Bear</span>
                  <span className="text-[11px] text-white/80">Organic Cotton Heirloom Toy</span>
                </div>

                {/* Toy 2: Flora Bunny */}
                <div
                  className="flex flex-col items-center group cursor-pointer bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/20 transition-transform duration-300 hover:-translate-y-2"
                  onClick={() => handleDiscover('toys')}
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1535572290543-960a8046f5af?auto=format&fit=crop&w=600&q=85"
                      alt="Flora Long-Eared Bunny Toy"
                      className="w-full h-full object-cover filter drop-shadow-md group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-xs font-semibold text-white">Flora Long-Eared Bunny</span>
                  <span className="text-[11px] text-white/80">Bamboo Cotton Plush Toy</span>
                </div>

                {/* Toy 3: Pip Dinosaur */}
                <div
                  className="flex flex-col items-center group cursor-pointer bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/20 transition-transform duration-300 hover:-translate-y-2"
                  onClick={() => handleDiscover('toys')}
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=85"
                      alt="Pip Pastel Dinosaur Toy"
                      className="w-full h-full object-cover filter drop-shadow-md group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-xs font-semibold text-white">Pip the Pastel Dinosaur</span>
                  <span className="text-[11px] text-white/80">Textured Sensory Amigurumi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
