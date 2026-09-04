import React, { useState } from 'react';
import { X, Clock, Sparkles, Heart, ShieldCheck, ShoppingBag, Check } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: ProductColor, size?: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedImage, setSelectedImage] = useState<string>(product.primaryImage);
  const [selectedSize, setSelectedSize] = useState<string>('M/L');
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const isWearable = product.category.includes('wearables');

  const handleAdd = () => {
    onAddToCart(product, selectedColor, isWearable ? selectedSize : undefined);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div
      id="quick-view-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="quick-view-modal"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FDFBF7] rounded-2xl sm:rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200/80 flex flex-col md:flex-row max-h-[92vh] animate-in zoom-in-95 duration-200"
      >
        {/* Left Column: Visual Gallery */}
        <div className="md:w-1/2 bg-[#F3ECE0] relative flex flex-col justify-between p-4 sm:p-6">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white/70 shadow-xs">
            <img
              src={selectedImage}
              alt={product.name}
              onError={() => {
                if (product.galleryImages && product.galleryImages[1]) {
                  setSelectedImage(product.galleryImages[1]);
                }
              }}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />

            <div className="absolute top-3 left-3 bg-[#CE4326] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
              Slow Craft
            </div>

            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-stone-800 text-[11px] font-medium px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-amber-700" />
              <span>{product.craftHours} hours of hand stitching</span>
            </div>
          </div>

          {/* Thumbnail strip */}
          {product.galleryImages.length > 1 && (
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
              {product.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    selectedImage === img
                      ? 'border-[#CE4326] scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} preview ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Configuration */}
        <div className="md:w-1/2 p-5 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-semibold tracking-wider text-amber-900 uppercase">
                  Soft Hook Studio • Certified Artisanal
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5 leading-tight">
                  {product.name}
                </h2>
              </div>

              <button
                id="close-quickview-btn"
                onClick={onClose}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-200/50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center gap-3 mt-3">
              <span className="text-xl font-bold text-stone-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-stone-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-xs text-stone-500">
                ★ {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
              {product.description}
            </p>

            {/* Artisan Note */}
            <div className="mt-4 p-3 rounded-xl bg-[#F5EFE6] border border-[#E7DFD4] text-stone-700 text-xs flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-stone-800">The Artisan Story:</span>
                <p className="mt-0.5 text-stone-600 leading-normal">{product.artisanNote}</p>
              </div>
            </div>

            {/* Color Selector */}
            <div className="mt-5">
              <label className="text-xs font-semibold text-stone-800 block mb-2">
                Color Palette: <span className="font-normal text-stone-600">{selectedColor.name}</span>
              </label>
              <div className="flex items-center gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border transition-all cursor-pointer ${
                      selectedColor.name === color.name
                        ? 'border-stone-800 bg-stone-100 font-semibold'
                        : 'border-stone-300 text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/10"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector for Wearables */}
            {isWearable && (
              <div className="mt-4">
                <label className="text-xs font-semibold text-stone-800 block mb-2">
                  Fit & Sizing:
                </label>
                <div className="flex items-center gap-2">
                  {['XS/S', 'M/L', 'XL/2XL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 text-xs rounded-lg border font-medium transition-colors cursor-pointer ${
                        selectedSize === size
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'border-stone-200 text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications list */}
            <div className="mt-5 pt-4 border-t border-stone-200/80 space-y-1.5 text-[11px] text-stone-600">
              <p><strong className="text-stone-800">Yarn:</strong> {product.yarnMaterial}</p>
              <p><strong className="text-stone-800">Hook:</strong> {product.hookSize}</p>
              <p><strong className="text-stone-800">Dimensions:</strong> {product.dimensions}</p>
              <p><strong className="text-stone-800">Care:</strong> {product.careGuide}</p>
            </div>
          </div>

          {/* Add to Bag CTA */}
          <div className="mt-6 pt-4 border-t border-stone-200 flex items-center gap-3">
            <button
              id="modal-add-to-bag-btn"
              onClick={handleAdd}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                isAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-900 hover:bg-[#CE4326] text-white active:scale-[0.98]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Your Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • ${product.price}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
