import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  FileText,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { orders, orderTrackingId, setOrderTrackingId, formatPrice, addToast } = useStore();
  const [searchInput, setSearchInput] = useState(orderTrackingId || (orders[0]?.id || ''));

  const currentOrder = orders.find((o) => o.id === (orderTrackingId || searchInput)) || orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const found = orders.find((o) => o.id.toLowerCase() === searchInput.trim().toLowerCase());
    if (found) {
      setOrderTrackingId(found.id);
    } else {
      addToast({
        type: 'info',
        title: 'Order Search',
        message: `Showing tracking simulation for reference ${searchInput}`,
      });
    }
  };

  const stages = [
    { title: 'Authorized & Cryptographically Sealed', desc: 'PCI-DSS Tokenized & Verified', time: '10:14 AM' },
    { title: 'Atelier Inspection & NFC Provisioning', desc: 'Hand-inspected in Zurich Workshop', time: '02:30 PM' },
    { title: 'Dispatched via White Glove Air Cargo', desc: 'Flight LX-188 Transatlantic Transit', time: '09:45 PM' },
    { title: 'Customs Cleared & Dedicated Courier', desc: 'Signature Required on Delivery', time: '08:15 AM' },
  ];

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A880]">
          Real-Time Concierge Telemetry
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
          Atelier Dispatch & Logistics Tracker
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto">
          Monitor your climate-controlled white glove shipment with live status updates and cryptographic verification.
        </p>

        {/* Tracking Search Input */}
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto pt-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="e.g. VEL-984210"
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 uppercase font-mono"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold uppercase tracking-wider hover:bg-[#C5A880] transition-colors"
          >
            Track
          </button>
        </form>
      </div>

      {currentOrder ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Live Status & Visual Timeline (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800 gap-2">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
                    Order ID: <strong className="text-stone-900 dark:text-stone-100">{currentOrder.id}</strong>
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                    Estimated Delivery: Tomorrow by 2:00 PM
                  </h3>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  <span>In Climate-Controlled Transit</span>
                </span>
              </div>

              {/* Progress Timeline */}
              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200 dark:before:bg-stone-800">
                {stages.map((stg, idx) => {
                  const isDone = idx < 3;
                  const isCurrent = idx === 2;
                  return (
                    <div key={idx} className="relative">
                      <div
                        className={`absolute -left-6 sm:-left-8 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                          isDone
                            ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 border-stone-900 dark:border-white'
                            : 'bg-white dark:bg-stone-900 text-stone-300 border-stone-300 dark:border-stone-700'
                        } ${isCurrent ? 'ring-4 ring-[#C5A880]/30 animate-pulse' : ''}`}
                      >
                        {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <div className="flex items-baseline justify-between">
                          <h4 className={`text-xs sm:text-sm font-bold ${isDone ? 'text-stone-900 dark:text-stone-100' : 'text-stone-400'}`}>
                            {stg.title}
                          </h4>
                          <span className="text-[11px] font-mono text-stone-400">{stg.time}</span>
                        </div>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{stg.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map & Telemetry Box */}
              <div className="p-5 rounded-xl bg-stone-950 text-white space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C5A880] animate-bounce" />
                    <span className="font-semibold text-stone-200">Current GPS Telemetry: JFK Air Cargo Terminal 4</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">● LIVE PING</span>
                </div>

                <div className="h-32 w-full rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center relative overflow-hidden">
                  {/* Stylized vector map grid representation */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="text-center z-10 space-y-1">
                    <p className="font-mono text-xs text-[#C5A880]">40.6413° N, 73.7781° W</p>
                    <p className="text-[11px] text-stone-400">Carrier: Swiss WorldCargo & Velora Dedicated Courier</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Manifest & Receipt (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-stone-100 dark:border-stone-800">
                <h4 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
                  Consignment Items
                </h4>
                <button
                  onClick={() =>
                    addToast({
                      type: 'success',
                      title: 'Certificate Downloaded',
                      message: 'Formal PDF invoice & NFC authenticity credentials exported.',
                    })
                  }
                  className="text-xs text-[#C5A880] font-semibold flex items-center gap-1 hover:underline"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Invoice</span>
                </button>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {currentOrder.items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center text-xs">
                    <img
                      src={item.image}
                      alt=""
                      className="w-12 h-12 rounded-lg object-cover bg-stone-100 dark:bg-stone-800 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-stone-900 dark:text-stone-100 truncate">{item.title}</p>
                      <p className="text-[11px] text-stone-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-mono font-semibold text-stone-900 dark:text-stone-100">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                <div className="flex justify-between">
                  <span>Courier:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">Velora White Glove Express</span>
                </div>
                <div className="flex justify-between">
                  <span>Destination:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 text-right">
                    {currentOrder.shippingAddress.addressLine1}, {currentOrder.shippingAddress.city}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 dark:text-stone-100 text-sm pt-2 border-t border-stone-100 dark:border-stone-800">
                  <span>Total Settled:</span>
                  <span className="font-mono text-base">{formatPrice(currentOrder.totalAmount)}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800 text-[11px] text-stone-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>NFC Authenticity Certificate registered to this order.</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xs text-stone-500">No order found matching reference.</p>
        </div>
      )}
    </div>
  );
};
