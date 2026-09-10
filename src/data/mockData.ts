import { BlogPost, Coupon, Order } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Architecture of Silence: Why Material Purity Defines Modern Acoustics',
    slug: 'architecture-of-silence-acoustics',
    excerpt: 'An investigation into how beryllium transducers and aircraft-grade aluminum eliminate resonant coloration in high-fidelity monitors.',
    content: [
      'In high-end audio engineering, unwanted micro-resonances are the silent thief of fidelity. Traditional plastic enclosures flex under extreme acoustic pressures, introducing transient smearing across the midrange.',
      'By turning to solid monolithic CNC aluminum and vapor-deposited beryllium diaphragms, acoustic designers achieve an inert canvas. The result is not merely louder sound, but the exact spatial signature of the original recording venue.',
      'At Velora Atelier, every component in our electronics curation undergoes anechoic chamber frequency response verification to ensure honest reproduction.'
    ],
    coverImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=85',
    author: {
      name: 'Marcus Lindqvist',
      role: 'Director of Acoustic Design',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: 'Oct 14, 2026',
    readTime: '6 min read',
    category: 'Design & Craft',
    tags: ['Acoustics', 'Materiality', 'Hi-Fi', 'Design']
  },
  {
    id: 'post-2',
    title: 'Masters of Linen: The Ancient Flemish Tradition Shaping Quiet Luxury',
    slug: 'masters-of-linen-flemish-tradition',
    excerpt: 'Tracing the heritage of 380 GSM Belgian flax from foggy harvest fields to Milanese tailoring workshops.',
    content: [
      'Flax is one of humanity’s oldest cultivated fibers, yet it remains the most technologically advanced natural material for trans-seasonal garments.',
      'Unlike synthetic polymers that trap moisture and pill over time, European long-staple flax possesses hollow fibers that naturally thermoregulate. It softens with every wash, telling the personal journey of its wearer.',
      'Our Aura Trench Coat utilizes Masters of Linen certified zero-waste farming in Belgium, where natural rainfall alone sustains the entire vegetative cycle.'
    ],
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
    author: {
      name: 'Camille Duprès',
      role: 'Head of Textile Sourcing',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: 'Sep 28, 2026',
    readTime: '5 min read',
    category: 'Sartorial Heritage',
    tags: ['Linen', 'Sustainable Luxury', 'Craftsmanship']
  },
  {
    id: 'post-3',
    title: 'Horological Column Wheels: The Mechanical Heart of Modern Precision',
    slug: 'horological-column-wheels-precision',
    excerpt: 'Why mechanical chronographs continue to captivate collectors in an era of digital ubiquity.',
    content: [
      'A column wheel chronograph is widely considered one of the holy grails of mechanical watchmaking. Actuating the start-stop-reset pusher releases a tactile resistance that no digital touch screen could ever replicate.',
      'The Vesper 1974 timepiece bridges mid-century racing chronographs with modern metallurgy, ensuring a 100-meter water resistance rating without sacrificing sapphire exhibition caseback elegance.'
    ],
    coverImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
    author: {
      name: 'Hans Zimmer-Klein',
      role: 'Senior Horology Curator',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
    },
    publishedAt: 'Sep 12, 2026',
    readTime: '8 min read',
    category: 'Horology',
    tags: ['Watches', 'Heritage', 'Engineering']
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'VELORA20',
    discountType: 'percentage',
    discountValue: 20,
    minSpend: 200,
    description: '20% off all orders over $200'
  },
  {
    code: 'WELCOME15',
    discountType: 'percentage',
    discountValue: 15,
    minSpend: 50,
    description: '15% welcome reduction for new collectors'
  },
  {
    code: 'LUXURY50',
    discountType: 'fixed',
    discountValue: 50,
    minSpend: 300,
    description: '$50 instant credit on orders above $300'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'order-101',
    orderNumber: 'VEL-89421',
    createdAt: '2026-09-08T14:22:00Z',
    status: 'In Transit',
    items: [
      {
        productId: 'prod-1',
        title: 'Aethel Acoustic Horizon Headphones',
        price: 480,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
        variantInfo: 'Obsidian Black / Matte Gunmetal'
      },
      {
        productId: 'prod-3',
        title: 'Solstice MagCharge Dual Stand',
        price: 135,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80',
        variantInfo: 'Dark Walnut / Space Gray'
      }
    ],
    shippingAddress: {
      fullName: 'Alexander Wright',
      street: '742 Evergreen Terraces, Penthouse 4',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'United States',
      phone: '+1 (415) 892-0193'
    },
    paymentMethod: 'Mastercard ending in 4092 (256-bit Tokenized)',
    subtotal: 615,
    discount: 123,
    shippingFee: 0,
    tax: 42.50,
    total: 534.50,
    currency: 'USD',
    trackingNumber: 'VEL-TRK-7890124',
    estimatedDelivery: 'Tomorrow by 4:00 PM',
    carrier: 'Velora White Glove Express',
    trackingSteps: [
      { status: 'Order Verified & Encrypted', timestamp: 'Sep 8, 14:22', location: 'Velora Global Hub, Zurich', completed: true },
      { status: 'Artisan Inspection & Hand Packaging', timestamp: 'Sep 9, 09:15', location: 'Atelier Logistics Facility', completed: true },
      { status: 'Dispatched via Express Air Courier', timestamp: 'Sep 9, 18:40', location: 'Zurich International Air Hub', completed: true },
      { status: 'Customs Clearance Completed', timestamp: 'Sep 10, 06:12', location: 'San Francisco Air Cargo Hub', completed: true },
      { status: 'In Transit to Regional Delivery Depot', timestamp: 'Sep 10, 11:30', location: 'Bay Area Fulfillment Center', completed: true, current: true },
      { status: 'Out for White Glove Delivery', timestamp: 'Estimated Sep 11, 09:00', location: 'Destination Address', completed: false },
      { status: 'Delivered & Signed', timestamp: 'Pending', location: 'Front Concierge', completed: false }
    ]
  },
  {
    id: 'order-102',
    orderNumber: 'VEL-77219',
    createdAt: '2026-08-20T10:15:00Z',
    status: 'Delivered',
    items: [
      {
        productId: 'prod-8',
        title: 'Kyoto Botanical Renewal Elixir',
        price: 95,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
        variantInfo: '50ml Violet Flacon'
      }
    ],
    shippingAddress: {
      fullName: 'Alexander Wright',
      street: '742 Evergreen Terraces, Penthouse 4',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'United States',
      phone: '+1 (415) 892-0193'
    },
    paymentMethod: 'Apple Pay (Biometric Authorization)',
    subtotal: 190,
    discount: 28.50,
    shippingFee: 0,
    tax: 14.20,
    total: 175.70,
    currency: 'USD',
    trackingNumber: 'VEL-TRK-6619028',
    estimatedDelivery: 'Delivered on Aug 23',
    carrier: 'Velora Concierge Logistics',
    trackingSteps: [
      { status: 'Order Confirmed', timestamp: 'Aug 20, 10:15', location: 'Kyoto Atelier Station', completed: true },
      { status: 'Dispatched', timestamp: 'Aug 21, 08:30', location: 'Osaka Hub', completed: true },
      { status: 'In Transit', timestamp: 'Aug 22, 14:00', location: 'SF Depot', completed: true },
      { status: 'Delivered to Concierge', timestamp: 'Aug 23, 11:20', location: 'San Francisco, CA', completed: true, current: true }
    ]
  }
];

export const FAQS = [
  {
    category: 'Orders & Shipping',
    question: 'How does Velora ensure White Glove delivery?',
    answer: 'Every piece leaving our atelier is packed in temperature-controlled shock-absorbing linen cases. We partner exclusively with premier express couriers with end-to-end real-time GPS tracking and mandatory signature confirmation upon receipt.'
  },
  {
    category: 'Orders & Shipping',
    question: 'What is your complimentary shipping policy?',
    answer: 'We provide complimentary carbon-neutral express courier shipping worldwide on all orders exceeding $150 (or equivalent local currency). Express overnight delivery is available during checkout.'
  },
  {
    category: 'Authenticity & Warranty',
    question: 'Are all luxury timepieces and electronics authentic?',
    answer: 'Yes. Every Velora curation comes with a cryptographic NFC certificate of authenticity, serial registration with the manufacturer, and a minimum 3-year international atelier warranty covering mechanical and acoustic performance.'
  },
  {
    category: 'Returns & Exchanges',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day effortless return and exchange guarantee. Items must be in unblemished condition with original packaging and tamper-evident tags intact. Prepaid return courier labels are generated instantly in your Account portal.'
  },
  {
    category: 'Payments & Security',
    question: 'How is my financial and personal data protected?',
    answer: 'Velora adheres to rigorous PCI-DSS Level 1 specifications, employing 256-bit AES end-to-end encryption. Card details are tokenized directly with banking gateways; our servers never store your raw security digits.'
  },
  {
    category: 'Privacy & GDPR',
    question: 'How do you respect GDPR and CCPA rights?',
    answer: 'We believe your digital sovereignty is sacred. You have full self-serve rights in your Account Settings to download all stored personal telemetry in standard JSON format, request complete anonymization, or manage granular cookie consents anytime.'
  }
];
