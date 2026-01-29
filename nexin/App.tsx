import React, { useState, useEffect, useMemo } from 'react';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  Navigate, 
  Link, 
  useLocation 
} from 'react-router-dom';
import { 
  ShoppingCart, 
  User as UserIcon, 
  LayoutDashboard, 
  Home as HomeIcon, 
  Package, 
  Search, 
  Menu, 
  X, 
  LogOut, 
  Settings, 
  MessageSquare, 
  Heart,
  Moon,
  Sun,
  ShieldCheck,
  ShoppingBag,
  Mail,
  Cpu
} from 'lucide-react';

import { User, UserRole, CartItem, Product } from './types';
import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES } from './constants';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AISupportPage from './pages/AISupportPage';
import AuthPage from './pages/AuthPage';
import AIRecommendationsPage from './pages/AIRecommendationsPage';

// Context-like State
export const AppContext = React.createContext<{
  user: User | null;
  setUser: (u: User | null) => void;
  products: Product[];
  updateProduct: (id: string, updates: Partial<Product>) => void;
  rateProduct: (id: string, newRating: number) => void;
  addToHistory: (id: string) => void;
  cart: CartItem[];
  addToCart: (p: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateCartQty: (id: string, q: number) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
} | null>(null);

const Logo = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div className="flex items-center gap-2.5 group">
    <div className="relative">
      <div className="bg-blue-600 w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:rotate-6 transition-transform">
        <Cpu className="w-5 h-5" />
      </div>
      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-400 border-2 border-white dark:border-slate-900 rounded-full"></div>
    </div>
    <span className={`text-2xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      Nex<span className="text-blue-600 italic">in</span>
    </span>
  </div>
);

const Navbar = () => {
  const context = React.useContext(AppContext);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!context) return null;
  const { user, cart, isDarkMode, toggleDarkMode, setUser } = context;

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Recommended', path: '/recommendations', icon: Search },
    { name: 'Tech Help', path: '/support', icon: MessageSquare },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-b shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/">
            <Logo isDarkMode={isDarkMode} />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`flex items-center gap-2 text-sm font-semibold transition-colors ${isActive(link.path) ? 'text-blue-600' : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-blue-600'}`}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleDarkMode} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-yellow-400' : 'hover:bg-slate-100 text-slate-500'}`}>
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <Link to="/cart" className="relative p-2 text-slate-500 hover:text-blue-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4 border-l pl-4 border-slate-200 ml-2">
                {user.role === UserRole.ADMIN ? (
                  <Link to="/admin" className="hidden md:flex items-center gap-2 text-sm font-semibold text-purple-600 hover:bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-200 transition-all">
                    <ShieldCheck className="w-4 h-4" /> Admin
                  </Link>
                ) : (
                  <Link to="/dashboard" className="hidden md:flex items-center gap-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 transition-all">
                    <LayoutDashboard className="w-4 h-4" /> Account
                  </Link>
                )}
                <button onClick={() => setUser(null)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="bg-slate-900 hover:bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-md shadow-slate-200">
                Sign In
              </Link>
            )}

            <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={`md:hidden p-4 border-t space-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900'}`}>
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 font-medium">
              <link.icon className="w-5 h-5" /> {link.name}
            </Link>
          ))}
          {user?.role === UserRole.ADMIN && (
            <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 text-purple-700 font-bold">
              <ShieldCheck className="w-5 h-5" /> Admin Panel
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [cart, wishlist, user]);

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQty = (id: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(id);
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const rateProduct = (id: string, newRatingValue: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const totalReviews = p.reviewsCount + 1;
        const currentTotalStars = p.rating * p.reviewsCount;
        const newAvgRating = parseFloat(((currentTotalStars + newRatingValue) / totalReviews).toFixed(1));
        return { ...p, rating: newAvgRating, reviewsCount: totalReviews };
      }
      return p;
    }));
  };

  const addToHistory = (id: string) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      const history = prev.history || [];
      const newHistory = [id, ...history.filter(itemId => itemId !== id)].slice(0, 10);
      return { ...prev, history: newHistory };
    });
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const contextValue = useMemo(() => ({
    user, setUser, products, updateProduct, rateProduct, addToHistory, cart, addToCart, removeFromCart, updateCartQty, wishlist, toggleWishlist, isDarkMode, toggleDarkMode
  }), [user, products, cart, wishlist, isDarkMode]);

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-900'}`}>
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/recommendations" element={<AIRecommendationsPage />} />
              <Route path="/support" element={<AISupportPage />} />
              <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />
              <Route path="/dashboard" element={user ? <UserDashboard /> : <Navigate to="/auth" />} />
              <Route path="/admin" element={user?.role === UserRole.ADMIN ? <AdminDashboard /> : <Navigate to="/" />} />
            </Routes>
          </main>
          
          <footer className={`py-12 border-t ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="max-w-7xl mx-auto px-4 text-center">
              <div className="flex items-center justify-center mb-6">
                <Logo isDarkMode={isDarkMode} />
              </div>
              <p className="text-slate-400 text-sm mb-4 font-medium">© 2024 Nexin Tech Corp - Your Elite Hardware Procurement Hub</p>
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:support@nexin.tech">support@nexin.tech</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AppContext.Provider>
  );
}