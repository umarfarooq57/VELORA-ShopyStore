import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { Sparkles, SlidersHorizontal, RefreshCw } from 'lucide-react';

export const PersonalizedRecs: React.FC = () => {
  const { products } = useStore();
  const [selectedPersona, setSelectedPersona] = useState<string>('minimalist');

  const personas = [
    { id: 'minimalist', label: 'Minimalist Purist', tag: 'Minimalist' },
    { id: 'audiophile', label: 'Acoustic Connoisseur', tag: 'Audiophile' },
    { id: 'sartorial', label: 'Quiet Luxury Tailoring', tag: 'Quiet Luxury' },
    { id: 'tech', label: 'Computational Creator', tag: 'Performance' },
  ];

  const filteredRecs = products
    .filter((p) => {
      const active = personas.find((p) => p.id === selectedPersona);
      return p.tags.some((t) => t.toLowerCase().includes(active?.tag.toLowerCase() || ''));
    })
    .concat(products.slice(0, 4))
    .slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-stone-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-8 px-6 sm:px-12 border border-stone-800 shadow-2xl relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-stone-800/40 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-[#C5A880] mb-2 border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Algorithmic Curation Engine</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Curated Just for Your Taste
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-lg">
              Tailored selections dynamically updated based on your aesthetic profile and curated acquisitions.
            </p>
          </div>

          {/* Persona selector chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone-400 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Aesthetic:</span>
            </span>
            {personas.map((persona) => (
              <button
                key={persona.id}
                onClick={() => setSelectedPersona(persona.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedPersona === persona.id
                    ? 'bg-white text-stone-950 shadow-md font-bold'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white'
                }`}
              >
                {persona.label}
              </button>
            ))}
          </div>
        </div>

        {/* Personalized Product Cards Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRecs.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
