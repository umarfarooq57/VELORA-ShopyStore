import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Lock,
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Smartphone,
  Wallet,
  Sparkles,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    appliedCoupon,
    formatPrice,
    createOrder,
    navigateTo,
    user,
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || 'Julian',
    lastName: user?.name?.split(' ')[1] || 'Vane',
    email: user?.email || 'julian.vane@velora-atelier.com',
    phone: '+1 (555) 234-5678',
    address: '740 Park Avenue, Penthouse B',
    city: 'New York',
    state: 'NY',
    zipCode: '10021',
    country: 'United States',
    shippingMethod: 'white-glove', // 'standard', 'white-glove', 'express'
    paymentMethod: 'credit_card', // 'credit_card', 'apple_pay', 'paypal', 'crypto'
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '08/29',
    cardCvc: '888',
    cardName: 'Julian Vane',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState<string | null>(null);

  const shippingRates: Record<string, number> = {
    standard: 0,
    'white-glove': cartSubtotal > 150 ? 0 : 35,
    express: 65,
  };

  const currentShippingCost = shippingRates[formData.shippingMethod] || 0;
  const estimatedTax = (cartSubtotal - discountAmount) * 0.08;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + estimatedTax + currentShippingCost);

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFinalAuthorization = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const order = createOrder({
        shippingAddress: {
          fullName: `${formData.firstName} ${formData.lastName}`,
          addressLine1: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.zipCode,
          country: formData.country,
          phone: formData.phone,
        },
        paymentMethod: formData.paymentMethod,
        shippingCost: currentShippingCost,
        tax: estimatedTax,
      });
      setIsProcessing(false);
      setCompletedOrderId(order.id);
      setStep(4);
    }, 1800);
  };

  if (cart.length === 0 && !completedOrderId) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto px-4">
        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
          No Pieces to Authorize
        </h2>
        <p className="text-xs text-stone-500 mt-2 mb-6">
          Your bag is currently empty. Explore our catalog to add items before checking out.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-3 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold uppercase tracking-wider"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  // Step 4: Success Screen
  if (completedOrderId) {
    return (
      <div className="py-16 max-w-2xl mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 animate-in zoom-in-50 duration-500">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A880]">
          Acquisition Confirmed
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
          Thank You for Your Patronage
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
          Your order has been authorized with 256-bit encryption. A formal certificate of provenance and tracking dispatch will be sent to{' '}
          <strong className="text-stone-900 dark:text-white">{formData.email}</strong>.
        </p>

        <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-left space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-stone-500">Atelier Order Reference:</span>
            <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{completedOrderId}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-stone-500">Authorized Total:</span>
            <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{formatPrice(grandTotal)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-stone-500">Delivery Method:</span>
            <span className="font-bold text-stone-900 dark:text-stone-100 capitalize">{formData.shippingMethod.replace('-', ' ')}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigateTo('order-tracking', { orderId: completedOrderId })}
            className="px-8 py-3.5 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold uppercase tracking-widest hover:bg-[#C5A880] transition-colors shadow-lg"
          >
            Track Real-Time Dispatch →
          </button>
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-3.5 rounded-full border border-stone-300 dark:border-stone-700 text-xs font-semibold uppercase tracking-wider hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Checkout Steps Progress Bar */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setStep(1)}
            className={`flex items-center gap-2 ${step >= 1 ? 'text-[#C5A880]' : 'text-stone-400'}`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 1 ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900' : 'bg-stone-200'}`}>
              1
            </span>
            <span className="hidden sm:inline">Client Details</span>
          </button>
          <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-stone-900 dark:bg-white' : 'bg-stone-200 dark:bg-stone-800'}`} />

          <button
            onClick={() => setStep(2)}
            className={`flex items-center gap-2 ${step >= 2 ? 'text-[#C5A880]' : 'text-stone-400'}`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 2 ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900' : 'bg-stone-200'}`}>
              2
            </span>
            <span className="hidden sm:inline">Courier Logistics</span>
          </button>
          <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-stone-900 dark:bg-white' : 'bg-stone-200 dark:bg-stone-800'}`} />

          <button
            onClick={() => setStep(3)}
            className={`flex items-center gap-2 ${step >= 3 ? 'text-[#C5A880]' : 'text-stone-400'}`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 3 ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900' : 'bg-stone-200'}`}>
              3
            </span>
            <span className="hidden sm:inline">Payment & Review</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Checkout Multi-step Forms (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* STEP 1: Client & Shipping Details */}
          {step === 1 && (
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-6 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span>1. Client & Delivery Destination</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-stone-600 dark:text-stone-400 block mb-1">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleFieldChange('firstName', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-stone-600 dark:text-stone-400 block mb-1">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleFieldChange('lastName', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-stone-600 dark:text-stone-400 block mb-1">Email (Dispatch Updates)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-stone-600 dark:text-stone-400 block mb-1">Mobile Telephone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="text-stone-600 dark:text-stone-400 block mb-1">Street Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleFieldChange('address', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="text-stone-600 dark:text-stone-400 block mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleFieldChange('city', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-stone-600 dark:text-stone-400 block mb-1">State / Province</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleFieldChange('state', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-stone-600 dark:text-stone-400 block mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => handleFieldChange('zipCode', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Continue to Logistics</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Courier Logistics */}
          {step === 2 && (
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-6 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                2. Select Courier Protocol
              </h2>

              <div className="space-y-3">
                {[
                  {
                    id: 'white-glove',
                    title: 'White Glove Concierge Courier (Signature Required)',
                    desc: 'Hand-inspected, carbon-neutral climate-controlled transit with unboxing & placement.',
                    price: cartSubtotal > 150 ? 'Complimentary' : '$35',
                  },
                  {
                    id: 'express',
                    title: 'Overnight Air Priority Charter',
                    desc: 'Guaranteed 24-hour delivery via private dedicated cargo partner.',
                    price: '$65',
                  },
                  {
                    id: 'standard',
                    title: 'Standard Carbon-Offset Ground Courier',
                    desc: 'Reliable 3-5 business days delivery in recyclable padded casing.',
                    price: 'Complimentary',
                  },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.shippingMethod === opt.id
                        ? 'border-stone-900 bg-stone-50 dark:border-white dark:bg-stone-800/80'
                        : 'border-stone-200 dark:border-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={formData.shippingMethod === opt.id}
                          onChange={() => handleFieldChange('shippingMethod', opt.id)}
                          className="mt-1 text-stone-900 focus:ring-stone-900"
                        />
                        <div>
                          <p className="text-xs font-bold text-stone-900 dark:text-stone-100">{opt.title}</p>
                          <p className="text-[11px] text-stone-500 mt-0.5">{opt.desc}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-stone-900 dark:text-stone-100">
                        {opt.price}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Method & Review */}
          {step === 3 && (
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-6 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                3. Secure Payment Gateway
              </h2>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'credit_card', label: 'Credit Card', icon: <CreditCard className="w-4 h-4" /> },
                  { id: 'apple_pay', label: 'Apple Pay', icon: <Smartphone className="w-4 h-4" /> },
                  { id: 'paypal', label: 'PayPal', icon: <DollarSign className="w-4 h-4" /> },
                  { id: 'crypto', label: 'Web3 / USDC', icon: <Wallet className="w-4 h-4" /> },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleFieldChange('paymentMethod', m.id)}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                      formData.paymentMethod === m.id
                        ? 'border-stone-900 bg-stone-900 text-white dark:border-white dark:bg-white dark:text-stone-900 shadow-sm'
                        : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-stone-400'
                    }`}
                  >
                    {m.icon}
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>

              {formData.paymentMethod === 'credit_card' && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-stone-900 to-stone-800 text-white shadow-lg space-y-4 max-w-sm">
                    <div className="flex justify-between items-center text-[10px] tracking-widest text-[#C5A880]">
                      <span>VELORA PRIVATE CLIENT</span>
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <p className="font-mono text-base tracking-widest">{formData.cardNumber}</p>
                    <div className="flex justify-between text-[11px] font-mono">
                      <span>{formData.cardName}</span>
                      <span>EXP: {formData.cardExpiry}</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-stone-600 dark:text-stone-400 block mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={formData.cardName}
                        onChange={(e) => handleFieldChange('cardName', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-stone-600 dark:text-stone-400 block mb-1">Card Expiry</label>
                        <input
                          type="text"
                          value={formData.cardExpiry}
                          onChange={(e) => handleFieldChange('cardExpiry', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="text-stone-600 dark:text-stone-400 block mb-1">CVV / CVC Security</label>
                        <input
                          type="text"
                          value={formData.cardCvc}
                          onChange={(e) => handleFieldChange('cardCvc', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'apple_pay' && (
                <div className="p-6 rounded-xl bg-stone-50 dark:bg-stone-800/60 text-center space-y-2 text-xs">
                  <Smartphone className="w-8 h-8 mx-auto text-stone-700 dark:text-stone-300" />
                  <p className="font-bold text-stone-900 dark:text-stone-100">Biometric Apple Pay Ready</p>
                  <p className="text-stone-500">Touch ID / Face ID prompt will trigger upon clicking Authorize.</p>
                </div>
              )}

              {formData.paymentMethod === 'crypto' && (
                <div className="p-6 rounded-xl bg-stone-50 dark:bg-stone-800/60 text-center space-y-2 text-xs">
                  <Wallet className="w-8 h-8 mx-auto text-[#C5A880]" />
                  <p className="font-bold text-stone-900 dark:text-stone-100">Ethereum / USDC Smart Contract</p>
                  <p className="text-stone-500">Tokenized escrow authorization via Web3 gateway.</p>
                </div>
              )}

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  id="checkout-authorize-btn"
                  onClick={handleFinalAuthorization}
                  disabled={isProcessing}
                  className="px-8 py-3.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold uppercase tracking-widest hover:bg-[#C5A880] hover:text-white transition-all shadow-xl flex items-center gap-2"
                >
                  {isProcessing ? (
                    <span>Encrypting & Authorizing...</span>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Authorize {formatPrice(grandTotal)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Review Accordion (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4">
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100 pb-2 border-b border-stone-200 dark:border-stone-800">
              Acquisition Summary ({cart.length} unique pieces)
            </h3>

            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 items-center text-xs">
                  <img
                    src={item.image}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-stone-900 dark:text-stone-100 truncate">
                      {item.title}
                    </p>
                    <p className="text-stone-500 text-[11px]">
                      Qty {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ''}
                    </p>
                  </div>
                  <span className="font-mono font-semibold text-stone-900 dark:text-stone-100">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 space-y-2 text-xs">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal</span>
                <span className="font-mono text-stone-800 dark:text-stone-200">{formatPrice(cartSubtotal)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Voucher ({appliedCoupon.code})</span>
                  <span className="font-mono">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-500">
                <span>Courier Protocol</span>
                <span className="font-mono text-stone-800 dark:text-stone-200">
                  {currentShippingCost === 0 ? 'Complimentary' : formatPrice(currentShippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Customs & State Tax</span>
                <span className="font-mono text-stone-800 dark:text-stone-200">{formatPrice(estimatedTax)}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex justify-between font-bold text-stone-900 dark:text-stone-100 text-base">
                <span>Grand Total</span>
                <span className="font-mono text-lg">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-stone-800 text-[11px] text-stone-500 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-stone-700 dark:text-stone-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Buyer Protection Guarantee</span>
              </div>
              <p>
                All pieces inspected by master horologists & atelier curators prior to dispatch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
