import React, { useState, useMemo, useRef } from 'react';
import { FramedMockupContainer } from './components/FramedMockupContainer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { CustomCommissionModal } from './components/CustomCommissionModal';
import { ArtisanStorySection } from './components/ArtisanStorySection';
import { LookbookSection } from './components/LookbookSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, ProductCategory, CartItem, ProductColor } from './types';
import { Filter, SlidersHorizontal, Scissors, Sparkles } from 'lucide-react';

export default function App() {
  // Category & Filter State
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc' | 'craft-hours'>('featured');

  // Modal States
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCommissionOpen, setIsCommissionOpen] = useState<boolean>(false);

  // Cart State (Initialized with 1 warm heirloom item for immediate interaction)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[1], // Solstice Coastal Waffle Tote Bag
      quantity: 1,
      selectedColor: PRODUCTS[1].colors[0],
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

  return (
    <FramedMockupContainer>
      {/* Top Subtle Announcement Bar */}
      <div className="bg-[#1E1B18] text-stone-200 py-1.5 px-4 text-center text-[11px] font-medium tracking-wide flex items-center justify-center gap-2 select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#CE4326]" />
        <span>Summer in Stitches: Free shipping on artisanal orders over $85</span>
        <span className="hidden md:inline">• Hand-hooked with 100% organic fibers</span>
      </div>

      {/* Main Header with Exact Layout from Reference Image */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Hero Section with exact handwritten text & 35mm golden hour bicycle photograph */}
      <div className="p-4 sm:p-6 md:p-8">
        <HeroSection
          onExploreClick={scrollToCatalog}
          onOpenLookbook={() => {
            const el = document.getElementById('lookbook-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </div>

      {/* Catalog & Shop Section */}
      <main ref={catalogRef} id="catalog-section" className="py-8 sm:py-12 px-6 sm:px-10 max-w-7xl mx-auto">
        {/* Category Pill Filters & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Crochets' },
              { id: 'hers', label: 'Hers' },
              { id: 'his', label: 'His' },
              { id: 'wearables', label: 'Tops & Cardigans' },
              { id: 'bags', label: 'Totes & Bags' },
              { id: 'home', label: 'Throws & Cushions' },
              { id: 'accessories', label: 'Accessories' },
              { id: 'last-call', label: 'Last Call (Archive)' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as ProductCategory)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-200/60 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort & Bespoke Commission Trigger */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="flex items-center gap-1.5 text-xs text-stone-600 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-2xs">
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
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4ECE1] hover:bg-[#EBDFD0] text-[#91381E] text-xs font-semibold border border-[#DECEBC] transition-colors cursor-pointer"
            >
              <Scissors className="w-3.5 h-3.5 text-[#CE4326]" />
              <span>Custom Commission</span>
            </button>
          </div>
        </div>

        {/* Section Heading with Count */}
        <div className="flex items-baseline justify-between pt-6 pb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 capitalize">
              {activeCategory === 'all'
                ? 'The Handcrafted Collection'
                : activeCategory === 'last-call'
                ? 'Last Call Archive'
                : `${activeCategory} Crochets`}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Showing {displayedProducts.length} human-hooked slow fashion creations
            </p>
          </div>

          <span className="font-handwritten text-xl text-stone-400 hidden sm:inline">
            100% hand-hooked
          </span>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
              onAddToCart={(p, color) => {
                handleAddToCart(p, color);
                setIsCartOpen(true);
              }}
            />
          ))}
        </div>
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
    </FramedMockupContainer>
  );
}
