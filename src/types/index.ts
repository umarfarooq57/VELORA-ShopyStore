export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD' | 'CAD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD
  format: (amount: number) => string;
}

export interface ProductVariant {
  id: string;
  name: string;
  colorHex?: string;
  colorName?: string;
  size?: string;
  inStock: boolean;
  stockCount: number;
  image?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
  avatar?: string;
}

export interface ProductSpecification {
  group: string;
  items: { label: string; value: string }[];
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  price: number; // in USD
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  subCategory?: string;
  brand: string;
  images: string[];
  videoUrl?: string;
  shortDescription: string;
  description: string;
  features: string[];
  specifications: ProductSpecification[];
  variants: ProductVariant[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFlashSale?: boolean;
  discountPercentage?: number;
  badge?: string;
  tags: string[];
  frequentlyBoughtWithIds?: string[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  iconName: string;
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique item id (product id + selected variant)
  productId: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
  maxStock: number;
}

export interface SavedItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  image: string;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend?: number;
  description: string;
  expiryDate?: string;
}

export interface OrderItem {
  id?: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  variantInfo?: string;
}

export type OrderStatus = 'Processing' | 'Confirmed' | 'Dispatched' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Returned';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  currency: CurrencyCode;
  trackingNumber: string;
  estimatedDelivery: string;
  carrier: string;
  trackingSteps: {
    status: string;
    timestamp: string;
    location: string;
    completed: boolean;
    current?: boolean;
  }[];
}

export interface CustomerUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  phone?: string;
  memberSince: string;
  loyaltyTier: 'Silver' | 'Gold' | 'Platinum' | 'Black Atelier';
  loyaltyPoints: number;
  mfaEnabled: boolean;
  savedAddresses: {
    id: string;
    isDefault: boolean;
    label: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }[];
  orders: Order[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'bot';
  text: string;
  timestamp: string;
}
