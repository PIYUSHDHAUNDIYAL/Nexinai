
import React, { useState, useMemo, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { AppContext } from '../App';
import { 
  Search, 
  SlidersHorizontal, 
  Grid2X2, 
  List, 
  Star, 
  ShoppingCart, 
  Heart,
  ChevronRight,
  X,
  Filter,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const ProductsPage = () => {
  const context = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true); // Desktop sidebar toggle
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Mobile drawer toggle

  if (!context) return null;
  const { products, toggleWishlist, addToCart, wishlist } = context;

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'featured') {
        const scoreA = (a.rating * 10) + (a.reviewsCount / 100);
        const scoreB = (b.rating * 10) + (b.reviewsCount / 100);
        return scoreB - scoreA;
      }
      return 0;
    });
  }, [products, searchQuery, selectedCategory, sortBy]);

  const FilterContent = () => (
    <div className="space-y-10">
      <div>
        <label className="block text-[10px] font-black text-slate-400 mb-4 uppercase tracking-[0.2em]">Sectors</label>
        <div className="space-y-1">
          <button 
            onClick={() => { setSelectedCategory('all'); setIsDrawerOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedCategory === 'all' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            All Sectors
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.slug); setIsDrawerOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedCategory === cat.slug ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-black text-slate-400 mb-4 uppercase tracking-[0.2em]">Prioritize By</label>
        <select 
          value={sortBy}
          onChange={(e) => { setSortBy(e.target.value); setIsDrawerOpen(false); }}
          className="w-full p-3 bg-slate-50 border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
        >
          <option value="featured">Most Relevant</option>
          <option value="price-low">Lowest Cost</option>
          <option value="price-high">Premium Tier</option>
          <option value="rating">Top Rated Units</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Hardware Node</h1>
          <nav className="flex items-center text-sm text-slate-500 font-bold uppercase tracking-widest">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-slate-900">Inventory</span>
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group min-w-[250px] sm:min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Query hardware..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none transition-all shadow-sm font-bold text-sm sm:text-base"
            />
          </div>
          
          <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1 shadow-sm">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Grid2X2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => {
            if (window.innerWidth < 1024) setIsDrawerOpen(true);
            else setShowFilters(!showFilters);
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all border ${
            showFilters && window.innerWidth >= 1024 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'bg-white text-slate-900 border-slate-200 hover:border-blue-600'
          }`}
        >
          <Filter className="w-4 h-4" />
          {showFilters && window.innerWidth >= 1024 ? 'Hide Catalog Logic' : 'Catalog Logic'}
        </button>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          {filteredProducts.length} Units Found
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 relative">
        {/* Desktop Sidebar */}
        <aside 
          className={`hidden lg:block transition-all duration-300 overflow-hidden ${
            showFilters ? 'w-64 opacity-100' : 'w-0 opacity-0'
          }`}
        >
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
             <FilterContent />
          </div>
        </aside>

        {/* Mobile Filter Drawer Overlay */}
        {isDrawerOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <div 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsDrawerOpen(false)}
            ></div>
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl p-8 animate-slide-in-right flex flex-col">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-black flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-blue-600" /> Catalog Logic
                </h3>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto pr-2">
                <FilterContent />
              </div>
              <div className="pt-8 mt-auto border-t border-slate-50">
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-200"
                >
                  Apply & Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className={viewMode === 'grid' ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-8" : "flex flex-col gap-6"}>
              {filteredProducts.map(product => (
                <div key={product.id} className={`group bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col ${viewMode === 'list' ? 'sm:flex-row sm:items-center sm:gap-6 sm:p-4' : ''}`}>
                  <div className={`relative overflow-hidden bg-slate-50 ${viewMode === 'list' ? 'sm:w-48 sm:h-48 sm:rounded-2xl shrink-0' : 'aspect-square'}`}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <button 
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-3 right-3 p-2.5 rounded-full shadow-lg transition-all ${wishlist.includes(product.id) ? 'bg-red-500 text-white scale-110' : 'bg-white/80 backdrop-blur-sm text-slate-400 hover:text-red-500 hover:scale-110'}`}
                    >
                      <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-white' : ''}`} />
                    </button>
                  </div>
                  
                  <div className={`p-6 flex flex-col flex-grow ${viewMode === 'list' ? 'sm:py-2' : ''}`}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-black text-slate-900">{product.rating} <span className="text-slate-400 font-bold uppercase tracking-widest ml-1 text-[8px]">({product.reviewsCount} Votes)</span></span>
                    </div>
                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-1">{product.name}</h3>
                    </Link>
                    <p className="text-slate-400 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">{product.description}</p>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                      <span className="text-xl font-black text-slate-900 tracking-tighter">₹{product.price.toLocaleString()}</span>
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-slate-900 text-white px-5 py-2 rounded-xl font-black text-xs hover:bg-blue-600 transition-all flex items-center gap-2 shadow-lg shadow-slate-200 active:scale-95"
                      >
                        <ShoppingCart className="w-4 h-4" /> Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100 border-dashed">
              <div className="bg-slate-50 w-20 h-20 flex items-center justify-center rounded-[2rem] mx-auto mb-6">
                <Search className="w-10 h-10 text-slate-300" />
              </div>
              <h2 className="text-2xl font-black mb-2">No hardware matches found</h2>
              <p className="text-slate-500 mb-8 font-medium">Try broadening your search or resetting filters.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="bg-slate-900 text-white px-10 py-3.5 rounded-2xl font-black hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
              >
                Reset All Parameters
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductsPage;
