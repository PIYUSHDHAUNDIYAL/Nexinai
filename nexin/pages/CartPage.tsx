
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, CreditCard, ShieldCheck } from 'lucide-react';

const CartPage = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { cart, removeFromCart, updateCartQty } = context;

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 100000 ? 0 : 500;
  const tax = subtotal * 0.18; // GST
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="bg-slate-50 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
          <ShoppingBag className="w-12 h-12 text-slate-300" />
        </div>
        <h1 className="text-4xl font-black mb-4">Your cart is empty</h1>
        <p className="text-slate-500 text-lg mb-10 font-medium">Ready to upgrade your tech setup? Browse our latest hardware.</p>
        <Link to="/products" className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black text-lg hover:bg-slate-900 transition-all inline-block shadow-2xl shadow-blue-100">
          Start Exploring
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-12 tracking-tight">Tech Cart</h1>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <div key={item.id} className="bg-white border border-slate-100 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center gap-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-32 h-32 rounded-2xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform hover:scale-110" />
              </div>
              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-xl font-black text-slate-900 mb-1">{item.name}</h3>
                <p className="text-xs text-blue-600 font-black uppercase tracking-widest mb-4">{item.category}</p>
                <div className="flex items-center justify-center sm:justify-start gap-6">
                  <div className="flex items-center bg-slate-100 rounded-xl p-1">
                    <button 
                      onClick={() => updateCartQty(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-white rounded-lg transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-black">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQty(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-white rounded-lg transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2.5 text-slate-300 hover:text-red-500 transition-colors bg-slate-50 hover:bg-red-50 rounded-xl"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-black text-slate-900 tracking-tighter">₹{(item.price * item.quantity).toLocaleString()}</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">₹{item.price.toLocaleString()} / unit</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 shadow-2xl shadow-blue-900/20">
            <h2 className="text-2xl font-black mb-8">Billing Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Cart Subtotal</span>
                <span className="text-white">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Delivery Charges</span>
                <span className="text-white">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-slate-400 font-medium pb-4 border-b border-slate-800">
                <span>GST (18%)</span>
                <span className="text-white">₹{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-2xl font-black pt-4">
                <span>Total Amount</span>
                <span className="text-blue-400">₹{total.toLocaleString()}</span>
              </div>
            </div>
            
            <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 mb-8 shadow-xl shadow-blue-900/50 active:scale-95">
              Secure Checkout <ArrowRight className="w-6 h-6" />
            </button>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                <CreditCard className="w-5 h-5 text-blue-400" />
                <span>UPI, Cards, and NetBanking</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <span>Encrypted payment gateway</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-slate-100 rounded-[2rem] p-8 text-center shadow-sm">
            <h3 className="font-black mb-4">Promo Code?</h3>
            <div className="flex gap-2">
              <input type="text" placeholder="TECH-OFFER" className="flex-grow px-4 py-3.5 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:ring-2 focus:ring-blue-100 uppercase font-mono font-bold" />
              <button className="bg-slate-900 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-blue-600 transition-all">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
