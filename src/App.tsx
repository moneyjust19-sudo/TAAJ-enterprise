import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import InstallmentCalculator from './components/Calculator';
import InquiryForm from './components/InquiryForm';
import LeadsDashboard from './components/LeadsDashboard';
import FAQSection from './components/FAQSection';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderTrackingModal from './components/OrderTrackingModal';
import TaajLogo from './components/TaajLogo';
import { NIGERIAN_PRODUCTS, TESTIMONIALS } from './data';
import { Inquiry, Product, CartItem, Order } from './types';
import { Phone, MapPin, Award, Star, Mail, ArrowUpRight, MessageSquare, ShieldAlert, Sparkles, Check, Package, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [adminOpen, setAdminOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'tricycle' | 'bicycle' | 'motorcycle' | 'generator' | 'spare_part' | 'electric_bike'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // E-commerce states
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistedIds, setWishlistedIds] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Drawer / Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);

  // Lead prefilling states from calculator
  const [prefillProductId, setPrefillProductId] = useState('');
  const [prefillPlan, setPrefillPlan] = useState<'outright' | '6month' | '12month'>('6month');

  // Inquiries State synced with localStorage
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // Load state on mount
  useEffect(() => {
    // Load Dark Mode first to avoid flashing
    const storedDarkMode = localStorage.getItem('taaj_dark_mode');
    if (storedDarkMode === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Load Inquiries
    const stored = localStorage.getItem('naija_wheels_inquiries');
    if (stored) {
      try {
        setInquiries(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing inquiries', e);
      }
    } else {
      const sampleInquiries: Inquiry[] = [
        {
          id: 'inq-sample-1',
          name: 'Alhaji Babatunde Ayinde',
          phone: '08031112222',
          email: 'babatunde@ayindegroups.com',
          city: 'Lagos (Ikeja, Yaba, Lekki, Alimosho)',
          productInterest: 'Keke Deluxe Passenger',
          paymentOption: '12month',
          message: 'I want to order 3 units for hire purchase. Let me know if you can discount the initial deposit.',
          timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
          status: 'completed'
        },
        {
          id: 'inq-sample-2',
          name: 'Chinedu Amadi',
          phone: '08124445555',
          email: 'chinedu.logistics@gmail.com',
          city: 'Port Harcourt (GRA, Trans-Amadi, Mile 1)',
          productInterest: 'Keke Cargo Master',
          paymentOption: '6month',
          message: 'My food delivery company is expanding. Need one Cargo Master delivered to Trans-Amadi depot.',
          timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
          status: 'pending'
        }
      ];
      localStorage.setItem('naija_wheels_inquiries', JSON.stringify(sampleInquiries));
      setInquiries(sampleInquiries);
    }

    // Load Cart
    const storedCart = localStorage.getItem('taaj_cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error('Error parsing cart', e);
      }
    }

    // Load Wishlist
    const storedWishlist = localStorage.getItem('taaj_wishlist');
    if (storedWishlist) {
      try {
        setWishlistedIds(JSON.parse(storedWishlist));
      } catch (e) {
        console.error('Error parsing wishlist', e);
      }
    }

    // Load Orders & pre-seed default tracker
    const storedOrders = localStorage.getItem('taaj_orders');
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (e) {
        console.error('Error parsing orders', e);
      }
    } else {
      const sampleOrders: Order[] = [
        {
          id: 'TAAJ-7104',
          customerName: 'Alhaji Bello Musa',
          phone: '08034567890',
          email: 'bello@musa.com',
          address: 'Block B, Suite 4, Alausa Shopping Complex',
          city: 'Ikeja',
          state: 'Lagos',
          items: [
            {
              id: 'TAAJ-7104-item-1',
              product: NIGERIAN_PRODUCTS[0],
              quantity: 1,
              paymentOption: '6month',
              depositPercent: 30,
              depositAmount: NIGERIAN_PRODUCTS[0].priceNGN * 0.3,
              monthlyRepayment: (NIGERIAN_PRODUCTS[0].priceNGN * 0.7 * 1.08) / 6,
              weeklyRepayment: (NIGERIAN_PRODUCTS[0].priceNGN * 0.7 * 1.08) / (6 * 4.33),
              pricePerItem: NIGERIAN_PRODUCTS[0].priceNGN,
              totalCost: NIGERIAN_PRODUCTS[0].priceNGN * 0.3 + (NIGERIAN_PRODUCTS[0].priceNGN * 0.7 * 1.08)
            }
          ],
          totalDepositAmount: NIGERIAN_PRODUCTS[0].priceNGN * 0.3,
          totalOutrightPrice: 0,
          paymentMethod: 'bank_transfer',
          timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
          createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          status: 'assembling'
        }
      ];
      localStorage.setItem('taaj_orders', JSON.stringify(sampleOrders));
      setOrders(sampleOrders);
    }
  }, []);

  // Sync savers
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('taaj_cart', JSON.stringify(items));
  };

  const saveWishlist = (ids: string[]) => {
    setWishlistedIds(ids);
    localStorage.setItem('taaj_wishlist', JSON.stringify(ids));
  };

  const saveOrders = (updatedOrders: Order[]) => {
    setOrders(updatedOrders);
    localStorage.setItem('taaj_orders', JSON.stringify(updatedOrders));
  };

  const saveInquiries = (updatedList: Inquiry[]) => {
    localStorage.setItem('naija_wheels_inquiries', JSON.stringify(updatedList));
    setInquiries(updatedList);
  };

  // Inquiry Form Handlers
  const handleNewInquiry = (newInq: Inquiry) => {
    const updated = [newInq, ...inquiries];
    saveInquiries(updated);
  };

  const handleUpdateInquiryStatus = (id: string, status: 'pending' | 'completed' | 'canceled') => {
    const updated = inquiries.map(inq => inq.id === id ? { ...inq, status } : inq);
    saveInquiries(updated);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter(inq => inq.id !== id);
    saveInquiries(updated);
  };

  const handleClearAllInquiries = () => {
    if (window.confirm('Are you sure you want to clear all lead inquiries? This will reset the list.')) {
      saveInquiries([]);
    }
  };

  const handleToggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('taaj_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('taaj_dark_mode', 'false');
    }
  };

  // Nav scroll behavior
  const handleNavigate = (sectionId: string) => {
    setAdminOpen(false);
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // E-commerce handlers
  const handleAddToCart = (product: Product, paymentOption: 'outright' | '6month' | '12month', customDepositPercent: number = 30) => {
    const cartItemId = `${product.id}-${paymentOption}`;
    const existing = cartItems.find(item => item.id === cartItemId);

    if (existing) {
      const updated = cartItems.map(item => 
        item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
      );
      saveCart(updated);
    } else {
      const basePrice = product.priceNGN;
      let pricePerItem = basePrice;
      let depositAmount = basePrice;
      let monthlyRepayment = 0;
      let weeklyRepayment = 0;
      let totalCost = basePrice;

      if (paymentOption === 'outright') {
        const discountPercent = product.outrightDiscount || 0;
        pricePerItem = basePrice * (1 - discountPercent / 100);
        totalCost = pricePerItem;
      } else {
        const interestRate = paymentOption === '6month' ? 0.08 : 0.15;
        depositAmount = basePrice * (customDepositPercent / 100);
        const financed = basePrice - depositAmount;
        const totalFinancedWithInterest = financed * (1 + interestRate);
        totalCost = depositAmount + totalFinancedWithInterest;

        const months = paymentOption === '6month' ? 6 : 12;
        monthlyRepayment = totalFinancedWithInterest / months;
        weeklyRepayment = totalFinancedWithInterest / (months * 4.33);
      }

      const newItem: CartItem = {
        id: cartItemId,
        product,
        quantity: 1,
        paymentOption,
        depositPercent: paymentOption === 'outright' ? 100 : customDepositPercent,
        depositAmount: paymentOption === 'outright' ? pricePerItem : depositAmount,
        monthlyRepayment,
        weeklyRepayment,
        pricePerItem,
        totalCost
      };

      saveCart([...cartItems, newItem]);
    }
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(id);
      return;
    }
    const updated = cartItems.map(item => item.id === id ? { ...item, quantity: qty } : item);
    saveCart(updated);
  };

  const handleRemoveItem = (id: string) => {
    const updated = cartItems.filter(item => item.id !== id);
    saveCart(updated);
  };

  const handleToggleWishlist = (productId: string) => {
    const isSaved = wishlistedIds.includes(productId);
    let updated: string[];
    if (isSaved) {
      updated = wishlistedIds.filter(id => id !== productId);
    } else {
      updated = [...wishlistedIds, productId];
    }
    saveWishlist(updated);
  };

  const handlePlaceOrder = (
    customerName: string,
    phone: string,
    email: string,
    address: string,
    city: string,
    state: string,
    paymentMethod: 'bank_transfer' | 'card_payment' | 'finance_approved'
  ) => {
    let totalDepositAmount = 0;
    let totalOutrightPrice = 0;
    cartItems.forEach(item => {
      if (item.paymentOption === 'outright') {
        totalOutrightPrice += item.pricePerItem * item.quantity;
      } else {
        totalDepositAmount += item.depositAmount * item.quantity;
      }
    });

    const newOrder: Order = {
      id: `TAAJ-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      phone,
      email,
      address,
      city,
      state,
      items: [...cartItems],
      totalDepositAmount,
      totalOutrightPrice,
      paymentMethod,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    const updatedOrders = [newOrder, ...orders];
    saveOrders(updatedOrders);

    // Add to Lead CRM so the CRM portal is dynamically populated with real-world orders
    const newCRMLead: Inquiry = {
      id: `inq-${newOrder.id}`,
      name: customerName,
      phone,
      email,
      city: `${city} (${address})`,
      productInterest: cartItems.map(item => `${item.product.name} (x${item.quantity})`).join(', '),
      paymentOption: cartItems[0]?.paymentOption || 'outright',
      message: `Dynamic Checkout Order Placed via ${paymentMethod.toUpperCase()} Method. Lifetime cost: ₦${cartItems.reduce((acc, item) => acc + (item.totalCost * item.quantity), 0).toLocaleString()}. Status: PENDING ASSEMBLY.`,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    saveInquiries([newCRMLead, ...inquiries]);

    // Clear cart & close checkout
    saveCart([]);
    setIsCheckoutOpen(false);

    // Open tracking modal
    setIsTrackingOpen(true);
  };

  // Pre-fill handlers called from products
  const handleSelectCalculate = (productId: string) => {
    setPrefillProductId(productId);
    handleNavigate('calculator');
  };

  const handleSelectInquiry = (productId: string) => {
    setPrefillProductId(productId);
    handleNavigate('inquiry');
  };

  // Apply plan called from Calculator
  const handleApplyPlan = (productId: string, plan: 'outright' | '6month' | '12month', depositPercent: number) => {
    const selectedProd = NIGERIAN_PRODUCTS.find(p => p.id === productId);
    if (selectedProd) {
      handleAddToCart(selectedProd, plan, depositPercent);
    }
  };

  // Filter products by category and search keyword
  const filteredProducts = NIGERIAN_PRODUCTS.filter(prod => {
    const matchesCategory = selectedCategory === 'all' || prod.type === selectedCategory;
    const matchesSearch = !searchTerm.trim() || 
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col justify-between font-sans selection:bg-brand-red/10 selection:text-brand-red animate-fade-in" id="app-root">
      
      {/* Header */}
      <Header
        onNavigate={handleNavigate}
        onOpenAdmin={() => setAdminOpen(!adminOpen)}
        activeSection={activeSection}
        adminOpen={adminOpen}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlistedIds.length}
        onOpenWishlist={() => {
          const wishlistedProducts = NIGERIAN_PRODUCTS.filter(p => wishlistedIds.includes(p.id));
          if (wishlistedProducts.length === 0) {
            alert("Your Wishlist is currently empty. Tap the heart button on any item card to save it!");
          } else {
            alert(`YOUR SAVED TAAJ VEHICLES & SPARE PARTS:\n${wishlistedProducts.map(p => `• ${p.name}`).join('\n')}\n\nYou can click "Spreading Calculator" or "Add to Cart" directly on these items below!`);
          }
        }}
        orderCount={orders.length}
        onOpenOrders={() => setIsTrackingOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        darkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {adminOpen ? (
            /* Business CRM Admin Dashboard View */
            <motion.section
              key="admin-dashboard"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
              id="admin-crm-section"
            >
              <LeadsDashboard
                inquiries={inquiries}
                onUpdateStatus={handleUpdateInquiryStatus}
                onDeleteInquiry={handleDeleteInquiry}
                onClearAll={handleClearAllInquiries}
                onClose={() => setAdminOpen(false)}
              />
            </motion.section>
          ) : (
            /* Standard Customer Portal View */
            <motion.div
              key="customer-portal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Banner Section */}
              <Hero
                onExplore={() => handleNavigate('products')}
                onOpenCalculator={() => handleNavigate('calculator')}
              />

              {/* Confidence badges ribbon / Brand value list */}
              <section className="bg-brand-black text-white py-8 border-t border-b border-stone-900 relative overflow-hidden" id="brand-ribbon">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(239,68,68,0.08),transparent_45%)] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div className="space-y-1">
                      <span className="block font-sans font-black text-2xl sm:text-3xl text-brand-yellow">15,000+</span>
                      <span className="block font-mono text-[9px] uppercase font-bold text-stone-400">Vehicles Delivered</span>
                    </div>
                    <div className="space-y-1 border-l border-stone-800">
                      <span className="block font-sans font-black text-2xl sm:text-3xl text-brand-red">36 States</span>
                      <span className="block font-mono text-[9px] uppercase font-bold text-stone-400">Nigeria Wide Dispatch</span>
                    </div>
                    <div className="space-y-1 border-l border-stone-800">
                      <span className="block font-sans font-black text-2xl sm:text-3xl text-brand-yellow">12 Months</span>
                      <span className="block font-mono text-[9px] uppercase font-bold text-stone-400">Corporate Engine Warranty</span>
                    </div>
                    <div className="space-y-1 border-l border-stone-800">
                      <span className="block font-sans font-black text-2xl sm:text-3xl text-brand-red">₦0 Charge</span>
                      <span className="block font-mono text-[9px] uppercase font-bold text-stone-400">FRSC Registration Guide</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Product Catalog Section */}
              <section className="py-20 bg-white dark:bg-stone-900 border-t border-stone-200/50 dark:border-stone-850" id="products">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Category Section Header */}
                  <div className="mb-10">
                    <div className="max-w-xl text-left mb-6">
                      <div className="inline-flex items-center space-x-1.5 bg-brand-yellow/10 dark:bg-brand-yellow/20 border border-brand-yellow/30 dark:border-brand-yellow/45 text-brand-black dark:text-white px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-3">
                        <Award className="h-4 w-4 text-brand-red" />
                        <span>Authorized distributor</span>
                      </div>
                      <h2 className="font-sans font-black text-3xl sm:text-4xl text-brand-black dark:text-white tracking-tight leading-tight uppercase">
                        TAAJ INVENTORY SHOWCASE
                      </h2>
                      <p className="font-sans text-sm sm:text-base text-stone-500 dark:text-stone-400 mt-2 font-medium">
                        Explore our premium lineup of brand-new and Tokunbo tricycles (Keke Maruwa), rugged motorcycles, commercial generators, swappable electric bikes, and original spare parts. All available for outright purchase or flexible finance terms.
                      </p>
                    </div>

                    {/* Integrated Search & Filter Controls (Mobile-First responsive) */}
                    <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center bg-stone-50 dark:bg-stone-950 border border-stone-200/60 dark:border-stone-800 p-4 rounded-3xl" id="integrated-controls">
                      {/* Search Bar */}
                      <div className="relative flex-1 max-w-lg">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                          <Search className="h-5 w-5 text-stone-400" />
                        </span>
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search spare parts (clutch, tire), tricycles, brands..."
                          className="w-full pl-11 pr-10 py-3.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 focus:border-brand-red focus:ring-4 focus:ring-brand-red/10 rounded-2xl font-sans text-sm font-bold text-brand-black dark:text-white placeholder-stone-400 focus:outline-none focus:ring-brand-red/5 transition-all shadow-xs"
                          id="catalog-inline-search"
                        />
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm('')}
                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-stone-400 hover:text-brand-red cursor-pointer"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      {/* Filter Tabs */}
                      <div className="flex items-center space-x-1.5 bg-white dark:bg-stone-900 p-1 rounded-2xl border border-stone-200/50 dark:border-stone-850 overflow-x-auto max-w-full no-scrollbar" id="catalog-filters">
                        {(['all', 'tricycle', 'motorcycle', 'electric_bike', 'generator', 'spare_part'] as const).map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3.5 py-2.5 rounded-xl text-xs font-sans font-black transition-all uppercase whitespace-nowrap cursor-pointer ${
                              selectedCategory === cat
                                ? 'bg-brand-red text-white shadow-md shadow-brand-red/10'
                                : 'text-stone-600 dark:text-stone-400 hover:text-brand-red hover:bg-stone-50 dark:hover:bg-stone-800'
                            }`}
                            id={`filter-btn-${cat}`}
                          >
                            {cat === 'all' ? 'All Items' 
                             : cat === 'tricycle' ? 'Tricycles' 
                             : cat === 'motorcycle' ? 'Motorcycles'
                             : cat === 'electric_bike' ? 'Electric Bikes'
                             : cat === 'generator' ? 'Generators'
                             : 'Spare Parts'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Grid layout */}
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch" id="products-grid">
                      {filteredProducts.map((prod) => (
                        <div key={prod.id} className="h-full">
                          <ProductCard
                            product={prod}
                            onSelectCalculate={handleSelectCalculate}
                            onSelectInquiry={handleSelectInquiry}
                            onAddToCart={handleAddToCart}
                            isWishlisted={wishlistedIds.includes(prod.id)}
                            onToggleWishlist={handleToggleWishlist}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-stone-50 dark:bg-stone-950 rounded-3xl border border-stone-200/80 dark:border-stone-800 max-w-xl mx-auto" id="products-empty-state">
                      <p className="font-sans font-bold text-lg text-stone-700 dark:text-stone-300">No matching items found</p>
                      <p className="font-sans text-stone-500 dark:text-stone-400 text-sm mt-1">
                        Try searching for popular brands like "Bajaj", "TVS", "Spiro", "Honda" or parts keywords like "engine", "clutch", "tire", or "generator".
                      </p>
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('all');
                        }}
                        className="mt-5 bg-brand-red text-white text-xs font-black px-5 py-3 rounded-xl uppercase tracking-wider cursor-pointer hover:bg-brand-red/90 transition-all shadow-lg shadow-brand-red/10"
                      >
                        Reset Search Filters
                      </button>
                    </div>
                  )}
                </div>
              </section>

              {/* Customer Stories / Testimonials Section */}
              <section className="py-20 bg-white dark:bg-stone-900 border-t border-stone-200/50 dark:border-stone-850" id="testimonials">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Section Title */}
                  <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="font-sans font-black text-xs text-brand-red uppercase tracking-widest bg-brand-red/5 border border-brand-red/15 px-4 py-1.5 rounded-full inline-block mb-3">
                      VERIFIED REVIEWS
                    </span>
                    <h2 className="font-sans font-black text-3xl sm:text-4xl text-brand-black dark:text-white tracking-tight uppercase">
                      TRUSTED BY NIGERIAN FLEETS
                    </h2>
                    <p className="font-sans text-sm text-stone-500 dark:text-stone-400 mt-2 font-medium">
                      See why transport groups, agricultural coops, and individual owners across Nigeria trust TAAJ Commercial for reliable performance and easy spreading terms.
                    </p>
                  </div>

                  {/* Staggered cards bento */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-grid">
                    {TESTIMONIALS.map((test) => (
                      <div
                        key={test.id}
                        className="bg-stone-50 dark:bg-stone-950 border border-stone-200/60 dark:border-stone-800 rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all flex flex-col justify-between shadow-sm"
                        id={`testimonial-card-${test.id}`}
                      >
                        <div className="space-y-4">
                          {/* Stars */}
                          <div className="flex text-brand-yellow">
                            {[...Array(test.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4.5 fill-current" />
                            ))}
                          </div>
                          {/* Review comment */}
                          <p className="font-sans text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed italic font-medium">
                            &ldquo;{test.comment}&rdquo;
                          </p>
                        </div>

                        {/* Customer profile info row */}
                        <div className="mt-8 pt-6 border-t border-stone-200/60 dark:border-stone-800 flex items-center space-x-3.5">
                          <div>
                            <h4 className="font-sans font-black text-sm text-brand-black dark:text-white leading-tight">
                              {test.name}
                            </h4>
                            <span className="block font-mono text-[9px] text-stone-400 dark:text-stone-500 font-bold uppercase mt-0.5">
                              {test.role} &bull; {test.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Inquiry form section */}
              <InquiryForm
                products={NIGERIAN_PRODUCTS}
                prefillProductId={prefillProductId}
                prefillPlan={prefillPlan}
                onInquirySubmitted={handleNewInquiry}
              />

              {/* FAQ Section */}
              <FAQSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-brand-black text-stone-400 py-16 border-t border-stone-900 relative overflow-hidden" id="footer">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_10%,rgba(239,68,68,0.04),transparent_40%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            {/* Logo copy block */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-3">
                <TaajLogo light={true} />
              </div>
              <p className="font-sans text-sm text-stone-300 leading-relaxed max-w-sm font-medium">
                TAAJ Commercial Enterprises is Nigeria's premier authorized distributor of brand-new and Tokunbo tricycles (Keke Maruwa), motorcycles, commercial generators, electric bikes, and original replacement spare parts. Helping riders build sustainable futures since 2018.
              </p>
              <div className="flex items-center space-x-1.5 text-xs text-brand-red font-mono font-bold">
                <span>DEPOTS: IBADAN &bull; LAGOS &bull; ABUJA &bull; PORT HARCOURT</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-sans font-black text-xs text-white uppercase tracking-wider">
                Store Directory
              </h4>
              <ul className="space-y-2.5 text-sm font-medium text-stone-300">
                <li>
                  <button onClick={() => handleNavigate('products')} className="hover:text-brand-red transition-colors cursor-pointer text-left">
                    Browse Vehicles & Spare Parts
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('testimonials')} className="hover:text-brand-red transition-colors cursor-pointer text-left">
                    Verified Customer Reviews
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('inquiry')} className="hover:text-brand-red transition-colors cursor-pointer text-left">
                    Submit Order Request
                  </button>
                </li>
              </ul>
            </div>

            {/* Contacts info block */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-sans font-black text-xs text-white uppercase tracking-wider">
                Corporate Headquarters & Offices
              </h4>
              <ul className="space-y-4 text-sm font-medium text-stone-300">
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-white text-xs uppercase mb-0.5">Head Office:</span>
                    <span className="text-stone-300">Beside Total Filling Station, Shasha Road Ojoo, Ibadan.</span>
                    <span className="block text-xs text-stone-400 mt-1 font-mono">Tel: 08036664739</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-white text-xs uppercase mb-0.5">Branch Office:</span>
                    <span className="text-stone-300">NW3/2, Adebisi Street, Idikan Feleye, Ibadan.</span>
                    <span className="block text-xs text-stone-400 mt-1 font-mono">WhatsApp/Call: 08084746856</span>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-brand-red flex-shrink-0" />
                  <span>sales@taajcommercial.com.ng</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copy notes bottom */}
          <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-stone-500">
            <p>&copy; {new Date().getFullYear()} TAAJ Commercial Enterprises. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cart, Checkout, and Tracking Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onPlaceOrder={handlePlaceOrder}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        orders={orders}
      />

      {/* Floating WhatsApp Action Widget (Crucial for Nigerian lead generation!) */}
      <a
        href="https://wa.me/2348084746856?text=Hello%20TAAJ%20Commercial%20Enterprises%2C%20I%20am%20interested%20in%20making%20an%20enquiry%20about%20your%20products"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-brand-red hover:bg-brand-red/90 hover:scale-110 active:scale-95 text-white p-4 rounded-full shadow-2xl transition-all flex items-center justify-center border border-brand-red/20 group cursor-pointer"
        title="Chat on WhatsApp"
        id="floating-whatsapp-widget"
      >
        <MessageSquare className="h-6 w-6 fill-white" />
        <span className="absolute right-14 bg-brand-black text-brand-yellow font-sans font-black text-[10px] px-3.5 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none uppercase tracking-wider">
          WhatsApp Representative (Online)
        </span>
      </a>
    </div>
  );
}
