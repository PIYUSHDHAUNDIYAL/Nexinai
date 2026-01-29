
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { getAIRecommendations } from '../services/geminiService';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { Sparkles, RefreshCw, ShoppingCart, Star, Zap, Info, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIRecommendationsPage = () => {
  const context = useContext(AppContext);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    if (!context) return;
    setLoading(true);
    const history = context.user?.history && context.user.history.length > 0 
      ? context.user.history 
      : ['s1', 'l1'];
      
    const recommendedIds = await getAIRecommendations(history, PRODUCTS);
    const filtered = PRODUCTS.filter(p => recommendedIds.includes(p.id));
    
    setRecommendations(filtered.length > 0 ? filtered : PRODUCTS.slice(0, 3));
    setLoading(false);
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white mb-16 relative overflow-hidden border border-slate-800">
        <div className="max-w-3xl relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Cpu className="w-8 h-8 text-blue-400" />
            <span className="font-bold tracking-widest uppercase text-sm text-slate-400">Tech Matchmaker</span>
          </div>
          <h1 className="text-5xl font-black mb-8 leading-tight">Recommended <br />for Your Setup</h1>
          <p className="text-xl text-slate-400 leading-relaxed mb-10">
            Our intelligent recommendation system analyzes your tech interests to suggest the next best addition to your ecosystem.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={fetchRecommendations}
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-blue-700 transition-all disabled:opacity-70"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
              Update My List
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold">Top Tech Matches</h2>
        <div className="h-px flex-grow bg-slate-100"></div>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-10">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white border border-slate-100 rounded-3xl p-6 h-[400px] animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">
          {recommendations.map(product => (
            <div key={product.id} className="group bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all flex flex-col">
              <div className="relative aspect-square mb-6 rounded-2xl overflow-hidden bg-slate-50">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-all" />
              </div>
              <div className="flex-grow">
                <span className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-2 block">{product.category}</span>
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                </Link>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <span className="text-2xl font-black text-slate-900">${product.price}</span>
                <button 
                  onClick={() => context?.addToCart(product)}
                  className="bg-slate-900 text-white p-3 rounded-xl hover:bg-blue-600 transition-all"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIRecommendationsPage;
