import React, { useState } from 'react';
import { Order } from '../types';
import { X, Search, Package, MapPin, Calendar, CheckCircle2, Clock, Truck, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export default function OrderTrackingModal({
  isOpen,
  onClose,
  orders,
}: OrderTrackingModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusStep = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 1;
      case 'assembling': return 2;
      case 'dispatched': return 3;
      case 'delivered': return 4;
      default: return 1;
    }
  };

  const filteredOrders = searchQuery.trim()
    ? orders.filter(o => o.id.toLowerCase().includes(searchQuery.toLowerCase()) || o.customerName.toLowerCase().includes(searchQuery.toLowerCase()))
    : orders;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm" id="tracking-modal-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-stone-200/80 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-stone-100 flex justify-between items-center bg-brand-black text-white flex-shrink-0">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-brand-yellow" />
                <span className="font-sans font-black text-lg tracking-tight uppercase">Track Assembly & Logistics</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col">
              
              {/* Search Order Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search by Booking ID (e.g. TAAJ-XXXX) or Customer Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-sans focus:outline-none focus:border-brand-red font-medium"
                />
              </div>

              {filteredOrders.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-16 space-y-4">
                  <div className="bg-stone-50 p-6 rounded-full border border-stone-100">
                    <Package className="h-10 w-10 text-stone-300" />
                  </div>
                  <div>
                    <h4 className="font-sans font-black text-lg text-stone-800">No Booking Records Found</h4>
                    <p className="font-sans text-sm text-stone-500 max-w-sm mt-1 font-medium">
                      If you recently booked a vehicle outright or via finance terms, please check under your name, or complete a secure checkout to view tracking details here.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 flex-1">
                  {filteredOrders.map((order) => {
                    const currentStep = getStatusStep(order.status);
                    return (
                      <div
                        key={order.id}
                        className="border border-stone-200 bg-stone-50/50 rounded-2xl p-5 sm:p-6 space-y-6"
                        id={`order-card-${order.id}`}
                      >
                        {/* Order Sub-header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2.5 pb-4 border-b border-stone-200/60">
                          <div>
                            <span className="bg-brand-red text-white font-mono text-[9px] font-black px-2.5 py-1 rounded tracking-widest uppercase">
                              Booking: {order.id}
                            </span>
                            <h4 className="font-sans font-black text-base text-brand-black mt-2">
                              {order.customerName}
                            </h4>
                          </div>
                          <div className="text-left sm:text-right">
                            <span className="block text-[10px] font-mono text-stone-400 font-bold uppercase">Placed On</span>
                            <span className="font-sans text-xs font-semibold text-stone-700 flex items-center gap-1.5 mt-0.5">
                              <Calendar className="h-3.5 w-3.5 text-brand-red" />
                              {new Date(order.createdAt).toLocaleDateString('en-NG', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                        </div>

                        {/* Order Items manifest */}
                        <div>
                          <span className="block text-[10px] font-mono text-stone-400 font-bold uppercase tracking-wider mb-2">
                            Vehicle Manifest
                          </span>
                          <div className="space-y-1.5">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex justify-between items-center text-xs font-sans text-stone-700 font-medium">
                                <span>{item.product.name} (x{item.quantity})</span>
                                <span className="font-mono text-stone-500 uppercase text-[10px]">
                                  {item.paymentOption === 'outright' ? 'Outright' : `HP Term (30% Deposit)`}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Visual Assembly & Logistics Progress Steps */}
                        <div>
                          <span className="block text-[10px] font-mono text-stone-400 font-bold uppercase tracking-wider mb-5">
                            Real-Time Assembly Status
                          </span>
                          <div className="relative pt-2 pb-6" id={`timeline-${order.id}`}>
                            {/* Horizontal Line background */}
                            <div className="absolute top-6 left-5 right-5 sm:left-10 sm:right-10 h-1 bg-stone-200 z-0" />
                            {/* Filled horizontal line */}
                            <div
                              className="absolute top-6 left-5 sm:left-10 h-1 bg-brand-red z-0 transition-all duration-500"
                              style={{ width: `${((currentStep - 1) / 3) * 85}%` }}
                            />

                            {/* 4 Steps */}
                            <div className="relative z-10 flex justify-between">
                              {/* Step 1 */}
                              <div className="flex flex-col items-center text-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                                  currentStep >= 1 ? 'bg-brand-red border-brand-red text-white' : 'bg-white border-stone-200 text-stone-400'
                                }`}>
                                  <Clock className="h-4 w-4" />
                                </div>
                                <span className="block font-sans text-[10px] font-black text-brand-black mt-2 uppercase">Confirmed</span>
                                <span className="block text-[9px] text-stone-400 mt-0.5">Booking verified</span>
                              </div>

                              {/* Step 2 */}
                              <div className="flex flex-col items-center text-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                                  currentStep >= 2 ? 'bg-brand-red border-brand-red text-white' : 'bg-white border-stone-200 text-stone-400'
                                }`}>
                                  <Package className="h-4 w-4" />
                                </div>
                                <span className="block font-sans text-[10px] font-black text-brand-black mt-2 uppercase">Assembling</span>
                                <span className="block text-[9px] text-stone-400 mt-0.5">Ikeja Assembly Plant</span>
                              </div>

                              {/* Step 3 */}
                              <div className="flex flex-col items-center text-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                                  currentStep >= 3 ? 'bg-brand-red border-brand-red text-white' : 'bg-white border-stone-200 text-stone-400'
                                }`}>
                                  <Truck className="h-4 w-4" />
                                </div>
                                <span className="block font-sans text-[10px] font-black text-brand-black mt-2 uppercase">Dispatched</span>
                                <span className="block text-[9px] text-stone-400 mt-0.5">With cargo freight</span>
                              </div>

                              {/* Step 4 */}
                              <div className="flex flex-col items-center text-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                                  currentStep >= 4 ? 'bg-brand-red border-brand-red text-white' : 'bg-white border-stone-200 text-stone-400'
                                }`}>
                                  <CheckCircle2 className="h-4 w-4" />
                                </div>
                                <span className="block font-sans text-[10px] font-black text-brand-black mt-2 uppercase">Delivered</span>
                                <span className="block text-[9px] text-stone-400 mt-0.5">Signed & ready</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Shipping Details info line */}
                        <div className="bg-white border border-stone-200/60 p-4 rounded-xl flex items-start space-x-3 text-xs text-stone-600 leading-normal">
                          <MapPin className="h-4.5 w-4.5 text-brand-red flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="block font-sans font-bold text-brand-black">Delivery Location Manifest:</span>
                            <p className="font-sans text-stone-500 mt-0.5">
                              {order.address}, {order.city}, {order.state} State (Nigeria)
                            </p>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="bg-stone-50 px-6 py-4 border-t border-stone-100 flex justify-between items-center text-xs text-stone-400 flex-shrink-0">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-yellow" />
                <span>Verified TAAJ Assembly logs</span>
              </span>
              <span>Showing {filteredOrders.length} records</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
