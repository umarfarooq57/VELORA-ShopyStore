import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Aethel Acoustic Horizon Headphones',
    slug: 'aethel-acoustic-horizon-headphones',
    subtitle: 'Beryllium Driver Spatial Studio Monitors',
    price: 480,
    originalPrice: 550,
    rating: 4.9,
    reviewCount: 142,
    category: 'Electronics',
    subCategory: 'Audio',
    brand: 'Bang & Olufsen',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=85'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-listening-to-music-on-headphones-40082-large.mp4',
    shortDescription: 'Precision-machined aircraft grade aluminum, lambskin memory foam ear cushions, and 40mm electro-acoustic acoustic transducers.',
    description: 'The Aethel Acoustic Horizon delivers uncompromising auditory clarity. Engineered for discerning audiophiles and studio sound engineers alike, each component is calibrated within 0.1dB tolerances. Active noise cancellation powered by dedicated dual DSP engines creates a sanctuary of pure acoustic silence, revealing details in your audio tracks you have never experienced before.',
    features: [
      'Custom 40mm Beryllium alloy dynamic drivers',
      'Active Hybrid Noise Cancellation with 4 external microphones',
      '48-hour continuous battery life on single USB-C charge',
      'Full-grain Italian lambskin leather and memory foam isolation',
      'Multipoint Bluetooth 5.4 with LDAC, aptX Adaptive, and AAC codecs',
      'CNC milled solid aluminum headband with calibrated damping hinge'
    ],
    specifications: [
      {
        group: 'Acoustic Architecture',
        items: [
          { label: 'Driver Size', value: '40mm custom beryllium' },
          { label: 'Frequency Range', value: '8 Hz – 48,000 Hz' },
          { label: 'Impedance', value: '32 Ohms passive / Active DSP' },
          { label: 'Total Harmonic Distortion', value: '<0.05% @ 1kHz, 100dB SPL' }
        ]
      },
      {
        group: 'Connectivity & Power',
        items: [
          { label: 'Battery Capacity', value: '920 mAh Lithium-Polymer' },
          { label: 'Fast Charge', value: '15 mins provides 8 hours playback' },
          { label: 'Wired Mode', value: '3.5mm balanced silver-plated cable included' },
          { label: 'Weight', value: '284 grams' }
        ]
      }
    ],
    variants: [
      { id: 'v1-1', name: 'Obsidian Black / Matte Gunmetal', colorHex: '#1C1C1E', colorName: 'Obsidian Black', inStock: true, stockCount: 14 },
      { id: 'v1-2', name: 'Champagne Silver / Desert Sand', colorHex: '#D9CAB3', colorName: 'Champagne Sand', inStock: true, stockCount: 8 },
      { id: 'v1-3', name: 'Midnight Navy / Burnished Brass', colorHex: '#1E293B', colorName: 'Midnight Navy', inStock: true, stockCount: 4 }
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#1C1C1E' },
      { name: 'Champagne Sand', hex: '#D9CAB3' },
      { name: 'Midnight Navy', hex: '#1E293B' }
    ],
    sizes: ['One Size'],
    inStock: true,
    stockCount: 26,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    badge: 'Atelier Choice',
    tags: ['Audio', 'Audiophile', 'Noise Cancelling', 'Wireless'],
    frequentlyBoughtWithIds: ['prod-3', 'prod-6']
  },
  {
    id: 'prod-2',
    title: 'Vesper Chronograph 1974 Heritage',
    slug: 'vesper-chronograph-1974-heritage',
    subtitle: 'Automatic Swiss Movement Sapphire Timepiece',
    price: 1250,
    originalPrice: 1450,
    rating: 5.0,
    reviewCount: 89,
    category: 'Watches',
    subCategory: 'Luxury Horology',
    brand: 'Montblanc',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85'
    ],
    shortDescription: '316L surgical stainless steel casing with double-domed anti-reflective sapphire crystal, exhibition caseback, and vegetable-tanned alligator strap.',
    description: 'Hand-assembled in Glashütte, the Vesper Heritage 1974 represents the golden era of mechanical chronograph design. Housing the cal. 2894-2 automatic column-wheel movement with 48 hours of power reserve, it delivers micro-mechanical perfection.',
    features: [
      'Calibre VL-84 automatic mechanical column wheel movement',
      'Double-domed scratchproof sapphire crystal with 5 AR coatings',
      'Exhibition caseback showing Côtes de Genève finishing and blued screws',
      '100m / 10 ATM pressure-tested water resistance',
      'Hand-stitched genuine Tuscan saddle leather strap with deployment clasp'
    ],
    specifications: [
      {
        group: 'Case & Dial',
        items: [
          { label: 'Diameter', value: '40.5 mm' },
          { label: 'Thickness', value: '11.8 mm' },
          { label: 'Lug Width', value: '20 mm' },
          { label: 'Luminescence', value: 'Super-LumiNova Grade X1' }
        ]
      }
    ],
    variants: [
      { id: 'v2-1', name: 'Brushed Steel / Sunburst Slate Dial', colorHex: '#64748B', colorName: 'Slate Grey', inStock: true, stockCount: 6 },
      { id: 'v2-2', name: 'Rose Gold PVD / Porcelain Enamel White', colorHex: '#D4AF37', colorName: 'Rose Gold', inStock: true, stockCount: 3 }
    ],
    colors: [
      { name: 'Slate Grey', hex: '#64748B' },
      { name: 'Rose Gold', hex: '#D4AF37' }
    ],
    sizes: ['40mm'],
    inStock: true,
    stockCount: 9,
    isFeatured: true,
    isBestSeller: true,
    badge: 'Limited Run',
    tags: ['Horology', 'Swiss Movement', 'Heritage', 'Automatic'],
    frequentlyBoughtWithIds: ['prod-5']
  },
  {
    id: 'prod-3',
    title: 'Solstice MagCharge Dual Stand',
    slug: 'solstice-magcharge-dual-stand',
    subtitle: 'Machined Brass & Matte Walnut Wireless Dock',
    price: 135,
    originalPrice: 160,
    rating: 4.8,
    reviewCount: 310,
    category: 'Mobile Accessories',
    subCategory: 'Charging',
    brand: 'Velora Atelier',
    images: [
      'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1200&q=85'
    ],
    shortDescription: 'Weighted 1.2kg solid aerospace aluminum and walnut base that stays firmly rooted when detaching your magnetic phone.',
    description: 'Designed as sculptural desk art while delivering Qi2 15W fast magnetic induction to your phone and earbuds simultaneously. Finished with hand-rubbed Danish oil and micro-bead blasted anodized surfaces.',
    features: [
      'Qi2 Certified 15W high-efficiency fast wireless output',
      'Solid CNC aluminum body with anti-friction weighted silicone footing',
      'Sustainable American walnut timber inset',
      'Hidden 45W braided nylon USB-C power cord with brass accents'
    ],
    specifications: [
      {
        group: 'Power & Physical',
        items: [
          { label: 'Weight', value: '1,180g (No-lift design)' },
          { label: 'Input', value: 'USB-C PD 3.0 30W+' },
          { label: 'Primary Pad', value: '15W MagSafe / Qi2' },
          { label: 'Secondary Pad', value: '5W AirPods / Qi' }
        ]
      }
    ],
    variants: [
      { id: 'v3-1', name: 'Dark Walnut / Space Gray', colorHex: '#4A3728', colorName: 'Dark Walnut', inStock: true, stockCount: 35 },
      { id: 'v3-2', name: 'Natural Oak / Frosted Silver', colorHex: '#C2B280', colorName: 'Natural Oak', inStock: true, stockCount: 19 }
    ],
    colors: [
      { name: 'Dark Walnut', hex: '#4A3728' },
      { name: 'Natural Oak', hex: '#C2B280' }
    ],
    sizes: ['Standard'],
    inStock: true,
    stockCount: 54,
    isTrending: true,
    isFlashSale: true,
    discountPercentage: 15,
    tags: ['MagSafe', 'Wireless Charger', 'Desk Decor', 'Minimalist'],
    frequentlyBoughtWithIds: ['prod-1', 'prod-7']
  },
  {
    id: 'prod-4',
    title: 'Aura Linen Trench Coat',
    slug: 'aura-linen-trench-coat',
    subtitle: 'Water-Resistant Belgian Flax Overcoat',
    price: 620,
    originalPrice: 690,
    rating: 4.9,
    reviewCount: 76,
    category: "Women's Clothing",
    subCategory: 'Outerwear',
    brand: 'Velora Couture',
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
    ],
    shortDescription: 'Tailored with dramatic drape, storm flap, horn buttons, and an unlined interior with bound silk seams for effortless trans-seasonal layering.',
    description: 'Crafted from heavy 380gsm Belgian linen treated with a bio-based micro-wax finish for natural drizzle resistance while maintaining exquisite breathability. Cut in a relaxed yet statuesque double-breasted profile.',
    features: [
      '100% Certified Masters of Linen Belgian flax',
      'Custom-cast natural buffalo horn buttons with subtle logo etching',
      'Removable belt with leather-wrapped buckle',
      'Internal passport pocket with concealed magnetic closure'
    ],
    specifications: [
      {
        group: 'Fit & Material',
        items: [
          { label: 'Origin', value: 'Woven in Ghent, Hand-cut in Milan' },
          { label: 'Weight', value: '380 GSM Heavyweight Flax' },
          { label: 'Care', value: 'Specialist dry clean or gentle cold cycle' }
        ]
      }
    ],
    variants: [
      { id: 'v4-1', name: 'Raw Stone Beige', colorHex: '#D8D2C2', colorName: 'Raw Stone', inStock: true, stockCount: 12 },
      { id: 'v4-2', name: 'Deep Olive', colorHex: '#4B5320', colorName: 'Deep Olive', inStock: true, stockCount: 9 },
      { id: 'v4-3', name: 'Noir Monolith', colorHex: '#1A1A1A', colorName: 'Noir', inStock: true, stockCount: 15 }
    ],
    colors: [
      { name: 'Raw Stone', hex: '#D8D2C2' },
      { name: 'Deep Olive', hex: '#4B5320' },
      { name: 'Noir', hex: '#1A1A1A' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 36,
    isFeatured: true,
    isNewArrival: true,
    badge: 'Runway SS26',
    tags: ['Linen', 'Outerwear', 'Tailoring', 'Quiet Luxury'],
    frequentlyBoughtWithIds: ['prod-5']
  },
  {
    id: 'prod-5',
    title: 'Meridian Chelsea Calfskin Boot',
    slug: 'meridian-chelsea-calfskin-boot',
    subtitle: 'Blake-Stitched Goodyear Welted Leather Boot',
    price: 495,
    originalPrice: 580,
    rating: 4.9,
    reviewCount: 118,
    category: 'Shoes',
    subCategory: 'Footwear',
    brand: 'Velora Atelier',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1200&q=85'
    ],
    shortDescription: 'Tuscan full-grain French calfskin with Dainite British rubber studded soles for longevity and water resistance in every climate.',
    description: 'An architectural silhouette constructed using authentic Blake-Rapid stitching. The leather is hand-burnished in Florence with organic beeswax creams, developing a rich patina that deepens with every stride.',
    features: [
      'Full-grain Tuscan box-calf leather',
      'Dainite all-weather rubber sole for traction without bulk',
      'Full glove-leather lining with cork filler that molds to your arch',
      'Reinforced Japanese nylon pull tabs and durable stretch webbing'
    ],
    specifications: [
      {
        group: 'Construction',
        items: [
          { label: 'Stitch Method', value: 'Blake-Rapid Welt' },
          { label: 'Last', value: 'Anatomical European Round Toe' },
          { label: 'Country', value: 'Made in Tuscany, Italy' }
        ]
      }
    ],
    variants: [
      { id: 'v5-1', name: 'Cognac Saddle Brown', colorHex: '#7B3F00', colorName: 'Cognac', inStock: true, stockCount: 18 },
      { id: 'v5-2', name: 'Pitch Black Matte', colorHex: '#111111', colorName: 'Pitch Black', inStock: true, stockCount: 22 }
    ],
    colors: [
      { name: 'Cognac', hex: '#7B3F00' },
      { name: 'Pitch Black', hex: '#111111' }
    ],
    sizes: ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'],
    inStock: true,
    stockCount: 40,
    isTrending: true,
    isBestSeller: true,
    tags: ['Boots', 'Italian Leather', 'Footwear', 'Goodyear Welt'],
    frequentlyBoughtWithIds: ['prod-4', 'prod-2']
  },
  {
    id: 'prod-6',
    title: 'Kanso Pure Japanese Pour-Over Set',
    slug: 'kanso-pure-japanese-pour-over-set',
    subtitle: 'Ceramic Dropper, Heatproof Borosilicate & Brass Base',
    price: 185,
    originalPrice: 220,
    rating: 4.95,
    reviewCount: 204,
    category: 'Home & Kitchen',
    subCategory: 'Coffee & Tea',
    brand: 'Aesop Home',
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85'
    ],
    shortDescription: 'Hasami-yaki matte stoneware dripper with double-walled 700ml server and integrated magnetic gram scale stand.',
    description: 'Transform your morning ritual into an intentional mindfulness experience. The conical ribbing provides ideal water extraction velocity, highlighting delicate floral and citrus notes in single-origin beans.',
    features: [
      'Hasami clay dripper fired at 1,300°C for extreme durability',
      'Dual-walled laboratory-grade borosilicate carafe (keeps coffee hot for 45 min)',
      'Machined brushed brass drip stand with silicone drip tray',
      'Pack of 100 organic unbleached hemp cone filters included'
    ],
    specifications: [
      {
        group: 'Materials',
        items: [
          { label: 'Capacity', value: '700ml (2-4 cups)' },
          { label: 'Dishwasher Safe', value: 'Glass carafe yes, brass hand wipe' },
          { label: 'Origin', value: 'Nagasaki, Japan' }
        ]
      }
    ],
    variants: [
      { id: 'v6-1', name: 'Chalk White Stoneware', colorHex: '#F5F5F0', colorName: 'Chalk White', inStock: true, stockCount: 20 },
      { id: 'v6-2', name: 'Charcoal Black Basalt', colorHex: '#2E2E2E', colorName: 'Basalt Charcoal', inStock: true, stockCount: 15 }
    ],
    colors: [
      { name: 'Chalk White', hex: '#F5F5F0' },
      { name: 'Basalt Charcoal', hex: '#2E2E2E' }
    ],
    sizes: ['700ml'],
    inStock: true,
    stockCount: 35,
    isFeatured: true,
    isFlashSale: true,
    discountPercentage: 16,
    tags: ['Coffee', 'Ceramics', 'Ritual', 'Kitchen'],
    frequentlyBoughtWithIds: ['prod-1', 'prod-8']
  },
  {
    id: 'prod-7',
    title: 'Titanium StudioBook Pro 16X',
    slug: 'titanium-studiobook-pro-16x',
    subtitle: 'OLED 3.2K 120Hz Creator Workstation',
    price: 2690,
    originalPrice: 2950,
    rating: 4.85,
    reviewCount: 52,
    category: 'Laptops',
    subCategory: 'Computers',
    brand: 'Velora Tech',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1200&q=85'
    ],
    shortDescription: 'Calibrated 100% DCI-P3 Nano-Texture display, whisper-quiet vapor chamber cooling, and magnesium chassis.',
    description: 'The pinnacle of portable computational power. Whether rendering 8K cinema footage, training neural models locally, or composing multi-track orchestral scores, the StudioBook Pro executes every workload effortlessly.',
    features: [
      '16.2" Nano-Etched 120Hz ProMotion OLED (1600 nits peak HDR)',
      '16-Core Ultra 9 Silicon with dedicated 45 TOPS NPU',
      '64GB Unified LPDDR5X RAM & 2TB Gen5 NVMe SSD',
      'Studio six-speaker array with force-cancelling woofers'
    ],
    specifications: [
      {
        group: 'Hardware Specifications',
        items: [
          { label: 'Processor', value: '16-Core 3nm Architecture' },
          { label: 'Memory', value: '64GB LPDDR5X' },
          { label: 'Ports', value: '3x Thunderbolt 5, HDMI 2.1, SD Express' },
          { label: 'Battery', value: '99.9 Wh (Up to 22h battery life)' }
        ]
      }
    ],
    variants: [
      { id: 'v7-1', name: 'Space Titanium', colorHex: '#52525B', colorName: 'Space Titanium', inStock: true, stockCount: 7 },
      { id: 'v7-2', name: 'Liquid Silver', colorHex: '#E2E8F0', colorName: 'Liquid Silver', inStock: true, stockCount: 5 }
    ],
    colors: [
      { name: 'Space Titanium', hex: '#52525B' },
      { name: 'Liquid Silver', hex: '#E2E8F0' }
    ],
    sizes: ['16-inch'],
    inStock: true,
    stockCount: 12,
    isFeatured: true,
    badge: 'Pro Tier',
    tags: ['Laptop', 'Workstation', 'OLED', 'Performance'],
    frequentlyBoughtWithIds: ['prod-1', 'prod-3']
  },
  {
    id: 'prod-8',
    title: 'Kyoto Botanical Renewal Elixir',
    slug: 'kyoto-botanical-renewal-elixir',
    subtitle: 'Cold-Pressed Camellia & Bakuchiol Active Serum',
    price: 95,
    originalPrice: 110,
    rating: 4.92,
    reviewCount: 289,
    category: 'Beauty',
    subCategory: 'Skincare',
    brand: 'Aesop Home',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1608248597359-05244510b65d?auto=format&fit=crop&w=1200&q=85'
    ],
    shortDescription: 'Potent cellular regenerative oil harvested from organic wild camellia seeds on Izu Oshima island.',
    description: 'Fortified with cold-pressed squalane, marine algae peptide complexes, and 2% natural plant-derived bakuchiol to stimulate collagen synthesis while locking deep moisture into the skin barrier.',
    features: [
      '100% natural, vegan, cruelty-free, and dermatologically tested',
      'Non-comedogenic dry oil formulation absorbs within 60 seconds',
      'Subtle woodsy hinoki cypress and white tea aromatic profile',
      'UV-protective violet glass bottle preserving botanical potency'
    ],
    specifications: [
      {
        group: 'Formulation Details',
        items: [
          { label: 'Volume', value: '50ml / 1.7 fl oz' },
          { label: 'Key Actives', value: 'Tsubaki Oil, Bakuchiol, Vitamin E' },
          { label: 'Skin Types', value: 'All types including reactive and sensitive' }
        ]
      }
    ],
    variants: [
      { id: 'v8-1', name: 'Standard Violet Flacon 50ml', colorHex: '#4C1D95', colorName: 'Violet Flacon', inStock: true, stockCount: 65 }
    ],
    colors: [
      { name: 'Violet Amber', hex: '#4C1D95' }
    ],
    sizes: ['50ml', '100ml'],
    inStock: true,
    stockCount: 65,
    isTrending: true,
    isBestSeller: true,
    tags: ['Skincare', 'Clean Beauty', 'Botanical', 'Serum'],
    frequentlyBoughtWithIds: ['prod-6']
  },
  {
    id: 'prod-9',
    title: 'Nordic Contour Walnut Lounge Chair',
    slug: 'nordic-contour-walnut-lounge-chair',
    subtitle: 'Hand-Molded Plywood with Bouclé Wool Cushioning',
    price: 1850,
    originalPrice: 2100,
    rating: 4.96,
    reviewCount: 44,
    category: 'Furniture',
    subCategory: 'Living Room',
    brand: 'Tom Dixon',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85'
    ],
    shortDescription: 'A statement silhouette sculpted from 7-ply American Black Walnut veneer with Danish ivory bouclé upholstery.',
    description: 'The Contour Lounge Chair is an ode to mid-century Scandinavian functionalism. Every curve is mathematically tested to cradle the spine with optimal ergonomic lumbar support.',
    features: [
      'Sustainably harvested FSC-certified solid walnut frame',
      'High-resilience memory foam core covered in Italian wool bouclé',
      'Concealed counter-weight base for smooth 360-degree swivel',
      'Pre-assembled by master furniture craftsmen in Copenhagen'
    ],
    specifications: [
      {
        group: 'Dimensions & Care',
        items: [
          { label: 'Dimensions', value: '84cm H x 92cm W x 88cm D' },
          { label: 'Seat Height', value: '42cm' },
          { label: 'Weight Capacity', value: '180 kg' }
        ]
      }
    ],
    variants: [
      { id: 'v9-1', name: 'Walnut / Ivory Bouclé', colorHex: '#F5F5DC', colorName: 'Ivory Bouclé', inStock: true, stockCount: 5 },
      { id: 'v9-2', name: 'Smoked Ash / Charcoal Wool', colorHex: '#333333', colorName: 'Charcoal Wool', inStock: true, stockCount: 3 }
    ],
    colors: [
      { name: 'Ivory Bouclé', hex: '#F5F5DC' },
      { name: 'Charcoal Wool', hex: '#333333' }
    ],
    sizes: ['Standard Lounge'],
    inStock: true,
    stockCount: 8,
    isFeatured: true,
    badge: 'Artisan Crafted',
    tags: ['Furniture', 'Lounge Chair', 'Scandinavian', 'Walnut'],
    frequentlyBoughtWithIds: ['prod-6', 'prod-1']
  },
  {
    id: 'prod-10',
    title: 'Aether 4K OLED Ambient Frame Smart Display',
    slug: 'aether-4k-oled-ambient-frame-smart-display',
    subtitle: 'Zero-Glare Matte Gallery Smart Screen',
    price: 890,
    originalPrice: 990,
    rating: 4.88,
    reviewCount: 97,
    category: 'Smart Devices',
    subCategory: 'Connected Home',
    brand: 'Velora Tech',
    images: [
      'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=85'
    ],
    shortDescription: 'Transform living spaces into private art galleries or control your entire smart home ecosystem with natural tactile gestures.',
    description: 'Equipped with ambient color temperature sensors that adapt screen reflectance to mimic authentic oil paintings or linen paper prints.',
    features: [
      '27-inch 4K UHD Anti-Glare Matte OLED panel',
      'Integrated Matter, Zigbee, and Apple HomeKit hub',
      'Magnetic interchangeable solid teak wood frame bezels',
      'Ultra-thin 12mm flush wall-mount bracket included'
    ],
    specifications: [
      {
        group: 'Display & Networking',
        items: [
          { label: 'Resolution', value: '3840 x 2160 pixels' },
          { label: 'Wireless', value: 'Wi-Fi 7, Bluetooth 5.4, Thread' },
          { label: 'Audio', value: 'Invisible exciter glass speakers' }
        ]
      }
    ],
    variants: [
      { id: 'v10-1', name: 'Scandinavian Teak Wood Bezel', colorHex: '#B5651D', colorName: 'Teak Wood', inStock: true, stockCount: 14 },
      { id: 'v10-2', name: 'Minimalist Matte White Aluminum', colorHex: '#FAFAFA', colorName: 'Matte White', inStock: true, stockCount: 11 }
    ],
    colors: [
      { name: 'Teak Wood', hex: '#B5651D' },
      { name: 'Matte White', hex: '#FAFAFA' }
    ],
    sizes: ['27-inch', '32-inch'],
    inStock: true,
    stockCount: 25,
    isTrending: true,
    tags: ['Smart Home', 'Display', 'Art', 'IoT'],
    frequentlyBoughtWithIds: ['prod-3', 'prod-7']
  },
  {
    id: 'prod-11',
    title: 'Merino Wool Minimalist Mockneck',
    slug: 'merino-wool-minimalist-mockneck',
    subtitle: 'Extra-Fine 18.5 Micron Tasmanian Wool',
    price: 210,
    originalPrice: 240,
    rating: 4.9,
    reviewCount: 165,
    category: "Men's Clothing",
    subCategory: 'Knitwear',
    brand: 'Velora Atelier',
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85'
    ],
    shortDescription: 'Seamless 3D knit construction offering thermoregulation, natural anti-odor performance, and zero itch.',
    description: 'Knitted on whole-garment Japanese Shima Seiki machines with no internal seams for superior drape and unhindered movement.',
    features: [
      '100% ZQ-certified ethical Tasmanian merino wool',
      'Naturally antibacterial and moisture-wicking',
      'Ribbed cuffs and hem with subtle recovery elastane'
    ],
    specifications: [
      {
        group: 'Material & Care',
        items: [
          { label: 'Fiber Gauge', value: '18.5 Micron Extra-Fine' },
          { label: 'Care', value: 'Hand wash cold or gentle wool cycle' }
        ]
      }
    ],
    variants: [
      { id: 'v11-1', name: 'Charcoal Melange', colorHex: '#374151', colorName: 'Charcoal', inStock: true, stockCount: 24 },
      { id: 'v11-2', name: 'Oatmeal Heather', colorHex: '#D6C0B3', colorName: 'Oatmeal', inStock: true, stockCount: 18 },
      { id: 'v11-3', name: 'Deep Forest Pine', colorHex: '#1E3A2F', colorName: 'Deep Pine', inStock: true, stockCount: 12 }
    ],
    colors: [
      { name: 'Charcoal', hex: '#374151' },
      { name: 'Oatmeal', hex: '#D6C0B3' },
      { name: 'Deep Pine', hex: '#1E3A2F' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 54,
    isNewArrival: true,
    tags: ['Knitwear', 'Merino Wool', 'Luxury Menswear'],
    frequentlyBoughtWithIds: ['prod-5', 'prod-2']
  },
  {
    id: 'prod-12',
    title: 'Vanguard Elite Tactile Mechanical Keyboard',
    slug: 'vanguard-elite-tactile-mechanical-keyboard',
    subtitle: 'Gasket-Mounted Brass Plate & PBT Cherry Keycaps',
    price: 295,
    originalPrice: 340,
    rating: 4.97,
    reviewCount: 312,
    category: 'Gaming',
    subCategory: 'Peripherals',
    brand: 'Velora Tech',
    images: [
      'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=85'
    ],
    shortDescription: 'Solid milled 6063 aerospace aluminum case with custom factory-lubed Holy Panda tactile switches.',
    description: 'Every keystroke produces a deep acoustic marbly "thock". Supports hot-swap switches, Bluetooth 5.2, 2.4GHz 1000Hz polling wireless, and USB-C.',
    features: [
      'CNC machined single-block aluminum weighing 2.2 kg',
      'Dual gasket isolation mount with Poron foam dampening',
      'Custom dye-sublimated thick 1.6mm PBT keycaps'
    ],
    specifications: [
      {
        group: 'Hardware',
        items: [
          { label: 'Layout', value: '75% Compact with Rotary Knob' },
          { label: 'Battery', value: '4000 mAh (200 hours wireless)' },
          { label: 'Firmware', value: 'QMK / VIA programmable' }
        ]
      }
    ],
    variants: [
      { id: 'v12-1', name: 'Retro Industrial Beige / Teal', colorHex: '#E5E0D8', colorName: 'Industrial Beige', inStock: true, stockCount: 16 },
      { id: 'v12-2', name: 'Stealth Anodized Black', colorHex: '#18181B', colorName: 'Stealth Black', inStock: true, stockCount: 22 }
    ],
    colors: [
      { name: 'Industrial Beige', hex: '#E5E0D8' },
      { name: 'Stealth Black', hex: '#18181B' }
    ],
    sizes: ['75% Compact'],
    inStock: true,
    stockCount: 38,
    isBestSeller: true,
    isTrending: true,
    tags: ['Mechanical Keyboard', 'Gaming', 'Desk Setup', 'Ergonomics'],
    frequentlyBoughtWithIds: ['prod-7', 'prod-3']
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Elena Rostova',
    rating: 5,
    date: '2 days ago',
    title: 'Surpassed all my studio expectations',
    comment: 'The soundstage on the Aethel Horizon is expansive yet intimately precise. The aluminum craftsmanship feels more like fine Swiss watchmaking than electronics. Velora delivered it in bespoke gift packaging within 48 hours.',
    verified: true,
    helpfulCount: 38,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-2',
    author: 'Julian Vance',
    rating: 5,
    date: '1 week ago',
    title: 'The epitome of quiet luxury',
    comment: 'The calfskin boots fit like second skin right out of the box. No break-in pain whatsoever. Truly artisanal quality. Will definitely be acquiring the trench coat next.',
    verified: true,
    helpfulCount: 24,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-3',
    author: 'Sophia Chen',
    rating: 5,
    date: '2 weeks ago',
    title: 'Worth every single penny',
    comment: 'I am extremely selective with interior design and the Solstice stand plus the Kyoto ceramic set elevated my morning rituals. Customer service concierge in the live chat was also instantaneous!',
    verified: true,
    helpfulCount: 19,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
  }
];
