import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/categories';
import { ArrowRight, Compass } from 'lucide-react';

export const CategoryShowcase: React.FC = () => {
  const { navigateTo } = useStore();

  const featuredCategories = CATEGORIES.filter((c) => c.featured).slice(0, 8);

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#C5A880] mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Curation Architecture</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
              Shop by Department
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
              Nineteen bespoke categories crafted around timeless material honesty and enduring function.
            </p>
          </div>

          <button
            onClick={() => navigateTo('categories')}
            className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100 hover:text-[#C5A880] dark:hover:text-[#C5A880] flex items-center gap-1 transition-colors"
          >
            <span>View All 19 Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {featuredCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigateTo('shop', { category: category.name })}
              className="group relative cursor-pointer aspect-[3/4] rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

              <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                <span className="self-end px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-white/20 backdrop-blur-md">
                  {category.itemCount} Pieces
                </span>

                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold tracking-wide group-hover:text-[#C5A880] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-[11px] text-stone-300 line-clamp-1 mt-0.5 opacity-90">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#C5A880] mt-2 group-hover:translate-x-1 transition-transform">
                    Explore Department →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
