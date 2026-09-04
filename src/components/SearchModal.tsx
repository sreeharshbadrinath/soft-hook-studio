import React, { useState, useMemo } from 'react';
import { X, Search as SearchIcon, ArrowRight, Tag } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState<string>('');

  const popularSearches = [
    'Granny Square Cardigan',
    'Waffle Tote',
    'Bucket Hat',
    'Heirloom Throw',
    'Last Call',
    'Merino Beanie',
  ];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.yarnMaterial.toLowerCase().includes(q) ||
        p.category.some((c) => c.toLowerCase().includes(q))
    );
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div
      id="search-modal-overlay"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="search-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FDFBF7] rounded-2xl sm:rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200/80 p-5 sm:p-6 animate-in zoom-in-95 duration-200"
      >
        {/* Search Input */}
        <div className="relative flex items-center border-b border-stone-200 pb-3">
          <SearchIcon className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search crochets, cardigans, bags, yarns..."
            className="w-full pl-3 pr-8 text-base bg-transparent text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="pt-3 pb-2">
          <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-2">
            Popular Searches:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {popularSearches.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 text-xs rounded-full bg-stone-200/60 hover:bg-stone-300 text-stone-700 transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mt-4 max-h-72 overflow-y-auto divide-y divide-stone-100">
          {query.trim() && results.length === 0 ? (
            <div className="py-8 text-center text-xs text-stone-500">
              No handcrafted crochets found matching "{query}". Try "cardigan", "tote", or "blanket".
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="py-2.5 flex items-center justify-between hover:bg-stone-100/60 px-2 rounded-xl cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-lg object-cover bg-stone-200"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900">{product.name}</h4>
                    <p className="text-[11px] text-stone-500 line-clamp-1">{product.yarnMaterial}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-900">${product.price}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
