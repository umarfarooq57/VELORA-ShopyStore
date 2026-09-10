import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { INITIAL_REVIEWS } from '../../data/products';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 border-t border-stone-200/80 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A880]">
            Collector Experiences
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mt-1">
            Endorsed by Connoisseurs
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2">
            Read reflections from clients across Zurich, Tokyo, Milan, and New York who appreciate uncompromising craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-500 text-amber-500"
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-300 dark:text-stone-700" />
                </div>

                <h4 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100 mb-2">
                  "{rev.title}"
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center gap-3">
                {rev.avatar && (
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-stone-300 dark:border-stone-700"
                  />
                )}
                <div>
                  <h5 className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    {rev.author}
                    {rev.verified && (
                      <span title="Verified Client Acquisition">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      </span>
                    )}
                  </h5>
                  <p className="text-[11px] text-stone-400">{rev.date} • Verified Collector</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
