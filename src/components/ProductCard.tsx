import React, { useState } from 'react';
import { ShoppingBag, Eye, Clock, Check, Heart } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [imgSrc, setImgSrc] = useState<string>(product.primaryImage);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(product);
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200/70 hover:border-stone-300 hover:shadow-lg transition-all duration-300"
    >
      {/* Product Image Container */}
      <div
        onClick={() => onQuickView(product)}
        className="relative aspect-[4/4.2] w-full overflow-hidden bg-[#F5EFE6] cursor-pointer"
      >
        <img
          src={imgSrc}
          alt={product.name}
          onError={() => {
            if (product.galleryImages && product.galleryImages[1]) {
              setImgSrc(product.galleryImages[1]);
            }
          }}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#CE4326] text-white shadow-xs">
              Best Seller
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#3C5846] text-white shadow-xs">
              New Arrival
            </span>
          )}
          {product.isLastCall && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-700 text-white shadow-xs">
              Last Call
            </span>
          )}
        </div>

        {/* Top Right: Craft Hours & Favorite Button */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <div className="bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[11px] font-medium text-stone-700 flex items-center gap-1 shadow-2xs">
            <Clock className="w-3 h-3 text-amber-700" />
            <span>{product.craftHours}h craft</span>
          </div>

          <button
            onClick={handleHeartClick}
            aria-label={isFavorite ? 'Remove from saved' : 'Save to favorites'}
            className={`p-1.5 rounded-full backdrop-blur-xs shadow-2xs transition-all cursor-pointer ${
              isFavorite
                ? 'bg-rose-50 text-rose-600 ring-1 ring-rose-300'
                : 'bg-white/90 text-stone-400 hover:text-rose-600 hover:bg-white'
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`}
            />
          </button>
        </div>

        {/* Quick View overlay button on hover */}
        <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-4 py-2 rounded-full bg-white/95 text-stone-900 text-xs font-semibold shadow-md hover:bg-white hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-stone-700" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Yarn Material note */}
          <p className="text-[11px] font-medium uppercase tracking-wider text-stone-500 line-clamp-1">
            {product.yarnMaterial}
          </p>

          <h3
            onClick={() => onQuickView(product)}
            className="text-base font-semibold text-stone-900 mt-1 cursor-pointer hover:text-[#CE4326] transition-colors leading-snug line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Color Swatches and Pricing */}
        <div className="pt-2 border-t border-stone-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            {/* Swatches */}
            <div className="flex items-center gap-1.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(color);
                  }}
                  title={color.name}
                  className={`w-4 h-4 rounded-full transition-transform cursor-pointer border ${
                    selectedColor.name === color.name
                      ? 'ring-2 ring-stone-800 ring-offset-1 scale-110'
                      : 'border-stone-300/80 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
              <span className="text-[11px] text-stone-500 ml-1">
                {selectedColor.name}
              </span>
            </div>

            {/* Price */}
            <div className="text-right">
              {product.originalPrice ? (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xs text-stone-400 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="text-sm font-bold text-[#CE4326]">
                    ${product.price}
                  </span>
                </div>
              ) : (
                <span className="text-sm font-bold text-stone-900">
                  ${product.price}
                </span>
              )}
            </div>
          </div>

          {/* Add to Bag Button */}
          <button
            id={`add-to-bag-${product.id}`}
            onClick={handleAdd}
            className={`w-full py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
              isAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-900 hover:bg-[#CE4326] text-white active:scale-[0.98]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
