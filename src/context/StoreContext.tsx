import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  SavedItem,
  Coupon,
  Order,
  CustomerUser,
  CurrencyCode,
  CurrencyConfig,
  ChatMessage
} from '../types';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { INITIAL_COUPONS, INITIAL_ORDERS } from '../data/mockData';

export type PageView =
  | 'home'
  | 'categories'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'account'
  | 'wishlist'
  | 'order-tracking'
  | 'contact'
  | 'about'
  | 'faq'
  | 'privacy'
  | 'terms'
  | 'blog'
  | 'admin';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title?: string;
  message: string;
}

const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    rate: 1.0,
    format: (amt) => `$${amt.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    rate: 0.92,
    format: (amt) => `€${amt.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rate: 0.78,
    format: (amt) => `£${amt.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`,
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    rate: 155.0,
    format: (amt) => `¥${Math.round(amt).toLocaleString('ja-JP')}`,
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    rate: 1.52,
    format: (amt) => `A$${amt.toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`,
  },
  CAD: {
    code: 'CAD',
    symbol: 'C$',
    rate: 1.36,
    format: (amt) => `C$${amt.toLocaleString('en-CA', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`,
  },
};

interface StoreContextType {
  // Navigation
  currentPage: PageView;
  navigateTo: (page: PageView, options?: { productId?: string; category?: string; searchQuery?: string }) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Currency
  currentCurrency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amountUSD: number) => string;
  convertPrice: (amountUSD: number) => number;
  currencies: Record<CurrencyCode, CurrencyConfig>;

  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  savedForLater: SavedItem[];
  addToCart: (product: Product, options?: { quantity?: number; color?: string; size?: string }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  saveItemForLater: (cartItemId: string) => void;
  moveSavedToCart: (savedItemId: string) => void;
  removeSavedItem: (savedItemId: string) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  freeShippingThreshold: number;

  // Coupon
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;

  // Wishlist
  wishlist: string[]; // array of product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // User
  user: CustomerUser | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  toggleMfa: () => void;
  updateUserProfile: (updates: Partial<CustomerUser>) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  selectedTrackingOrder: Order | null;
  setSelectedTrackingOrder: (order: Order | null) => void;

  // Theming & Accessibility
  darkMode: boolean;
  toggleDarkMode: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;

  // CRM Live Chat
  isChatOpen: boolean;
  toggleChat: () => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;

  // Quick View Modal
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // Keyboard Shortcuts Modal
  isShortcutsOpen: boolean;
  setIsShortcutsOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(PRODUCTS[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Currency
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>('USD');

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('velora_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  // Cart & Saved For Later
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('velora_cart');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'prod-1-Obsidian Black',
            productId: 'prod-1',
            title: 'Aethel Acoustic Horizon Headphones',
            price: 480,
            originalPrice: 550,
            image: PRODUCTS[0].images[0],
            selectedColor: 'Obsidian Black',
            selectedSize: 'One Size',
            quantity: 1,
            maxStock: 26,
          },
        ];
  });

  const [savedForLater, setSavedForLater] = useState<SavedItem[]>(() => {
    const saved = localStorage.getItem('velora_saved_items');
    return saved ? JSON.parse(saved) : [];
  });

  // Coupon
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('velora_wishlist');
    return saved ? JSON.parse(saved) : ['prod-2', 'prod-4'];
  });

  // User
  const [user, setUser] = useState<CustomerUser | null>(() => {
    const saved = localStorage.getItem('velora_user');
    return saved
      ? JSON.parse(saved)
      : {
          id: 'usr-4091',
          email: 'alexander.wright@velora-atelier.com',
          fullName: 'Alexander Wright',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          phone: '+1 (415) 892-0193',
          memberSince: 'March 2024',
          loyaltyTier: 'Black Atelier',
          loyaltyPoints: 3450,
          mfaEnabled: true,
          savedAddresses: [
            {
              id: 'addr-1',
              isDefault: true,
              label: 'Penthouse Residence',
              street: '742 Evergreen Terraces, Penthouse 4',
              city: 'San Francisco',
              state: 'CA',
              zipCode: '94107',
              country: 'United States',
            },
          ],
          orders: INITIAL_ORDERS,
        };
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('velora_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState<Order | null>(orders[0] || null);

  // Theme & Accessibility
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('velora_theme') === 'dark';
  });
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('velora_high_contrast') === 'true';
  });

  // CRM Chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      text: 'Good day. Welcome to the Velora Atelier Concierge. How may our curators assist your shopping today?',
      timestamp: 'Just now',
    },
  ]);

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Keyboard Shortcuts Modal
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('velora_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('velora_saved_items', JSON.stringify(savedForLater));
  }, [savedForLater]);

  useEffect(() => {
    localStorage.setItem('velora_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('velora_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('velora_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('velora_user');
    }
  }, [user]);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('velora_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('velora_theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
      localStorage.setItem('velora_high_contrast', 'true');
    } else {
      root.classList.remove('high-contrast');
      localStorage.setItem('velora_high_contrast', 'false');
    }
  }, [highContrast]);

  // Keyboard Navigation Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in form inputs
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName)) {
        if (e.key === 'Escape') {
          target.blur();
        }
        return;
      }

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      } else if (e.key === '/' || (e.metaKey && e.key === 'k') || (e.ctrlKey && e.key === 'k')) {
        e.preventDefault();
        navigateTo('shop');
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) {
          searchInput.focus();
        }
      } else if (e.key.toLowerCase() === 'c') {
        navigateTo('cart');
      } else if (e.key.toLowerCase() === 'w') {
        navigateTo('wishlist');
      } else if (e.key.toLowerCase() === 'h') {
        navigateTo('home');
      } else if (e.key.toLowerCase() === 's') {
        navigateTo('shop');
      } else if (e.key.toLowerCase() === 'a') {
        navigateTo('admin');
      } else if (e.key === 'Escape') {
        setQuickViewProduct(null);
        setIsShortcutsOpen(false);
        setIsChatOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateTo = (page: PageView, options?: { productId?: string; category?: string; searchQuery?: string }) => {
    if (options?.productId) {
      setSelectedProductId(options.productId);
    }
    if (options?.category !== undefined) {
      setSelectedCategory(options.category);
    }
    if (options?.searchQuery !== undefined) {
      setSearchQuery(options.searchQuery);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Price formatting
  const formatPrice = (amountUSD: number): string => {
    const config = CURRENCIES[currentCurrency];
    const converted = amountUSD * config.rate;
    return config.format(converted);
  };

  const convertPrice = (amountUSD: number): number => {
    return amountUSD * CURRENCIES[currentCurrency].rate;
  };

  // Cart Helpers
  const addToCart = (product: Product, options?: { quantity?: number; color?: string; size?: string }) => {
    const qty = options?.quantity || 1;
    const color = options?.color || (product.colors.length > 0 ? product.colors[0].name : undefined);
    const size = options?.size || (product.sizes.length > 0 ? product.sizes[0] : undefined);
    const itemId = `${product.id}-${color || 'def'}-${size || 'def'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: Math.min(item.quantity + qty, product.stockCount) } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images[0],
          selectedColor: color,
          selectedSize: size,
          quantity: qty,
          maxStock: product.stockCount,
        },
      ];
    });

    addToast({
      type: 'success',
      title: 'Added to Bag',
      message: `${product.title} has been added to your atelier order.`,
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    addToast({
      type: 'info',
      message: 'Item removed from bag.',
    });
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: Math.min(quantity, item.maxStock) } : item))
    );
  };

  const saveItemForLater = (cartItemId: string) => {
    const item = cart.find((i) => i.id === cartItemId);
    if (!item) return;

    setSavedForLater((prev) => [
      ...prev,
      {
        id: item.id,
        productId: item.productId,
        title: item.title,
        price: item.price,
        image: item.image,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      },
    ]);

    setCart((prev) => prev.filter((i) => i.id !== cartItemId));

    addToast({
      type: 'info',
      message: 'Moved to your Saved For Later collection.',
    });
  };

  const moveSavedToCart = (savedItemId: string) => {
    const item = savedForLater.find((i) => i.id === savedItemId);
    if (!item) return;

    const product = products.find((p) => p.id === item.productId);
    if (product) {
      addToCart(product, {
        color: item.selectedColor,
        size: item.selectedSize,
      });
    }

    setSavedForLater((prev) => prev.filter((i) => i.id !== savedItemId));
  };

  const removeSavedItem = (savedItemId: string) => {
    setSavedForLater((prev) => prev.filter((i) => i.id !== savedItemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 150; // USD

  // Coupon
  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const coupon = INITIAL_COUPONS.find((c) => c.code === trimmed);

    if (!coupon) {
      return { success: false, message: 'Invalid or expired promotional voucher code.' };
    }

    if (coupon.minSpend && cartSubtotal < coupon.minSpend) {
      return {
        success: false,
        message: `Order must be at least $${coupon.minSpend} to apply code ${coupon.code}.`,
      };
    }

    setAppliedCoupon(coupon);
    addToast({
      type: 'success',
      title: 'Voucher Applied',
      message: `${coupon.code} applied successfully: ${coupon.description}`,
    });
    return { success: true, message: 'Coupon code applied successfully!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast({
      type: 'info',
      message: 'Coupon removed from order.',
    });
  };

  const discountAmount = appliedCoupon
    ? appliedCoupon.discountType === 'percentage'
      ? (cartSubtotal * appliedCoupon.discountValue) / 100
      : appliedCoupon.discountValue
    : 0;

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      const product = products.find((p) => p.id === productId);
      if (exists) {
        addToast({
          type: 'info',
          message: `${product?.title || 'Item'} removed from wishlist.`,
        });
      } else {
        addToast({
          type: 'success',
          title: 'Saved to Wishlist',
          message: `${product?.title || 'Item'} saved to your atelier wishlist.`,
        });
      }
      return updated;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // User Auth
  const login = (email: string, name = 'Alexander Wright') => {
    setUser({
      id: 'usr-' + Math.floor(1000 + Math.random() * 9000),
      email,
      fullName: name,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      phone: '+1 (415) 892-0193',
      memberSince: 'September 2026',
      loyaltyTier: 'Gold',
      loyaltyPoints: 1200,
      mfaEnabled: true,
      savedAddresses: [
        {
          id: 'addr-1',
          isDefault: true,
          label: 'Primary Residence',
          street: '100 California Street, Suite 400',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94111',
          country: 'United States',
        },
      ],
      orders,
    });
    addToast({
      type: 'success',
      title: 'Authenticated',
      message: `Welcome back, ${name}. Your session is encrypted.`,
    });
  };

  const logout = () => {
    setUser(null);
    addToast({
      type: 'info',
      message: 'You have signed out securely.',
    });
  };

  const toggleMfa = () => {
    if (!user) return;
    setUser((prev) => (prev ? { ...prev, mfaEnabled: !prev.mfaEnabled } : null));
    addToast({
      type: 'success',
      title: 'Security Updated',
      message: user.mfaEnabled ? 'Multi-Factor Authentication disabled.' : 'Multi-Factor Authentication (2FA) enabled.',
    });
  };

  const updateUserProfile = (updates: Partial<CustomerUser>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
    addToast({
      type: 'success',
      message: 'Profile settings saved.',
    });
  };

  // Orders
  const createOrder = (orderData: Partial<Order>): Order => {
    const newOrderNumber = 'VEL-' + Math.floor(10000 + Math.random() * 90000);
    const trackingNumber = 'VEL-TRK-' + Math.floor(1000000 + Math.random() * 9000000);

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: newOrderNumber,
      createdAt: new Date().toISOString(),
      status: 'Processing',
      items: cart.map((i) => ({
        productId: i.productId,
        title: i.title,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
        variantInfo: [i.selectedColor, i.selectedSize].filter(Boolean).join(' / '),
      })),
      shippingAddress: orderData.shippingAddress || {
        fullName: 'Alexander Wright',
        street: '742 Evergreen Terraces',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94107',
        country: 'United States',
        phone: '+1 (415) 892-0193',
      },
      paymentMethod: orderData.paymentMethod || 'Credit Card (Tokenized)',
      subtotal: cartSubtotal,
      discount: discountAmount,
      shippingFee: cartSubtotal >= freeShippingThreshold ? 0 : 25,
      tax: (cartSubtotal - discountAmount) * 0.08,
      total:
        cartSubtotal -
        discountAmount +
        (cartSubtotal >= freeShippingThreshold ? 0 : 25) +
        (cartSubtotal - discountAmount) * 0.08,
      currency: currentCurrency,
      trackingNumber,
      estimatedDelivery: 'Estimated 2-3 Business Days',
      carrier: 'Velora White Glove Express',
      trackingSteps: [
        {
          status: 'Order Placed & Encrypted',
          timestamp: 'Just now',
          location: 'Velora Security Gateway',
          completed: true,
          current: true,
        },
        {
          status: 'Payment Authorized & Transferred',
          timestamp: 'Pending verification',
          location: 'Banking Network',
          completed: false,
        },
        {
          status: 'Curated at Atelier Logistics',
          timestamp: 'Scheduled',
          location: 'Central Vault',
          completed: false,
        },
        {
          status: 'Dispatched via White Glove Courier',
          timestamp: 'Pending',
          location: 'Air Logistics',
          completed: false,
        },
        {
          status: 'Delivered & Hand-Inspected',
          timestamp: 'Pending',
          location: 'Destination',
          completed: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    setSelectedTrackingOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    addToast({
      type: 'info',
      message: `Order status updated to ${status}.`,
    });
  };

  // Admin Product CRUD
  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
    addToast({
      type: 'success',
      title: 'Product Published',
      message: `${product.title} has been added to Velora catalog.`,
    });
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    addToast({
      type: 'success',
      message: 'Product catalog updated.',
    });
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast({
      type: 'warning',
      message: 'Product removed from catalog.',
    });
  };

  // CRM Chat Messages & Auto Responses
  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setChatMessages((prev) => [...prev, userMsg]);

    // Simulated Smart Concierge Response
    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply =
        'Thank you for contacting the Velora Atelier Concierge. A senior curator is reviewing your request.';

      if (lower.includes('discount') || lower.includes('coupon') || lower.includes('promo')) {
        reply =
          'You may enjoy 20% off orders over $200 with promo code VELORA20, or WELCOME15 for your first atelier acquisition!';
      } else if (lower.includes('track') || lower.includes('shipping') || lower.includes('order')) {
        reply =
          'You can track your orders in real time in our Order Tracking section using your VEL- order number. Complimentary express delivery is included on all orders over $150.';
      } else if (lower.includes('return') || lower.includes('refund')) {
        reply =
          'We offer 30-day complimentary white-glove returns. Simply generate a prepaid courier label in your Account Orders center.';
      } else if (lower.includes('watch') || lower.includes('headphones') || lower.includes('recommend')) {
        reply =
          'Our most celebrated piece right now is the Aethel Acoustic Horizon Headphones and the Vesper 1974 Swiss Chronograph. Would you like me to open the detail view?';
      }

      const agentMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'bot',
        text: reply,
        timestamp: 'Just now',
      };
      setChatMessages((prev) => [...prev, agentMsg]);
    }, 900);
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleHighContrast = () => setHighContrast((prev) => !prev);
  const toggleChat = () => setIsChatOpen((prev) => !prev);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        navigateTo,
        selectedProductId,
        setSelectedProductId,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        currentCurrency,
        setCurrency: setCurrentCurrency,
        formatPrice,
        convertPrice,
        currencies: CURRENCIES,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        savedForLater,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        saveItemForLater,
        moveSavedToCart,
        removeSavedItem,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        freeShippingThreshold,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        user,
        isAuthenticated: !!user,
        login,
        logout,
        toggleMfa,
        updateUserProfile,
        orders,
        createOrder,
        updateOrderStatus,
        selectedTrackingOrder,
        setSelectedTrackingOrder,
        darkMode,
        toggleDarkMode,
        highContrast,
        toggleHighContrast,
        isChatOpen,
        toggleChat,
        chatMessages,
        sendChatMessage,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        toasts,
        addToast,
        removeToast,
        isShortcutsOpen,
        setIsShortcutsOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
