import React, { useState } from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const {
    formatPrice,
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openQuickView,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors.length > 0 ? product.colors[0].name : ''
  );
  const isFavorited = isInWishlist(product.id);

  const handleCardClick = () => {
    navigateTo('product-detail', { productId: product.id });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, {
      quantity: 1,
      color: selectedColor || undefined,
      size: product.sizes.length > 0 ? product.sizes[0] : undefined,
    });
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  if (viewMode === 'list') {
    return (
      <div
        id={`product-card-${product.id}`}
        onClick={handleCardClick}
        className="group cursor-pointer rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 p-4 sm:p-5 flex flex-col sm:flex-row gap-6 hover:shadow-xl hover:border-stone-400 dark:hover:border-stone-600 transition-all duration-300"
      >
        {/* Thumbnail */}
        <div className="relative sm:w-56 aspect-square sm:aspect-auto rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0">
          <img
            src={product.images[activeImageIndex] || product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-stone-900/90 text-white dark:bg-white dark:text-stone-900">
              {product.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C5A880]">
                {product.brand} • {product.category}
              </span>
              <button
                onClick={handleWishlistClick}
                aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`p-2 rounded-full transition-colors ${
                  isFavorited
                    ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/50'
                    : 'text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            <h3 className="mt-1 font-serif text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#C5A880] transition-colors">
              {product.title}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-1">
              {product.shortDescription}
            </p>

            <div className="mt-2 flex items-center gap-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating) ? 'fill-amber-500 text-amber-500' : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-xs text-stone-400">({product.reviewCount})</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-stone-900 dark:text-stone-100">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs line-through text-stone-400">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleQuickViewClick}
                className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 text-xs font-semibold"
              >
                Quick View
              </button>
              <button
                onClick={handleQuickAdd}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Mode (Default)
  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      className="group cursor-pointer rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-stone-400 dark:hover:border-stone-600 transition-all duration-300"
    >
      {/* Media Box */}
      <div className="relative aspect-[4/5] bg-stone-100 dark:bg-stone-800 overflow-hidden">
        <img
          src={product.images[activeImageIndex] || product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {product.badge ? (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-stone-900/90 text-white dark:bg-white/95 dark:text-stone-900 backdrop-blur-sm shadow-sm">
              {product.badge}
            </span>
          ) : product.discountPercentage ? (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-rose-600 text-white">
              -{product.discountPercentage}%
            </span>
          ) : (
            <span />
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all ${
              isFavorited
                ? 'bg-rose-50 text-rose-600 dark:bg-stone-900'
                : 'bg-white/80 text-stone-600 hover:text-stone-950 dark:bg-stone-900/80 dark:text-stone-300'
            } shadow-sm`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
          </button>
        </div>

        {/* Hover Action Bar */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickViewClick}
            className="flex-1 py-2 rounded-xl bg-white/95 dark:bg-stone-900/95 text-stone-900 dark:text-stone-100 text-xs font-semibold shadow-lg backdrop-blur-md hover:bg-white transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            onClick={handleQuickAdd}
            aria-label="Add to bag"
            className="p-2 rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-lg hover:bg-stone-800 transition-colors flex items-center justify-center"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold uppercase tracking-wider text-[#C5A880]">
              {product.brand}
            </span>
            <span className="text-stone-400">{product.category}</span>
          </div>

          <h3 className="mt-1 font-serif text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#C5A880] transition-colors line-clamp-1">
            {product.title}
          </h3>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>

          {/* Color Swatches */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 mt-2.5" onClick={(e) => e.stopPropagation()}>
              {product.colors.slice(0, 4).map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  title={c.name}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColor === c.name
                      ? 'ring-1 ring-stone-900 dark:ring-white scale-110'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-stone-400">+{product.colors.length - 4}</span>
              )}
            </div>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs line-through text-stone-400">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            <span className="font-semibold text-stone-700 dark:text-stone-300">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
