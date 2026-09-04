import React, { useState } from 'react';
import { X, CheckCircle2, Package, Sparkles, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  total: number;
  onCompleteOrder: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  total,
  onCompleteOrder,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: 'Clara Mendez',
    email: 'clara@example.com',
    address: '428 Ocean Breeze Way',
    city: 'Carmel-by-the-Sea',
    state: 'CA',
    zip: '93921',
    cardNumber: '•••• •••• •••• 4829',
  });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      onCompleteOrder();
    }, 1200);
  };

  const handleDone = () => {
    setStep('form');
    onClose();
  };

  return (
    <div
      id="checkout-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="checkout-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FDFBF7] rounded-2xl sm:rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200/80 p-6 sm:p-8 animate-in zoom-in-95 duration-200"
      >
        {step === 'form' ? (
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <span className="text-[11px] font-semibold text-amber-900 uppercase tracking-wider">
                  Soft Hook Studio
                </span>
                <h3 className="text-xl font-bold text-stone-900">
                  Artisanal Express Checkout
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-200/50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Brief order recap */}
            <div className="my-4 p-3 bg-[#F4EFE6] rounded-xl text-xs text-stone-700 flex justify-between items-center">
              <div>
                <span className="font-semibold">{cartItems.length} Handcrafted Pieces</span>
                <p className="text-stone-500">Hand-packaged in stamped unbleached muslin sacks</p>
              </div>
              <span className="text-base font-bold text-stone-900">
                ${total.toFixed(2)}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Delivery Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-stone-800"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    ZIP
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Payment Method (Simulated)
                </label>
                <div className="px-3 py-2.5 rounded-xl border border-stone-300 bg-white flex items-center justify-between text-xs text-stone-800">
                  <span className="font-mono">{formData.cardNumber}</span>
                  <span className="text-[11px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium">
                    Test Mode Ready
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-[#CE4326] hover:bg-[#B7381F] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isProcessing ? (
                  <span>Stitching your order...</span>
                ) : (
                  <span>Complete Order • ${total.toFixed(2)}</span>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-xs uppercase font-bold tracking-wider text-[#CE4326]">
              Order Confirmed #SHS-9281
            </span>

            <h3 className="text-2xl font-bold text-stone-900">
              Thank You, {formData.name.split(' ')[0]}!
            </h3>

            <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
              Your hand-crocheted heirloom pieces have been sent to our artisan studio.
              Each piece will be inspected, folded with lavender sprigs, and shipped in biodegradable packaging.
            </p>

            <div className="bg-[#F5EFE6] p-4 rounded-2xl max-w-sm mx-auto text-left text-xs space-y-1.5 border border-[#E8DFC8]">
              <div className="flex justify-between">
                <span className="text-stone-500">Destination:</span>
                <span className="font-semibold text-stone-800">{formData.city}, {formData.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Estimated Delivery:</span>
                <span className="font-semibold text-stone-800">3–5 business days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Total Charged:</span>
                <span className="font-semibold text-[#CE4326]">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleDone}
              className="mt-4 px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Return to Soft Hook Studio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
