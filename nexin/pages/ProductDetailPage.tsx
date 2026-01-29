
import React, { useContext, useMemo, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Sparkles,
  Zap,
  CheckCircle,
  Plus,
  Minus
} from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(AppContext);
  if (!context) return null;
  const { products, rateProduct, toggleWishlist, addToCart, wishlist, addToHistory } = context;

  const product = products.find(p => p.id === id);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showRatingSuccess, setShowRatingSuccess] = useState(false);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Titanium');
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  const colors = [
    { name: 'Titanium', hex: '#64748b' },
    { name: 'Midnight', hex: '#1e293b' },
    { name: 'Silver', hex: '#e2e8f0' },
    { name: 'Purple', hex: '#818cf8' }
  ];

  useEffect(() => {
    if (product) {
      addToHistory(product.id);
    }
    window.scrollTo(0, 0);
  }, [product?.id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [product, products]);

  const handleRate = (rating: number) => {
    if (!product) return;
    setUserRating(rating);
    rateProduct(product.id, rating);
    setShowRatingSuccess(true);
    setTimeout(() => setShowRatingSuccess(false), 3000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <Link to="/products" className="text-blue-600 hover:underline">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-16 mb-20">
        {/* Left: Product Image */}
        <div className="space-y-6">
          <div className="group relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-square rounded-xl bg-white overflow-hidden border border-slate-200 cursor-pointer hover:border-blue-500 transition-all">
                 <img src={product.image} className="w-full h-full object-cover opacity-60 hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info Section (Matched to requested image) */}
        <div className="flex flex-col">
          <div className="mb-8">
            <h1 className="text-4xl font-semibold text-slate-900 mb-2">{product.name}</h1>
            <div className="text-2xl font-light text-slate-800">₹{product.price.toLocaleString()}.00</div>
          </div>

          {/* Color Selection */}
          <div className="mb-8">
            <p className="text-sm font-medium text-slate-900 mb-4">Color: {selectedColor} *</p>
            <div className="flex gap-4">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor === color.name ? 'border-slate-800' : 'border-transparent'}`}
                >
                  <div className="w-7 h-7 rounded-full border border-slate-200" style={{ backgroundColor: color.hex }}></div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="mb-10">
            <p className="text-sm font-medium text-slate-900 mb-4">Quantity *</p>
            <div className="inline-flex items-center border border-slate-300 rounded-md">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 hover:bg-slate-50 border-r border-slate-300 transition-colors"
              >
                <Minus className="w-4 h-4 text-slate-600" />
              </button>
              <input 
                type="number" 
                value={quantity} 
                readOnly
                className="w-14 text-center font-medium text-lg bg-transparent focus:outline-none"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-3 hover:bg-slate-50 border-l border-slate-300 transition-colors"
              >
                <Plus className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 mb-10 max-w-lg">
            <button 
              onClick={() => addToCart(product, quantity)}
              className="w-full bg-[#0076B6] text-white py-4 rounded-md font-bold text-lg hover:bg-[#005c8f] transition-all shadow-sm"
            >
              Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className="w-full bg-[#111111] text-white py-4 rounded-md font-bold text-lg hover:bg-black transition-all"
            >
              Buy Now
            </button>
          </div>

          {/* Description Section with Underlined Toggle */}
          <div className="pt-8 border-t border-slate-200">
            <div className={`text-slate-700 text-sm leading-relaxed mb-4 ${isDescExpanded ? '' : 'line-clamp-3'}`}>
              <p className="mb-2">{product.description}</p>
              <p>Built for professionals and tech enthusiasts who demand excellence in every pixel and circuit. I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.</p>
            </div>
            <button 
              onClick={() => setIsDescExpanded(!isDescExpanded)}
              className="text-sm font-medium text-slate-900 underline hover:text-blue-600 transition-colors"
            >
              {isDescExpanded ? 'Less' : 'More'}
            </button>
          </div>

          {/* Secondary Rating Interaction */}
          <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-sm font-bold text-slate-800 mb-4">Rate this product</p>
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleRate(star)}
                    className="focus:outline-none transition-transform active:scale-90"
                  >
                    <Star 
                      className={`w-6 h-6 ${
                        star <= (hoverRating || userRating || Math.floor(product.rating)) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-slate-300'
                      }`} 
                    />
                  </button>
                ))}
              </div>
              {showRatingSuccess && (
                <span className="text-emerald-600 text-xs font-bold animate-pulse">Feedback recorded!</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Tech */}
      <section className="pt-20 border-t border-slate-100">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
             <div className="bg-blue-600 p-2 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
             </div>
             <h2 className="text-2xl font-bold">Recommended Hardware</h2>
          </div>
          <Link to="/products" className="text-blue-600 font-bold hover:underline">Browse Catalog</Link>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {relatedProducts.map(p => (
            <Link key={p.id} to={`/product/${p.id}`} className="group block bg-white p-4 rounded-2xl border border-slate-100 hover:shadow-xl transition-all">
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 mb-4 border border-slate-100 relative">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1 truncate">{p.name}</h3>
              <p className="text-slate-400 text-[10px] mb-2 uppercase tracking-widest font-black">{p.category}</p>
              <span className="font-bold text-lg text-slate-800">₹{p.price.toLocaleString()}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
