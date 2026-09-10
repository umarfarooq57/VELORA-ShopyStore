import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Clock, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Bespoke Acquisition Inquiry',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSent(true);
    addToast({
      type: 'success',
      title: 'Concierge Inquiry Dispatched',
      message: 'A Senior Atelier Curator will contact you within 2 business hours.',
    });
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A880]">
          Bespoke Concierge
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100">
          Client Care & Private Consultations
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
          Whether inquiring about archival piece allocations, bespoke tailoring, or private viewing appointments in Zurich or New York.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info & Atelier Locations (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-6">
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 pb-3 border-b border-stone-200 dark:border-stone-800">
              Atelier Coordinates
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100">Headquarters Atelier</h4>
                  <p className="text-stone-500">Bahnhofstrasse 45, 8001 Zurich, Switzerland</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100">Private Client Liaison</h4>
                  <p className="text-stone-500 font-mono">concierge@velora-atelier.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100">Direct Telephone</h4>
                  <p className="text-stone-500 font-mono">+41 44 211 88 00 (24/7 Concierge)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100">Private Salons</h4>
                  <p className="text-stone-500">Mon – Sat: 09:00 – 19:00 CET (By Appointment)</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-[11px] text-stone-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>All client communications encrypted with end-to-end PGP protocols.</span>
            </div>
          </div>
        </div>

        {/* Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm">
            {sent ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                  Message Dispatched to Concierge
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Your inquiry has been assigned to our Zurich private client team. Expect contact within 2 hours.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setFormData({ name: '', email: '', subject: 'Bespoke Acquisition Inquiry', message: '' });
                  }}
                  className="mt-4 px-6 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 pb-2 border-b border-stone-100 dark:border-stone-800">
                  Submit Client Consultation Request
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-stone-500 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Lord Harrington"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-stone-500 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. client@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-stone-500 block mb-1">Nature of Inquiry</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                  >
                    <option value="Bespoke Acquisition Inquiry">Bespoke Acquisition Inquiry</option>
                    <option value="Horology Caseback Engraving">Horology Caseback Engraving Commission</option>
                    <option value="Private Salon Viewing Zurich">Private Salon Appointment (Zurich/New York)</option>
                    <option value="White Glove Courier Coordination">White Glove Courier Coordination</option>
                    <option value="Corporate / Diplomatic Gifting">Corporate / Diplomatic Gifting</option>
                  </select>
                </div>

                <div>
                  <label className="text-stone-500 block mb-1">Detailed Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details regarding your specifications, delivery windows, or sizing requirements..."
                    className="w-full p-3.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold uppercase tracking-widest hover:bg-[#C5A880] transition-colors flex items-center gap-2 shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit to Concierge</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
