import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles, Shield, Truck, Award, Play } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { navigateTo, formatPrice, products } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Acoustic Purity & Modern Horology',
      subtitle: 'The 2026 Atelier Collection',
      description: 'Handcrafted precision engineered for discerning collectors. Featuring bespoke titanium transducers and hand-assembled Glashütte mechanical movements.',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1600&q=85',
      ctaText: 'Explore New Season',
      category: 'Electronics',
      badge: 'Editorial Feature',
      featuredProduct: products[0],
    },
    {
      title: 'Masters of Flemish Flax & Italian Calfskin',
      subtitle: 'Quiet Luxury Essentials',
      description: 'Sculptural Belgian linen trench coats paired with Blake-stitched Tuscan footwear designed to deepen in character with age.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85',
      ctaText: 'Discover Sartorial Curation',
      category: "Women's Clothing",
      badge: 'Runway Release',
      featuredProduct: products[3],
    },
    {
      title: 'Sculptural Living & Tactile Architecture',
      subtitle: 'Mid-Century Reimagined',
      description: 'Solid FSC walnut seating, ceremonial Japanese pour-over stations, and anti-glare ambient smart art displays.',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=85',
      ctaText: 'View Interior Gallery',
      category: 'Furniture',
      badge: 'Architectural Digest',
      featuredProduct: products[8],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full overflow-hidden bg-stone-950 text-white min-h-[580px] lg:min-h-[660px] flex items-center">
      {/* Background Image with Cinematic Overlay */}
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === idx ? 'opacity-50 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
        >
          <img
            src={s.image}
            alt=""
            className="w-full h-full object-cover object-center transform transition-transform duration-[8000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40" />
        </div>
      ))}

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-[#C5A880] font-semibold tracking-wider uppercase animate-in fade-in duration-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{slide.badge}</span>
              <span className="text-white/40">•</span>
              <span className="text-stone-300">{slide.subtitle}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] max-w-2xl">
              {slide.title}
            </h1>

            <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed max-w-xl">
              {slide.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-explore-btn"
                onClick={() => navigateTo('shop', { category: slide.category })}
                className="px-7 py-3.5 rounded-full bg-white text-stone-950 font-bold text-xs uppercase tracking-widest hover:bg-[#C5A880] hover:text-white transition-all shadow-xl flex items-center gap-2 group"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateTo('categories')}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-colors"
              >
                Explore All 19 Departments
              </button>
            </div>

            {/* Slide Navigation Indicators */}
            <div className="flex items-center gap-3 pt-6">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? 'w-10 bg-[#C5A880]' : 'w-3 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Hero Floating Product Card */}
          {slide.featuredProduct && (
            <div className="hidden lg:block lg:col-span-4">
              <div
                onClick={() => navigateTo('product-detail', { productId: slide.featuredProduct?.id })}
                className="group cursor-pointer rounded-2xl bg-stone-900/80 backdrop-blur-xl border border-white/15 p-5 shadow-2xl hover:border-[#C5A880]/60 transition-all duration-300"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-800 mb-4">
                  <img
                    src={slide.featuredProduct.images[0]}
                    alt={slide.featuredProduct.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-stone-950/90 text-white">
                    Featured Piece
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#C5A880] uppercase tracking-wider">
                  <span>{slide.featuredProduct.brand}</span>
                  <span>{slide.featuredProduct.category}</span>
                </div>
                <h3 className="font-serif text-base font-bold text-white mt-1 group-hover:text-[#C5A880] transition-colors line-clamp-1">
                  {slide.featuredProduct.title}
                </h3>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-lg font-bold text-white">
                    {formatPrice(slide.featuredProduct.price)}
                  </span>
                  <span className="text-xs font-semibold text-[#C5A880] flex items-center gap-1">
                    Acquire Piece →
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
