import { useState } from 'react';
import { Product } from '../types';
import { Star, Check, Award, Eye, ShoppingCart, Calculator, X, Heart, Sparkles, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onSelectCalculate: (productId: string) => void;
  onSelectInquiry: (productId: string) => void;
  onAddToCart: (product: Product, paymentOption: 'outright' | '6month' | '12month') => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export default function ProductCard({
  product,
  onSelectCalculate,
  onSelectInquiry,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}: ProductCardProps) {
  const [showSpecsModal, setShowSpecsModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'outright' | '6month' | '12month'>('outright');
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);

  // Helper to format currency
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Helper to get estimated finance repayments
  const getFinanceRepayments = () => {
    const principal = product.priceNGN;
    const baseInterest = selectedPlan === '6month' ? 0.12 : 0.18;
    const totalPayable = principal * (1 + baseInterest);
    const deposit = principal * 0.30; // 30% initial deposit
    const remaining = totalPayable - deposit;
    const months = selectedPlan === '6month' ? 6 : 12;
    const monthly = remaining / months;
    const weekly = monthly / 4;
    return { deposit, monthly, weekly, totalPayable };
  };

  const financeInfo = getFinanceRepayments();

  const handleAddToCartClick = () => {
    onAddToCart(product, selectedPlan);
    setShowAddedAnimation(true);
    setTimeout(() => {
      setShowAddedAnimation(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200/80 hover:border-brand-red shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full overflow-hidden group relative" id={`product-card-${product.id}`}>
      
      {/* Product Image container */}
      <div className="relative overflow-hidden bg-stone-50 aspect-video sm:aspect-[4/3] z-0">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            id={`product-img-${product.id}`}
          />
        ) : (
          <div className="w-full h-full bg-stone-50 flex flex-col items-center justify-center p-6 text-center text-stone-400 group-hover:bg-stone-100/60 transition-colors duration-300">
            <ShoppingBag className="h-9 w-9 text-stone-300 mb-2.5 stroke-[1.5]" />
            <span className="font-display font-black text-[10px] uppercase tracking-wider text-stone-500">Photo Coming Soon</span>
            <span className="font-sans text-[9px] text-stone-400 mt-0.5">Official TAAJ Showroom Photo</span>
          </div>
        )}
        
        {/* Badges on Image */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.outrightDiscount && (
            <span className="bg-brand-red text-white text-[10px] font-display font-black px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 self-start">
              <Award className="h-3 w-3" />
              <span>SAVE {product.outrightDiscount}% OUTRIGHT</span>
            </span>
          )}
        </div>

        {/* Wishlist Button over image */}
        <button
          onClick={() => onToggleWishlist(product.id)}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white shadow-md text-stone-500 hover:text-brand-red hover:scale-110 active:scale-95 transition-all cursor-pointer"
          id={`wishlist-toggle-${product.id}`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-5 w-5 transition-colors ${isWishlisted ? 'fill-brand-red text-brand-red' : 'text-stone-600'}`} />
        </button>

        {/* Stock Badge */}
        <div className="absolute bottom-3 left-4 z-10 bg-emerald-500 text-white font-mono text-[9px] font-bold px-2.5 py-1 rounded shadow-sm">
          ● IN STOCK & READY FOR DISPATCH
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 sm:p-8 flex-grow flex flex-col">
        {/* Title and Pricing */}
        <div className="mb-4">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-display font-black text-xl sm:text-2xl text-brand-black leading-snug tracking-tight group-hover:text-brand-red transition-colors" id={`product-title-${product.id}`}>
              {product.name}
            </h3>
            {/* Price badge right aligned */}
            <div className="text-right flex-shrink-0">
              <span className="block font-display font-black text-xl sm:text-2xl text-brand-red">
                {formatNaira(product.priceNGN)}
              </span>
              <span className="block font-mono text-[9px] text-stone-400 font-bold uppercase tracking-wider">
                Outright Retail
              </span>
            </div>
          </div>
          <p className="font-sans text-xs font-semibold text-stone-500 mt-1.5 italic">
            &ldquo;{product.tagline}&rdquo;
          </p>
        </div>

        {/* Stars */}
        <div className="flex items-center space-x-1.5 mb-5" id={`product-rating-${product.id}`}>
          <div className="flex text-brand-yellow">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? 'fill-brand-yellow text-brand-yellow' : 'text-stone-200'
                }`}
              />
            ))}
          </div>
          <span className="font-sans text-xs font-bold text-stone-800">
            {product.rating}
          </span>
          <span className="font-sans text-xs text-stone-400">
            ({product.reviewCount} verified orders)
          </span>
        </div>

        <p className="font-sans text-sm text-stone-600 leading-relaxed mb-6">
          {product.description}
        </p>

        {/* Interactive E-commerce Purchase Mode Selector */}
        <div className="bg-stone-50 border border-stone-100 rounded-2xl p-4.5 mb-6" id={`purchase-plan-selector-${product.id}`}>
          <span className="block font-sans font-black text-[10px] text-stone-400 uppercase tracking-widest mb-3">
            SELECT ACQUISITION OPTION
          </span>
          <div className="grid grid-cols-3 gap-1.5 bg-stone-200/50 p-1 rounded-xl mb-4">
            {(['outright', '6month', '12month'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedPlan(mode)}
                className={`py-1.5 rounded-lg text-[10px] font-sans font-black uppercase tracking-wider transition-all cursor-pointer ${
                  selectedPlan === mode
                    ? 'bg-brand-black text-white shadow-sm'
                    : 'text-stone-600 hover:text-brand-black'
                }`}
              >
                {mode === 'outright' ? 'Outright' : mode === '6month' ? '6 Months' : '12 Months'}
              </button>
            ))}
          </div>

          {/* Dynamic price reflection based on selected mode */}
          <div className="flex justify-between items-center bg-white border border-stone-200/50 p-3 rounded-xl shadow-sm">
            {selectedPlan === 'outright' ? (
              <>
                <div>
                  <span className="block font-sans font-black text-xs text-stone-400 uppercase tracking-wider">Outright Price</span>
                  <span className="font-sans font-black text-base text-brand-black">{formatNaira(product.priceNGN)}</span>
                </div>
                <div className="bg-brand-red/5 border border-brand-red/20 text-brand-red font-sans font-black text-[9px] px-2 py-1 rounded">
                  {product.outrightDiscount ? `-${product.outrightDiscount}% OFF` : 'PROMO PRICE'}
                </div>
              </>
            ) : (
              <>
                <div>
                  <span className="block font-sans font-black text-[9px] text-stone-400 uppercase tracking-wider">30% Starting Deposit</span>
                  <span className="font-sans font-black text-sm text-brand-black">{formatNaira(financeInfo.deposit)}</span>
                </div>
                <div className="text-right">
                  <span className="block font-sans font-black text-[9px] text-stone-400 uppercase tracking-wider">Weekly Installment</span>
                  <span className="font-sans font-black text-sm text-brand-red">{formatNaira(financeInfo.weekly)}/wk</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="border-t border-dashed border-stone-200/80 pt-5 mb-6" id={`product-features-${product.id}`}>
          <h4 className="font-sans font-bold text-xs text-stone-400 uppercase tracking-wider mb-3">
            Top Assembly Highlights
          </h4>
          <ul className="space-y-2.5">
            {product.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-start text-xs sm:text-sm text-stone-700 font-medium">
                <div className="bg-brand-yellow/10 rounded-full p-0.5 mr-2.5 mt-0.5 flex-shrink-0 border border-brand-yellow/30">
                  <Check className="h-3.5 w-3.5 text-brand-black stroke-[3px]" />
                </div>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-stone-100" id={`product-actions-${product.id}`}>
          
          {/* Add to Cart button */}
          <button
            onClick={handleAddToCartClick}
            disabled={showAddedAnimation}
            className={`w-full font-sans font-black px-4 py-3 rounded-full transition-all shadow-md flex items-center justify-center space-x-2 text-sm cursor-pointer ${
              showAddedAnimation 
                ? 'bg-emerald-600 text-white shadow-emerald-600/10' 
                : 'bg-brand-red hover:bg-brand-red/90 text-white shadow-brand-red/10 hover:shadow-brand-red/20'
            }`}
            id={`add-to-cart-btn-${product.id}`}
          >
            {showAddedAnimation ? (
              <>
                <Check className="h-4 w-4 animate-scale-up" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          {/* Finance Terms / Customize Spreading */}
          <button
            onClick={() => onSelectCalculate(product.id)}
            className="w-full bg-brand-black hover:bg-brand-black/90 text-white font-sans font-black px-4 py-3 rounded-full transition-all flex items-center justify-center space-x-2 text-sm shadow-md cursor-pointer"
            id={`calc-btn-${product.id}`}
          >
            <Calculator className="h-4 w-4 text-brand-yellow" />
            <span>Spreading Calculator</span>
          </button>
        </div>

        {/* View Specs Trigger */}
        <button
          onClick={() => setShowSpecsModal(true)}
          className="mt-4 text-center text-xs font-mono font-bold text-stone-400 hover:text-brand-red flex items-center justify-center space-x-1 py-1 group-hover:translate-x-1 transition-all cursor-pointer"
          id={`view-specs-trigger-${product.id}`}
        >
          <Eye className="h-3.5 w-3.5" />
          <span>View Detailed Specs Sheet</span>
        </button>
      </div>

      {/* Deep Specification Specs Modal */}
      <AnimatePresence>
        {showSpecsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id={`specs-modal-${product.id}`}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSpecsModal(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 border border-stone-200/80 overflow-y-auto max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex justify-between items-start pb-4 border-b border-stone-100 mb-6">
                <div>
                  <h3 className="font-sans font-black text-2xl text-brand-black leading-none">
                    {product.name}
                  </h3>
                  <p className="font-mono text-[10px] text-brand-red font-black mt-2.5 uppercase tracking-wider">
                    Official Technical Specifications
                  </p>
                </div>
                <button
                  onClick={() => setShowSpecsModal(false)}
                  className="p-1.5 rounded-full bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-500 transition-colors cursor-pointer"
                  id={`close-specs-modal-${product.id}`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Product Info Table */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 py-2 border-b border-dashed border-stone-100 text-sm">
                  <span className="font-sans text-stone-400 font-medium">Outright Price:</span>
                  <span className="font-sans text-brand-black font-black text-right">{formatNaira(product.priceNGN)}</span>
                </div>
                {product.specs.engine && (
                  <div className="grid grid-cols-2 py-2 border-b border-dashed border-stone-100 text-sm">
                    <span className="font-sans text-stone-400 font-medium">Engine/Power:</span>
                    <span className="font-sans text-brand-black font-semibold text-right">{product.specs.engine}</span>
                  </div>
                )}
                <div className="grid grid-cols-2 py-2 border-b border-dashed border-stone-100 text-sm">
                  <span className="font-sans text-stone-400 font-medium">Max Payload Capacity:</span>
                  <span className="font-sans text-brand-black font-semibold text-right">{product.specs.loadCapacity}</span>
                </div>
                {product.specs.fuelTank && (
                  <div className="grid grid-cols-2 py-2 border-b border-dashed border-stone-100 text-sm">
                    <span className="font-sans text-stone-400 font-medium">Fuel Tank Capacity:</span>
                    <span className="font-sans text-brand-black font-semibold text-right">{product.specs.fuelTank}</span>
                  </div>
                )}
                {product.specs.gears && (
                  <div className="grid grid-cols-2 py-2 border-b border-dashed border-stone-100 text-sm">
                    <span className="font-sans text-stone-400 font-medium">Transmission/Gears:</span>
                    <span className="font-sans text-brand-black font-semibold text-right">{product.specs.gears}</span>
                  </div>
                )}
                <div className="grid grid-cols-2 py-2 border-b border-dashed border-stone-100 text-sm">
                  <span className="font-sans text-stone-400 font-medium">Chassis Assembly:</span>
                  <span className="font-sans text-brand-black font-semibold text-right">{product.specs.frameMaterial}</span>
                </div>
                <div className="grid grid-cols-2 py-2 border-b border-dashed border-stone-100 text-sm">
                  <span className="font-sans text-stone-400 font-medium">Braking Safety System:</span>
                  <span className="font-sans text-brand-black font-semibold text-right">{product.specs.brakes}</span>
                </div>
              </div>

              {/* Complete Features List */}
              <div className="mb-8">
                <h4 className="font-sans font-black text-[10px] text-brand-red uppercase tracking-widest mb-3">
                  Comprehensive Parts Checklist
                </h4>
                <div className="bg-stone-50 border border-stone-100 rounded-2xl p-4 space-y-3">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start text-xs sm:text-sm text-stone-700 font-medium">
                      <Check className="h-4 w-4 text-brand-red stroke-[3px] mr-2.5 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setShowSpecsModal(false);
                    handleAddToCartClick();
                  }}
                  className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-sans font-black py-3.5 rounded-full shadow-lg transition-all text-center flex items-center justify-center space-x-2 text-sm cursor-pointer"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Shopping Cart ({selectedPlan === 'outright' ? 'Outright' : 'Finance'})</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
