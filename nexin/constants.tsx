
import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'cat1', name: 'Smartphones', slug: 'smartphones', icon: 'Smartphone' },
  { id: 'cat2', name: 'Headphones', slug: 'headphones', icon: 'Headphones' },
  { id: 'cat3', name: 'Powerbanks', slug: 'powerbanks', icon: 'BatteryCharging' },
  { id: 'cat4', name: 'Laptops', slug: 'laptops', icon: 'Laptop' },
  { id: 'cat5', name: 'Printers', slug: 'printers', icon: 'Printer' },
  { id: 'cat6', name: 'Tablets', slug: 'tablets', icon: 'Tablet' },
  { id: 'cat7', name: 'Mini PCs', slug: 'minipcs', icon: 'Cpu' },
  { id: 'cat8', name: 'Game Consoles', slug: 'consoles', icon: 'Gamepad2' },
];

export const PRODUCTS: Product[] = [
  // SMARTPHONES
  { id: 's1', name: 'iPhone 15 Pro', price: 134900, category: 'smartphones', rating: 4.8, stock: 15, reviewsCount: 450, image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600', description: 'Titanium design with A17 Pro chip. The most powerful iPhone ever.' },
  { id: 's2', name: 'Samsung Galaxy S24 Ultra', price: 129999, category: 'smartphones', rating: 4.9, stock: 10, reviewsCount: 320, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600', description: 'AI-integrated flagship with 200MP camera and built-in S Pen.' },
  { id: 's3', name: 'Google Pixel 8 Pro', price: 106999, category: 'smartphones', rating: 4.5, stock: 20, reviewsCount: 180, image: 'https://images.unsplash.com/photo-1695653422718-97d25c1f831e?w=600', description: 'The most helpful Pixel yet with advanced AI photography.' },
  { id: 's4', name: 'OnePlus 12', price: 64999, category: 'smartphones', rating: 4.6, stock: 25, reviewsCount: 150, image: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=600', description: 'Fast and smooth performance with Hasselblad camera tuning.' },
  { id: 's5', name: 'Xiaomi 14 Ultra', price: 99999, category: 'smartphones', rating: 4.7, stock: 8, reviewsCount: 95, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600', description: 'Professional grade imaging system with Leica lenses.' },

  // HEADPHONES
  { id: 'h1', name: 'Sony WH-1000XM5', price: 29990, category: 'headphones', rating: 4.9, stock: 30, reviewsCount: 1200, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600', description: 'Industry-leading noise cancellation with 30-hour battery.' },
  { id: 'h2', name: 'Bose QuietComfort Ultra', price: 35900, category: 'headphones', rating: 4.8, stock: 15, reviewsCount: 850, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', description: 'World-class noise cancelling and immersive spatial audio.' },
  { id: 'h3', name: 'Apple AirPods Max', price: 59900, category: 'headphones', rating: 4.4, stock: 10, reviewsCount: 900, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600', description: 'Computational audio with breathable knit mesh design.' },
  { id: 'h4', name: 'Sennheiser Momentum 4', price: 24990, category: 'headphones', rating: 4.7, stock: 22, reviewsCount: 430, image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=600', description: 'Superior sound with up to 60 hours battery life.' },
  { id: 'h5', name: 'JBL Live 660NC', price: 12999, category: 'headphones', rating: 4.3, stock: 45, reviewsCount: 210, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600', description: 'Signature sound with adaptive noise cancelling.' },

  // POWERBANKS
  { id: 'pb1', name: 'Anker 737 Power Bank', price: 12999, category: 'powerbanks', rating: 4.9, stock: 40, reviewsCount: 560, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600', description: 'Ultra-powerful two-way charging with digital display.' },
  { id: 'pb2', name: 'Baseus 65W 20000mAh', price: 4999, category: 'powerbanks', rating: 4.4, stock: 60, reviewsCount: 340, image: 'https://images.unsplash.com/photo-1625842268584-8f3bf919b26d?w=600', description: 'Fast charging for laptops and smartphones simultaneously.' },
  { id: 'pb3', name: 'Ugreen Nexode 100W', price: 7499, category: 'powerbanks', rating: 4.6, stock: 35, reviewsCount: 120, image: 'https://images.unsplash.com/photo-1619130771181-a201f19c369e?w=600', description: 'High capacity portable charger for travel pros.' },
  { id: 'pb4', name: 'Belkin Boost Charge', price: 2499, category: 'powerbanks', rating: 4.1, stock: 80, reviewsCount: 230, image: 'https://images.unsplash.com/photo-1549465220-1d8c9d9c4701?w=600', description: 'Reliable everyday power backup for mobile users.' },
  { id: 'pb5', name: 'Xiaomi 22.5W Power Bank', price: 1999, category: 'powerbanks', rating: 4.5, stock: 100, reviewsCount: 670, image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600', description: 'Compact and affordable power for daily commute.' },

  // LAPTOPS
  { id: 'l1', name: 'MacBook Pro M3', price: 169900, category: 'laptops', rating: 4.9, stock: 12, reviewsCount: 150, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600', description: 'The ultimate pro laptop with the groundbreaking M3 chip.' },
  { id: 'l2', name: 'Dell XPS 13 Plus', price: 145000, category: 'laptops', rating: 4.7, stock: 15, reviewsCount: 210, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600', description: 'Seamless design and industry-leading performance.' },
  { id: 'l3', name: 'ASUS ROG Zephyrus G14', price: 154990, category: 'laptops', rating: 4.8, stock: 8, reviewsCount: 340, image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600', description: 'Powerful gaming performance in a highly portable form.' },
  { id: 'l4', name: 'Lenovo ThinkPad X1 Carbon', price: 178000, category: 'laptops', rating: 4.8, stock: 10, reviewsCount: 180, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600', description: 'Legendary business reliability with military-grade testing.' },
  { id: 'l5', name: 'HP Spectre x360', price: 129990, category: 'laptops', rating: 4.6, stock: 14, reviewsCount: 220, image: 'https://images.unsplash.com/photo-1544006659-f0b21884cb1d?w=600', description: 'Versatile 2-in-1 premium laptop with OLED display.' },

  // PRINTERS
  { id: 'pr1', name: 'HP LaserJet Pro', price: 24900, category: 'printers', rating: 4.6, stock: 20, reviewsCount: 450, image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600', description: 'Fast monochrome laser printing for small offices.' },
  { id: 'pr2', name: 'Canon PIXMA G7020', price: 28500, category: 'printers', rating: 4.3, stock: 18, reviewsCount: 310, image: 'https://images.unsplash.com/photo-1544465531-53748283995f?w=600', description: 'Megatank wireless all-in-one with ink refill system.' },
  { id: 'pr3', name: 'Epson EcoTank ET-2850', price: 22990, category: 'printers', rating: 4.5, stock: 25, reviewsCount: 280, image: 'https://images.unsplash.com/photo-1612815154562-ec7a26f043e0?w=600', description: 'Cartridge-free printing solution for home use.' },
  { id: 'pr4', name: 'Brother HL-L2350DW', price: 12900, category: 'printers', rating: 4.8, stock: 35, reviewsCount: 1200, image: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=600', description: 'Reliable monochrome laser for high-volume home printing.' },
  { id: 'pr5', name: 'Pantum M6550NW', price: 15990, category: 'printers', rating: 4.1, stock: 40, reviewsCount: 85, image: 'https://images.unsplash.com/photo-1563200055-32111f1f9644?w=600', description: 'Compact office multi-function printer with Wi-Fi.' },

  // TABLETS
  { id: 't1', name: 'iPad Pro 12.9', price: 112900, category: 'tablets', rating: 4.9, stock: 15, reviewsCount: 800, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600', description: 'The most powerful iPad with Liquid Retina XDR display.' },
  { id: 't2', name: 'Samsung Galaxy Tab S9 Ultra', price: 108999, category: 'tablets', rating: 4.8, stock: 12, reviewsCount: 450, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600', description: 'Stunning AMOLED tablet experience for creatives.' },
  { id: 't3', name: 'Microsoft Surface Pro 9', price: 104990, category: 'tablets', rating: 4.7, stock: 20, reviewsCount: 320, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600', description: 'Laptop power in a tablet form for Windows users.' },
  { id: 't4', name: 'iPad Air (5th Gen)', price: 54900, category: 'tablets', rating: 4.8, stock: 30, reviewsCount: 600, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600', description: 'Powerful, colorful, wonderful. M1 chip integrated.' },
  { id: 't5', name: 'Lenovo Tab P11 Gen 2', price: 25999, category: 'tablets', rating: 4.3, stock: 40, reviewsCount: 150, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600', description: 'Great tablet for family entertainment and browsing.' },

  // MINI PCS
  { id: 'mpc1', name: 'Apple Mac Studio', price: 189900, category: 'minipcs', rating: 4.9, stock: 8, reviewsCount: 230, image: 'https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=600', description: 'Enormous performance in a compact form factor for creatives.' },
  { id: 'mpc2', name: 'Intel NUC 13 Extreme', price: 115000, category: 'minipcs', rating: 4.7, stock: 12, reviewsCount: 145, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600', description: 'Desktop gaming performance in a small footprint chassis.' },
  { id: 'mpc3', name: 'Apple Mac Mini M2', price: 59900, category: 'minipcs', rating: 4.8, stock: 25, reviewsCount: 890, image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600', description: 'The most versatile desktop gets M2 power and efficiency.' },
  { id: 'mpc4', name: 'Minisforum UM780 XTX', price: 45000, category: 'minipcs', rating: 4.5, stock: 15, reviewsCount: 120, image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600', description: 'High-performance AMD Ryzen mini PC with OCulink support.' },
  { id: 'mpc5', name: 'Beelink SER6 Max', price: 38000, category: 'minipcs', rating: 4.4, stock: 20, reviewsCount: 85, image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600', description: 'Excellent budget mini PC for office and light gaming.' },

  // GAME CONSOLES
  { id: 'gc1', name: 'PlayStation 5', price: 54990, category: 'consoles', rating: 4.9, stock: 5, reviewsCount: 5000, image: 'https://images.unsplash.com/photo-1606813907291-d86ebb9c74ad?w=600', description: 'Next-gen gaming with lightning-fast load times.' },
  { id: 'gc2', name: 'Xbox Series X', price: 54990, category: 'consoles', rating: 4.8, stock: 10, reviewsCount: 3400, image: 'https://images.unsplash.com/photo-1621259182978-f09e5e2ca1ff?w=600', description: 'The fastest, most powerful Xbox ever built.' },
  { id: 'gc3', name: 'Nintendo Switch OLED', price: 32900, category: 'consoles', rating: 4.9, stock: 25, reviewsCount: 4200, image: 'https://images.unsplash.com/photo-1578303319423-2f54ac2939fb?w=600', description: 'Vibrant OLED screen for stunning handheld play.' },
  { id: 'gc4', name: 'Steam Deck (512GB)', price: 49999, category: 'consoles', rating: 4.7, stock: 8, reviewsCount: 1800, image: 'https://images.unsplash.com/photo-1621259182978-f09e5e2ca1ff?w=600', description: 'Powerful portable PC gaming device.' },
  { id: 'gc5', name: 'Xbox Series S', price: 34990, category: 'consoles', rating: 4.6, stock: 30, reviewsCount: 2100, image: 'https://images.unsplash.com/photo-1621259182978-f09e5e2ca1ff?w=600', description: 'Compact all-digital gaming console.' },
];
