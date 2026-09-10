import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Trash2,
  Bookmark,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  ShoppingBag,
  RotateCcw,
  CheckCircle2,
  X,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    saveItemForLater,
    savedForLater,
    moveSavedToCart,
    removeSavedItem,
    cartSubtotal,
    freeShippingThreshold,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    formatPrice,
    navigateTo,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const shippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);
  const shippingPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const estimatedTax = (cartSubtotal - discountAmount) * 0.08;
  const shippingFee = cartSubtotal >= freeShippingThreshold || cart.length === 0 ? 0 : 25;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + estimatedTax + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="pb-6 border-b border-stone-200 dark:border-stone-800">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A880]">
          Order Bag
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mt-1">
          Your Atelier Selection ({cart.reduce((sum, i) => sum + i.quantity, 0)} Pieces)
        </h1>
      </div>

      {cart.length === 0 && savedForLater.length === 0 ? (
        /* Empty Cart State */
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
            Your Bag is Empty
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
            Discover our curated Swiss timepieces, Belgian linen tailoring, and acoustic monitors.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-3.5 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold uppercase tracking-widest hover:bg-[#C5A880] transition-colors"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Cart Items & Saved For Later (7 or 8 Cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* Free Shipping Progress Indicator */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-stone-800 dark:text-stone-200">
                  <Truck className="w-4 h-4 text-[#C5A880]" />
                  {shippingRemaining === 0
                    ? 'Complimentary White Glove Courier Unlocked'
                    : `Add ${formatPrice(shippingRemaining)} more for Complimentary White Glove Courier`}
                </span>
                <span className="font-mono text-stone-500">{Math.round(shippingPercent)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-stone-900 dark:bg-[#C5A880] transition-all duration-500"
                  style={{ width: `${shippingPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-stone-200 dark:divide-stone-800">
              {cart.map((item) => (
                <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-5 items-start">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between h-full w-full">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
                          {item.title}
                        </h3>
                        <span className="text-base font-mono font-bold text-stone-900 dark:text-stone-100 ml-4">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>

                      {/* Variant Specs */}
                      {(item.selectedColor || item.selectedSize) && (
                        <p className="text-xs text-stone-500 mt-1">
                          {[item.selectedColor, item.selectedSize].filter(Boolean).join(' • ')}
                        </p>
                      )}
                      <p className="text-xs text-stone-400 mt-0.5">
                        {formatPrice(item.price)} each
                      </p>
                    </div>

                    {/* Quantity Stepper & Actions */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 font-bold"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-stone-900 dark:text-stone-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-4 text-xs">
                        <button
                          onClick={() => saveItemForLater(item.id)}
                          className="flex items-center gap-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                          <span>Save for Later</span>
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-1 text-rose-600 hover:text-rose-700 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Saved For Later Section */}
            {savedForLater.length > 0 && (
              <div className="pt-8 border-t border-stone-200 dark:border-stone-800">
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[#C5A880]" />
                  <span>Saved for Later ({savedForLater.length})</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedForLater.map((saved) => (
                    <div
                      key={saved.id}
                      className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex gap-4 items-center"
                    >
                      <img
                        src={saved.image}
                        alt=""
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                          {saved.title}
                        </h4>
                        <p className="text-xs font-mono font-semibold text-stone-600 dark:text-stone-300 mt-0.5">
                          {formatPrice(saved.price)}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-[11px]">
                          <button
                            onClick={() => moveSavedToCart(saved.id)}
                            className="font-semibold text-stone-900 dark:text-stone-100 hover:underline"
                          >
                            Move to Bag
                          </button>
                          <button
                            onClick={() => removeSavedItem(saved.id)}
                            className="text-stone-400 hover:text-rose-600"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary & Coupon (5 or 4 Cols) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
              <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 pb-3 border-b border-stone-100 dark:border-stone-800">
                Order Summary
              </h2>

              {/* Coupon Form */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 block mb-2">
                  Promotional Voucher Code
                </label>
                {appliedCoupon ? (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-200">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="font-bold">{appliedCoupon.code}</span>
                        <span className="text-[11px] block text-emerald-600 dark:text-emerald-400">
                          {appliedCoupon.description}
                        </span>
                      </div>
                    </div>
                    <button onClick={removeCoupon} className="text-stone-400 hover:text-rose-600 p-1">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="e.g. VELORA20"
                      className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 uppercase text-stone-900 dark:text-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-xs font-bold uppercase tracking-wider"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>}
                <p className="text-[11px] text-stone-400 mt-1.5">
                  Try voucher <strong className="text-stone-700 dark:text-stone-300">VELORA20</strong> (20% off $200+) or <strong className="text-stone-700 dark:text-stone-300">WELCOME15</strong>
                </p>
              </div>

              {/* Price Calculations */}
              <div className="space-y-3 text-xs pt-2 border-t border-stone-100 dark:border-stone-800">
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>Bag Subtotal</span>
                  <span className="font-mono text-stone-900 dark:text-stone-100">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Voucher Discount ({appliedCoupon.code})</span>
                    <span className="font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>White Glove Express Courier</span>
                  <span className="font-mono text-stone-900 dark:text-stone-100">
                    {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                  </span>
                </div>

                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>Estimated Duty & State Tax</span>
                  <span className="font-mono text-stone-900 dark:text-stone-100">
                    {formatPrice(estimatedTax)}
                  </span>
                </div>

                <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex justify-between items-baseline text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
                  <span>Grand Total</span>
                  <span className="text-xl font-mono">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                id="cart-proceed-checkout-btn"
                onClick={() => navigateTo('checkout')}
                className="w-full py-4 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold text-xs uppercase tracking-widest hover:bg-[#C5A880] hover:text-white dark:hover:bg-[#C5A880] dark:hover:text-white transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Security badges */}
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 space-y-2 text-[11px] text-stone-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  <span>256-Bit SSL End-to-End Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#C5A880]" />
                  <span>30-Day Hassle-Free Courier Return Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
