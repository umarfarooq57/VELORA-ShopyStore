import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronDown, HelpCircle, MessageSquare, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { navigateTo } = useStore();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is included in the White Glove Courier service?',
      a: 'Our White Glove service provides hand-inspected, climate-controlled transport in dedicated luxury transport vehicles. A uniformed courier coordinates a precise 1-hour appointment window, unpacks your acquisition in the room of your choice, inspects the piece in your presence, and removes all sustainable packaging materials.',
    },
    {
      q: 'How does Velora cryptographically verify authenticity?',
      a: 'Every piece leaving our Zurich or Milan ateliers is fitted with an encoded near-field communication (NFC) microchip cryptographically registered to a private digital ledger. By tapping any modern smartphone to the atelier emblem, you can verify provenance, craftsman identity, serial registration, and active warranty terms.',
    },
    {
      q: 'What is the return and exchange protocol?',
      a: 'We extend a 30-day effortless return privilege on all catalog pieces in original condition with intact seals. Complimentary courier pick-up from your residence can be scheduled with a single click inside your Patron Account center.',
    },
    {
      q: 'Are customs duties and international taxes included?',
      a: 'Yes. All prices displayed on Velora are fully DDP (Delivered Duty Paid). There are no unexpected fees, import surcharges, or customs delays upon arrival in your territory.',
    },
    {
      q: 'Can I request bespoke engravings or tailored modifications?',
      a: 'Our master craftsmen accommodate monogramming on horology casebacks, bespoke sizing on Belgian linen outerwear, and tailored cable terminations for audiophile equipment. Contact our Atelier Concierge via the live chat icon in the bottom right corner for custom commissions.',
    },
    {
      q: 'What payment methods and currencies are supported?',
      a: 'We accept all major global credit cards (Visa, Mastercard, American Express), Apple Pay, Google Pay, PayPal Express, and Web3 cryptocurrencies (USDC, Bitcoin, Ethereum) with instant tokenized settlement in USD, EUR, GBP, JPY, and CHF.',
    },
  ];

  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A880]">
          Client Concierge
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto">
          Everything you need to know about our sourcing philosophy, global white glove logistics, and provenance guarantees.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4"
              >
                <span className="font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-stone-900 dark:text-white' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed border-t border-stone-100 dark:border-stone-800 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="mt-14 p-8 rounded-3xl bg-stone-900 text-white text-center space-y-4">
        <h3 className="font-serif text-xl sm:text-2xl font-bold">
          Require Personalized Assistance?
        </h3>
        <p className="text-xs text-stone-400 max-w-md mx-auto">
          Our senior atelier curators and client liaisons are available 24/7 to provide bespoke styling advice or logistical coordination.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={() => navigateTo('contact')}
            className="px-6 py-2.5 rounded-full bg-white text-stone-900 text-xs font-bold uppercase tracking-wider hover:bg-[#C5A880] hover:text-white transition-colors"
          >
            Contact Atelier Concierge
          </button>
        </div>
      </div>
    </div>
  );
};
