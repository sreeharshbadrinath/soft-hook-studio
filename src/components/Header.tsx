import React from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ProductCategory } from '../types';

interface HeaderProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  isTransparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onOpenSearch,
  isTransparent = false,
}) => {
  return (
    <header
      id="main-header"
      className={`w-full z-30 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent py-4 px-6 md:px-10'
          : 'bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200/60 py-3.5 px-6 md:px-10 sticky top-0'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Nav: His, Hers, Last Call matching the reference image */}
        <nav className="flex items-center gap-6 md:gap-8 flex-1">
          <button
            id="nav-his-btn"
            onClick={() => onSelectCategory(activeCategory === 'his' ? 'all' : 'his')}
            className={`text-xs md:text-sm font-medium transition-colors hover:text-stone-900 cursor-pointer ${
              activeCategory === 'his'
                ? 'text-stone-950 font-semibold underline underline-offset-4 decoration-[#CE4326]'
                : 'text-stone-600'
            }`}
          >
            His
          </button>
          <button
            id="nav-hers-btn"
            onClick={() => onSelectCategory(activeCategory === 'hers' ? 'all' : 'hers')}
            className={`text-xs md:text-sm font-medium transition-colors hover:text-stone-900 cursor-pointer ${
              activeCategory === 'hers'
                ? 'text-stone-950 font-semibold underline underline-offset-4 decoration-[#CE4326]'
                : 'text-stone-600'
            }`}
          >
            Hers
          </button>
          <button
            id="nav-lastcall-btn"
            onClick={() => onSelectCategory(activeCategory === 'last-call' ? 'all' : 'last-call')}
            className={`text-xs md:text-sm font-medium transition-colors hover:text-stone-900 cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'last-call'
                ? 'text-amber-800 font-semibold underline underline-offset-4 decoration-amber-600'
                : 'text-stone-600'
            }`}
          >
            <span>Last Call</span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          </button>
        </nav>

        {/* Center: Brand Logo */}
        <div className="flex-shrink-0 text-center px-4">
          <BrandLogo onClick={() => onSelectCategory('all')} />
        </div>

        {/* Right Actions: Search & Shopping Bag */}
        <div className="flex items-center justify-end gap-4 md:gap-5 flex-1">
          <button
            id="header-search-btn"
            onClick={onOpenSearch}
            aria-label="Search crochet products"
            className="p-1.5 text-stone-700 hover:text-stone-950 transition-colors rounded-full hover:bg-stone-200/40 cursor-pointer"
          >
            <Search className="w-[18px] h-[18px] md:w-5 md:h-5 stroke-[1.8]" />
          </button>

          <button
            id="header-cart-btn"
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="relative p-1.5 text-stone-700 hover:text-stone-950 transition-colors rounded-full hover:bg-stone-200/40 cursor-pointer"
          >
            <ShoppingBag className="w-[18px] h-[18px] md:w-5 md:h-5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span
                id="header-cart-badge"
                className="absolute -top-0.5 -right-0.5 bg-[#CE4326] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
