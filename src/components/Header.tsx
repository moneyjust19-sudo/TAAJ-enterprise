import { useState } from 'react';
import { Menu, X, Phone, ShieldCheck, ShoppingCart, Heart, Search, Sun, Moon, Package } from 'lucide-react';
import TaajLogo from './TaajLogo';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  activeSection: string;
  adminOpen: boolean;
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenOrders: () => void;
  orderCount: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({
  onNavigate,
  onOpenAdmin,
  activeSection,
  adminOpen,
  cartCount,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  onOpenOrders,
  orderCount,
  searchTerm,
  onSearchChange,
  darkMode,
  onToggleDarkMode,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Store & Inventory' },
    { id: 'testimonials', label: 'Rider Reviews' },
    { id: 'faq', label: 'FAQs' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-brand-dark border-b border-stone-200/80 dark:border-stone-800 shadow-sm transition-colors duration-200" id="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Search Block */}
          <div className="flex items-center space-x-6">
            <div className="cursor-pointer" onClick={() => handleNavClick('home')} id="logo-container">
              <TaajLogo className="scale-105 origin-left" />
            </div>

            {/* Desktop Search Bar */}
            <div className="relative max-w-xs w-64 hidden md:block" id="header-search-container">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <Search className="h-4 w-4 text-stone-400" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search spare parts, tricycles..."
                className="w-full pl-10 pr-8 py-2 bg-stone-50 dark:bg-stone-900 hover:bg-stone-100/50 focus:bg-white dark:focus:bg-brand-dark border border-stone-200/80 dark:border-stone-800 rounded-2xl font-sans text-xs font-bold text-brand-black dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all"
                id="header-search-input"
              />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs font-bold text-stone-400 hover:text-brand-red cursor-pointer"
                  id="header-search-clear-btn"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-1 lg:space-x-2" id="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-lg font-sans text-sm font-extrabold transition-all uppercase cursor-pointer ${
                  activeSection === item.id && !adminOpen
                    ? 'bg-brand-red/5 dark:bg-brand-red/10 text-brand-red font-black'
                    : 'text-stone-900 dark:text-stone-100 hover:text-brand-red dark:hover:text-brand-red hover:bg-stone-50 dark:hover:bg-stone-900'
                }`}
                id={`nav-link-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-3" id="desktop-actions">
            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-xl text-stone-600 dark:text-stone-400 hover:text-brand-red hover:bg-stone-50 dark:hover:bg-stone-900 transition-all relative cursor-pointer"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              id="header-dark-mode-btn"
            >
              {darkMode ? <Sun className="h-5 w-5 text-brand-yellow" /> : <Moon className="h-5 w-5" />}
            </button>



            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="p-2.5 rounded-xl text-stone-600 dark:text-stone-400 hover:text-brand-red hover:bg-stone-50 dark:hover:bg-stone-900 transition-all relative cursor-pointer"
              title="My Shopping Cart"
              id="header-cart-btn"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>



            <a
              href="https://wa.me/2348084746856?text=Hello%20TAAJ%20Commercial%20Enterprises%2C%20I%20am%20interested%20in%20making%20an%20enquiry%20about%20your%20products"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-red hover:bg-brand-red/90 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg shadow-brand-red/10 hover:shadow-brand-red/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              id="whatsapp-call-btn"
            >
              <Phone className="h-4 w-4 fill-white text-white" />
              <span>Contact sales</span>
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-2" id="mobile-menu-actions">
            {/* Dark Mode Toggle for Mobile */}
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-xl text-stone-600 dark:text-stone-400 hover:text-brand-red relative cursor-pointer"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              id="mobile-dark-mode-btn"
            >
              {darkMode ? <Sun className="h-5.5 w-5.5 text-brand-yellow" /> : <Moon className="h-5.5 w-5.5" />}
            </button>



            {/* Cart icon for Mobile */}
            <button
              onClick={onOpenCart}
              className="p-2.5 rounded-xl text-stone-600 dark:text-stone-400 hover:text-brand-red relative cursor-pointer"
              title="Cart"
              id="mobile-cart-btn"
            >
              <ShoppingCart className="h-5.5 w-5.5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-brand-red text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>



            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-850 border border-stone-100 dark:border-stone-800 text-stone-700 dark:text-stone-300 transition-colors cursor-pointer"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-100 dark:border-stone-850 bg-white dark:bg-brand-dark" id="mobile-menu-panel">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {/* Mobile Search Bar */}
            <div className="relative w-full" id="mobile-search-container">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <Search className="h-4 w-4 text-stone-400" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search parts, engines, vehicles..."
                className="w-full pl-10 pr-10 py-3 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl font-sans text-sm text-brand-black dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-red/10 focus:border-brand-red transition-all"
                id="mobile-search-input"
              />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-stone-400 hover:text-brand-red cursor-pointer"
                  id="mobile-search-clear-btn"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Mobile Nav Links */}
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl font-sans text-base font-extrabold transition-colors cursor-pointer ${
                    activeSection === item.id && !adminOpen
                      ? 'bg-brand-red/5 dark:bg-brand-red/10 text-brand-red font-black'
                      : 'text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-900 hover:text-brand-red'
                  }`}
                  id={`mobile-nav-link-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-col space-y-2.5">
              <a
                href="https://wa.me/2348084746856?text=Hello%20TAAJ%20Commercial%20Enterprises%2C%20I%20am%20interested%20in%20making%20an%20enquiry%20about%20your%20products"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-brand-red hover:bg-brand-red/90 text-white px-4 py-3 rounded-full text-center font-bold flex items-center justify-center space-x-2 cursor-pointer"
                id="mobile-whatsapp-btn"
              >
                <Phone className="h-5 w-5 fill-white" />
                <span>Chat with sales on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
