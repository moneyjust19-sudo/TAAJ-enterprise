import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, CreditCard, ShieldCheck, Check, Building, Truck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NIGERIAN_CITIES } from '../data';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onPlaceOrder: (
    name: string,
    phone: string,
    email: string,
    address: string,
    city: string,
    state: string,
    method: 'bank_transfer' | 'card_payment' | 'finance_approved'
  ) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onPlaceOrder,
}: CheckoutModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Lagos');
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'card_payment' | 'finance_approved'>('bank_transfer');
  
  // Card payment fields
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Sum calculations
  const calculateTotals = () => {
    let subtotalOutright = 0;
    let immediateDeposit = 0;
    let totalLifetimeCost = 0;

    cartItems.forEach((item) => {
      totalLifetimeCost += item.totalCost * item.quantity;
      if (item.paymentOption === 'outright') {
        subtotalOutright += item.pricePerItem * item.quantity;
      } else {
        immediateDeposit += item.depositAmount * item.quantity;
      }
    });

    const netImmediate = immediateDeposit + subtotalOutright;

    return {
      subtotalOutright,
      immediateDeposit,
      totalLifetimeCost,
      netImmediate,
    };
  };

  const totals = calculateTotals();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !city) {
      alert('Please fill out all required shipping fields');
      return;
    }
    
    if (paymentMethod === 'card_payment' && (!cardNumber || !expiry || !cvv)) {
      alert('Please fill out your card information');
      return;
    }

    onPlaceOrder(name, phone, email, address, city, state, paymentMethod);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm" id="checkout-modal-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-stone-200/80 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-stone-100 flex justify-between items-center bg-brand-black text-white flex-shrink-0">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-brand-yellow" />
                <span className="font-sans font-black text-lg tracking-tight">SECURE ORDER CHECKOUT</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Split layout: Form left, Order Summary right */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Shipping Details */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="font-sans font-black text-base text-brand-black uppercase tracking-wider mb-4 border-b border-stone-100 pb-2">
                    1. Dispatch & Delivery Address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-sans font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alhaji Bello Musa"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="080 1234 5678"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red font-semibold"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-sans font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="bello@musatransport.ng"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red font-medium"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-sans font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                      Street Delivery Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Plot 45, Commercial Road, off Broad Street"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-xs font-sans font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                        City/Area *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Ikeja"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-bold text-stone-600 uppercase tracking-wider mb-1.5">
                        State *
                      </label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red font-bold"
                      >
                        <option value="Lagos">Lagos State</option>
                        <option value="Abuja">Abuja FCT</option>
                        <option value="Kano">Kano State</option>
                        <option value="Rivers">Rivers State (PH)</option>
                        <option value="Oyo">Oyo State</option>
                        <option value="Kaduna">Kaduna State</option>
                        <option value="Enugu">Enugu State</option>
                        <option value="Edo">Edo State</option>
                        <option value="Anambra">Anambra State</option>
                        <option value="Abia">Abia State</option>
                        <option value="Other">Other State (Direct Courier)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Payment Option Selection */}
                <div className="pt-4">
                  <h3 className="font-sans font-black text-base text-brand-black uppercase tracking-wider mb-4 border-b border-stone-100 pb-2">
                    2. Select Payment Settlement
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank_transfer')}
                      className={`px-4 py-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                        paymentMethod === 'bank_transfer'
                          ? 'border-brand-red bg-brand-red/5 text-brand-black'
                          : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      <Building className={`h-5 w-5 ${paymentMethod === 'bank_transfer' ? 'text-brand-red' : 'text-stone-400'}`} />
                      <div>
                        <span className="block font-sans text-xs font-black uppercase">Bank Transfer</span>
                        <span className="block text-[10px] text-stone-500 font-medium mt-1 leading-tight">Pay instantly via local bank app</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card_payment')}
                      className={`px-4 py-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                        paymentMethod === 'card_payment'
                          ? 'border-brand-red bg-brand-red/5 text-brand-black'
                          : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      <CreditCard className={`h-5 w-5 ${paymentMethod === 'card_payment' ? 'text-brand-red' : 'text-stone-400'}`} />
                      <div>
                        <span className="block font-sans text-xs font-black uppercase">Debit Card</span>
                        <span className="block text-[10px] text-stone-500 font-medium mt-1 leading-tight">Pay securely online via card gateway</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('finance_approved')}
                      className={`px-4 py-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                        paymentMethod === 'finance_approved'
                          ? 'border-brand-red bg-brand-red/5 text-brand-black'
                          : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      <ShieldCheck className={`h-5 w-5 ${paymentMethod === 'finance_approved' ? 'text-brand-red' : 'text-stone-400'}`} />
                      <div>
                        <span className="block font-sans text-xs font-black uppercase">Finance Signoff</span>
                        <span className="block text-[10px] text-stone-500 font-medium mt-1 leading-tight">Sign off digital HP guarantee sheets</span>
                      </div>
                    </button>
                  </div>

                  {/* Payment Sub-containers based on choices */}
                  <div className="mt-4">
                    {paymentMethod === 'bank_transfer' && (
                      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-xs space-y-2">
                        <p className="font-sans font-bold text-brand-black uppercase text-[10px] tracking-wider text-brand-red">
                          TAAJ Commercial Corporate Bank Accounts:
                        </p>
                        <div className="grid grid-cols-2 gap-2 pt-1 font-sans text-stone-700">
                          <div>
                            <span className="block font-bold text-brand-black">Sterling Bank PLC</span>
                            <span className="font-mono text-stone-600">0084539103</span>
                          </div>
                          <div>
                            <span className="block font-bold text-brand-black">Zenith Bank PLC</span>
                            <span className="font-mono text-stone-600">1013459103</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-stone-500 leading-normal pt-1.5 border-t border-stone-200">
                          Please perform your bank app transfer of <strong>{formatNaira(totals.netImmediate)}</strong>. Your order remains locked as "Pending Verification" until corporate treasurers verify receipt (takes 3-5 minutes).
                        </p>
                      </div>
                    )}

                    {paymentMethod === 'card_payment' && (
                      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4.5 space-y-3">
                        <span className="block font-sans font-black text-[10px] text-stone-400 uppercase tracking-widest">
                          ENTER SECURE CARD DATA
                        </span>
                        <div>
                          <label className="block text-[10px] font-sans font-bold text-stone-600 uppercase tracking-wider mb-1">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            placeholder="Alhaji Bello Musa"
                            className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-red font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-sans font-bold text-stone-600 uppercase tracking-wider mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                            maxLength={19}
                            placeholder="4000 1234 5678 9010"
                            className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-red font-semibold"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-sans font-bold text-stone-600 uppercase tracking-wider mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              value={expiry}
                              onChange={(e) => setExpiry(e.target.value)}
                              placeholder="MM/YY"
                              maxLength={5}
                              className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-red font-semibold text-center"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-sans font-bold text-stone-600 uppercase tracking-wider mb-1">
                              CVV / Pin
                            </label>
                            <input
                              type="password"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              maxLength={3}
                              placeholder="***"
                              className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-red font-semibold text-center"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'finance_approved' && (
                      <div className="bg-brand-yellow/10 border border-brand-yellow/30 rounded-2xl p-4 text-xs space-y-2">
                        <span className="block font-sans font-black text-[10px] text-brand-black uppercase tracking-wider">
                          HIRE-PURCHASE FINANCING CLAUSE:
                        </span>
                        <p className="text-stone-700 leading-normal font-medium">
                          By submitting this order under <strong>Finance Signoff</strong>, you authorize TAAJ Commercial and its banking partners to review your Credit Bureau ratings and pre-approve your Hire Purchase contract. A verified representative will call you immediately after submission to sign physical documents.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Summary Column */}
              <div className="lg:col-span-5 bg-stone-50 border border-stone-200 p-6 rounded-3xl flex flex-col justify-between">
                <div>
                  <h3 className="font-sans font-black text-sm text-brand-black uppercase tracking-wider mb-4 border-b border-stone-200 pb-2">
                    Order Items Summary
                  </h3>

                  {/* List of items */}
                  <div className="space-y-4 overflow-y-auto max-h-[250px] pr-2 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-start text-xs font-sans pb-3 border-b border-stone-200/50">
                        <div>
                          <p className="font-black text-brand-black leading-tight">
                            {item.product.name} <span className="text-brand-red">x{item.quantity}</span>
                          </p>
                          <span className="block text-[9px] text-stone-500 font-semibold uppercase mt-1">
                            {item.paymentOption === 'outright' ? 'Outright Purchase' : `${item.paymentOption === '6month' ? '6-Month Plan' : '12-Month Plan'} Financing`}
                          </span>
                        </div>
                        <span className="font-bold text-brand-black text-right block pl-4">
                          {item.paymentOption === 'outright'
                            ? formatNaira(item.pricePerItem * item.quantity)
                            : `Deposit: ${formatNaira(item.depositAmount * item.quantity)}`}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Sheet */}
                  <div className="space-y-2 border-b border-stone-200 pb-4 text-xs font-sans">
                    <div className="flex justify-between text-stone-600">
                      <span>Outright Purchase Items:</span>
                      <span className="font-bold text-brand-black">{formatNaira(totals.subtotalOutright)}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Financed Items Deposit Sum:</span>
                      <span className="font-bold text-brand-black">{formatNaira(totals.immediateDeposit)}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Logistics Assembly & Freight:</span>
                      <span className="font-mono text-emerald-600 font-bold uppercase">₦0 (FREE SHIPPING)</span>
                    </div>
                  </div>

                  {/* Combined Totals */}
                  <div className="py-4 font-sans flex justify-between items-center text-brand-black">
                    <div>
                      <span className="block text-[9px] font-mono text-stone-400 font-bold uppercase tracking-wider">
                        AMOUNT DUE TODAY
                      </span>
                      <span className="text-2xl font-black text-brand-red leading-none">
                        {formatNaira(totals.netImmediate)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[9px] font-mono text-stone-400 font-bold uppercase tracking-wider">
                        CONTRACT LIFETIME
                      </span>
                      <span className="text-sm font-bold text-stone-700">
                        {formatNaira(totals.totalLifetimeCost)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-6 border-t border-stone-200 mt-6 space-y-3">
                  <button
                    type="submit"
                    className="w-full bg-brand-red hover:bg-brand-red/95 text-white font-sans font-black py-4 rounded-full shadow-lg shadow-brand-red/10 transition-all text-center flex items-center justify-center space-x-2 text-sm cursor-pointer uppercase tracking-wider"
                  >
                    <Check className="h-4.5 w-4.5" />
                    <span>Book & Confirm Assembly</span>
                  </button>
                  <div className="flex justify-center items-center space-x-1 text-[10px] font-mono text-stone-400">
                    <ShieldCheck className="h-3.5 w-3.5 text-brand-yellow" />
                    <span>PCI-DSS Secured SSL Transport</span>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
