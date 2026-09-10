import React from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { BrandPartners } from '../components/home/BrandPartners';
import { CategoryShowcase } from '../components/home/CategoryShowcase';
import { FlashSale } from '../components/home/FlashSale';
import { ProductTabsSection } from '../components/home/ProductTabsSection';
import { PersonalizedRecs } from '../components/home/PersonalizedRecs';
import { Testimonials } from '../components/home/Testimonials';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="w-full">
      {/* 1. Hero banner with promotional offers */}
      <HeroBanner />

      {/* 2. Brand Partners */}
      <BrandPartners />

      {/* 3. Shop by Category (All 19 categories showcase) */}
      <CategoryShowcase />

      {/* 4. Flash Sale section with live countdown */}
      <FlashSale />

      {/* 5. Tabbed Product Collections: Featured, Trending, New Arrivals, Best Sellers */}
      <ProductTabsSection />

      {/* 6. Personalized Recommendation Engine */}
      <PersonalizedRecs />

      {/* 7. Customer Testimonials */}
      <Testimonials />

      {/* 8. Editorial Gazette Invitation */}
      <section className="py-16 sm:py-20 bg-stone-900 text-white border-t border-stone-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A880]">
            The Velora Atelier Privé
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Elevate Your Everyday Surroundings
          </h2>
          <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto font-light leading-relaxed">
            Experience the harmony of timeless horology, acoustic monitors, and Italian calfskin footwear delivered to your door with white glove perfection.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-3.5 rounded-full bg-white text-stone-950 font-bold text-xs uppercase tracking-widest hover:bg-[#C5A880] hover:text-white transition-all shadow-xl flex items-center gap-2"
            >
              <span>Explore The Full Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('about')}
              className="px-6 py-3.5 rounded-full border border-white/20 hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Read Our Atelier Manifesto
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
