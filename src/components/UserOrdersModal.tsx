import React from 'react';
import { X, Package, Clock, Sparkles, CheckCircle2, ShoppingBag, ExternalLink } from 'lucide-react';
import { FirestoreOrder, FirestoreCommission } from '../firebase/services';
import { useAuth } from '../context/AuthContext';

interface UserOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: FirestoreOrder[];
  commissions: FirestoreCommission[];
  onOpenCommission: () => void;
}

export const UserOrdersModal: React.FC<UserOrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
  commissions,
  onOpenCommission,
}) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = React.useState<'orders' | 'commissions'>('orders');

  if (!isOpen) return null;

  return (
    <div
      id="user-orders-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="user-orders-modal"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FDFBF7] rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200/80 animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-amber-900 uppercase tracking-wider">
                Firebase Cloud Sync
              </span>
              {user && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    user.provider === 'instagram'
                      ? 'bg-pink-100 text-pink-800 border border-pink-200'
                      : 'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}
                >
                  {user.provider === 'instagram' ? 'Instagram' : 'Google'}
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-stone-900 mt-0.5">My Studio Dashboard</h3>
            {user && (
              <p className="text-xs text-stone-500 mt-0.5">
                Logged in as <span className="font-semibold text-stone-700">{user.displayName}</span> ({user.instagramHandle || user.email})
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-200/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-100/50 px-6 pt-3 gap-4">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('commissions')}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'commissions'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Custom Commissions ({commissions.length})</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'orders' ? (
            orders.length === 0 ? (
              <div className="text-center py-12 px-4">
                <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                <h4 className="text-sm font-semibold text-stone-800">No orders placed yet</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1 leading-relaxed">
                  When you checkout, your orders are saved in real-time to your Firestore account.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((ord) => (
                  <div
                    key={ord.orderId}
                    className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs space-y-2.5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-stone-900">
                            #{ord.orderId}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {ord.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-400 mt-0.5">
                          Placed {new Date(ord.createdAt).toLocaleDateString()} at{' '}
                          {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>

                      <span className="text-sm font-bold text-stone-900">
                        ${ord.totalAmount.toFixed(2)}
                      </span>
                    </div>

                    <div className="text-xs text-stone-600 bg-[#FDFBF7] p-2.5 rounded-lg flex items-center justify-between">
                      <span>Recipient: {ord.customerName}</span>
                      <span className="text-stone-400">
                        {ord.shippingCity}, {ord.shippingState}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : commissions.length === 0 ? (
            <div className="text-center py-12 px-4">
              <Sparkles className="w-10 h-10 text-stone-300 mx-auto mb-3" />
              <h4 className="text-sm font-semibold text-stone-800">No custom commissions yet</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1 leading-relaxed">
                Have a bespoke crochet idea? Request a custom commission with chosen fibers and palette.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenCommission();
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Request Custom Piece
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {commissions.map((comm) => (
                <div
                  key={comm.commissionId}
                  className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs space-y-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">{comm.itemType}</h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Yarn: {comm.yarnType} • Palette: {comm.palette}
                      </p>
                    </div>

                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                      {comm.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  {comm.notes && (
                    <p className="text-xs text-stone-600 bg-[#FDFBF7] p-2.5 rounded-lg italic">
                      "{comm.notes}"
                    </p>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                    <span>Est: {comm.estimatedHours} Craft Hours</span>
                    <span className="font-semibold text-stone-800">
                      Quote: ~${comm.estimatedPrice}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
