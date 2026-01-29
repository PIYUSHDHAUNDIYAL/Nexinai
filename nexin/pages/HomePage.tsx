
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { CATEGORIES } from '../constants';
import { 
  ArrowRight, 
  Star, 
  Zap, 
  Laptop, 
  Smartphone, 
  Headphones, 
  Gamepad2, 
  BatteryCharging, 
  Printer, 
  Tablet, 
  Cpu,
  TrendingUp
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Smartphone,
  Headphones,
  BatteryCharging,
  Laptop,
  Printer,
  Tablet,
  Cpu,
  Gamepad2
};

const HomePage = () => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { products } = context;
  
  // Trending logic: Weighted Score = (Rating * 10) + (Reviews / 100)
  const featuredProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        const scoreA = (a.rating * 10) + (a.reviewsCount / 100);
        const scoreB = (b.rating * 10) + (b.reviewsCount / 100);
        return scoreB - scoreA;
      })
      .slice(0, 4);
  }, [products]);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-blue-950 text-white py-24 px-4">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 bg-blue-500/30 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium animate-pulse">
              <Zap className="w-4 h-4 text-blue-400" />
              <span>Premium Tech Marketplace</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Power Up Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Tech Stack</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
              Discover industry-leading hardware from Smartphones to high-end Gaming Consoles. Curated by tech experts for performance enthusiasts.
            </p>
            <div className="flex gap-4">
              <Link to="/products" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-blue-900/40">
                Explore Shop <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/support" className="bg-slate-700/50 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-700 transition-all">
                Tech Advisor
              </Link>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-500 animate-float">
               <img src="https://images.unsplash.com/photo-1468436139062-f60a71c5c892?w=1200" alt="Electronics Hero" className="rounded-3xl shadow-2xl ring-1 ring-white/20" />
            </div>
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black mb-3">Refined Categories</h2>
          <p className="text-slate-500 font-medium">Precision-mapped hardware for your professional nodes</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || Cpu;
            return (
              <Link key={cat.id} to={`/products?category=${cat.slug}`} className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all hover:-translate-y-2 text-center overflow-hidden relative">
                <div className="bg-slate-50 text-slate-700 w-16 h-16 flex items-center justify-center rounded-2xl mb-6 mx-auto group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold transition-colors group-hover:text-blue-600">{cat.name}</h3>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Hardware - Dynamically Trending */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
              <TrendingUp className="text-blue-600" /> Trending Hardware
            </h2>
            <p className="text-slate-500 font-medium italic">Calculated by real-time user ratings and engagement metrics</p>
          </div>
          <Link to="/products" className="text-blue-600 font-bold hover:underline flex items-center gap-1">
            Browse All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300">
              <div className="relative aspect-square overflow-hidden bg-slate-50">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm border border-slate-100">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {product.rating}
                </div>
              </div>
              <div className="p-5">
                <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-1">{product.category}</p>
                <h3 className="text-lg font-bold mb-4 group-hover:text-blue-600 transition-colors line-clamp-1">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-slate-900">₹{product.price.toLocaleString()}</span>
                  <button 
                    onClick={() => context?.addToCart(product)}
                    className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-blue-600 hover:scale-110 active:scale-95 transition-all shadow-md"
                  >
                    <Zap className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-[3rem] p-12 text-white relative overflow-hidden text-center shadow-2xl shadow-blue-200">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-4xl font-bold mb-6">Expert Technical Help</h2>
            <p className="text-blue-100 text-lg mb-8">
              Need assistance with specifications or compatibility? Our technical support team is available via AI and email for expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/support" className="inline-block bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 hover:scale-105 transition-all shadow-xl">
                Chat with Assistant
              </Link>
              <div className="text-slate-400 font-bold px-6 py-4 rounded-2xl bg-white/5 border border-white/10">
                Email: support@nexelectronics.in
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
