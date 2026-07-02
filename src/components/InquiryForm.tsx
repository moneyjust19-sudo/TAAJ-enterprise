import { useState, useEffect, FormEvent } from 'react';
import { Product } from '../types';
import { NIGERIAN_CITIES } from '../data';
import { Send, CheckCircle, Smartphone, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InquiryFormProps {
  products: Product[];
  prefillProductId: string;
  prefillPlan: 'outright' | '6month' | '12month';
  onInquirySubmitted: (inquiry: any) => void;
}

export default function InquiryForm({ products, prefillProductId, prefillPlan, onInquirySubmitted }: InquiryFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState(NIGERIAN_CITIES[0]);
  const [productId, setProductId] = useState(prefillProductId || products[0]?.id || '');
  const [paymentOption, setPaymentOption] = useState<'outright' | '6month' | '12month'>(prefillPlan || '6month');
  const [message, setMessage] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [generatedWhatsAppLink, setGeneratedWhatsAppLink] = useState('');

  // Sync Prefills
  useEffect(() => {
    if (prefillProductId) {
      setProductId(prefillProductId);
    }
  }, [prefillProductId]);

  useEffect(() => {
    if (prefillPlan) {
      setPaymentOption(prefillPlan);
    }
  }, [prefillPlan]);

  const activeProduct = products.find(p => p.id === productId) || products[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Form validations
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setErrorMsg('Please enter a valid Nigerian phone number (at least 10 digits).');
      return;
    }

    // Build lead item
    const newInquiry = {
      id: `inq-${Date.now()}`,
      name,
      phone,
      email,
      city,
      productInterest: activeProduct ? activeProduct.name : 'General Inquiry',
      paymentOption,
      message,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    onInquirySubmitted(newInquiry);

    // Formulate a beautiful WhatsApp text payload
    const textPrefix = `Hello Naija Wheels! I just submitted an inquiry on your website.%0A%0A`;
    const clientDetails = `*My Details:*%0A- *Name:* ${encodeURIComponent(name)}%0A- *Phone:* ${encodeURIComponent(phone)}%0A- *City:* ${encodeURIComponent(city)}%0A%0A`;
    const productDetails = `*Order Interest:*%0A- *Model:* ${encodeURIComponent(activeProduct?.name || 'Tricycle')}%0A- *Plan chosen:* ${paymentOption === 'outright' ? 'Outright Purchase (Cash Discount)' : paymentOption === '6month' ? '6-Month installment HP' : '12-Month installment HP'}%0A`;
    const optionalMsg = message ? `%0A*Message:* ${encodeURIComponent(message)}` : '';

    const waUrl = `https://wa.me/2348000000000?text=${textPrefix}${clientDetails}${productDetails}${optionalMsg}`;
    setGeneratedWhatsAppLink(waUrl);

    setFormSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setCity(NIGERIAN_CITIES[0]);
    setMessage('');
    setFormSubmitted(false);
    setGeneratedWhatsAppLink('');
  };

  return (
    <section className="py-20 bg-white" id="inquiry">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-stone-200/60 shadow-xl shadow-stone-900/5 overflow-hidden" id="inquiry-card-container">
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Banner Side Panel */}
            <div className="md:col-span-4 bg-brand-dark p-8 text-white flex flex-col justify-between" id="inquiry-side-panel">
              <div className="space-y-6">
                <span className="font-mono text-[10px] font-bold tracking-widest text-brand-cream bg-brand-green/95 px-3 py-1 rounded-md inline-block">
                  RAPID QUOTE FORM
                </span>
                <h3 className="font-display font-bold text-2xl tracking-tight leading-tight text-white">
                  Start Your Journey Today
                </h3>
                <p className="font-sans text-xs text-stone-300 leading-relaxed font-medium">
                  Fill out our brief form and our local sales representatives in Lagos, Abuja, or PH will contact you within 2 hours.
                </p>
              </div>

              <div className="mt-8 border-t border-stone-800/80 pt-6 space-y-4">
                <div className="flex items-center space-x-3 text-xs">
                  <Smartphone className="h-4.5 w-4.5 text-brand-green" />
                  <span className="text-stone-200 font-medium">Call center: 0800-NAIJA-WHEELS</span>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <MessageSquare className="h-4.5 w-4.5 text-brand-green" />
                  <span className="text-stone-200 font-medium">Available on WhatsApp 24/7</span>
                </div>
              </div>
            </div>

            {/* Form Side Panel */}
            <div className="md:col-span-8 p-6 sm:p-10" id="inquiry-form-panel">
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.div
                    key="form-fields"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h4 className="font-display font-bold text-xl text-brand-dark mb-6 flex items-center space-x-2">
                      <Sparkles className="h-5 w-5 text-brand-green animate-pulse" />
                      <span>Request a Quotation & Hire Purchase Deal</span>
                    </h4>

                    {errorMsg && (
                      <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl text-xs mb-5 font-medium">
                        {errorMsg}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4" id="actual-inquiry-form">
                      {/* Name and Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Babajide Olusola"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-brand-green focus:ring focus:ring-emerald-100 outline-none text-sm font-sans transition-all bg-white font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            placeholder="e.g. 0803 456 7890"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-brand-green focus:ring focus:ring-emerald-100 outline-none text-sm font-sans transition-all bg-white font-medium"
                          />
                        </div>
                      </div>

                      {/* Email and City */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                            Email Address <span className="text-stone-400 font-normal">(Optional)</span>
                          </label>
                          <input
                            type="email"
                            placeholder="e.g. babajide@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-brand-green focus:ring focus:ring-emerald-100 outline-none text-sm font-sans transition-all bg-white font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                            Nearest Dealer City *
                          </label>
                          <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-brand-green focus:ring focus:ring-emerald-100 outline-none text-sm font-sans transition-all bg-white cursor-pointer font-medium"
                          >
                            {NIGERIAN_CITIES.map((c, idx) => (
                              <option key={idx} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Product and Payment pref */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                            Product Interest *
                          </label>
                          <select
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-brand-green focus:ring focus:ring-emerald-100 outline-none text-sm font-sans transition-all bg-white cursor-pointer font-medium"
                          >
                            {products.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                            Preferred Payment Method *
                          </label>
                          <select
                            value={paymentOption}
                            onChange={(e) => setPaymentOption(e.target.value as any)}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-brand-green focus:ring focus:ring-emerald-100 outline-none text-sm font-sans transition-all bg-white cursor-pointer font-medium"
                          >
                            <option value="outright">Outright Purchase (Instant Discount)</option>
                            <option value="6month">6-Month Installment Hire-Purchase</option>
                            <option value="12month">12-Month Installment Hire-Purchase</option>
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                          Additional Message / Questions <span className="text-stone-400 font-normal">(Optional)</span>
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Tell us if you want any accessories or specific delivery requests..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-brand-green focus:ring focus:ring-emerald-100 outline-none text-sm font-sans transition-all bg-white resize-none font-medium"
                        ></textarea>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-sans font-bold py-4 rounded-full shadow-lg shadow-emerald-950/10 hover:shadow-emerald-950/20 transition-all text-center flex items-center justify-center space-x-2 text-sm cursor-pointer"
                        id="submit-inquiry-btn"
                      >
                        <Send className="h-4.5 w-4.5" />
                        <span>Submit Inquiry Sheet</span>
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8 space-y-6"
                    id="inquiry-success-container"
                  >
                    <div className="bg-emerald-50 border border-emerald-150 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto text-brand-green">
                      <CheckCircle className="h-12 w-12 stroke-[2.5]" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-display font-bold text-2xl text-brand-dark">
                        Awesome, {name}!
                      </h4>
                      <p className="font-sans text-sm text-stone-600 max-w-md mx-auto leading-relaxed font-medium">
                        Your inquiry sheet for the <strong className="text-brand-green">{activeProduct?.name}</strong> has been logged in our dealers network successfully.
                      </p>
                    </div>

                    <div className="bg-brand-cream border border-stone-200/80 p-5 rounded-2xl max-w-md mx-auto text-left space-y-3">
                      <h5 className="font-display font-bold text-base text-brand-dark flex items-center gap-1.5">
                        <Sparkles className="h-4.5 w-4.5 text-brand-green" />
                        <span>Skip the wait: Send to WhatsApp!</span>
                      </h5>
                      <p className="font-sans text-xs text-stone-600 leading-normal font-medium">
                        To get a fast quote approval immediately, send your pre-filled details to our lead WhatsApp dealer directly!
                      </p>

                      <a
                        href={generatedWhatsAppLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-sans font-bold py-3 rounded-full shadow-md hover:shadow-emerald-950/10 transition-all text-center flex items-center justify-center space-x-2 text-xs cursor-pointer"
                        id="whatsapp-direct-link"
                      >
                        <MessageSquare className="h-4.5 w-4.5 fill-white" />
                        <span>Send Deal directly via WhatsApp</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>

                    <button
                      onClick={handleReset}
                      className="text-xs font-mono font-bold text-stone-400 hover:text-brand-green py-1 transition-colors cursor-pointer"
                      id="reset-form-btn"
                    >
                      &larr; Submit another quotation inquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
