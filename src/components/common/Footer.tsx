import React, { useState } from 'react';
import { useStore, PageView } from '../../context/StoreContext';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Lock,
  ArrowRight,
  Mail,
  CheckCircle2,
  Globe,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, addToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    addToast({
      type: 'success',
      title: 'Welcome to Velora Atelier',
      message: 'Use voucher WELCOME15 for 15% off your first acquisition.',
    });
  };

  return (
    <footer className="w-full bg-stone-950 text-stone-300 border-t border-stone-800/80 pt-16 pb-12 transition-colors">
      {/* Guarantees Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-stone-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-[#C5A880] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">White Glove Express</h4>
              <p className="mt-1 text-xs text-stone-400 leading-relaxed">
                Complimentary global carbon-neutral courier on all orders over $150.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-[#C5A880] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Cryptographic Provenance</h4>
              <p className="mt-1 text-xs text-stone-400 leading-relaxed">
                NFC-verified authenticity certificate with 3-year atelier warranty.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-[#C5A880] shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">30-Day Effortless Returns</h4>
              <p className="mt-1 text-xs text-stone-400 leading-relaxed">
                Prepaid courier labels generated directly in your account center.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-[#C5A880] shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">End-to-End Encryption</h4>
              <p className="mt-1 text-xs text-stone-400 leading-relaxed">
                PCI-DSS Level 1 & 256-bit AES tokenized payment infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="font-serif text-2xl font-bold tracking-widest text-white">
                VELORA
              </span>
              <span className="ml-2 text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">
                Atelier
              </span>
              <p className="mt-3 text-xs text-stone-400 leading-relaxed max-w-sm">
                Curating timeless horology, acoustic monitors, sculptural garments, and refined living essentials. Where Scandinavian minimalism meets Milanese craftsmanship.
              </p>
            </div>

            {/* Newsletter form */}
            <div className="pt-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-white">
                The Velora Gazette
              </h5>
              <p className="mt-1 text-xs text-stone-400">
                Receive private collection launches, archival previews, and an instant 15% voucher.
              </p>

              {subscribed ? (
                <div className="mt-3 p-3 rounded-xl bg-stone-900 border border-[#C5A880]/40 flex items-center gap-2 text-xs text-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                  <span>Welcome! Use code <strong className="text-white font-mono">WELCOME15</strong> at checkout.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-3 flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter client email address..."
                      required
                      className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-stone-900 border border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                    />
                    <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-white text-stone-950 hover:bg-stone-200 text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 1: Collections */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-widest text-white border-b border-stone-800 pb-2">
              Curated Departments
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              {['Electronics', 'Watches', "Men's Clothing", "Women's Clothing", 'Shoes', 'Home & Kitchen', 'Furniture', 'Beauty', 'Smart Devices'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => navigateTo('shop', { category: cat })}
                    className="hover:text-white transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigateTo('categories')}
                  className="text-[#C5A880] font-semibold hover:underline"
                >
                  View all 19 categories →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Client Care */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-widest text-white border-b border-stone-800 pb-2">
              Client Care
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => navigateTo('order-tracking')} className="hover:text-white transition-colors">
                  Live Order Tracking
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-white transition-colors">
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Atelier Concierge Contact
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wishlist')} className="hover:text-white transition-colors">
                  Saved Wishlist
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-[#C5A880] transition-colors font-medium">
                  Store Management Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: The Maison & Legal */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-widest text-white border-b border-stone-800 pb-2">
              The Maison & Compliance
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  The Velora Manifesto
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('blog')} className="hover:text-white transition-colors">
                  Editorial Journal
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy (GDPR & CCPA)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('terms')} className="hover:text-white transition-colors">
                  Terms & Conditions of Sale
                </button>
              </li>
            </ul>

            {/* Compliance Badge */}
            <div className="pt-2">
              <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>GDPR & CCPA Compliant</span>
                </div>
                <p className="text-[10px] text-stone-400 leading-tight">
                  Full self-serve personal data export and anonymization rights guaranteed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Payment Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <p>© 2026 Velora Atelier Inc. All global rights reserved. Engineered for perfection.</p>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-400">Visa</span>
          <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-400">Mastercard</span>
          <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-400">Apple Pay</span>
          <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-400">PayPal</span>
          <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-400">USDC / BTC</span>
        </div>
      </div>
    </footer>
  );
};
