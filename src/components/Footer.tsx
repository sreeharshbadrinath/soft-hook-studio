import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { Send, CheckCircle2, Heart } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: ProductCategory) => void;
  onOpenCommission: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenCommission,
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="main-footer" className="bg-[#1E1B18] text-stone-300 pt-16 pb-12 px-6 sm:px-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800/80">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-4 space-y-4">
            <div className="brightness-125">
              <BrandLogo onClick={() => onSelectCategory('all')} />
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Soft Hook Studio is an independent slow-fashion crochet studio honoring the craft of the human hand. Spun with organic Peruvian cotton, raw flax linen, and botanical dyes.
            </p>
            <p className="font-handwritten text-xl text-stone-400">
              nowhere to go, nothing to do.
            </p>
          </div>

          {/* Col 2: Shop Links */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-100">
              Collection
            </span>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onSelectCategory('hers')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Hers & Wearables
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('his')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  His & Unisex
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('bags')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Bags & Carryalls
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('home')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Heirloom Blankets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('last-call')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-amber-500 font-semibold"
                >
                  Last Call (Archive)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio & Care */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-100">
              Studio & Care
            </span>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={onOpenCommission}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Custom Commissions
                </button>
              </li>
              <li>
                <span className="hover:text-stone-200 transition-colors">
                  Crochet Care & Washing
                </span>
              </li>
              <li>
                <span className="hover:text-stone-200 transition-colors">
                  Artisan Fair-Wage Charter
                </span>
              </li>
              <li>
                <span className="hover:text-stone-200 transition-colors">
                  Zero Microplastics Policy
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-100">
              The Slow Stitch Journal
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              Receive early access to limited seasonal dye lots, artisan dispatches, and 10% off your first handcrafted heirloom piece.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2 pt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-stone-900 border border-stone-700 text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#CE4326] hover:bg-[#B7381F] text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Join</span>
                </button>
              </form>
            ) : (
              <div className="p-3 bg-stone-900 rounded-xl border border-emerald-800 text-xs text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Welcome! Check your inbox for code <strong>SOFTHOOK10</strong>.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} Soft Hook Studio Inc. All Rights Reserved.</p>
          <div className="flex items-center gap-1">
            <span>Hand-hooked with care & slow living</span>
            <Heart className="w-3 h-3 text-[#CE4326] fill-[#CE4326]" />
            <span>by human hands</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
