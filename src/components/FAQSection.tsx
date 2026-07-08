import { useState } from 'react';
import { FAQS } from '../data';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-white dark:bg-stone-900 border-t border-stone-200/50 dark:border-stone-850" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-500/10 border border-brand-green/20 text-brand-green px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="h-4 w-4 text-brand-green" />
            <span>CUSTOMER CLEARANCE CENTRE</span>
          </div>
          <h2 className="font-display font-bold text-3xl text-brand-dark dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-sm text-stone-500 dark:text-stone-400 mt-2 font-medium">
            Everything you need to know about purchasing, paperwork, delivery, and parts servicing in Nigeria.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4" id="faq-accordions">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/60 dark:border-stone-800 overflow-hidden shadow-sm hover:shadow-md transition-all"
                id={`faq-item-${idx}`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 text-left font-sans font-bold text-brand-dark dark:text-white flex justify-between items-center space-x-4 outline-none focus:bg-stone-50/50 dark:focus:bg-stone-800 cursor-pointer"
                  id={`faq-btn-${idx}`}
                >
                  <span className="text-base sm:text-lg leading-snug font-bold">{faq.question}</span>
                  <span className="bg-stone-50 dark:bg-stone-800 rounded-lg p-1.5 text-stone-600 dark:text-stone-300 flex-shrink-0 border border-stone-100 dark:border-stone-700">
                    {isOpen ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800 pt-4 bg-stone-50/10 dark:bg-stone-950/10 font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
