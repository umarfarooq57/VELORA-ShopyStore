import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { Heart, ShoppingBag, Share2, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, addToCart, navigateTo, addToast } = useStore();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToBag = () => {
    wishlistProducts.forEach((p) => {
      addToCart(p, { quantity: 1 });
    });
    addToast({
      type: 'success',
      title: 'Wishlist Transferred',
      message: `All ${wishlistProducts.length} pieces added to your active bag.`,
    });
  };

  const handleShareWishlist = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast({
      type: 'info',
      title: 'Wishlist Curated',
      message: 'Private shareable wishlist link copied to clipboard.',
    });
  };

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A880]">
            Private Curation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mt-1">
            Saved Atelier Wishlist ({wishlistProducts.length} Items)
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Your personal archive of reserved masterpieces and anticipated acquisitions.
          </p>
        </div>

        {wishlistProducts.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleShareWishlist}
              className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Curation</span>
            </button>
            <button
              onClick={handleMoveAllToBag}
              className="px-5 py-2 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold uppercase tracking-wider hover:bg-[#C5A880] transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Move All to Bag</span>
            </button>
          </div>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="py-24 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
            Your Wishlist is Empty
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
            Save items to your personal atelier wishlist as you explore our rare timepieces, footwear, and acoustic monitors.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-3 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold uppercase tracking-wider"
          >
            Explore Masterpieces
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};
