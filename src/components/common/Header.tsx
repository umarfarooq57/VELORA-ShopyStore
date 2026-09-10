import React, { useState, useRef, useEffect } from 'react';
import { useStore, PageView } from '../../context/StoreContext';
import { CurrencyCode } from '../../types';
import { CATEGORIES } from '../../data/categories';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Sun,
  Moon,
  Eye,
  Keyboard,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Flame,
  LayoutDashboard,
  Compass,
  ArrowRight,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    currentCurrency,
    setCurrency,
    currencies,
    cartTotalCount,
    wishlist,
    darkMode,
    toggleDarkMode,
    highContrast,
    toggleHighContrast,
    setIsShortcutsOpen,
    searchQuery,
    setSearchQuery,
    products,
    user,
    isAuthenticated,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Search live autocomplete
  const searchResults = localSearch.trim()
    ? products
        .filter(
          (p) =>
            p.title.toLowerCase().includes(localSearch.toLowerCase()) ||
            p.category.toLowerCase().includes(localSearch.toLowerCase()) ||
            p.brand.toLowerCase().includes(localSearch.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(localSearch.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localSearch.trim()) return;
    setSearchQuery(localSearch);
    navigateTo('shop', { searchQuery: localSearch });
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF9F5]/90 dark:bg-[#0c0d0e]/90 border-b border-stone-200/80 dark:border-stone-800 transition-colors">
      {/* Top Utility Announcement Bar */}
      <div className="bg-stone-900 text-stone-300 dark:bg-stone-950 text-xs py-1.5 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Free White Glove Delivery Notice */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
            <p className="text-[11px] sm:text-xs tracking-wide">
              Complimentary White Glove Courier on orders over $150
            </p>
          </div>

          {/* Right: Currency & Accessibility Controls */}
          <div className="flex items-center gap-3 text-[11px]">
            {/* Multi-Currency Switcher */}
            <div className="relative flex items-center gap-1">
              <span className="text-stone-400 hidden md:inline">Currency:</span>
              <select
                id="currency-selector"
                aria-label="Select Currency"
                value={currentCurrency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-stone-800 text-white dark:bg-stone-900 border border-stone-700 rounded px-2 py-0.5 text-[11px] focus:outline-none focus:ring-1 focus:ring-[#C5A880] cursor-pointer"
              >
                {Object.keys(currencies).map((code) => (
                  <option key={code} value={code}>
                    {code} ({currencies[code as CurrencyCode].symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* High Contrast Accessibility Toggle */}
            <button
              onClick={toggleHighContrast}
              title="Toggle High Contrast Mode (Accessibility)"
              aria-label="Toggle High Contrast Mode"
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors ${
                highContrast
                  ? 'bg-yellow-400 text-black font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden md:inline">High Contrast</span>
            </button>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              title="Toggle Dark / Light Theme"
              aria-label="Toggle Dark or Light Theme"
              className="p-1 rounded text-stone-400 hover:text-white transition-colors"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Keyboard Shortcuts Prompt */}
            <button
              onClick={() => setIsShortcutsOpen(true)}
              title="Keyboard Shortcuts (?)"
              aria-label="Open Keyboard Shortcuts"
              className="hidden lg:flex items-center gap-1 text-stone-400 hover:text-white border-l border-stone-700 pl-3 transition-colors"
            >
              <Keyboard className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono bg-stone-800 px-1 rounded">?</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Trigger & Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo */}
            <button
              id="velora-brand-logo"
              onClick={() => navigateTo('home')}
              className="text-left group flex items-baseline gap-1.5 focus:outline-none"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-stone-950 dark:text-stone-50 group-hover:text-[#C5A880] transition-colors">
                VELORA
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-[#C5A880] hidden sm:inline">
                Atelier
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-7">
            <button
              id="nav-home-btn"
              onClick={() => navigateTo('home')}
              className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                currentPage === 'home'
                  ? 'text-stone-950 dark:text-white border-b-2 border-stone-900 dark:border-white pb-0.5'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white'
              }`}
            >
              Home
            </button>

            <button
              id="nav-shop-btn"
              onClick={() => navigateTo('shop', { category: undefined })}
              className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                currentPage === 'shop' && !searchQuery
                  ? 'text-stone-950 dark:text-white border-b-2 border-stone-900 dark:border-white pb-0.5'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white'
              }`}
            >
              Catalog
            </button>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                id="nav-categories-dropdown-btn"
                onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
                className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white transition-colors"
              >
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isCategoriesDropdownOpen && (
                <div
                  onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl p-4 grid grid-cols-2 gap-2 animate-in fade-in duration-150 z-50"
                >
                  <div className="col-span-2 pb-2 mb-1 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                      All 19 Curations
                    </span>
                    <button
                      onClick={() => {
                        setIsCategoriesDropdownOpen(false);
                        navigateTo('categories');
                      }}
                      className="text-[11px] font-semibold text-[#C5A880] hover:underline"
                    >
                      Browse Grid →
                    </button>
                  </div>
                  {CATEGORIES.slice(0, 10).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setIsCategoriesDropdownOpen(false);
                        navigateTo('shop', { category: cat.name });
                      }}
                      className="text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white transition-colors truncate"
                    >
                      {cat.name}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setIsCategoriesDropdownOpen(false);
                      navigateTo('categories');
                    }}
                    className="col-span-2 text-center py-2 mt-1 rounded-xl bg-stone-50 dark:bg-stone-800/60 text-xs font-semibold text-stone-800 dark:text-stone-200 hover:bg-stone-100"
                  >
                    View All 19 Departments
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('shop', { category: 'Watches' })}
              className="text-xs font-semibold uppercase tracking-widest text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              Featured
            </button>

            <button
              onClick={() => navigateTo('shop', { category: 'Electronics' })}
              className="text-xs font-semibold uppercase tracking-widest text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Flash Sale
            </button>

            <button
              onClick={() => navigateTo('blog')}
              className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                currentPage === 'blog'
                  ? 'text-stone-950 dark:text-white border-b-2 border-stone-900 dark:border-white pb-0.5'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white'
              }`}
            >
              Journal
            </button>

            {/* Admin Dashboard Pill */}
            <button
              id="nav-admin-btn"
              onClick={() => navigateTo('admin')}
              className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                currentPage === 'admin'
                  ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-sm'
                  : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Admin & CRM</span>
            </button>
          </nav>

          {/* Right Action Icons: Search, Wishlist, Cart, Account */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop Search Bar */}
            <div className="relative hidden md:block w-48 lg:w-64">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative flex items-center">
                  <input
                    id="global-search-input"
                    type="text"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    placeholder="Search curated pieces..."
                    className="w-full pl-8 pr-4 py-2 text-xs rounded-full border border-stone-300/80 dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-white transition-all shadow-inner"
                  />
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 pointer-events-none" />
                  {localSearch && (
                    <button
                      type="button"
                      onClick={() => setLocalSearch('')}
                      className="absolute right-2.5 text-stone-400 hover:text-stone-700 p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </form>

              {/* Instant Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl p-2 z-50 space-y-1">
                  {searchResults.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setLocalSearch('');
                        navigateTo('product-detail', { productId: p.id });
                      }}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 text-left transition-colors"
                    >
                      <img
                        src={p.images[0]}
                        alt=""
                        className="w-10 h-10 rounded-md object-cover border border-stone-200 dark:border-stone-700"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                          {p.title}
                        </p>
                        <p className="text-[10px] text-stone-500">{p.brand} • {p.category}</p>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full text-center py-1.5 text-[11px] font-semibold text-[#C5A880] hover:underline border-t border-stone-100 dark:border-stone-800 mt-1"
                  >
                    View all matching results →
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Open Search"
              className="md:hidden p-2 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              id="header-wishlist-btn"
              onClick={() => navigateTo('wishlist')}
              aria-label={`Wishlist (${wishlist.length} saved items)`}
              className="relative p-2 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full bg-[#C5A880] text-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag / Cart Button */}
            <button
              id="header-cart-btn"
              onClick={() => navigateTo('cart')}
              aria-label={`Shopping Bag (${cartTotalCount} items)`}
              className="relative p-2 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartTotalCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full bg-stone-900 text-white dark:bg-white dark:text-stone-900">
                  {cartTotalCount}
                </span>
              )}
            </button>

            {/* User Account Button & Dropdown */}
            <div className="relative">
              <button
                id="header-user-btn"
                onClick={() => navigateTo('account')}
                aria-label="User Account"
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
              >
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="w-7 h-7 rounded-full object-cover border border-stone-300 dark:border-stone-700"
                  />
                ) : (
                  <User className="w-5 h-5 text-stone-700 dark:text-stone-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {isSearchOpen && (
          <div className="md:hidden py-3 border-t border-stone-200 dark:border-stone-800 animate-in slide-in-from-top-2">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Search pieces, categories..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                  autoFocus
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-900"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-28 z-50 bg-black/60 backdrop-blur-sm">
          <div className="w-4/5 max-w-sm h-full bg-white dark:bg-stone-900 p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
                <span className="font-serif text-xl font-bold">VELORA</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-stone-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('home');
                  }}
                  className="w-full text-left py-2 text-sm font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-200"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('shop');
                  }}
                  className="w-full text-left py-2 text-sm font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-200"
                >
                  Explore Catalog
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('categories');
                  }}
                  className="w-full text-left py-2 text-sm font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-200"
                >
                  All 19 Categories
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('order-tracking');
                  }}
                  className="w-full text-left py-2 text-sm font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-200"
                >
                  Track My Order
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('blog');
                  }}
                  className="w-full text-left py-2 text-sm font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-200"
                >
                  Editorial Journal
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('admin');
                  }}
                  className="w-full text-left py-2 text-sm font-semibold uppercase tracking-wider text-[#C5A880]"
                >
                  Admin Dashboard & CRM
                </button>
              </nav>
            </div>

            <div className="pt-6 border-t border-stone-200 dark:border-stone-800 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Theme</span>
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800"
                >
                  {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigateTo('account');
                }}
                className="w-full py-2.5 text-center text-xs font-semibold rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-900 uppercase tracking-wider"
              >
                {isAuthenticated ? 'Client Account Portal' : 'Sign In / Register'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
