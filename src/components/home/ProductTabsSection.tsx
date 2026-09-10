import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { Sparkles, Flame, Clock, Award, ArrowRight } from 'lucide-react';

type TabKey = 'featured' | 'trending' | 'new' | 'bestSellers';

export const ProductTabsSection: React.FC = () => {
  const { products, navigateTo } = useStore();
  const [activeTab, setActiveTab] = useState<TabKey>('featured');

  const tabConfigs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'featured', label: 'Featured Atelier', icon: <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" /> },
    { key: 'trending', label: 'Trending Now', icon: <Flame className="w-3.5 h-3.5 text-amber-500" /> },
    { key: 'new', label: 'New Arrivals', icon: <Clock className="w-3.5 h-3.5 text-blue-500" /> },
    { key: 'bestSellers', label: 'Best Sellers', icon: <Award className="w-3.5 h-3.5 text-emerald-500" /> },
  ];

  const getFilteredProducts = () => {
    switch (activeTab) {
      case 'featured':
        return products.filter((p) => p.isFeatured);
      case 'trending':
        return products.filter((p) => p.isTrending);
      case 'new':
        return products.filter((p) => p.isNewArrival || p.badge?.includes('SS26'));
      case 'bestSellers':
        return products.filter((p) => p.isBestSeller);
      default:
        return products;
    }
  };

  const displayedProducts = getFilteredProducts().slice(0, 8);

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Tabs Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A880]">
              The Seasonal Vault
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mt-1">
              Curated Collections
            </h2>
          </div>

          {/* Interactive Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {tabConfigs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  activeTab === tab.key
                    ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-md'
                    : 'bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Catalog CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold uppercase tracking-widest hover:bg-[#C5A880] hover:text-white transition-all shadow-lg"
          >
            <span>View All Curated Collections</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
