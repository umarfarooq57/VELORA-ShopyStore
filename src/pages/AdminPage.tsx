import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  BarChart3,
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Tag,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Search,
  ExternalLink,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { products, orders, coupons, formatPrice, addToast } = useStore();
  const [activeTab, setActiveTab] = useState<'kpis' | 'inventory' | 'orders' | 'vouchers'>('kpis');
  const [searchFilter, setSearchFilter] = useState('');

  // Financial KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0) + 48250;
  const totalOrdersCount = orders.length + 28;
  const avgOrderValue = totalRevenue / totalOrdersCount;

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800 gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A880]">
            Atelier Management Portal
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mt-1">
            Store Operations & Inventory Hub
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {(['kpis', 'inventory', 'orders', 'vouchers'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === tab
                  ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              {tab === 'kpis' && 'Overview & KPIs'}
              {tab === 'inventory' && `Stock (${products.length})`}
              {tab === 'orders' && `Orders (${orders.length})`}
              {tab === 'vouchers' && 'Vouchers'}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: KPIS OVERVIEW */}
      {activeTab === 'kpis' && (
        <div className="mt-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-xs font-bold uppercase tracking-wider">Gross Merchandise Value</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="mt-2 text-2xl sm:text-3xl font-bold font-mono text-stone-900 dark:text-stone-100">
                {formatPrice(totalRevenue)}
              </p>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> +24.8% vs last month
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-xs font-bold uppercase tracking-wider">Average Order Value</span>
                <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
              </div>
              <p className="mt-2 text-2xl sm:text-3xl font-bold font-mono text-stone-900 dark:text-stone-100">
                {formatPrice(avgOrderValue)}
              </p>
              <span className="text-[11px] text-stone-400 mt-1 block">High-conviction luxury basket</span>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-xs font-bold uppercase tracking-wider">Conversion Rate</span>
                <BarChart3 className="w-4 h-4 text-blue-600" />
              </div>
              <p className="mt-2 text-2xl sm:text-3xl font-bold font-mono text-stone-900 dark:text-stone-100">
                3.82%
              </p>
              <span className="text-[11px] text-blue-600 font-semibold mt-1 block">Industry benchmark: 1.4%</span>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm">
              <div className="flex items-center justify-between text-stone-500">
                <span className="text-xs font-bold uppercase tracking-wider">Total Dispatches</span>
                <Package className="w-4 h-4 text-purple-600" />
              </div>
              <p className="mt-2 text-2xl sm:text-3xl font-bold font-mono text-stone-900 dark:text-stone-100">
                {totalOrdersCount} Consignments
              </p>
              <span className="text-[11px] text-stone-400 mt-1 block">100% On-Time Delivery</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INVENTORY MANAGEMENT */}
      {activeTab === 'inventory' && (
        <div className="mt-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search inventory by title, brand, or department..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>

            <button
              onClick={() =>
                addToast({
                  type: 'info',
                  title: 'New Piece Modal',
                  message: 'Atelier SKU generator opened.',
                })
              }
              className="px-4 py-2 rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Piece</span>
            </button>
          </div>

          <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 text-stone-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Masterpiece</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Brand</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Stock Allocation</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-stone-900 dark:text-stone-100">{p.title}</p>
                          <p className="text-[10px] text-stone-400 font-mono">SKU-{p.id.slice(0, 8)}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-stone-600 dark:text-stone-400">{p.category}</td>
                      <td className="py-3 px-4 font-semibold text-stone-800 dark:text-stone-200">{p.brand}</td>
                      <td className="py-3 px-4 font-mono font-bold text-stone-900 dark:text-stone-100">
                        {formatPrice(p.price)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            p.stockCount > 5
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {p.stockCount} in Vault
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() =>
                            addToast({
                              type: 'info',
                              message: `Editing ${p.title} parameters...`,
                            })
                          }
                          className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 text-stone-600 dark:text-stone-300"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS */}
      {activeTab === 'orders' && (
        <div className="mt-8 space-y-4">
          <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 text-stone-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Reference</th>
                    <th className="py-3 px-4">Patron</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Fulfillment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/40">
                      <td className="py-3 px-4 font-mono font-bold text-stone-900 dark:text-stone-100">
                        {ord.id}
                      </td>
                      <td className="py-3 px-4 text-stone-800 dark:text-stone-200">{ord.shippingAddress.fullName}</td>
                      <td className="py-3 px-4 text-stone-500">{ord.createdAt}</td>
                      <td className="py-3 px-4 font-mono font-bold text-stone-900 dark:text-stone-100">
                        {formatPrice(ord.totalAmount)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                          {ord.status.replace('-', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: VOUCHERS */}
      {activeTab === 'vouchers' && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {coupons.map((c) => (
            <div
              key={c.code}
              className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-base text-stone-900 dark:text-stone-100 px-3 py-1 bg-stone-100 dark:bg-stone-800 rounded-lg">
                  {c.code}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                  Active
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400">{c.description}</p>
              <div className="text-[11px] text-stone-400 space-y-1 pt-2 border-t border-stone-100 dark:border-stone-800">
                <p>Type: {c.type === 'percentage' ? `${c.value}% Reduction` : `$${c.value} Fixed Credit`}</p>
                <p>Threshold: Orders above ${c.minOrderAmount || 0}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
