import { useState } from 'react';
import { Inquiry } from '../types';
import { ShieldAlert, Trash2, CheckCircle2, RefreshCw, X, Download, FileText, Search, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface LeadsDashboardProps {
  inquiries: Inquiry[];
  onUpdateStatus: (id: string, status: 'pending' | 'completed' | 'canceled') => void;
  onDeleteInquiry: (id: string) => void;
  onClearAll: () => void;
  onClose: () => void;
}

export default function LeadsDashboard({ inquiries, onUpdateStatus, onDeleteInquiry, onClearAll, onClose }: LeadsDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Format money helper
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Helper to extract unique cities
  const cities = ['All', ...Array.from(new Set(inquiries.map(i => i.city.split(' ')[0])))];

  // Filter logic
  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = inq.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inq.phone.includes(searchTerm) || 
                          inq.productInterest.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = filterCity === 'All' || inq.city.startsWith(filterCity);
    const matchesStatus = filterStatus === 'All' || inq.status === filterStatus;

    return matchesSearch && matchesCity && matchesStatus;
  });

  // Calculate Business Analytics
  const totalLeads = inquiries.length;
  const pendingLeads = inquiries.filter(i => i.status === 'pending').length;
  const completedLeads = inquiries.filter(i => i.status === 'completed').length;

  // Let's calculate pipeline estimation (tricycle leads are valued ~2m, bicycle ~120k)
  const pipelineValue = inquiries.reduce((sum, current) => {
    if (current.status === 'canceled') return sum;
    const isBike = current.productInterest.toLowerCase().includes('bike') || current.productInterest.toLowerCase().includes('bicycle');
    return sum + (isBike ? 120000 : 1850000);
  }, 0);

  // Simulated CSV Export
  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = 'ID,Name,Phone,Email,City,Product,PaymentOption,Timestamp,Status\n';
    const rows = inquiries.map(i => 
      `"${i.id}","${i.name}","${i.phone}","${i.email || ''}","${i.city}","${i.productInterest}","${i.paymentOption}","${i.timestamp}","${i.status}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `naija-wheels-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    a.click();
  };

  return (
    <div className="bg-brand-dark text-white rounded-3xl border border-stone-800/80 shadow-2xl p-6 sm:p-8" id="leads-dashboard-container">
      {/* Header */}
      <div className="flex justify-between items-center pb-6 border-b border-stone-800 mb-8">
        <div>
          <div className="flex items-center space-x-2 text-brand-green font-mono text-xs font-bold uppercase tracking-widest bg-emerald-950/60 border border-emerald-900/40 px-3 py-1.5 rounded-lg inline-flex">
            <ShieldAlert className="h-4.5 w-4.5 animate-pulse text-brand-green" />
            <span>Internal Leads Management Platform</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mt-3">
            Sales & Inquiries Hub
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-stone-900 hover:bg-stone-850 border border-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
          id="close-dashboard-btn"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Analytics Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8" id="dashboard-bento">
        <div className="bg-stone-900/60 border border-stone-800/60 rounded-2xl p-5">
          <span className="block font-sans text-xs text-stone-400 font-semibold uppercase tracking-wider">Total Leads Logged</span>
          <span className="block font-display text-3xl font-bold text-white mt-2">{totalLeads}</span>
          <span className="block font-mono text-[10px] text-emerald-400 mt-1">All-time count</span>
        </div>

        <div className="bg-stone-900/60 border border-stone-800/60 rounded-2xl p-5">
          <span className="block font-sans text-xs text-stone-400 font-semibold uppercase tracking-wider">Awaiting Attention</span>
          <span className="block font-display text-3xl font-bold text-emerald-400 mt-2">{pendingLeads}</span>
          <span className="block font-mono text-[10px] text-emerald-400/85 mt-1">Needs customer callback</span>
        </div>

        <div className="bg-stone-900/60 border border-stone-800/60 rounded-2xl p-5">
          <span className="block font-sans text-xs text-stone-400 font-semibold uppercase tracking-wider">Contacted / Closed</span>
          <span className="block font-display text-3xl font-bold text-brand-green mt-2">{completedLeads}</span>
          <span className="block font-mono text-[10px] text-brand-green/85 mt-1">Deals progressing</span>
        </div>

        <div className="bg-stone-900/60 border border-stone-800/60 rounded-2xl p-5">
          <span className="block font-sans text-xs text-stone-400 font-semibold uppercase tracking-wider">Estimated pipeline</span>
          <span className="block font-display text-xl sm:text-2xl font-bold text-white mt-3 truncate">{formatNaira(pipelineValue)}</span>
          <span className="block font-mono text-[10px] text-emerald-400 mt-1.5">Value of active leads</span>
        </div>
      </div>

      {/* Filters and Actions Bar */}
      <div className="bg-stone-900 border border-stone-800/60 rounded-2xl p-5 mb-6 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:space-x-4">
        {/* Search Input */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-stone-500" />
          <input
            type="text"
            placeholder="Search leads by name, phone, or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 rounded-xl py-2.5 pl-10 pr-4 text-xs font-sans text-white placeholder-stone-500 focus:outline-none focus:border-brand-green transition-all font-medium"
            id="dashboard-search-input"
          />
        </div>

        {/* Dropdown Filters & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* City Filter */}
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="bg-stone-950 border border-stone-800 text-stone-300 text-xs px-3 py-2.5 rounded-xl cursor-pointer outline-none focus:border-brand-green font-sans font-medium"
          >
            <option value="All">All Cities</option>
            {cities.filter(c => c !== 'All').map((city, idx) => (
              <option key={idx} value={city}>
                {city}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-stone-950 border border-stone-800 text-stone-300 text-xs px-3 py-2.5 rounded-xl cursor-pointer outline-none focus:border-brand-green font-sans font-medium"
          >
            <option value="All">All Statuses</option>
            <option value="pending">Awaiting Callback</option>
            <option value="completed">Contacted</option>
            <option value="canceled">Canceled</option>
          </select>

          {/* Export CSV button */}
          <button
            onClick={handleExportCSV}
            disabled={inquiries.length === 0}
            className="bg-stone-800 hover:bg-stone-750 disabled:opacity-40 text-stone-100 border border-stone-700 text-xs font-semibold px-3 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer"
            id="dashboard-export-btn"
          >
            <Download className="h-4 w-4" />
            <span>CSV</span>
          </button>

          {/* Clear button */}
          <button
            onClick={onClearAll}
            disabled={inquiries.length === 0}
            className="bg-rose-950/30 hover:bg-rose-950 text-rose-300 border border-rose-900/50 text-xs font-semibold px-3 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer"
            id="dashboard-clear-btn"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear Leads</span>
          </button>
        </div>
      </div>

      {/* Leads Table / List */}
      <div className="bg-stone-900/40 border border-stone-800/60 rounded-3xl overflow-hidden" id="dashboard-table-card">
        {filteredInquiries.length === 0 ? (
          <div className="text-center py-16 text-stone-500">
            <FileText className="h-12 w-12 mx-auto text-stone-700 mb-3" />
            <p className="font-sans text-sm font-medium">No sales inquiries match the search or filter settings.</p>
            <p className="font-sans text-xs text-stone-600 mt-1 font-medium">Submit the quote inquiry form in the public portal to see active rows!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" id="leads-table">
              <thead>
                <tr className="border-b border-stone-800 text-[11px] font-mono text-stone-400 uppercase tracking-widest bg-stone-900/80">
                  <th className="py-4 px-6">Customer Details</th>
                  <th className="py-4 px-4">Location</th>
                  <th className="py-4 px-4">Vehicle Model</th>
                  <th className="py-4 px-4">Finance Option</th>
                  <th className="py-4 px-4">Logged Time</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/40 text-xs sm:text-sm font-sans text-stone-300">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-stone-900/35 transition-colors">
                    {/* Customer */}
                    <td className="py-4 px-6">
                      <span className="block font-sans font-bold text-white text-sm">{inq.name}</span>
                      <span className="block font-mono text-xs text-stone-400 mt-1">{inq.phone}</span>
                      {inq.email && <span className="block font-mono text-[11px] text-stone-500 truncate max-w-[150px]">{inq.email}</span>}
                    </td>

                    {/* Location */}
                    <td className="py-4 px-4">
                      <span className="font-sans font-medium text-stone-300">{inq.city.split(' (')[0]}</span>
                      <span className="block text-[10px] text-stone-500 font-mono mt-0.5">{inq.city.match(/\(([^)]+)\)/)?.[1] || 'Main Depot'}</span>
                    </td>

                    {/* Vehicle */}
                    <td className="py-4 px-4">
                      <span className="bg-stone-800 border border-stone-750 px-2 py-1 rounded-md text-xs font-sans text-stone-200 font-medium">
                        {inq.productInterest}
                      </span>
                    </td>

                    {/* Finance option */}
                    <td className="py-4 px-4">
                      <span className={`font-mono text-xs font-bold uppercase ${
                        inq.paymentOption === 'outright' ? 'text-emerald-400' : 'text-brand-green'
                      }`}>
                        {inq.paymentOption === 'outright' ? 'Outright' : inq.paymentOption === '6month' ? '6-M Installment' : '12-M Installment'}
                      </span>
                    </td>

                    {/* Timestamp */}
                    <td className="py-4 px-4 font-mono text-xs text-stone-400">
                      {new Date(inq.timestamp).toLocaleDateString('en-NG', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>

                    {/* Status badge */}
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider ${
                        inq.status === 'pending'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : inq.status === 'completed'
                          ? 'bg-brand-green/10 text-brand-green border border-brand-green/20'
                          : 'bg-stone-800 text-stone-500'
                      }`}>
                        {inq.status === 'pending' ? 'Callback' : inq.status === 'completed' ? 'Closed' : 'Canceled'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {/* Mark contacted */}
                        {inq.status === 'pending' && (
                          <button
                            onClick={() => onUpdateStatus(inq.id, 'completed')}
                            className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 transition-colors cursor-pointer"
                            title="Mark as Contacted"
                            id={`action-contact-${inq.id}`}
                          >
                            <UserCheck className="h-4 w-4" />
                          </button>
                        )}

                        {/* Reset callback */}
                        {inq.status === 'completed' && (
                          <button
                            onClick={() => onUpdateStatus(inq.id, 'pending')}
                            className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 transition-colors cursor-pointer"
                            title="Set Awaiting Callback"
                            id={`action-reset-${inq.id}`}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </button>
                        )}

                        {/* Delete row */}
                        <button
                          onClick={() => onDeleteInquiry(inq.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                          title="Delete Lead Record"
                          id={`action-delete-${inq.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
