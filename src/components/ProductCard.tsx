import { useState } from 'react';
import { Product } from '../types';
import { Star, Check, Award, Eye, ShoppingCart, Calculator, X, Heart, Sparkles, ShoppingBag, MessageSquare } from 'lucide-react';
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
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 hover:border-brand-red shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full overflow-hidden group relative" id={`product-card-${product.id}`}>
      
      {/* Product Image container */}
      <div className="relative overflow-hidden bg-stone-50 dark:bg-stone-950 aspect-video sm:aspect-[4/3] z-0">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            id={`product-img-${product.id}`}
          />
        ) : (
          <div className="w-full h-full bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center p-6 text-center text-stone-400 dark:text-stone-500 group-hover:bg-stone-100/60 dark:group-hover:bg-stone-900 transition-colors duration-300">
            <ShoppingBag className="h-9 w-9 text-stone-300 mb-2.5 stroke-[1.5]" />
            <span className="font-display font-black text-[10px] uppercase tracking-wider text-stone-500">Photo Coming Soon</span>
            <span className="font-sans text-[9px] text-stone-400 dark:text-stone-500 mt-0.5">Official TAAJ Showroom Photo</span>
          </div>
        )}
        
        {/* Badges on Image */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        </div>

        {/* Wishlist Button over image */}
        <button
          onClick={() => onToggleWishlist(product.id)}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 dark:bg-stone-900/90 hover:bg-white dark:hover:bg-stone-850 shadow-md text-stone-500 hover:text-brand-red hover:scale-110 active:scale-95 transition-all cursor-pointer"
          id={`wishlist-toggle-${product.id}`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-5 w-5 transition-colors ${isWishlisted ? 'fill-brand-red text-brand-red' : 'text-stone-600 dark:text-stone-400'}`} />
        </button>

        {/* Stock Badge */}
        <div className="absolute bottom-3 left-4 z-10 bg-emerald-500 text-white font-mono text-[9px] font-bold px-2.5 py-1 rounded shadow-sm">
          ● IN STOCK & READY FOR DISPATCH
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 sm:p-8 flex-grow flex flex-col">
        {/* Title and Tagline */}
        <div className="mb-4">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-display font-black text-xl sm:text-2xl text-brand-black dark:text-white leading-snug tracking-tight group-hover:text-brand-red transition-colors" id={`product-title-${product.id}`}>
              {product.name}
            </h3>
          </div>
          <p className="font-sans text-xs font-semibold text-stone-500 dark:text-stone-400 mt-1.5 italic">
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
                  i < Math.floor(product.rating) ? 'fill-brand-yellow text-brand-yellow' : 'text-stone-200 dark:text-stone-700'
                }`}
              />
            ))}
          </div>
          <span className="font-sans text-xs font-bold text-stone-800 dark:text-stone-200">
            {product.rating}
          </span>
          <span className="font-sans text-xs text-stone-400 dark:text-stone-500">
            ({product.reviewCount} verified orders)
          </span>
        </div>

        <p className="font-sans text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
          {product.description}
        </p>

        {/* Feature Highlights */}
        <div className="border-t border-dashed border-stone-200/80 dark:border-stone-800 pt-5 mb-6" id={`product-features-${product.id}`}>
          <h4 className="font-sans font-bold text-xs text-stone-400 uppercase tracking-wider mb-3">
            Top Assembly Highlights
          </h4>
          <ul className="space-y-2.5">
            {product.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-start text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-medium">
                <div className="bg-brand-yellow/10 dark:bg-brand-yellow/20 rounded-full p-0.5 mr-2.5 mt-0.5 flex-shrink-0 border border-brand-yellow/30 dark:border-brand-yellow/45">
                  <Check className="h-3.5 w-3.5 text-brand-black dark:text-white stroke-[3px]" />
                </div>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-stone-100 dark:border-stone-800" id={`product-actions-${product.id}`}>
          <a
            href="https://wa.me/2348084746856?text=Hello%20TAAJ%20Commercial%20Enterprises%2C%20I%20am%20interested%20in%20making%20an%20enquiry%20about%20your%20products"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-sans font-black px-6 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg hover:shadow-brand-red/20 flex items-center justify-center space-x-2 text-sm cursor-pointer transform hover:-translate-y-0.5"
            id={`enquiry-whatsapp-btn-${product.id}`}
          >
            <MessageSquare className="h-4.5 w-4.5 fill-current" />
            <span>Make Enquiry on WhatsApp</span>
          </a>
        </div>

        {/* View Specs Trigger */}
        <button
          onClick={() => setShowSpecsModal(true)}
          className="mt-4 text-center text-xs font-mono font-bold text-stone-400 dark:text-stone-500 hover:text-brand-red flex items-center justify-center space-x-1 py-1 group-hover:translate-x-1 transition-all cursor-pointer"
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
              className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 border border-stone-200/80 dark:border-stone-800 overflow-y-auto max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex justify-between items-start pb-4 border-b border-stone-100 dark:border-stone-800 mb-6">
                <div>
                  <h3 className="font-sans font-black text-2xl text-brand-black dark:text-white leading-none">
                    {product.name}
                  </h3>
                  <p className="font-mono text-[10px] text-brand-red font-black mt-2.5 uppercase tracking-wider">
                    Official Technical Specifications
                  </p>
                </div>
                <button
                  onClick={() => setShowSpecsModal(false)}
                  className="p-1.5 rounded-full bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 transition-colors cursor-pointer"
                  id={`close-specs-modal-${product.id}`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Product Info Table */}
              <div className="space-y-4 mb-6">
                {product.specs.engine && (
                  <div className="grid grid-cols-2 py-2 border-b border-dashed border-stone-100 dark:border-stone-800 text-sm">
                    <span className="font-sans text-stone-400 dark:text-stone-500 font-medium">Engine/Power:</span>
                    <span className="font-sans text-brand-black dark:text-stone-100 font-semibold text-right">{product.specs.engine}</span>
                  </div>
                )}
                <div className="grid grid-cols-2 py-2 border-b border-dashed border-stone-100 dark:border-stone-800 text-sm">
                  <span className="font-sans text-stone-400 dark:text-stone-500 font-medium">Max Payload Capacity:</span>
                  <span className="font-sans text-brand-black dark:text-stone-100 font-semibold text-right">{product.specs.loadCapacity}</span>
                </div>
                {product.specs.fuelTank && (
                  <div className="grid grid-cols-2 py-2 border-b border-dashed border-stone-100 dark:border-stone-800 text-sm">
                    <span className="font-sans text-stone-400 dark:text-stone-500 font-medium">Fuel Tank Capacity:</span>
                    <span className="font-sans text-brand-black dark:text-stone-100 font-semibold text-right">{product.specs.fuelTank}</span>
                  </div>
                )}
                {product.specs.gears && (
                  <div className="grid grid-cols-2 py-2 border-b border-dashed border-stone-100 dark:border-stone-800 text-sm">
                    <span className="font-sans text-stone-400 dark:text-stone-500 font-medium">Transmission/Gears:</span>
                    <span className="font-sans text-brand-black dark:text-stone-100 font-semibold text-right">{product.specs.gears}</span>
                  </div>
                )}
                <div className="grid grid-cols-2 py-2 border-b border-dashed border-stone-100 dark:border-stone-800 text-sm">
                  <span className="font-sans text-stone-400 dark:text-stone-500 font-medium">Chassis Assembly:</span>
                  <span className="font-sans text-brand-black dark:text-stone-100 font-semibold text-right">{product.specs.frameMaterial}</span>
                </div>
                <div className="grid grid-cols-2 py-2 border-b border-dashed border-stone-100 dark:border-stone-800 text-sm">
                  <span className="font-sans text-stone-400 dark:text-stone-500 font-medium">Braking Safety System:</span>
                  <span className="font-sans text-brand-black dark:text-stone-100 font-semibold text-right">{product.specs.brakes}</span>
                </div>
              </div>

              {/* Complete Features List */}
              <div className="mb-8">
                <h4 className="font-sans font-black text-[10px] text-brand-red uppercase tracking-widest mb-3">
                  Comprehensive Parts Checklist
                </h4>
                <div className="bg-stone-50 dark:bg-stone-950 border border-stone-100 dark:border-stone-800 rounded-2xl p-4 space-y-3">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-medium">
                      <Check className="h-4 w-4 text-brand-red stroke-[3px] mr-2.5 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://wa.me/2348084746856?text=Hello%20TAAJ%20Commercial%20Enterprises%2C%20I%20am%20interested%20in%20making%20an%20enquiry%20about%20your%20products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-sans font-black py-3.5 rounded-full shadow-lg transition-all text-center flex items-center justify-center space-x-2 text-sm cursor-pointer"
                >
                  <MessageSquare className="h-4.5 w-4.5 fill-current animate-pulse mr-1" />
                  <span>Contact Sales on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
