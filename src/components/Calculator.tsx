import { useState, useEffect } from 'react';
import { Product } from '../types';
import { NIGERIAN_PRODUCTS } from '../data';
import { Calculator, Coins, ShieldCheck, Check, Info, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

interface CalculatorProps {
  products: Product[];
  selectedProductId: string;
  onApplyPlan: (productId: string, plan: 'outright' | '6month' | '12month', depositPercent: number) => void;
}

export default function InstallmentCalculator({ products, selectedProductId, onApplyPlan }: CalculatorProps) {
  // Filter out spare parts and generators for finance calculations
  const financeableProducts = products.filter(p => p.type === 'tricycle' || p.type === 'motorcycle' || p.type === 'electric_bike');

  const [activeProductId, setActiveProductId] = useState(selectedProductId || financeableProducts[0]?.id || products[0]?.id);
  const [planType, setPlanType] = useState<'outright' | '6month' | '12month'>('6month');
  const [depositPercent, setDepositPercent] = useState(30); // Default 30% deposit

  // Sync active product when selectedProductId changes from outside (e.g., clicking on Product card)
  useEffect(() => {
    if (selectedProductId) {
      setActiveProductId(selectedProductId);
    }
  }, [selectedProductId]);

  const activeProduct = financeableProducts.find(p => p.id === activeProductId) || financeableProducts[0] || products[0];

  // Helper to format currency
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Financial Calculations
  const calculateFinance = () => {
    const basePrice = activeProduct.priceNGN;

    if (planType === 'outright') {
      const discountPercent = activeProduct.outrightDiscount || 0;
      const discountVal = basePrice * (discountPercent / 100);
      const finalPrice = basePrice - discountVal;

      return {
        depositAmount: finalPrice,
        remainingBalance: 0,
        monthlyRepayment: 0,
        weeklyRepayment: 0,
        totalCost: finalPrice,
        savings: discountVal
      };
    }

    // Hire-Purchase with interest rate
    const interestRate = planType === '6month' ? 0.08 : 0.15; // 8% for 6 months, 15% for 12 months
    const depositAmount = basePrice * (depositPercent / 100);
    const principalToFinance = basePrice - depositAmount;
    const totalToFinanceWithInterest = principalToFinance * (1 + interestRate);

    const totalCost = depositAmount + totalToFinanceWithInterest;
    const months = planType === '6month' ? 6 : 12;
    const weeks = months * 4.33; // Approx weeks per month

    const monthlyRepayment = totalToFinanceWithInterest / months;
    const weeklyRepayment = totalToFinanceWithInterest / weeks;

    return {
      depositAmount,
      remainingBalance: totalToFinanceWithInterest,
      monthlyRepayment,
      weeklyRepayment,
      totalCost,
      savings: 0
    };
  };

  const results = calculateFinance();

  return (
    <section className="py-20 bg-stone-50 dark:bg-stone-950 border-t border-stone-200/80 dark:border-stone-850" id="calculator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-brand-black dark:text-white tracking-tight leading-tight uppercase">
            Flexible Hire-Purchase Spreading
          </h2>
          <p className="font-sans text-base sm:text-lg text-stone-600 dark:text-stone-300 mt-4 leading-relaxed font-medium">
            Adjust down payments, view monthly plans, and calculate interest-friendly weekly rates. No hidden fees. Select your custom options below.
          </p>
        </div>

        {/* Calculator Widget Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch" id="calculator-widget-grid">
          {/* Inputs Section */}
          <div className="lg:col-span-7 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/60 dark:border-stone-800 p-6 sm:p-10 shadow-lg shadow-stone-900/5 flex flex-col justify-between" id="calc-inputs-card">
            <div className="space-y-8">
              {/* 1. Select Product */}
              <div>
                <label className="block font-sans font-bold text-sm text-brand-dark dark:text-white uppercase tracking-wider mb-3">
                  1. Choose Vehicle model
                </label>
                <div className="relative" id="calc-product-select-container">
                  <select
                    value={activeProductId}
                    onChange={(e) => setActiveProductId(e.target.value)}
                    className="w-full px-5 py-4 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 rounded-2xl font-sans text-sm font-bold text-brand-black dark:text-white focus:border-brand-red focus:outline-none focus:ring-4 focus:ring-brand-red/5 transition-all shadow-xs appearance-none cursor-pointer"
                    id="calc-product-dropdown"
                  >
                    {financeableProducts.map((prod) => (
                      <option key={prod.id} value={prod.id} className="dark:bg-stone-900 dark:text-white">
                        {prod.name} ({formatNaira(prod.priceNGN)})
                      </option>
                    ))}
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-stone-400">
                    <ChevronDown className="h-5 w-5" />
                  </span>
                </div>
              </div>

              {/* 2. Choose Plan Option */}
              <div>
                <label className="block font-sans font-bold text-sm text-brand-dark dark:text-white uppercase tracking-wider mb-3">
                  2. Select Repayment Term
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" id="calc-term-select">
                  <button
                    onClick={() => {
                      setPlanType('outright');
                      setDepositPercent(100);
                    }}
                    className={`px-4 py-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      planType === 'outright'
                        ? 'border-brand-green bg-emerald-50/50 dark:bg-emerald-500/10 text-brand-dark dark:text-white font-bold shadow-md shadow-emerald-950/5'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700'
                    }`}
                    id="calc-term-outright"
                  >
                    <span className="block font-sans text-sm font-bold">Outright Purchase</span>
                    <span className="block font-sans text-xs text-brand-green mt-1.5 font-semibold">
                      Save {activeProduct.outrightDiscount || 0}% Cash Discount
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setPlanType('6month');
                      if (depositPercent === 100) setDepositPercent(30);
                    }}
                    className={`px-4 py-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      planType === '6month'
                        ? 'border-brand-green bg-emerald-50/50 dark:bg-emerald-500/10 text-brand-dark dark:text-white font-bold shadow-md shadow-emerald-950/5'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700'
                    }`}
                    id="calc-term-6month"
                  >
                    <span className="block font-sans text-sm font-bold">6 Months Spreading</span>
                    <span className="block font-sans text-xs text-brand-green/85 mt-1.5 font-semibold">
                      Low 8% Finance rate
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setPlanType('12month');
                      if (depositPercent === 100) setDepositPercent(30);
                    }}
                    className={`px-4 py-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      planType === '12month'
                        ? 'border-brand-green bg-emerald-50/50 dark:bg-emerald-500/10 text-brand-dark dark:text-white font-bold shadow-md shadow-emerald-950/5'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700'
                    }`}
                    id="calc-term-12month"
                  >
                    <span className="block font-sans text-sm font-bold">12 Months Spreading</span>
                    <span className="block font-sans text-xs text-brand-green/85 mt-1.5 font-semibold">
                      Max spreading, 15% rate
                    </span>
                  </button>
                </div>
              </div>

              {/* 3. Slider Deposit (Hide if outright) */}
              {planType !== 'outright' && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block font-sans font-bold text-sm text-brand-dark dark:text-white uppercase tracking-wider">
                      3. Down Payment / Initial Deposit
                    </label>
                    <span className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-brand-green font-mono text-sm font-bold px-3 py-1 rounded-lg">
                      {depositPercent}% Down
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="60"
                    step="5"
                    value={depositPercent}
                    onChange={(e) => setDepositPercent(Number(e.target.value))}
                    className="w-full h-2.5 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-brand-green"
                    id="calc-deposit-slider"
                  />
                  <div className="flex justify-between text-xs font-mono text-stone-400 mt-2">
                    <span>Min: 30% deposit</span>
                    <span>Mid: 45% deposit</span>
                    <span>Max: 60% deposit</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Helper Notes */}
            <div className="bg-stone-50 dark:bg-stone-950 rounded-2xl p-4 mt-8 border border-stone-100 dark:border-stone-800 flex items-start space-x-3 text-xs text-stone-600 dark:text-stone-300 leading-normal">
              <Info className="h-4.5 w-4.5 text-brand-green flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-sans font-bold text-brand-dark dark:text-white">Guarantor Requirements:</p>
                <p className="font-sans mt-0.5 text-stone-500 dark:text-stone-400 font-medium">
                  Hire-purchase terms require two (2) reliable local guarantors (with verified address / utility bills) and a valid national ID.
                </p>
              </div>
            </div>
          </div>

          {/* Outputs Section / Output Receipt style */}
          <div className="lg:col-span-5 bg-brand-black border border-stone-800 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden" id="calc-outputs-card">
            {/* Ambient glows inside card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/10 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="border-b border-stone-800 pb-4 mb-6">
                <span className="font-mono text-xs font-black text-brand-yellow uppercase tracking-wider block">
                  TAAJ FINANCIAL BREAKDOWN
                </span>
                <h3 className="font-sans font-black text-2xl text-white mt-1">
                  {activeProduct.name}
                </h3>
              </div>

              {/* Receipt Body */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-1.5 border-b border-stone-850 text-sm">
                  <span className="font-sans text-stone-400 font-medium">Outright vehicle Price:</span>
                  <span className="font-sans text-stone-100 font-bold">{formatNaira(activeProduct.priceNGN)}</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-stone-850 text-sm">
                  <span className="font-sans text-stone-400 font-medium">
                    {planType === 'outright' ? 'Full Purchase Price:' : `Initial Deposit Amount (${depositPercent}%):`}
                  </span>
                  <span className="font-sans text-brand-red font-black text-lg">
                    {formatNaira(results.depositAmount)}
                  </span>
                </div>

                {planType !== 'outright' && (
                  <>
                    <div className="flex justify-between items-center py-1.5 border-b border-stone-850 text-sm">
                      <span className="font-sans text-stone-400 font-medium">Financed Balance (with interest):</span>
                      <span className="font-sans text-stone-100 font-semibold">{formatNaira(results.remainingBalance)}</span>
                    </div>

                    <div className="bg-brand-dark rounded-2xl p-4 border border-stone-800 my-6">
                      <div className="text-center">
                        <span className="block font-sans text-xs text-brand-yellow uppercase font-black tracking-widest mb-1">
                          RECOMMENDED REPAYMENT
                        </span>
                        <span className="block font-sans text-3xl font-black text-white leading-none">
                          {formatNaira(results.weeklyRepayment)}
                        </span>
                        <span className="block font-mono text-[10px] text-stone-400 font-bold uppercase mt-1">
                          Per Week (Approx.)
                        </span>
                      </div>

                      <div className="border-t border-dashed border-stone-800 my-3.5 pt-3 flex justify-between text-xs font-mono text-stone-300">
                        <span>Monthly Installment:</span>
                        <span className="font-bold text-white">{formatNaira(results.monthlyRepayment)}</span>
                      </div>
                    </div>
                  </>
                )}

                {planType === 'outright' && results.savings > 0 && (
                  <div className="bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-2xl p-4 my-6 text-center">
                    <span className="block text-xs font-mono font-bold uppercase tracking-wider text-white">
                      CASH OUTRIGHT DISCOUNT SAVINGS
                    </span>
                    <span className="block text-2xl font-black text-brand-red mt-1">
                      {formatNaira(results.savings)}
                    </span>
                    <span className="block text-xs font-sans mt-0.5 text-stone-300">
                      Instantly saved for paying upfront
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center py-2 text-sm font-semibold border-t border-stone-800">
                  <span className="font-sans text-stone-400">Total Lifecycle Cost:</span>
                  <span className="font-sans text-white text-lg font-black">{formatNaira(results.totalCost)}</span>
                </div>
              </div>
            </div>

            {/* CTA action */}
            <div className="mt-8">
              <button
                onClick={() => onApplyPlan(activeProduct.id, planType, depositPercent)}
                className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-sans font-black py-4 rounded-full shadow-xl shadow-brand-red/10 transition-all text-center flex items-center justify-center space-x-2 text-sm cursor-pointer"
                id="calc-apply-plan-btn"
              >
                <span>Select Plan & Add to Cart</span>
              </button>
              <div className="flex justify-center items-center space-x-1.5 mt-3.5 text-[11px] font-mono text-stone-500">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-yellow" />
                <span>Rates valid for current local quarter</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
