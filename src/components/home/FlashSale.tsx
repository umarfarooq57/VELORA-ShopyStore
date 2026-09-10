import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { Flame, Clock, ArrowRight } from 'lucide-react';

export const FlashSale: React.FC = () => {
  const { products, navigateTo } = useStore();

  // 14 hours 42 minutes 18 seconds initial countdown
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashSaleProducts = products.filter((p) => p.isFlashSale || (p.originalPrice && p.originalPrice > p.price)).slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-stone-100/70 dark:bg-stone-900/40 border-y border-stone-200/80 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Countdown Timer */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200 dark:border-stone-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
              <span>Limited Atelier Vault Allocation</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
              Flash Archive Release
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
              Curated rare acquisitions available at preferred pricing until timer expires.
            </p>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mr-2">
              <Clock className="w-4 h-4 text-stone-700 dark:text-stone-300" />
              <span>Vault Closes In:</span>
            </div>

            <div className="flex items-center gap-2 font-mono">
              <div className="flex flex-col items-center">
                <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-lg font-bold shadow-md">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-stone-500 mt-1 uppercase font-sans">Hrs</span>
              </div>
              <span className="text-stone-400 font-bold text-lg mb-4">:</span>
              <div className="flex flex-col items-center">
                <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-lg font-bold shadow-md">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-stone-500 mt-1 uppercase font-sans">Min</span>
              </div>
              <span className="text-stone-400 font-bold text-lg mb-4">:</span>
              <div className="flex flex-col items-center">
                <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-rose-600 text-white text-lg font-bold shadow-md">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-stone-500 mt-1 uppercase font-sans">Sec</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashSaleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-semibold uppercase tracking-wider hover:border-stone-900 dark:hover:border-white transition-colors shadow-sm"
          >
            <span>Explore Complete Vault Specials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
