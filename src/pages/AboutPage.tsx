import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Compass, Sparkles, Award, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A880]">
          The Velora Manifesto
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
          Where Radical Material Honesty Meets Timeless Form
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-light leading-relaxed">
          Founded in Zurich and expanded through artisan workshops across Milan, Kyoto, and London, Velora exists as an antidote to ephemeral luxury and disposable manufacturing.
        </p>
      </div>

      {/* Visual Image Banner */}
      <div className="aspect-[21/9] rounded-3xl overflow-hidden bg-stone-900 relative shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1800&q=85"
          alt="Atelier workshop"
          className="w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-8 sm:p-12 text-white">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
              Zurich Atelier Workshop No. 4
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
              Hand-Assembled with Tolerances Measured in Microns
            </h2>
          </div>
        </div>
      </div>

      {/* Pillars of Velora */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 space-y-3">
          <div className="p-3 w-fit rounded-xl bg-white dark:bg-stone-800 text-[#C5A880] shadow-sm">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
            Uncompromising Provenance
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            Every component traces directly to its source: vegetable-tanned calfskin from Tuscany, titanium milled in Okayama, and automatic movements from Saxon watchmakers.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 space-y-3">
          <div className="p-3 w-fit rounded-xl bg-white dark:bg-stone-800 text-[#C5A880] shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
            Sensory Acoustics & Tactility
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            We reject hollow composites. Weight, resistance, acoustic dampening, and the feel of knurled dials are calibrated to provide tactile affirmation with every interaction.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 space-y-3">
          <div className="p-3 w-fit rounded-xl bg-white dark:bg-stone-800 text-[#C5A880] shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
            Circular Longevity
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            Designed to be maintained across generations. We supply lifetime replacement parts, refurbishment services, and buyback programs for every piece in the atelier catalogue.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-8">
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-3.5 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold uppercase tracking-widest hover:bg-[#C5A880] transition-colors shadow-lg"
        >
          Explore The Curated Atelier
        </button>
      </div>
    </div>
  );
};
