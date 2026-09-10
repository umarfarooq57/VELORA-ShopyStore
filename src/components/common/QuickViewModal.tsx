import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Star, Check, ShoppingBag, Eye, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, formatPrice, navigateTo } = useStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const activeColor = selectedColor || (product.colors.length > 0 ? product.colors[0].name : '');
  const activeSize = selectedSize || (product.sizes.length > 0 ? product.sizes[0] : '');

  const handleAddToCart = () => {
    addToCart(product, {
      quantity,
      color: activeColor,
      size: activeSize,
    });
    closeQuickView();
  };

  const handleViewFullDetails = () => {
    closeQuickView();
    navigateTo('product-detail', { productId: product.id });
  };

  return (
    <div
      id="quick-view-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeQuickView}
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${product.title}`}
    >
      <div
        id="quick-view-modal-content"
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeQuickView}
          aria-label="Close quick view"
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gallery Column */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200/60 dark:border-stone-700/60">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-md bg-stone-900/90 text-white dark:bg-white/90 dark:text-stone-900 backdrop-blur-sm">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-stone-900 dark:border-white shadow-sm'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#C5A880]">
                <span>{product.brand}</span>
                <span>•</span>
                <span>{product.category}</span>
              </div>

              <h2 className="mt-1 font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                {product.title}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{product.subtitle}</p>

              {/* Ratings */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-amber-500 text-amber-500' : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-stone-400">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm line-through text-stone-400">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              <p className="mt-4 text-xs leading-relaxed text-stone-600 dark:text-stone-300">
                {product.shortDescription}
              </p>

              {/* Color Selector */}
              {product.colors.length > 0 && (
                <div className="mt-5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 flex justify-between">
                    <span>Variant: {activeColor}</span>
                  </label>
                  <div className="flex gap-2.5 mt-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        title={c.name}
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                          activeColor === c.name
                            ? 'border-stone-900 dark:border-white scale-110'
                            : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {activeColor === c.name && (
                          <Check
                            className={`w-3.5 h-3.5 ${
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
                <div className="mt-4">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                    Size: {activeSize}
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                          activeSize === s
                            ? 'border-stone-900 bg-stone-900 text-white dark:border-white dark:bg-white dark:text-stone-900'
                            : 'border-stone-200 dark:border-stone-700 hover:border-stone-400 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Status */}
              <div className="mt-4 flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-medium text-emerald-700 dark:text-emerald-400">
                  {product.stockCount > 5 ? 'In Stock (Atelier Ready)' : `Only ${product.stockCount} remaining`}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-stone-600 dark:text-stone-300 hover:text-stone-900"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-stone-900 dark:text-stone-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                    className="px-3 py-2 text-stone-600 dark:text-stone-300 hover:text-stone-900"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold text-xs uppercase tracking-wider hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Atelier Bag
                </button>
              </div>

              <button
                onClick={handleViewFullDetails}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
              >
                <span>View Complete Specifications & Reviews</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
