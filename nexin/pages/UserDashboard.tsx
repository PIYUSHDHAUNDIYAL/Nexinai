
import React, { useContext, useMemo } from 'react';
import { AppContext } from '../App';
import { 
  User, 
  Package, 
  Heart, 
  Settings, 
  LogOut, 
  CreditCard, 
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Star,
  Eye,
  History
} from 'lucide-react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const context = useContext(AppContext);
  if (!context?.user) return null;

  const { user, wishlist, setUser, products } = context;

  const wishlistProducts = useMemo(() => {
    return products.filter(p => wishlist.includes(p.id));
  }, [wishlist, products]);

  const historyProducts = useMemo(() => {
    const historyIds = user.history || [];
    // Only unique items, limit to 8
    const uniqueHistoryIds = Array.from(new Set(historyIds)).slice(0, 8);
    return uniqueHistoryIds.map(id => products.find(p => p.id === id)).filter(Boolean);
  }, [user.history, products]);

  const stats = [
    { label: 'Active Orders', value: '02', icon: ShoppingBag, color: 'bg-blue-500' },
    { label: 'Hardware Saved', value: wishlist.length.toString(), icon: Heart, color: 'bg-red-500' },
    { label: 'Member Coins', value: '4,500', icon: TrendingUp, color: 'bg-emerald-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 bg-gradient-to-tr from-slate-900 to-blue-900 rounded-[2rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-blue-100">
                {user.name[0]}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 p-2 rounded-full border-4 border-white animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <h2 className="text-2xl font-black mb-1">{user.name}</h2>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-10">{user.email}</p>
            
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-900 text-white font-black text-sm shadow-xl shadow-slate-200 transition-all active:scale-95">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5" /> Account Details
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-2xl text-slate-500 font-bold hover:bg-slate-50 transition-all">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5" /> Security
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setUser(null)}
                className="w-full flex items-center gap-3 p-4 rounded-2xl text-red-500 font-bold hover:bg-red-50 transition-all"
              >
                <LogOut className="w-5 h-5" /> Terminate Session
              </button>
            </div>
          </div>

          <div className="bg-slate-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <CreditCard className="w-6 h-6 text-blue-400" />
              <h3 className="font-black text-lg">Tech Wallet</h3>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-8 relative z-10">
              <p className="text-[10px] text-slate-500 mb-2 uppercase font-black tracking-[0.2em]">Primary Payment Method</p>
              <p className="font-mono text-lg tracking-widest text-slate-300">XXXX XXXX XXXX 8892</p>
            </div>
            <button className="w-full bg-blue-600 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/40">
              Manage Billing
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-grow space-y-12">
          {/* Header Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map(stat => (
              <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 hover:shadow-lg transition-all">
                <div className={`${stat.color} p-4 rounded-2xl text-white shadow-xl shadow-${stat.color.split('-')[1]}-100`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recently Viewed Products */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black flex items-center gap-3 tracking-tight">
                <History className="w-7 h-7 text-blue-600" /> Recently Viewed Tech
              </h3>
            </div>
            {historyProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {historyProducts.map(p => p && (
                  <Link 
                    key={p.id} 
                    to={`/product/${p.id}`} 
                    className="bg-white border border-slate-100 p-4 rounded-3xl shadow-sm hover:shadow-xl hover:border-blue-50 transition-all group flex flex-col"
                  >
                    <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden mb-4 relative">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 line-clamp-1 mb-1 group-hover:text-blue-600 transition-colors">{p.name}</h4>
                    <div className="flex items-center justify-between mt-auto">
                      <p className="text-blue-600 font-black text-sm">₹{p.price.toLocaleString()}</p>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {p.rating}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 text-center">
                <Eye className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-500 font-bold mb-2">No browsing history found.</p>
                <Link to="/products" className="text-blue-600 font-bold hover:underline">Start Exploring</Link>
              </div>
            )}
          </section>

          {/* Procurement History */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black flex items-center gap-3 tracking-tight">
                <Package className="w-7 h-7 text-blue-600" /> Order History
              </h3>
              <button className="text-xs font-black uppercase tracking-widest text-blue-600 hover:underline">View All</button>
            </div>
            <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Order Ref</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                    <th className="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[1, 2].map(i => (
                    <tr key={i} className="hover:bg-slate-50 transition-all group">
                      <td className="px-8 py-6 font-mono font-black text-slate-600 text-sm">#NEX-{8000 + i}</td>
                      <td className="px-8 py-6 text-sm text-slate-500 font-bold">12 NOV, 2024</td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm ${i === 1 ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                          {i === 1 ? 'Delivered' : 'In Transit'}
                        </span>
                      </td>
                      <td className="px-8 py-6 font-black text-slate-900 tracking-tighter">₹1,24,900</td>
                      <td className="px-8 py-6 text-right">
                        <button className="p-2.5 text-slate-300 hover:text-blue-600 transition-all bg-transparent group-hover:bg-white rounded-xl shadow-sm">
                          <ExternalLink className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Hardware Vault (Wishlist) */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black flex items-center gap-3 tracking-tight">
                <Heart className="w-7 h-7 text-red-500" /> Saved Hardware
              </h3>
              <Link to="/products" className="text-xs font-black uppercase tracking-widest text-blue-600 hover:underline">Manage Wishlist</Link>
            </div>
            {wishlistProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {wishlistProducts.map(p => (
                  <div key={p.id} className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm flex items-center gap-8 group hover:shadow-2xl hover:border-blue-100 transition-all duration-300">
                    <div className="w-28 h-28 rounded-2xl overflow-hidden bg-slate-50 shrink-0 shadow-inner">
                      <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-[10px] font-black">{p.rating}</span>
                      </div>
                      <h4 className="font-black text-slate-900 mb-1 truncate leading-tight">{p.name}</h4>
                      <p className="text-xl font-black text-slate-900 mb-4 tracking-tighter">₹{p.price.toLocaleString()}</p>
                      <button 
                        onClick={() => context.addToCart(p)}
                        className="bg-slate-900 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95"
                      >
                        Add to Cart
                      </button>
                    </div>
                    <button 
                      onClick={() => context.toggleWishlist(p.id)}
                      className="p-3 text-red-500 hover:scale-125 transition-all"
                    >
                      <Heart className="w-6 h-6 fill-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-slate-100 rounded-[3rem] p-16 text-center">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-slate-200" />
                </div>
                <p className="text-slate-400 font-black uppercase tracking-widest">No items saved in vault</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
