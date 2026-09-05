import React, { useState } from 'react';
import { Search, ShoppingBag, User as UserIcon, LogOut, Package, Sparkles, RefreshCw } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ProductCategory } from '../types';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenOrders: () => void;
  orderCount?: number;
  isTransparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenOrders,
  orderCount = 0,
  isTransparent = false,
}) => {
  const { user, openAuthModal, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
        {/* Left Nav: Weaved Clothing, Bags, Purses, Toys */}
        <nav className="flex items-center gap-4 sm:gap-6 md:gap-8 flex-1">
          <button
            id="nav-clothing-btn"
            onClick={() => onSelectCategory('clothing')}
            className={`text-xs md:text-sm font-medium transition-colors hover:text-stone-900 cursor-pointer ${
              activeCategory === 'clothing'
                ? 'text-stone-950 font-bold underline underline-offset-4 decoration-[#708A74]'
                : 'text-stone-600'
            }`}
          >
            Weaved Clothing
          </button>
          <button
            id="nav-bags-btn"
            onClick={() => onSelectCategory('bags')}
            className={`text-xs md:text-sm font-medium transition-colors hover:text-stone-900 cursor-pointer ${
              activeCategory === 'bags'
                ? 'text-stone-950 font-bold underline underline-offset-4 decoration-[#708A74]'
                : 'text-stone-600'
            }`}
          >
            Bags
          </button>
          <button
            id="nav-purses-btn"
            onClick={() => onSelectCategory('purses')}
            className={`text-xs md:text-sm font-medium transition-colors hover:text-stone-900 cursor-pointer ${
              activeCategory === 'purses'
                ? 'text-stone-950 font-bold underline underline-offset-4 decoration-[#708A74]'
                : 'text-stone-600'
            }`}
          >
            Purses
          </button>
          <button
            id="nav-toys-btn"
            onClick={() => onSelectCategory('toys')}
            className={`text-xs md:text-sm font-medium transition-colors hover:text-stone-900 cursor-pointer ${
              activeCategory === 'toys'
                ? 'text-stone-950 font-bold underline underline-offset-4 decoration-[#708A74]'
                : 'text-stone-600'
            }`}
          >
            Toys
          </button>
        </nav>

        {/* Center: Brand Logo */}
        <div className="flex-shrink-0 text-center px-4">
          <BrandLogo onClick={() => onSelectCategory('all')} />
        </div>

        {/* Right Actions: Search, Auth & Shopping Bag */}
        <div className="flex items-center justify-end gap-3 sm:gap-4 md:gap-5 flex-1 relative">
          <button
            id="header-search-btn"
            onClick={onOpenSearch}
            aria-label="Search crochet products"
            className="p-1.5 text-stone-700 hover:text-stone-950 transition-colors rounded-full hover:bg-stone-200/40 cursor-pointer"
          >
            <Search className="w-[18px] h-[18px] md:w-5 md:h-5 stroke-[1.8]" />
          </button>

          {/* User Auth Controls */}
          {user ? (
            <div className="relative">
              <button
                id="header-user-menu-btn"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1.5 p-1 rounded-full hover:bg-stone-200/40 transition-colors cursor-pointer group"
              >
                <div className="relative">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className={`w-7 h-7 rounded-full object-cover ${
                        user.provider === 'instagram'
                          ? 'ring-2 ring-pink-500 ring-offset-1'
                          : 'border border-stone-300'
                      }`}
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#1E1B18] text-white flex items-center justify-center text-xs font-semibold">
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}

                  {/* Small provider dot indicator */}
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-white ${
                      user.provider === 'instagram' ? 'bg-pink-500' : 'bg-blue-500'
                    }`}
                    title={user.provider === 'instagram' ? 'Signed in via Instagram' : 'Signed in via Google'}
                  />
                </div>

                {orderCount > 0 && (
                  <span className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {orderCount}
                  </span>
                )}
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div
                    id="user-dropdown-menu"
                    className="absolute right-0 mt-2 w-60 rounded-2xl bg-white shadow-xl border border-stone-200/80 p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="px-3 py-2 border-b border-stone-100">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-stone-900 truncate">
                          {user.displayName || 'Artisan Collector'}
                        </p>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            user.provider === 'instagram'
                              ? 'bg-pink-50 text-pink-700 border border-pink-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {user.provider === 'instagram' ? 'Instagram' : 'Google'}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 truncate mt-0.5">
                        {user.instagramHandle || user.email}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenOrders();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 rounded-xl flex items-center justify-between transition-colors cursor-pointer mt-1"
                    >
                      <span className="flex items-center gap-2">
                        <Package className="w-3.5 h-3.5 text-stone-500" />
                        <span>My Studio Orders</span>
                      </span>
                      {orderCount > 0 && (
                        <span className="text-[10px] bg-stone-100 px-1.5 py-0.5 rounded-full font-bold text-stone-700">
                          {orderCount}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        openAuthModal('Switch your login provider or connect an account');
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
                      <span>Switch Account</span>
                    </button>

                    <div className="border-t border-stone-100 my-1" />

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-50 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              id="header-login-btn"
              onClick={() => openAuthModal('Sign in to save your wishlist and track your hand-hooked orders')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors border border-stone-200 cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5 text-stone-600" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          {/* Cart Trigger */}
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

