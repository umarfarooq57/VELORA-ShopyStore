import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  ShoppingBag,
  Check,
  Play,
  ArrowLeft,
  Share2,
  Lock,
  Plus,
  HelpCircle,
  ThumbsUp,
  MessageSquare,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    products,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    addToast,
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors.length > 0 ? product.colors[0].name : ''
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.length > 0 ? product.sizes[0] : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews' | 'care'>('details');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  // Review form state
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  // Frequently Bought Together Bundle state
  const bundleProducts = (product.frequentlyBoughtWithIds || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  const [selectedBundleIds, setSelectedBundleIds] = useState<string[]>([
    product.id,
    ...bundleProducts.map((p) => p.id),
  ]);

  const isFavorited = isInWishlist(product.id);

  // Hover zoom handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, {
      quantity,
      color: selectedColor || undefined,
      size: selectedSize || undefined,
    });
  };

  const handleAddBundle = () => {
    selectedBundleIds.forEach((id) => {
      const p = products.find((item) => item.id === id);
      if (p) {
        addToCart(p, { quantity: 1 });
      }
    });
    addToast({
      type: 'success',
      title: 'Bundle Added to Bag',
      message: `${selectedBundleIds.length} paired items added with preferred savings.`,
    });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast({
      type: 'info',
      message: 'Shareable product link copied to clipboard.',
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;
    addToast({
      type: 'success',
      title: 'Review Submitted',
      message: 'Thank you. Your verified appraisal has been recorded.',
    });
    setIsReviewFormOpen(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
  };

  // Bundle pricing
  const rawBundleTotal = [product, ...bundleProducts]
    .filter((p) => selectedBundleIds.includes(p.id))
    .reduce((sum, p) => sum + p.price, 0);
  const bundleDiscount = rawBundleTotal * 0.15; // 15% bundle reduction
  const finalBundleTotal = rawBundleTotal - bundleDiscount;

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb & Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-8">
        <button onClick={() => navigateTo('home')} className="hover:text-stone-900 dark:hover:text-white">
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => navigateTo('shop', { category: product.category })}
          className="hover:text-stone-900 dark:hover:text-white"
        >
          {product.category}
        </button>
        <span>/</span>
        <span className="text-stone-900 dark:text-stone-100 font-medium truncate max-w-xs">
          {product.title}
        </span>
      </nav>

      {/* Main Product Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
        {/* Left Column: Gallery, Zoom & Video (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual Box */}
          <div
            className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200/80 dark:border-stone-800 cursor-crosshair group"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            {isVideoPlaying && product.videoUrl ? (
              <video
                src={product.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.title}
                className={`w-full h-full object-cover object-center transition-transform duration-200 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      }
                    : undefined
                }
              />
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2 pointer-events-none">
              {product.badge && (
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-stone-900/90 text-white dark:bg-white/95 dark:text-stone-900 backdrop-blur-md shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Video preview switch button */}
            {product.videoUrl && (
              <button
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-stone-900/80 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 hover:bg-stone-900 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isVideoPlaying ? 'Show Gallery' : 'Play Atelier Video'}</span>
              </button>
            )}
          </div>

          {/* Thumbnails Row */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveImageIndex(idx);
                  setIsVideoPlaying(false);
                }}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                  activeImageIndex === idx && !isVideoPlaying
                    ? 'border-stone-900 dark:border-white shadow-md'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}

            {product.videoUrl && (
              <button
                onClick={() => setIsVideoPlaying(true)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 flex flex-col items-center justify-center bg-stone-900 text-white transition-all ${
                  isVideoPlaying
                    ? 'border-[#C5A880] shadow-md'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <Play className="w-5 h-5 text-[#C5A880] fill-[#C5A880]" />
                <span className="text-[10px] mt-1 font-semibold">Video</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Pricing, Variants, Actions, Guarantees (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A880]">
                  {product.brand} • {product.category}
                </span>
                <button
                  onClick={handleShare}
                  aria-label="Share product"
                  className="p-1.5 text-stone-400 hover:text-stone-900 dark:hover:text-white"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mt-1">
                {product.title}
              </h1>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{product.subtitle}</p>

              {/* Reviews & Star Summary */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-500 text-amber-500'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                  {product.rating.toFixed(1)} / 5.0
                </span>
                <span className="text-xs text-stone-400">
                  ({product.reviewCount} Verified Client Appraisals)
                </span>
              </div>
            </div>

            {/* Price block */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200/60 dark:border-stone-800 flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base line-through text-stone-400">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Taxes, customs & complimentary White Glove courier included.
                </p>
              </div>

              {product.originalPrice && (
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Color Swatches */}
            {product.colors.length > 0 && (
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 flex justify-between">
                  <span>Selected Finish: {selectedColor}</span>
                </label>
                <div className="flex gap-3 mt-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      title={c.name}
                      className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedColor === c.name
                          ? 'border-stone-900 dark:border-white scale-110 shadow-md'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {selectedColor === c.name && (
                        <Check
                          className={`w-4 h-4 ${
                            ['#FAFAFA', '#F5F5DC', '#F5F5F0', '#E5E0D8', '#D9CAB3'].includes(c.hex)
                              ? 'text-stone-900'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes.length > 1 && (
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                  <span>Size: {selectedSize}</span>
                  <button
                    onClick={() =>
                      addToast({
                        type: 'info',
                        title: 'Sartorial Size Guide',
                        message: 'True to European bespoke sizing. Complimentary exchanges provided.',
                      })
                    }
                    className="text-[#C5A880] underline font-medium cursor-pointer"
                  >
                    Size Reference
                  </button>
                </div>
                <div className="flex flex-wrap gap-2.5 mt-2.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors border ${
                        selectedSize === s
                          ? 'border-stone-900 bg-stone-900 text-white dark:border-white dark:bg-white dark:text-stone-900 shadow-sm'
                          : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Scarcity Status */}
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                {product.stockCount > 5
                  ? `In Stock at Central Atelier (${product.stockCount} available)`
                  : `Vault Scarcity: Only ${product.stockCount} remaining in allocation`}
              </span>
            </div>

            {/* Quantity + Add to Bag + Wishlist Actions */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-3 text-stone-600 dark:text-stone-300 hover:text-stone-900 text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-stone-900 dark:text-stone-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                    className="px-3.5 py-3 text-stone-600 dark:text-stone-300 hover:text-stone-900 text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  id="pdp-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold text-xs uppercase tracking-widest hover:bg-[#C5A880] hover:text-white dark:hover:bg-[#C5A880] dark:hover:text-white transition-all shadow-xl"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Acquire for Atelier Bag</span>
                </button>

                {/* Wishlist Toggle */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Wishlist"
                  className={`p-3.5 rounded-xl border transition-colors ${
                    isFavorited
                      ? 'border-rose-200 bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900'
                      : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-stone-900'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              {/* Instant Checkout Buy Now Button */}
              <button
                onClick={() => {
                  handleAddToCart();
                  navigateTo('checkout');
                }}
                className="w-full py-3 rounded-xl border border-stone-900 dark:border-stone-100 text-stone-900 dark:text-stone-100 hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-stone-900 text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Instant White Glove Checkout
              </button>
            </div>

            {/* Atelier Guarantees strip */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/50">
                <Truck className="w-4 h-4 mx-auto text-[#C5A880]" />
                <p className="text-[10px] font-bold mt-1 text-stone-900 dark:text-stone-100">Global Courier</p>
                <p className="text-[9px] text-stone-400">Complimentary</p>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/50">
                <ShieldCheck className="w-4 h-4 mx-auto text-[#C5A880]" />
                <p className="text-[10px] font-bold mt-1 text-stone-900 dark:text-stone-100">3-Yr Guarantee</p>
                <p className="text-[9px] text-stone-400">Atelier NFC Cert</p>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/50">
                <RotateCcw className="w-4 h-4 mx-auto text-[#C5A880]" />
                <p className="text-[10px] font-bold mt-1 text-stone-900 dark:text-stone-100">30-Day Return</p>
                <p className="text-[9px] text-stone-400">Prepaid Courier</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together Bundle Module */}
      {bundleProducts.length > 0 && (
        <section className="mt-16 p-6 sm:p-8 rounded-3xl bg-stone-100/80 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A880]">
                Curated Harmony
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                Frequently Acquired Together
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
              Preferred Bundle Savings: 15% Off
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Visual Products Row */}
            <div className="flex flex-wrap items-center gap-3">
              {[product, ...bundleProducts.filter((p) => p.id !== product.id)].map((item, idx) => {
                const isChecked = selectedBundleIds.includes(item.id);
                return (
                  <React.Fragment key={item.id}>
                    <div
                      onClick={() =>
                        setSelectedBundleIds((prev) =>
                          prev.includes(item.id)
                            ? prev.filter((id) => id !== item.id)
                            : [...prev, item.id]
                        )
                      }
                      className={`cursor-pointer p-3 rounded-2xl bg-white dark:bg-stone-800 border transition-all ${
                        isChecked
                          ? 'border-stone-900 dark:border-white shadow-md'
                          : 'border-stone-200 dark:border-stone-700 opacity-60'
                      } flex items-center gap-3`}
                    >
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="text-left">
                        <p className="text-xs font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-xs font-mono font-semibold text-stone-600 dark:text-stone-300">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                    {idx < bundleProducts.length && (
                      <span className="text-stone-400 font-bold text-lg">+</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Bundle Total & CTA */}
            <div className="lg:border-l lg:border-stone-300 dark:lg:border-stone-700 lg:pl-6 text-center lg:text-left space-y-2">
              <div className="flex items-baseline gap-2 justify-center lg:justify-start">
                <span className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                  {formatPrice(finalBundleTotal)}
                </span>
                <span className="text-sm line-through text-stone-400">
                  {formatPrice(rawBundleTotal)}
                </span>
              </div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                You save {formatPrice(bundleDiscount)} on this set.
              </p>
              <button
                onClick={handleAddBundle}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors shadow-md"
              >
                Add Complete Set to Bag
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Tabs: Specifications, Description, Reviews */}
      <section className="mt-16">
        <div className="flex border-b border-stone-200 dark:border-stone-800 gap-8">
          {(['details', 'specs', 'reviews', 'care'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-stone-900 text-stone-900 dark:border-white dark:text-white'
                  : 'text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {tab === 'details' && 'Atelier Description'}
              {tab === 'specs' && 'Full Specifications'}
              {tab === 'reviews' && `Client Reviews (${product.reviewCount})`}
              {tab === 'care' && 'Provenance & Care'}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === 'details' && (
            <div className="space-y-6 max-w-3xl">
              <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-light">
                {product.description}
              </p>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-3">
                  Signature Architectural Features
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-3xl space-y-6">
              {product.specifications.map((group, idx) => (
                <div key={idx} className="rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
                  <div className="bg-stone-50 dark:bg-stone-800/80 px-4 py-2.5 border-b border-stone-200 dark:border-stone-800 text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                    {group.group}
                  </div>
                  <div className="divide-y divide-stone-100 dark:divide-stone-800/60">
                    {group.items.map((item, i) => (
                      <div key={i} className="px-4 py-2.5 flex items-center justify-between text-xs">
                        <span className="text-stone-500">{item.label}</span>
                        <span className="font-semibold text-stone-900 dark:text-stone-100 text-right">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8 max-w-4xl">
              {/* Header with write review button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-800">
                <div>
                  <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                    Client Appraisals & Feedback
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Average {product.rating.toFixed(1)} out of 5 stars based on verified acquisitions.
                  </p>
                </div>
                <button
                  onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-xs font-semibold uppercase tracking-wider"
                >
                  {isReviewFormOpen ? 'Cancel Appraisal' : 'Write Client Review'}
                </button>
              </div>

              {/* Review submission form */}
              {isReviewFormOpen && (
                <form
                  onSubmit={handleReviewSubmit}
                  className="p-6 rounded-2xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 space-y-4 animate-in fade-in duration-200"
                >
                  <h5 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                    Submit Your Verification & Review
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-stone-500 block mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        placeholder="e.g. Lord Harrington"
                        className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-stone-500 block mb-1">Star Rating</label>
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                      >
                        <option value="5">★★★★★ (5 Stars - Flawless Craft)</option>
                        <option value="4">★★★★☆ (4 Stars - Exceptional)</option>
                        <option value="3">★★★☆☆ (3 Stars - Average)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-stone-500 block mb-1">Headline</label>
                    <input
                      type="text"
                      value={newReviewTitle}
                      onChange={(e) => setNewReviewTitle(e.target.value)}
                      placeholder="e.g. Surpassed all acoustic expectations"
                      className="w-full text-xs px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-stone-500 block mb-1">Detailed Appraisal</label>
                    <textarea
                      rows={3}
                      required
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="Describe the tactile sensation, acoustic response, or tailoring precision..."
                      className="w-full text-xs p-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold uppercase tracking-wider"
                  >
                    Publish Verified Appraisal
                  </button>
                </form>
              )}

              {/* Existing Reviews List */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                        Jean-Luc Moreau
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        Verified Acquisition
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-400">4 days ago</span>
                  </div>
                  <h6 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    Masterwork of modern industrial design
                  </h6>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    The acoustic balance and precision machining are immaculate. The packaging alone felt like an unboxing ceremony at a private Zurich atelier.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="max-w-3xl space-y-4 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              <p>
                Each Velora curation is accompanied by a cryptographic NFC authenticity badge sewn or engraved directly into the piece. To verify provenance, tap your smartphone against the atelier medallion.
              </p>
              <p>
                We recommend storing luxury leather in breathable cotton bags at 45-60% relative humidity. Acoustic monitors should be kept away from direct intense sunlight to protect diaphragm tension.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Related Products Carousel */}
      <section className="mt-20 pt-12 border-t border-stone-200 dark:border-stone-800">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A880]">
              Complementary Masterpieces
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mt-1">
              Related Pieces from {product.category}
            </h3>
          </div>
          <button
            onClick={() => navigateTo('shop', { category: product.category })}
            className="text-xs font-semibold text-stone-900 dark:text-stone-100 hover:text-[#C5A880]"
          >
            Explore Department →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
        </div>
      </section>
    </div>
  );
};
