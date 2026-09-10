import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { useStore } from '../context/StoreContext';
import { Search, Compass, ArrowRight } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { navigateTo } = useStore();
  const [filterQuery, setFilterQuery] = useState('');

  const filteredCategories = CATEGORIES.filter(
    (c) =>
      c.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#C5A880] mb-1">
            <Compass className="w-4 h-4" />
            <span>Complete Directory</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100">
            All 19 Curated Departments
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2 max-w-xl">
            From precision acoustic audio to master horology, Flemish linen garments, and organic culinary essentials.
          </p>
        </div>

        {/* Filter Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter departments..."
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => navigateTo('shop', { category: category.name })}
            className="group cursor-pointer rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-stone-400 dark:hover:border-stone-600 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-800">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-stone-950/80 text-white backdrop-blur-sm">
                {category.itemCount} Pieces
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#C5A880] transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed line-clamp-2">
                  {category.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#C5A880] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Department
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
