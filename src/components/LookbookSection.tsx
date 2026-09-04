import React from 'react';
import { Sparkles, ArrowRight, Tag } from 'lucide-react';
import { Product } from '../types';

interface LookbookSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({
  products,
  onSelectProduct,
}) => {
  const cardigan = products.find((p) => p.id === 'strawberry-checkered-chunky-cardigan') || products[3] || products[0];
  const tote = products.find((p) => p.id === 'sunny-smiley-granny-square-tote') || products[1];
  const halter = products.find((p) => p.id === 'coastal-striped-crochet-halter-top') || products[0];
  const blanket = products.find((p) => p.id === 'sweetheart-pixel-patchwork-afghan') || products[5] || products[0];

  return (
    <section
      id="lookbook-section"
      className="py-12 sm:py-16 px-6 sm:px-10 max-w-7xl mx-auto border-t border-stone-200/80"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900">
            <Sparkles className="w-3.5 h-3.5 text-[#CE4326]" />
            <span>Seasonal Lookbook • Vol. IV</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Nowhere to go, nothing to do.
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Sunny balcony afternoons, cold iced matcha, and slow hand-stitched crochets.
          </p>
        </div>

        <span className="font-handwritten text-2xl sm:text-3xl text-stone-500 transform -rotate-2">
          Sun-dappled days in slow stitches
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Look 1: The Solstice Striped Halter */}
        <div className="group relative rounded-2xl overflow-hidden bg-stone-100 aspect-[4/5] shadow-xs">
          <img
            src="/images/striped-halter-top.jpg"
            alt="The Solstice Striped Halter Top worn outdoors"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">Look 01 • Boardwalk Sun</span>
            <h4 className="text-base font-bold mt-0.5">The Solstice Striped Halter</h4>
            <p className="text-xs text-stone-300 line-clamp-1">Coastal pastel stripes with openwork lattice waist mesh.</p>
            <button
              onClick={() => onSelectProduct(halter)}
              className="mt-2.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-stone-900 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Tag className="w-3 h-3 text-[#CE4326]" />
              <span>Shop Halter Top • ${halter.price}</span>
            </button>
          </div>
        </div>

        {/* Look 2: Sunny Days 3D Smiley Tote */}
        <div className="group relative rounded-2xl overflow-hidden bg-stone-100 aspect-[4/5] shadow-xs">
          <img
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80"
            alt="Sunny Days 3D Smiley Granny Tote"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">Look 02 • Daily Sunshine</span>
            <h4 className="text-base font-bold mt-0.5">Sunny Days 3D Smiley Tote</h4>
            <p className="text-xs text-stone-300 line-clamp-1">Ivory granny squares with 3D puffy smiley faces & pink lining.</p>
            <button
              onClick={() => onSelectProduct(tote)}
              className="mt-2.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-stone-900 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Tag className="w-3 h-3 text-[#CE4326]" />
              <span>Shop Tote • ${tote.price}</span>
            </button>
          </div>
        </div>

        {/* Look 3: The Strawberry Milk Checkered Cardigan */}
        <div className="group relative rounded-2xl overflow-hidden bg-stone-100 aspect-[4/5] shadow-xs">
          <img
            src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80"
            alt="Strawberry Milk Checkered Cardigan"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">Look 03 • Matcha Balcony</span>
            <h4 className="text-base font-bold mt-0.5">Strawberry Milk Check Cardigan</h4>
            <p className="text-xs text-stone-300 line-clamp-1">26 hours of handwork in super-bulky cloud soft merino.</p>
            <button
              onClick={() => onSelectProduct(cardigan)}
              className="mt-2.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-stone-900 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Tag className="w-3 h-3 text-[#CE4326]" />
              <span>Shop Cardigan • ${cardigan.price}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
