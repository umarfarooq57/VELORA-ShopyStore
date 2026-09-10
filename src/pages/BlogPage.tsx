import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/mockData';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Clock, User, Sparkles } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { navigateTo } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Horology', 'Acoustics', 'Sartorial', 'Living'];

  const filteredPosts =
    selectedCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A880]">
          The Velora Gazette
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100">
          Essays on Material Integrity & Craft
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
          In-depth critiques on mechanical watchmaking, acoustic engineering, and timeless European tailoring.
        </p>

        {/* Filter tags */}
        <div className="flex items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Lead Post */}
      {filteredPosts[0] && (
        <div
          onClick={() => navigateTo('shop')}
          className="group cursor-pointer rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12"
        >
          <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-800">
            <img
              src={filteredPosts[0].coverImage}
              alt={filteredPosts[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-[#C5A880] font-semibold uppercase tracking-wider">
                <span>{filteredPosts[0].category}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-stone-400 font-normal">
                  <Clock className="w-3.5 h-3.5" />
                  {filteredPosts[0].readTime}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#C5A880] transition-colors leading-tight">
                {filteredPosts[0].title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3">
                {filteredPosts[0].excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <div className="text-xs">
                <p className="font-bold text-stone-900 dark:text-stone-100">{filteredPosts[0].author.name}</p>
                <p className="text-stone-400 text-[11px]">{filteredPosts[0].publishedAt}</p>
              </div>
              <span className="text-xs font-bold text-[#C5A880] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Critique →
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Grid of other articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.slice(1).map((post) => (
          <div
            key={post.id}
            onClick={() => navigateTo('shop')}
            className="group cursor-pointer rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div className="aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-800">
              <img
                src={post.coverImage}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-[#C5A880] font-semibold uppercase tracking-wider">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span className="text-stone-400 font-normal">{post.readTime}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#C5A880] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
                <span>{post.author.name}</span>
                <span className="text-stone-400">{post.publishedAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
