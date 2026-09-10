import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { CATEGORIES } from '../data/categories';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
  RotateCcw,
  Check,
  Star,
  Sparkles,
} from 'lucide-react';

export const ProductListingPage: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    formatPrice,
  } = useStore();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('popularity');
  const [priceRange, setPriceRange] = useState<number>(3000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available brands
  const brands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).sort();
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchTitle = product.title.toLowerCase().includes(q);
          const matchCat = product.category.toLowerCase().includes(q);
          const matchBrand = product.brand.toLowerCase().includes(q);
          const matchTag = product.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchCat && !matchBrand && !matchTag) return false;
        }

        // Category
        if (selectedCategory && product.category !== selectedCategory) {
          return false;
        }

        // Price
        if (product.price > priceRange) {
          return false;
        }

        // Brands
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
          return false;
        }

        // Rating
        if (minRating > 0 && product.rating < minRating) {
          return false;
        }

        // Stock
        if (inStockOnly && (!product.inStock || product.stockCount <= 0)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return (b.reviewCount || 0) - (a.reviewCount || 0); // popularity
      });
  }, [products, searchQuery, selectedCategory, priceRange, selectedBrands, minRating, inStockOnly, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setPriceRange(3000);
    setSelectedBrands([]);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('popularity');
  };

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    selectedBrands.length +
    (minRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (priceRange < 3000 ? 1 : 0);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A880]">
            The Catalog
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mt-0.5">
            {selectedCategory ? selectedCategory : searchQuery ? `Results for "${searchQuery}"` : 'All Curations'}
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Showing {filteredProducts.length} masterpieces matching your specifications
          </p>
        </div>

        {/* View Controls & Sort */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Mobile filter button */}
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters ({activeFiltersCount})</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 hidden sm:inline">Sort:</span>
            <select
              id="product-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
            >
              <option value="popularity">Most Popular / Best Sellers</option>
              <option value="newest">New Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* View Toggle (Grid / List) */}
          <div className="flex items-center rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              aria-label="Grid View"
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900'
                  : 'text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              aria-label="List View"
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900'
                  : 'text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className={`lg:col-span-3 space-y-6 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A880]" />
                Filter Options
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset ({activeFiltersCount})
                </button>
              )}
            </div>

            {/* Department / Category Filter */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 block mb-2">
                Department
              </label>
              <div className="max-h-48 overflow-y-auto space-y-1 text-xs pr-1">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors ${
                    selectedCategory === null
                      ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 font-semibold'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  All Departments ({products.length})
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === cat.name
                        ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-[10px] opacity-60 ml-2">
                      {products.filter((p) => p.category === cat.name).length || cat.itemCount}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                <span>Maximum Price</span>
                <span className="text-stone-900 dark:text-stone-100 font-mono">
                  {formatPrice(priceRange)}
                </span>
              </div>
              <input
                id="filter-price-range"
                type="range"
                min="50"
                max="3000"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-stone-900 dark:accent-white"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>$50</span>
                <span>$1,500</span>
                <span>$3,000+</span>
              </div>
            </div>

            {/* Brands Filter */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 block mb-2">
                Atelier & Brand
              </label>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {brands.map((brand) => {
                  const isChecked = selectedBrands.includes(brand);
                  return (
                    <label
                      key={brand}
                      className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300 cursor-pointer hover:text-stone-900"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleBrand(brand)}
                        className="rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                      />
                      <span>{brand}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 block mb-2">
                Minimum Rating
              </label>
              <div className="space-y-1 text-xs">
                {[4.9, 4.8, 4.5, 0].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setMinRating(rate)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${
                      minRating === rate
                        ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-amber-500">
                      {rate > 0 ? (
                        <>
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{rate} & above</span>
                        </>
                      ) : (
                        <span className="text-stone-500">Any Rating</span>
                      )}
                    </div>
                    {minRating === rate && <Check className="w-3.5 h-3.5 text-stone-900 dark:text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability Toggle */}
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Ready to Ship (In Stock Only)
                </span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                />
              </label>
            </div>
          </div>
        </aside>

        {/* Products Grid / List Column */}
        <main className="lg:col-span-9">
          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs text-stone-400">Active Filters:</span>
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory(null)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedBrands.map((b) => (
                <span key={b} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                  {b}
                  <button onClick={() => toggleBrand(b)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {minRating > 0 && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                  ★ {minRating}+
                  <button onClick={() => setMinRating(0)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {inStockOnly && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                  In Stock Only
                  <button onClick={() => setInStockOnly(false)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#C5A880] underline ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                No Masterpieces Match Your Filters
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                Try widening your price range, clearing brand selections, or exploring all 19 curated departments.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold uppercase tracking-wider"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            /* Products Container */
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
