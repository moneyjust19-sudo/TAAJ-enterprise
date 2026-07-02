import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0); // flat discount in NGN

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculations
  const calculateTotals = () => {
    let subtotalOutright = 0;
    let immediateDeposit = 0;
    let weeklyInstallmentTotal = 0;
    let totalLifetimeCost = 0;

    cartItems.forEach((item) => {
      totalLifetimeCost += item.totalCost * item.quantity;
      if (item.paymentOption === 'outright') {
        subtotalOutright += item.pricePerItem * item.quantity;
      } else {
        immediateDeposit += item.depositAmount * item.quantity;
        weeklyInstallmentTotal += item.weeklyRepayment * item.quantity;
      }
    });

    const netImmediate = immediateDeposit + subtotalOutright - (promoApplied ? promoDiscount : 0);

    return {
      subtotalOutright,
      immediateDeposit,
      weeklyInstallmentTotal,
      totalLifetimeCost,
      netImmediate: Math.max(0, netImmediate),
    };
  };

  const totals = calculateTotals();

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'TAAJWELCOME') {
      setPromoApplied(true);
      setPromoDiscount(50000); // 50,000 NGN off!
    } else {
      alert('Invalid promo code. Try "TAAJWELCOME" for ₦50,000 off your checkout!');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-container">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
          />

          {/* Drawer panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-stone-100 flex justify-between items-center bg-brand-black text-white">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5 text-brand-yellow" />
                  <span className="font-sans font-black text-lg tracking-tight">MY SHOPPING CART</span>
                  <span className="bg-brand-red text-white text-xs font-black px-2.5 py-0.5 rounded-full">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20 space-y-4">
                    <div className="bg-stone-50 p-6 rounded-full border border-stone-100">
                      <ShoppingBag className="h-12 w-12 text-stone-300" />
                    </div>
                    <h3 className="font-sans font-black text-lg text-stone-800">Your Cart is Empty</h3>
                    <p className="font-sans text-sm text-stone-500 max-w-xs font-medium">
                      Explore our high-performance passenger Kekes, cargo Kekes, and heavy-duty bikes to fill up your cart.
                    </p>
                    <button
                      onClick={onClose}
                      className="bg-brand-red hover:bg-brand-red/90 text-white font-sans font-black text-xs px-6 py-3 rounded-full shadow-md cursor-pointer uppercase tracking-wider"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-stretch space-x-4 bg-stone-50 border border-stone-200/50 p-4 rounded-2xl relative"
                    >
                      {/* Product Image */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-xl object-cover border border-stone-200 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      {/* Content */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-sans font-black text-sm text-brand-black leading-tight pr-5">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-stone-400 hover:text-brand-red absolute top-4 right-4 p-1 rounded hover:bg-stone-100 transition-colors cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Plan Badge */}
                          <div className="mt-1 flex flex-wrap gap-1">
                            {item.paymentOption === 'outright' ? (
                              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-sans font-black px-2 py-0.5 rounded uppercase tracking-wider">
                                Outright Purchase
                              </span>
                            ) : (
                              <span className="bg-brand-yellow/25 text-brand-black text-[9px] font-sans font-black px-2 py-0.5 rounded uppercase tracking-wider border border-brand-yellow/30">
                                {item.paymentOption === '6month' ? '6-Month Plan' : '12-Month Plan'} ({item.depositPercent}% Deposit)
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Price Details and Quantity Adjust */}
                        <div className="mt-4 flex justify-between items-end">
                          {/* Price Display */}
                          <div>
                            {item.paymentOption === 'outright' ? (
                              <div className="font-sans font-black text-sm text-brand-black">
                                {formatNaira(item.pricePerItem)}
                              </div>
                            ) : (
                              <div>
                                <span className="block text-[10px] font-mono text-stone-400 font-bold uppercase leading-none">
                                  Deposit: {formatNaira(item.depositAmount)}
                                </span>
                                <span className="block text-xs font-sans font-black text-brand-red mt-1">
                                  {formatNaira(item.weeklyRepayment)}/wk
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-1.5 bg-stone-200/60 p-1 rounded-lg">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded bg-white hover:bg-stone-100 text-stone-600 transition-all cursor-pointer"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="font-sans font-black text-xs px-2.5 text-brand-black">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded bg-white hover:bg-stone-100 text-stone-600 transition-all cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer / Summary Actions */}
              {cartItems.length > 0 && (
                <div className="border-t border-stone-200 bg-stone-50 p-6 space-y-4">
                  {/* Promo Code Box */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. TAAJWELCOME)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                      className="flex-grow bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-xs font-sans focus:outline-none focus:border-brand-red disabled:bg-stone-100 disabled:text-stone-400 uppercase font-bold"
                    />
                    <button
                      onClick={handleApplyPromo}
                      disabled={promoApplied || !promoCode}
                      className="bg-brand-black hover:bg-brand-black/90 text-white font-sans font-black text-xs px-4 py-2 rounded-xl transition-all cursor-pointer uppercase tracking-wider disabled:bg-stone-300 disabled:text-stone-500"
                    >
                      {promoApplied ? 'Applied' : 'Apply'}
                    </button>
                  </div>

                  {promoApplied && (
                    <div className="flex items-center justify-between text-xs font-sans font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 p-2 rounded-lg">
                      <span className="flex items-center gap-1">
                        <Sparkles className="h-4 w-4 animate-bounce" />
                        <span>TAAJWELCOME Code Active!</span>
                      </span>
                      <span>-{formatNaira(promoDiscount)}</span>
                    </div>
                  )}

                  {/* Summary Breakdown */}
                  <div className="space-y-2 border-b border-stone-200/60 pb-4 text-xs">
                    {totals.subtotalOutright > 0 && (
                      <div className="flex justify-between font-sans text-stone-600">
                        <span>Outright Items Total:</span>
                        <span className="font-bold text-brand-black">{formatNaira(totals.subtotalOutright)}</span>
                      </div>
                    )}
                    {totals.immediateDeposit > 0 && (
                      <div className="flex justify-between font-sans text-stone-600">
                        <span>Financing Deposit Total:</span>
                        <span className="font-bold text-brand-black">{formatNaira(totals.immediateDeposit)}</span>
                      </div>
                    )}
                    {totals.weeklyInstallmentTotal > 0 && (
                      <div className="flex justify-between font-sans text-brand-red font-bold">
                        <span>Combined Weekly Repayments:</span>
                        <span>{formatNaira(totals.weeklyInstallmentTotal)}/wk</span>
                      </div>
                    )}
                  </div>

                  {/* Total Checkout Sum */}
                  <div className="flex justify-between items-center text-brand-black">
                    <div>
                      <span className="block text-[10px] font-mono text-stone-400 font-bold uppercase tracking-wider">
                        IMMEDIATE CHECKOUT PAYMENT
                      </span>
                      <span className="text-xl font-sans font-black tracking-tight block">
                        {formatNaira(totals.netImmediate)}
                      </span>
                    </div>
                    <div className="text-right text-[10px] font-mono text-stone-400 font-bold">
                      <span>LIFETIME: {formatNaira(totals.totalLifetimeCost)}</span>
                    </div>
                  </div>

                  {/* Proceed Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={onProceedToCheckout}
                      className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-sans font-black py-4 rounded-full shadow-lg shadow-brand-red/10 hover:shadow-brand-red/20 text-center flex items-center justify-center space-x-2 text-sm cursor-pointer uppercase tracking-wider"
                    >
                      <CreditCard className="h-4.5 w-4.5" />
                      <span>Secure Checkout</span>
                    </button>
                    <div className="flex justify-center items-center space-x-1 text-[10px] font-mono text-stone-400">
                      <ShieldCheck className="h-3.5 w-3.5 text-brand-yellow" />
                      <span>Secured Assembly Booking System</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
