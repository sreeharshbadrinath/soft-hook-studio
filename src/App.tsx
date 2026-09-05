import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { FramedMockupContainer } from './components/FramedMockupContainer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { EditorialShowcaseSection } from './components/EditorialShowcaseSection';
import { ProductCard } from './components/ProductCard';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { CustomCommissionModal } from './components/CustomCommissionModal';
import { UserOrdersModal } from './components/UserOrdersModal';
import { AuthModal } from './components/AuthModal';
import { LoginView } from './components/LoginView';
import { ArtisanStorySection } from './components/ArtisanStorySection';
import { LookbookSection } from './components/LookbookSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, ProductCategory, CartItem, ProductColor } from './types';
import { Filter, SlidersHorizontal, Scissors, Sparkles } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import {
  subscribeUserOrders,
  subscribeUserFavorites,
  subscribeUserCommissions,
  toggleFavoriteInFirestore,
  FirestoreOrder,
  FirestoreCommission,
} from './firebase/services';

export default function App() {
  const { user, loading, isGuestMode, openAuthModal } = useAuth();

  // Category & Filter State
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc' | 'craft-hours'>('featured');

  // Modal States
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCommissionOpen, setIsCommissionOpen] = useState<boolean>(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState<boolean>(false);

  // Firebase Real-Time State
  const [userOrders, setUserOrders] = useState<FirestoreOrder[]>([]);
  const [userCommissions, setUserCommissions] = useState<FirestoreCommission[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    if (!user) {
      setUserOrders([]);
      setUserCommissions([]);
      setFavoriteIds([]);
      return;
    }

    const unsubOrders = subscribeUserOrders(user.uid, (orders) => {
      setUserOrders(orders);
    });

    const unsubComms = subscribeUserCommissions(user.uid, (comms) => {
      setUserCommissions(comms);
    });

    const unsubFavs = subscribeUserFavorites(user.uid, (favs) => {
      setFavoriteIds(favs);
    });

    return () => {
      unsubOrders();
      unsubComms();
      unsubFavs();
    };
  }, [user]);

  const handleToggleFavorite = async (product: Product) => {
    if (!user) {
      openAuthModal('Sign in with Google or Instagram to save pieces to your wishlist');
      return;
    }

    const isCurrentlyFav = favoriteIds.includes(product.id);
    await toggleFavoriteInFirestore(user.uid, product, isCurrentlyFav);
  };

  // Cart State (Initialized with 1 warm heirloom item for immediate interaction)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // The Solstice Striped Halter Top
      quantity: 1,
      selectedColor: PRODUCTS[0].colors[0],
    },
  ]);
  const [discountCode, setDiscountCode] = useState<string>('SOFTHOOK15');
  const [discountPercent, setDiscountPercent] = useState<number>(15);

  const catalogRef = useRef<HTMLDivElement>(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filtered & Sorted Products
  const displayedProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Category filter
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category.includes(activeCategory));
    }

    // Sorting
    if (sortOption === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'craft-hours') {
      list.sort((a, b) => b.craftHours - a.craftHours);
    } else {
      // featured
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [activeCategory, sortOption]);

  // Cart Management
  const handleAddToCart = (product: Product, color: ProductColor, size?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.name === color.name &&
          item.selectedSize === size
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      } else {
        return [...prev, { product, quantity: 1, selectedColor: color, selectedSize: size }];
      }
    });
  };

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const next = [...prev];
      next[index].quantity = newQuantity;
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleApplyDiscount = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'SOFTHOOK15') {
      setDiscountCode('SOFTHOOK15');
      setDiscountPercent(15);
    } else if (formatted === 'SLOWFASHION') {
      setDiscountCode('SLOWFASHION');
      setDiscountPercent(20);
    } else {
      // Small 10% welcome coupon
      setDiscountCode(formatted);
      setDiscountPercent(10);
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal >= 85 || subtotal === 0 ? 0 : 9.5;
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping);

  // Initial Auth Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e1117] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 bg-[#FEE047] rounded-full flex items-center justify-center shadow-lg animate-pulse mb-3">
          <svg className="w-6 h-6 text-[#1A1A1A]" viewBox="0 0 32 32" fill="currentColor">
            <path d="M10 8h12l-1.5 3H11.5L10 8z" />
            <path d="M7 13h18l-1.8 3.5H8.8L7 13z" />
            <path d="M9 18.5h14l-1.6 3.5H10.6L9 18.5z" />
          </svg>
        </div>
        <p className="text-xs text-stone-400 font-medium tracking-wider">
          Loading Soft Hook Studio...
        </p>
      </div>
    );
  }

  // When unauthenticated user enters the website, show Login / Sign Up Page directly in full screen
  if (!user && !isGuestMode) {
    return <LoginView fullScreen={true} showCloseButton={false} />;
  }

  return (
    <FramedMockupContainer>
      {/* Top Subtle Announcement Bar */}
      <div className="bg-[#131614] text-stone-200 py-1.5 px-4 text-center text-[11px] font-medium tracking-wide flex items-center justify-center gap-2 select-none border-b border-white/5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#708A74]" />
        <span>Summer in Stitches: Free shipping on artisanal orders over $85</span>
        <span className="hidden md:inline">• Crochets, Weaved Clothing, Bags, Toys & Purses</span>
      </div>

      {/* Primary Sticky Header (Only one search & auth control on the entire page) */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        orderCount={userOrders.length}
      />

      {/* Hero Section with Signature Sage Green, Giant Condensed SOFT HOOK & Handcrafted Model */}
      <HeroSection
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
      />

      {/* Editorial Visual Showcase Blocks (Clothing, Bags, Purses & Toys) */}
      <EditorialShowcaseSection
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
        onScrollToCatalog={scrollToCatalog}
      />

      {/* Catalog & Shop Section */}
      <main ref={catalogRef} id="catalog-section" className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Category Pill Filters & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          {/* Category Chips: Weaved Clothing, Bags, Purses, Toys */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Pieces' },
              { id: 'clothing', label: 'Weaved Clothing' },
              { id: 'bags', label: 'Crochet Bags' },
              { id: 'purses', label: 'Handmade Purses' },
              { id: 'toys', label: 'Amigurumi Toys' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as ProductCategory)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-200/70 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort & Bespoke Commission Trigger */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="flex items-center gap-1.5 text-xs text-stone-600 bg-white px-3.5 py-2 rounded-full border border-stone-200 shadow-2xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
              <span className="font-medium text-stone-500">Sort:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="bg-transparent text-stone-800 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Pieces</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="craft-hours">Craft Hours (Labor of Love)</option>
              </select>
            </div>

            <button
              onClick={() => setIsCommissionOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EAE3D9] hover:bg-[#DDD3C5] text-stone-900 text-xs font-semibold border border-stone-300 transition-colors cursor-pointer"
            >
              <Scissors className="w-3.5 h-3.5 text-[#708A74]" />
              <span>Custom Commission</span>
            </button>
          </div>
        </div>

        {/* Section Heading with Count */}
        <div className="flex items-baseline justify-between pt-8 pb-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight">
              {activeCategory === 'all'
                ? 'THE CROCHET & WEAVED COLLECTION'
                : activeCategory === 'clothing'
                ? 'WEAVED CLOTHINGS & CROCHET'
                : activeCategory === 'bags'
                ? 'HANDCRAFTED CROCHET BAGS'
                : activeCategory === 'purses'
                ? 'ARTISANAL CROCHET PURSES'
                : activeCategory === 'toys'
                ? 'AMIGURUMI CROCHET TOYS'
                : `${activeCategory} Crochets`}
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Showing {displayedProducts.length} human-hooked slow fashion creations
            </p>
          </div>

          <span className="text-xs font-semibold uppercase tracking-widest text-[#708A74] hidden sm:inline">
            100% slow fashion
          </span>
        </div>

        {/* Product Cards Grid with Subtle Fade-In & Slide-Up Entrance Animation */}
        <motion.div
          key={`${activeCategory}-${sortOption}`}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.045,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {displayedProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              className="h-full flex flex-col"
            >
              <ProductCard
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
                onAddToCart={(p, color) => {
                  handleAddToCart(p, color);
                  setIsCartOpen(true);
                }}
                isFavorite={favoriteIds.includes(product.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Editorial Lookbook Section */}
      <LookbookSection
        products={PRODUCTS}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* The Soft Hook Truth & Sustainability Section */}
      <ArtisanStorySection
        onOpenCommission={() => setIsCommissionOpen(true)}
      />

      {/* Reviews & Community */}
      <ReviewsSection />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
        onOpenCommission={() => setIsCommissionOpen(true)}
      />

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, color, size) => {
          handleAddToCart(p, color, size);
          setIsCartOpen(true);
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        discountCode={discountCode}
        onApplyDiscount={handleApplyDiscount}
        discountPercent={discountPercent}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        total={finalTotal}
        onCompleteOrder={() => {
          setCartItems([]);
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Custom Commission Modal */}
      <CustomCommissionModal
        isOpen={isCommissionOpen}
        onClose={() => setIsCommissionOpen(false)}
      />

      {/* User Orders & Studio Modal */}
      <UserOrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={userOrders}
        commissions={userCommissions}
        onOpenCommission={() => {
          setIsOrdersOpen(false);
          setIsCommissionOpen(true);
        }}
      />

      {/* Authentication Modal (Google & Instagram) */}
      <AuthModal />
    </FramedMockupContainer>
  );
}
