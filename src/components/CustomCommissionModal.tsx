import React, { useState } from 'react';
import { X, Sparkles, Clock, CheckCircle2, Scissors } from 'lucide-react';

interface CustomCommissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomCommissionModal: React.FC<CustomCommissionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [itemType, setItemType] = useState('Bespoke Granny Square Cardigan');
  const [yarnType, setYarnType] = useState('100% Organic Pima Cotton');
  const [palette, setPalette] = useState('Retro Sunset (Terracotta, Ochre, Cream)');
  const [notes, setNotes] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  // Dynamic quote estimates
  const estimates: Record<string, { hours: number; price: number }> = {
    'Bespoke Granny Square Cardigan': { hours: 26, price: 185 },
    'Custom Coastal Waffle Carryall': { hours: 12, price: 95 },
    'Heirloom Chunky Sunset Throw': { hours: 34, price: 235 },
    'Scalloped Raffia Sun Bucket Hat': { hours: 8, price: 68 },
    'Amigurumi Character / Companion': { hours: 9, price: 52 },
  };

  const currentEst = estimates[itemType] || { hours: 20, price: 150 };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      id="custom-commission-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="custom-commission-modal"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FDFBF7] rounded-2xl sm:rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200/80 p-6 sm:p-8 animate-in zoom-in-95 duration-200"
      >
        {!isSubmitted ? (
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <span className="text-[11px] font-semibold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                  <Scissors className="w-3.5 h-3.5 text-[#CE4326]" />
                  Custom Made-To-Order
                </span>
                <h3 className="text-xl font-bold text-stone-900">
                  Soft Hook Bespoke Studio
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-200/50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Every custom order is individually hooked by our master artisans. Choose your silhouette, yarn fibers, and palette to begin your bespoke heirloom piece.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Crochet Silhouette
                </label>
                <select
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-stone-800 text-stone-800"
                >
                  <option>Bespoke Granny Square Cardigan</option>
                  <option>Custom Coastal Waffle Carryall</option>
                  <option>Heirloom Chunky Sunset Throw</option>
                  <option>Scalloped Raffia Sun Bucket Hat</option>
                  <option>Amigurumi Character / Companion</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Fiber Type
                  </label>
                  <select
                    value={yarnType}
                    onChange={(e) => setYarnType(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-stone-800 text-stone-800"
                  >
                    <option>100% Organic Pima Cotton</option>
                    <option>French Flax Linen & Cotton</option>
                    <option>Non-Mulesed Extra-Fine Merino</option>
                    <option>Natural Madagascar Raffia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Color Palette Motif
                  </label>
                  <select
                    value={palette}
                    onChange={(e) => setPalette(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-stone-800 text-stone-800"
                  >
                    <option>Retro Sunset (Terracotta, Ochre, Cream)</option>
                    <option>Coastal Sage, Olive & Sand</option>
                    <option>Pacific Ocean Wave & Driftwood</option>
                    <option>Natural Unbleached Monochrome</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Custom Measurements or Design Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Chest 38 inches, cropped 20 inches length, scalloped cuffs..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-stone-800 text-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Your Contact Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@domain.com"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-stone-800 text-stone-800"
                />
              </div>

              {/* Estimate Pill */}
              <div className="p-3 bg-[#F4EFE6] rounded-xl flex items-center justify-between text-xs border border-[#E8DFC8]">
                <div className="flex items-center gap-1.5 text-stone-700">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Est. Labor: <strong>{currentEst.hours} hours</strong> of hand-crochet</span>
                </div>
                <div className="text-right">
                  <span className="text-stone-500 text-[11px] block">Est. Custom Price:</span>
                  <span className="font-bold text-sm text-[#CE4326]">${currentEst.price}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-[#CE4326] text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Submit Custom Commission Request</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-stone-900">
              Commission Proposal Received!
            </h3>

            <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
              Our head artisan lead will review your specifications for <strong>{itemType}</strong> and reply to <strong>{email}</strong> within 24 hours with yarn swatch photos and timeline.
            </p>

            <button
              onClick={handleReset}
              className="mt-2 px-6 py-2 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Back to Collection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
