import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQuantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  discountCode: string;
  onApplyDiscount: (code: string) => void;
  discountPercent: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  discountCode,
  onApplyDiscount,
  discountPercent,
}) => {
  const [promoInput, setPromoInput] = useState<string>('');
  const [orderNote, setOrderNote] = useState<string>('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 85;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 9.5;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const progressToFreeShipping = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      onApplyDiscount(promoInput.trim());
      setPromoInput('');
    }
  };

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 flex justify-end bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="cart-drawer-container"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col justify-between border-l border-stone-200/80 animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold text-stone-900">Your Shopping Bag</h2>
            <span className="text-xs bg-stone-200 text-stone-700 px-2 py-0.5 rounded-full font-semibold">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>

          <button
            id="close-cart-btn"
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-200/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-[#F5EFE6] px-5 py-3 border-b border-[#E8DFC8]">
          <div className="flex justify-between text-xs font-medium text-stone-800 mb-1.5">
            {subtotal >= FREE_SHIPPING_THRESHOLD ? (
              <span className="text-[#3C5846] font-semibold">
                ✓ You have qualified for Free Shipping!
              </span>
            ) : (
              <span>
                Add{' '}
                <strong className="text-[#CE4326]">
                  ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)}
                </strong>{' '}
                more for Free Shipping
              </span>
            )}
            <span className="text-stone-500 font-mono text-[11px]">{progressToFreeShipping}%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-300/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#CE4326] transition-all duration-300 rounded-full"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-stone-500">
              <div className="w-16 h-16 rounded-full bg-stone-200/60 flex items-center justify-center text-stone-400">
                <Tag className="w-7 h-7" />
              </div>
              <p className="font-semibold text-stone-800 text-base">Your bag is currently empty</p>
              <p className="text-xs max-w-xs text-stone-500 leading-relaxed">
                Discover our hand-crocheted cardigans, waffle totes, and heirloom blankets stitched with care.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-[#CE4326] transition-colors cursor-pointer"
              >
                Browse Crochets
              </button>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize || ''}-${index}`}
                className="flex gap-3.5 p-3 rounded-2xl bg-white border border-stone-200/70 shadow-2xs"
              >
                <img
                  src={item.product.primaryImage}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-xl object-cover bg-stone-100 shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-stone-400 hover:text-rose-700 transition-colors p-0.5 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-stone-300"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        {item.selectedColor.name}
                      </span>
                      {item.selectedSize && (
                        <span>• Size {item.selectedSize}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-100">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-stone-900">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-stone-200/80 bg-white space-y-3.5">
            {/* Promo Code Form */}
            <form onSubmit={handleApply} className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Discount code (e.g. SOFTHOOK15)"
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-stone-800 bg-stone-50 uppercase"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-medium transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {discountPercent > 0 && (
              <div className="text-xs text-emerald-800 flex items-center justify-between bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <span>Code applied ({discountCode})</span>
                <span className="font-semibold">-{discountPercent}% OFF</span>
              </div>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-stone-900">${subtotal.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-[#3C5846] font-semibold">FREE</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-100">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="proceed-to-checkout-btn"
              onClick={onProceedToCheckout}
              className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-[#CE4326] text-white text-sm font-semibold transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
              <span>Ethical Artisan Checkout • 30-Day Happiness Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
