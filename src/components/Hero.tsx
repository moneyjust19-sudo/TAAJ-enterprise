import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, MapPin, BadgePercent, ArrowRight, Phone, ChevronRight, ShoppingBag } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onOpenCalculator: () => void;
}

export default function Hero({ onExplore, onOpenCalculator }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-cream dark:bg-brand-dark text-brand-dark dark:text-stone-100" id="home">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cream via-brand-cream/95 to-brand-cream/40 md:to-transparent dark:from-brand-dark dark:via-brand-dark/95 dark:to-brand-dark/40"></div>
        {/* Animated ambient decorative lights */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-75"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Authentic Brand Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6" id="hero-copy-col">
            <div className="inline-flex items-center space-x-1.5 bg-brand-red/5 border border-brand-red/15 text-brand-red dark:text-brand-red px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider self-start">
              <span>OFFICIAL IBADAN DISTRIBUTOR & SALES HUB</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans text-4xl sm:text-5xl lg:text-6.5xl font-black tracking-tight text-brand-dark dark:text-white leading-[1.08] uppercase"
              id="hero-heading"
            >
              TAAJ Commercial <br />
              <span className="text-brand-red">
                Enterprises Nig. Ltd.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed font-medium"
              id="hero-subtext"
            >
              Direct authorized distributors of brand new and premium foreign-used (<span className="text-brand-dark dark:text-white font-bold">Tokunbo</span>) motorcycles, tricycles (Keke Maruwa), commercial generators, and original replacement spare parts. Serving fleets, riders, and businesses across Nigeria with fair cash discounts and flexible installment spreading plans.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-3.5 pt-2"
              id="hero-cta-buttons"
            >
              <button
                onClick={onExplore}
                className="bg-brand-red hover:bg-brand-red/95 text-white font-sans font-black px-8 py-4 rounded-full shadow-lg shadow-brand-red/10 hover:shadow-brand-red/25 transform hover:-translate-y-0.5 transition-all text-center flex items-center justify-center space-x-2 cursor-pointer uppercase text-xs tracking-wider"
                id="hero-cta-catalog"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="https://wa.me/2348084746856?text=Hello%20TAAJ%20Commercial%20Enterprises,%20I%20am%20interested%20in%20making%20an%20enquiry%20about%2520your%2520vehicles%2520and%2520spare%2520parts."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-850 text-brand-dark dark:text-white border border-stone-200/80 dark:border-stone-800 font-sans font-black px-8 py-4 rounded-full shadow-xs hover:shadow-md transition-all text-center flex items-center justify-center space-x-2 cursor-pointer uppercase text-xs tracking-wider"
                id="hero-cta-whatsapp"
              >
                <span>Talk to Sales</span>
              </a>
            </motion.div>

            {/* Partner Brands Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-6 border-t border-stone-200/60 dark:border-stone-800 w-full"
            >
              <p className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest mb-3">Authorized Brands & Parts Supplied</p>
              <div className="flex flex-wrap gap-2">
                {['BAJAJ BOXER', 'TVS HLX', 'HONDA', 'HAOJUE', 'HERO', 'YAMAHA', 'SPIRO'].map((brand) => (
                  <span 
                    key={brand} 
                    className="px-3.5 py-1.5 bg-white dark:bg-stone-900 hover:bg-brand-red/5 dark:hover:bg-brand-red/10 border border-stone-200 dark:border-stone-800 hover:border-brand-red/20 text-stone-700 dark:text-stone-300 hover:text-brand-red font-display font-black text-[10px] rounded-xl transition-all duration-300 tracking-wider shadow-xs hover:shadow-xs cursor-default"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Location Cards */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-6 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-stone-200/80 dark:border-stone-800 p-5 sm:p-6 rounded-3xl shadow-sm"
            >
              <div className="flex flex-col justify-between space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-brand-red/5 text-brand-red rounded-xl border border-brand-red/10 mt-0.5">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-xs text-stone-900 dark:text-white uppercase tracking-wider">HEAD OFFICE</h4>
                    <p className="font-sans text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">Beside Total Filling Station, Shasha Road Ojoo, Ibadan.</p>
                  </div>
                </div>
                <a 
                  href="tel:08036664739" 
                  className="inline-flex items-center space-x-1.5 bg-brand-red/5 hover:bg-brand-red text-brand-red hover:text-white border border-brand-red/10 hover:border-brand-red px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 self-start group shadow-xs"
                >
                  <Phone className="h-3 w-3 fill-current group-hover:scale-110 transition-transform" />
                  <span>08036664739</span>
                </a>
              </div>
              <div className="flex flex-col justify-between space-y-3 border-t sm:border-t-0 sm:border-l border-stone-150 dark:border-stone-800 pt-4 sm:pt-0 sm:pl-5">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-emerald-500/5 text-emerald-600 rounded-xl border border-emerald-500/10 mt-0.5">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-xs text-stone-900 dark:text-white uppercase tracking-wider">BRANCH OFFICE</h4>
                    <p className="font-sans text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">NW3/2, Adebisi Street, Idikan Feleye, Ibadan.</p>
                  </div>
                </div>
                <a 
                  href="https://wa.me/2348084746856" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center space-x-1.5 bg-emerald-500/5 hover:bg-emerald-600 text-emerald-600 hover:text-white border border-emerald-500/10 hover:border-emerald-600 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 self-start group shadow-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:bg-white animate-pulse"></span>
                  <span>WhatsApp: 08084746856</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Dynamic showroom collage showing real vehicles (replaces empty placeholder) */}
          <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[400px] lg:h-[460px] flex items-center justify-center mt-6 lg:mt-0" id="hero-visual-col">
            {/* Outer stylized background borders */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/5 to-brand-yellow/5 rounded-[40px] border border-stone-200/40 dark:border-stone-800 rotate-1 -z-10"></div>
            
            {/* Main Interactive Spotlight Showroom Card */}
            <div className="relative w-[90%] h-[90%] bg-stone-900 rounded-3xl border border-stone-800 shadow-2xl overflow-hidden group flex flex-col justify-end p-6">
              {/* Sleek dark industrial geometric design pattern */}
              <div className="absolute inset-0 bg-stone-950 opacity-95 -z-10"></div>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1c1917_1px,transparent_1px),linear-gradient(to_bottom,#1c1917_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 -z-10"></div>
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-brand-red/10 blur-3xl -z-10"></div>
              <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-brand-yellow/5 blur-3xl -z-10"></div>
              
              {/* Centered clean camera/image icon representation inside card */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-stone-500 mb-16">
                <ShoppingBag className="h-12 w-12 text-stone-700 mb-2.5 stroke-[1.5]" />
                <span className="font-display font-black text-[10px] uppercase tracking-widest text-stone-500">Showroom Showpiece</span>
                <span className="font-sans text-[9px] text-stone-600 mt-0.5">Photo uploads in progress</span>
              </div>
              
              {/* Dark ambient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/20 to-transparent"></div>
              
              {/* Bottom Details panel */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="font-display font-black text-lg sm:text-xl leading-tight">
                  TVS King Deluxe Passenger Keke
                </h3>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs bg-brand-red text-white px-2.5 py-1 rounded-lg font-black">Authorized Dealership</span>
                  <span className="text-[10px] text-stone-400 font-medium">Awaiting Official Photo</span>
                </div>
              </div>
            </div>

            {/* Overlapping small genuine badge */}
            <div className="absolute top-6 -right-2 bg-brand-black text-white border border-stone-800 shadow-xl px-3.5 py-2 rounded-2xl flex items-center space-x-2 max-w-[150px] transform hover:scale-105 transition-all">
              <div className="w-5 h-5 rounded-full bg-brand-red flex items-center justify-center text-white text-[9px] font-black">
                ✓
              </div>
              <div>
                <h4 className="font-sans font-black text-[9px] text-white leading-tight uppercase tracking-wider">GENUINE PARTS</h4>
                <p className="font-sans text-[8px] text-stone-400">100% Guaranteed</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
