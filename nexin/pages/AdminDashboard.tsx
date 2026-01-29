
import React, { useState, useContext } from 'react';
import { 
  Users, 
  Package, 
  BarChart3, 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  LayoutGrid,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  Star,
  Minus
} from 'lucide-react';
import { CATEGORIES } from '../constants';
import { AppContext } from '../App';

const AdminDashboard = () => {
  const context = useContext(AppContext);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'users'>('overview');

  if (!context) return null;
  const { products, updateProduct } = context;

  const stats = [
    { label: 'Total Revenue (INR)', value: '₹42,85,820', change: '+12.5%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Technicians', value: '1,240', change: '+5.2%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Hardware Sales', value: '842', change: '+8.1%', icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Site Performance', value: '98.2%', change: '+0.4%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Tech Admin Control</h1>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Manage Global Inventory and Analytics.</p>
        </div>
        <div className="flex items-center bg-white border border-slate-100 p-2 rounded-2xl shadow-sm">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'overview' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            Insights
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'products' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            Inventory
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            Clients
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-12">
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map(stat => (
              <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all">
                <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <div className="flex items-end gap-3">
                  <span className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</span>
                  <span className={`text-[10px] font-black mb-1.5 ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Sales Chart Mockup */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-black flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-blue-600" /> Revenue Growth
                </h3>
                <div className="text-[10px] font-black uppercase tracking-widest bg-slate-50 px-4 py-1.5 rounded-full">Quarterly View</div>
              </div>
              <div className="h-64 flex items-end gap-5 px-4">
                {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                  <div key={i} className="flex-grow flex flex-col items-center gap-3 group">
                    <div className="w-full bg-slate-900 rounded-t-2xl hover:bg-blue-600 transition-all duration-300 cursor-pointer shadow-sm group-hover:shadow-xl group-hover:shadow-blue-100" style={{ height: `${h}%` }}></div>
                    <span className="text-[10px] font-black text-slate-400">P-0{i+1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
              <h3 className="text-xl font-black mb-10 tracking-tight">Network Activity</h3>
              <div className="space-y-8">
                {[
                  { user: 'Rahul Sharma', action: 'procured', item: 'MacBook Pro M3', time: '2 mins ago', icon: CheckCircle, color: 'text-emerald-500' },
                  { user: 'System', action: 'indexed new', item: 'S24 Ultra Stock', time: '1 hour ago', icon: Edit, color: 'text-blue-500' },
                  { user: 'Priya Singh', action: 'authorized', item: 'Admin Access', time: '4 hours ago', icon: Users, color: 'text-purple-500' },
                  { user: 'Alert Node', action: 'critical stock', item: 'PS5 Console', time: '5 hours ago', icon: AlertCircle, color: 'text-orange-500' },
                ].map((act, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className={`${act.color} bg-slate-50 p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
                      <act.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm">
                        <span className="font-black text-slate-900">{act.user}</span> <span className="text-slate-400 font-medium">{act.action}</span> <span className="font-black text-blue-600">{act.item}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input type="text" placeholder="Global Hardware Search..." className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50" />
            </div>
            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
              <Plus className="w-5 h-5" /> Import SKU
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-y border-slate-100">
                <tr>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">SKU Detail</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Node</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Unit Cost</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Stock Management</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Rating</th>
                  <th className="px-10 py-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-all group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <img src={p.image} className="w-14 h-14 rounded-2xl object-cover border border-slate-100 group-hover:scale-110 transition-transform" />
                        <span className="font-black text-slate-900 truncate max-w-[180px]">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-10 py-8 font-black text-slate-900 tracking-tighter">₹{p.price.toLocaleString()}</td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => updateProduct(p.id, { stock: Math.max(0, p.stock - 1) })}
                          className="p-1 bg-slate-100 rounded-lg hover:bg-slate-200 text-slate-600 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className={`text-xs font-black min-w-[3rem] text-center ${p.stock <= 5 ? 'text-red-500' : 'text-slate-700'}`}>
                          {p.stock} Units
                        </span>
                        <button 
                          onClick={() => updateProduct(p.id, { stock: p.stock + 1 })}
                          className="p-1 bg-slate-100 rounded-lg hover:bg-slate-200 text-slate-600 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-black text-slate-900">{p.rating}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2.5 bg-white text-slate-400 hover:text-blue-600 rounded-xl shadow-sm transition-all">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2.5 bg-white text-slate-400 hover:text-red-500 rounded-xl shadow-sm transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-10 border-b border-slate-50">
            <h3 className="text-2xl font-black tracking-tight mb-2">Registered Clients</h3>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Access Control and Transaction Profiles.</p>
          </div>
          <table className="w-full text-left">
             <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Identity</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Communication</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Node Status</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total Expenditure</th>
                <th className="px-10 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { name: 'Rahul Sharma', email: 'rahul@tech.in', status: 'active', spent: '₹14,54,200' },
                { name: 'Anjali Gupta', email: 'anjali@dev.io', status: 'active', spent: '₹2,11,850' },
                { name: 'Unknown Node', email: 'ghost@proxy.net', status: 'flagged', spent: '₹0' },
              ].map((user, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-all group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 text-slate-900 rounded-[1.2rem] flex items-center justify-center font-black text-lg shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-colors">
                        {user.name[0]}
                      </div>
                      <span className="font-black text-slate-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-sm text-slate-500 font-bold">{user.email}</td>
                  <td className="px-10 py-8">
                     <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${user.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                        {user.status}
                     </span>
                  </td>
                  <td className="px-10 py-8 font-black text-slate-900 tracking-tight">{user.spent}</td>
                  <td className="px-10 py-8 text-right">
                    <button className="p-2.5 text-slate-300 hover:text-slate-900 transition-all">
                      <MoreVertical className="w-6 h-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
