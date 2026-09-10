import React from 'react';

export const BrandPartners: React.FC = () => {
  const brands = [
    { name: 'BANG & OLUFSEN', origin: 'Struer, Denmark' },
    { name: 'MONTBLANC', origin: 'Hamburg, Germany' },
    { name: 'LEICA CAMERA', origin: 'Wetzlar, Germany' },
    { name: 'AESOP HOME', origin: 'Melbourne, Australia' },
    { name: 'TOM DIXON', origin: 'London, United Kingdom' },
    { name: 'VELORA ATELIER', origin: 'Zurich, Switzerland' },
  ];

  return (
    <section className="py-12 border-t border-stone-200/80 dark:border-stone-800 bg-white/50 dark:bg-stone-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.25em] text-stone-400 dark:text-stone-500 mb-8">
          Curating Masters of Heritage & Industrial Design
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 hover:opacity-100 transition-opacity">
          {brands.map((b) => (
            <div key={b.name} className="flex flex-col items-center">
              <span className="font-serif text-sm sm:text-base font-bold tracking-widest text-stone-800 dark:text-stone-200">
                {b.name}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-stone-400 mt-0.5">
                {b.origin}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
