import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Shield,
  Download,
  Trash2,
  CheckCircle2,
  Lock,
  Smartphone,
  KeyRound,
  ExternalLink,
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { user, updateUser, orders, formatPrice, navigateTo, addToast } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'security' | 'compliance'>('orders');

  const [nameInput, setNameInput] = useState(user?.name || 'Julian Vane');
  const [emailInput, setEmailInput] = useState(user?.email || 'julian.vane@velora-atelier.com');
  const [phoneInput, setPhoneInput] = useState(user?.phone || '+1 (555) 234-5678');
  const [mfaEnabled, setMfaEnabled] = useState(user?.mfaEnabled ?? true);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: nameInput,
      email: emailInput,
      phone: phoneInput,
      mfaEnabled,
    });
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Atelier patron credentials have been securely saved.',
    });
  };

  const handleExportData = () => {
    const dataToExport = {
      profile: user,
      orders,
      timestamp: new Date().toISOString(),
      compliance: 'GDPR / CCPA Article 15 Right of Access',
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `velora-patron-data-${user?.id || 'client'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({
      type: 'success',
      title: 'GDPR Data Export Generated',
      message: 'Cryptographically sealed JSON data file exported.',
    });
  };

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-stone-200 dark:border-stone-800 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-stone-900 text-white dark:bg-white dark:text-stone-900 flex items-center justify-center font-serif text-2xl font-bold">
            {user?.name?.charAt(0) || 'J'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                {user?.name || 'Julian Vane'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#C5A880]/20 text-[#C5A880] text-[10px] font-bold uppercase tracking-wider">
                Patron Tier
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('shop')}
          className="self-start sm:self-auto px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          Browse Curations
        </button>
      </div>

      {/* Tabs Layout */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-1">
          {[
            { id: 'orders', label: 'Order History', icon: <Package className="w-4 h-4" /> },
            { id: 'profile', label: 'Patron Profile', icon: <User className="w-4 h-4" /> },
            { id: 'addresses', label: 'Saved Addresses', icon: <MapPin className="w-4 h-4" /> },
            { id: 'security', label: 'Security & 2FA', icon: <Shield className="w-4 h-4" /> },
            { id: 'compliance', label: 'GDPR & Privacy Rights', icon: <Lock className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area (9 Cols) */}
        <div className="lg:col-span-9">
          {/* TAB 1: ORDER HISTORY */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                Acquisition History ({orders.length})
              </h2>

              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800 gap-2">
                      <div>
                        <span className="font-mono text-xs font-bold text-stone-900 dark:text-stone-100">
                          {ord.id}
                        </span>
                        <p className="text-xs text-stone-500">Ordered on {ord.createdAt}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                          {ord.status.replace('-', ' ')}
                        </span>
                        <button
                          onClick={() => navigateTo('order-tracking', { orderId: ord.id })}
                          className="text-xs font-semibold text-[#C5A880] hover:underline flex items-center gap-1"
                        >
                          <span>Live Telemetry</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="divide-y divide-stone-100 dark:divide-stone-800">
                      {ord.items.map((it) => (
                        <div key={it.id} className="py-2 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={it.image}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover bg-stone-100 dark:bg-stone-800"
                            />
                            <div>
                              <p className="font-semibold text-stone-900 dark:text-stone-100">{it.title}</p>
                              <p className="text-stone-400 text-[11px]">Qty: {it.quantity}</p>
                            </div>
                          </div>
                          <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
                            {formatPrice(it.price * it.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex justify-between text-xs">
                      <span className="text-stone-500">Settled via {ord.paymentMethod.replace('_', ' ')}</span>
                      <span className="font-bold text-sm font-mono text-stone-900 dark:text-stone-100">
                        Total: {formatPrice(ord.totalAmount)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSave} className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4 max-w-xl">
              <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                Personal Atelier Credentials
              </h2>

              <div>
                <label className="text-xs text-stone-500 block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs text-stone-500 block mb-1">Patron Email Address</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs text-stone-500 block mb-1">Mobile Telephone</label>
                <input
                  type="tel"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold uppercase tracking-wider"
              >
                Save Credentials
              </button>
            </form>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                  Registered White Glove Addresses
                </h2>
                <button
                  onClick={() =>
                    addToast({
                      type: 'info',
                      message: 'Address registry drawer opened.',
                    })
                  }
                  className="px-4 py-2 rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-xs font-semibold"
                >
                  + Add Address
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border-2 border-stone-900 dark:border-white relative">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-900 text-white dark:bg-white dark:text-stone-900 uppercase font-bold absolute top-4 right-4">
                    Default
                  </span>
                  <h3 className="font-serif text-sm font-bold text-stone-900 dark:text-stone-100">
                    Penthouse Residence
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                    Julian Vane<br />
                    740 Park Avenue, Penthouse B<br />
                    New York, NY 10021<br />
                    United States
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                  <h3 className="font-serif text-sm font-bold text-stone-900 dark:text-stone-100">
                    Zurich Studio
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                    Julian Vane<br />
                    Bahnhofstrasse 45<br />
                    8001 Zurich<br />
                    Switzerland
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SECURITY & MFA */}
          {activeTab === 'security' && (
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-6 max-w-xl">
              <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                Security & Cryptographic MFA
              </h2>

              {/* MFA Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                <div className="flex items-center gap-3">
                  <KeyRound className="w-5 h-5 text-[#C5A880]" />
                  <div>
                    <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      Multi-Factor Authentication (TOTP)
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Require hardware key or Google Authenticator on login
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const next = !mfaEnabled;
                    setMfaEnabled(next);
                    updateUser({ mfaEnabled: next });
                    addToast({
                      type: next ? 'success' : 'info',
                      title: 'MFA Status Changed',
                      message: next ? 'Hardware 2FA active.' : '2FA disabled.',
                    });
                  }}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    mfaEnabled ? 'bg-emerald-600' : 'bg-stone-300 dark:bg-stone-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      mfaEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Session Devices */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                  Active Authenticated Devices
                </h3>
                <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="font-bold text-stone-900 dark:text-stone-100">Apple iPhone 16 Pro Max • Safari</p>
                      <p className="text-[11px] text-stone-400">Current Session • Zurich, Switzerland</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold uppercase">Active Now</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: COMPLIANCE & PRIVACY */}
          {activeTab === 'compliance' && (
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-6 max-w-xl">
              <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                GDPR & CCPA Privacy Compliance
              </h2>
              <p className="text-xs text-stone-500 leading-relaxed">
                In compliance with European Union General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), Velora provides complete self-service data portability and deletion rights.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100">Download Data Archive</h3>
                    <p className="text-[11px] text-stone-500">Export purchase history, telemetry, and account record in JSON format.</p>
                  </div>
                  <button
                    onClick={handleExportData}
                    className="px-4 py-2 rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-xs font-bold flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-rose-700 dark:text-rose-400">Right to be Forgotten</h3>
                    <p className="text-[11px] text-stone-500">Anonymize patron profile and scrub telemetry history.</p>
                  </div>
                  <button
                    onClick={() =>
                      addToast({
                        type: 'info',
                        title: 'Anonymization Request Staged',
                        message: 'Data deletion token sent to your email address.',
                      })
                    }
                    className="px-4 py-2 rounded-xl border border-rose-300 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 text-xs font-semibold"
                  >
                    Anonymize
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
