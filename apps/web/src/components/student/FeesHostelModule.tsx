'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  Building,
  Home,
  CheckCircle,
  Clock,
  Download,
  QrCode,
  ShieldCheck,
  Wrench,
  Key,
  FileText,
  DollarSign,
  AlertCircle,
  Plus,
  Send,
  X,
  Sparkles,
} from 'lucide-react';

export interface FeeItem {
  id: string;
  category: string;
  amount: number;
  dueDate: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  receiptNo?: string;
  paidDate?: string;
}

const INITIAL_FEES: FeeItem[] = [
  { id: 'fee-1', category: 'Academic Tuition Fee (Phase 3 Part 1)', amount: 180000, dueDate: 'Jun 15, 2026', status: 'PAID', receiptNo: 'REC-2026-98102', paidDate: 'Jun 10, 2026' },
  { id: 'fee-2', category: 'Library & E-Journal Subscription', amount: 12000, dueDate: 'Jun 15, 2026', status: 'PAID', receiptNo: 'REC-2026-98103', paidDate: 'Jun 10, 2026' },
  { id: 'fee-3', category: 'Hostel Accommodation (Block B AC Double)', amount: 65000, dueDate: 'Jun 15, 2026', status: 'PAID', receiptNo: 'REC-2026-98104', paidDate: 'Jun 12, 2026' },
  { id: 'fee-4', category: 'Examination & University Valuation Fee', amount: 8500, dueDate: 'Aug 10, 2026', status: 'PENDING' },
  { id: 'fee-5', category: 'Mess & Catering Monthly Dues (July 2026)', amount: 6500, dueDate: 'Jul 31, 2026', status: 'PENDING' },
];

export interface MaintenanceTicket {
  id: string;
  issueType: string;
  description: string;
  location: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  dateRaised: string;
}

const INITIAL_TICKETS: MaintenanceTicket[] = [
  { id: 'TCK-8821', issueType: 'Plumbing / Water Leakage', description: 'Bathroom tap leaking in Room 304 attached washroom', location: 'Block B - Room 304', priority: 'MEDIUM', status: 'IN_PROGRESS', dateRaised: 'Jul 22, 2026' },
  { id: 'TCK-8802', issueType: 'Wi-Fi / LAN Access', description: 'High ping and intermittent disconnects on 3rd floor AP', location: 'Block B - 3rd Floor Corridor', priority: 'LOW', status: 'RESOLVED', dateRaised: 'Jul 10, 2026' },
];

export const FeesHostelModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fees' | 'hostel' | 'tickets'>('fees');
  const [fees, setFees] = useState<FeeItem[]>(INITIAL_FEES);

  // Payment Checkout Modal State
  const [selectedFeeForPayment, setSelectedFeeForPayment] = useState<FeeItem | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NETBANKING'>('UPI');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  // Maintenance Ticket Form State
  const [ticketIssue, setTicketIssue] = useState('Plumbing / Water Leakage');
  const [ticketDesc, setTicketDesc] = useState('');
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(INITIAL_TICKETS);

  // Gate Pass State
  const [destination, setDestination] = useState('Home (Pune)');
  const [outTime, setOutTime] = useState('2026-07-26T17:00');
  const [inTime, setInTime] = useState('2026-07-28T20:00');
  const [reason, setReason] = useState('Weekend family visit');
  const [showGatePassModal, setShowGatePassModal] = useState(false);
  const [gatePassGenerated, setGatePassGenerated] = useState(false);

  const totalDues = fees.reduce((acc, item) => acc + item.amount, 0);
  const paidDues = fees.filter((f) => f.status === 'PAID').reduce((acc, item) => acc + item.amount, 0);
  const pendingBalance = totalDues - paidDues;

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFeeForPayment) return;

    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setFees((prev) =>
        prev.map((f) =>
          f.id === selectedFeeForPayment.id
            ? {
                ...f,
                status: 'PAID',
                receiptNo: `REC-2026-${Math.floor(10000 + Math.random() * 90000)}`,
                paidDate: 'Jul 25, 2026',
              }
            : f
        )
      );
      setSelectedFeeForPayment(null);
      setShowPaymentSuccess(true);
      setTimeout(() => setShowPaymentSuccess(false), 5000);
    }, 2000);
  };

  const handleRaiseTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketDesc.trim()) return;

    const newTicket: MaintenanceTicket = {
      id: `TCK-${Math.floor(8000 + Math.random() * 1000)}`,
      issueType: ticketIssue,
      description: ticketDesc,
      location: 'Block B - Room 304',
      priority: 'MEDIUM',
      status: 'OPEN',
      dateRaised: 'Jul 25, 2026',
    };

    setTickets([newTicket, ...tickets]);
    setTicketDesc('');
  };

  const handleDownloadReceipt = (receiptNo: string, category: string, amount: number) => {
    // Generate simulated PDF download blob
    const content = `
============================================================
PLUS MAX ERP - CRYPTOGRAPHICALLY SIGNED FEE RECEIPT
============================================================
Receipt Number: ${receiptNo}
Date: July 25, 2026
Student: Rohan Deshmukh (Roll No: 2024-MBBS-018)
Course: MBBS Phase 3 Part 1

Fee Category: ${category}
Paid Amount: INR ₹${amount.toLocaleString('en-IN')}.00
Payment Method: Razorpay Secure Gateway (UPI / Bank Settlement)
Transaction Hash: 0x8f9a2b7c4d1e9f3b8a7c2d1e0f4a5b6c
Digital Signature: VERIFIED BY TITANOBOVA FINANCIAL ENGINE

Thank you for your payment.
============================================================
    `;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${receiptNo}_Official_Receipt.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5">
      {/* Banner */}
      <div className="erp-card p-4 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shadow-inner">
              <CreditCard className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">My Fees & Hostel Administration</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/30 text-purple-200 border border-purple-400/40">
                  Financial ERP & Residence
                </span>
              </div>
              <p className="text-xs text-purple-200/80 mt-0.5">
                Itemized Dues • Integrated Secure Payment Gateway • Downloadable Receipts • Hostel & Gate Pass Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right bg-white/10 px-3.5 py-1.5 rounded-lg border border-white/10">
              <div className="text-[10px] text-purple-200 uppercase font-bold tracking-wider">Pending Dues</div>
              <div className="text-lg font-black text-amber-400">₹{pendingBalance.toLocaleString('en-IN')}</div>
            </div>
            <div className="text-right bg-white/10 px-3.5 py-1.5 rounded-lg border border-white/10">
              <div className="text-[10px] text-purple-200 uppercase font-bold tracking-wider">Hostel Allocation</div>
              <div className="text-lg font-black text-emerald-400">Room 304</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/10 text-xs font-bold">
          <button
            onClick={() => setActiveTab('fees')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeTab === 'fees'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white/10 text-purple-100 hover:bg-white/20'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Financial Dues & Receipts</span>
          </button>
          <button
            onClick={() => setActiveTab('hostel')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeTab === 'hostel'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white/10 text-purple-100 hover:bg-white/20'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Hostel & Mess Management</span>
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeTab === 'tickets'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white/10 text-purple-100 hover:bg-white/20'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Service Tickets & Gate Pass</span>
          </button>
        </div>
      </div>

      {showPaymentSuccess && (
        <div className="p-3 bg-emerald-600 text-white rounded-lg shadow-lg flex items-center justify-between text-xs font-bold animate-bounce">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>Payment Processed Successfully! Cryptographically signed PDF receipt generated.</span>
          </div>
        </div>
      )}

      {/* TAB 1: FINANCIAL DUES & PAYMENT GATEWAY */}
      {activeTab === 'fees' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="erp-card p-4 space-y-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase">Total Academic Fee</div>
              <div className="text-xl font-black text-slate-900">₹{totalDues.toLocaleString('en-IN')}</div>
              <div className="text-[10px] text-slate-500">Academic Year 2026-27</div>
            </div>
            <div className="erp-card p-4 space-y-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase">Settled Dues</div>
              <div className="text-xl font-black text-emerald-700">₹{paidDues.toLocaleString('en-IN')}</div>
              <div className="text-[10px] text-emerald-700 font-bold">100% Tax Compliant (18% GST Exemption)</div>
            </div>
            <div className="erp-card p-4 space-y-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase">Outstanding Balance</div>
              <div className="text-xl font-black text-amber-600">₹{pendingBalance.toLocaleString('en-IN')}</div>
              <div className="text-[10px] text-amber-700 font-bold">Due before Aug 10, 2026</div>
            </div>
          </div>

          <div className="erp-card p-4 space-y-4">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Itemized Fee Dues & Downloadable Receipts</h3>
                <p className="text-xs text-slate-500">Official college fee breakdown with instant online checkout.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Fee Category</th>
                    <th>Due Date</th>
                    <th>Amount (INR)</th>
                    <th>Status</th>
                    <th>Receipt Reference</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map((f) => (
                    <tr key={f.id} className="hover:bg-slate-50">
                      <td className="font-extrabold text-slate-900 text-xs">{f.category}</td>
                      <td className="text-xs text-slate-500 font-mono">{f.dueDate}</td>
                      <td className="text-xs font-black text-slate-900">₹{f.amount.toLocaleString('en-IN')}</td>
                      <td>
                        {f.status === 'PAID' ? (
                          <span className="erp-badge-green text-xs flex items-center gap-1 w-fit">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Settled
                          </span>
                        ) : (
                          <span className="erp-badge-yellow text-xs flex items-center gap-1 w-fit">
                            <Clock className="w-3.5 h-3.5 text-amber-600" /> Payment Pending
                          </span>
                        )}
                      </td>
                      <td className="font-mono text-xs text-slate-600">
                        {f.receiptNo ? f.receiptNo : <span className="text-slate-400">-- N/A --</span>}
                      </td>
                      <td>
                        {f.status === 'PAID' ? (
                          <button
                            onClick={() => handleDownloadReceipt(f.receiptNo!, f.category, f.amount)}
                            className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 flex items-center gap-1.5"
                          >
                            <Download className="w-3.5 h-3.5 text-blue-600" />
                            <span>PDF Receipt</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelectedFeeForPayment(f)}
                            className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Pay Dues Now</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HOSTEL & MESS MANAGEMENT */}
      {activeTab === 'hostel' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Hostel Room Card */}
          <div className="lg:col-span-6 erp-card p-5 space-y-4">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Home className="w-5 h-5 text-purple-600" />
                  <span>Hostel Room Allocation Profile</span>
                </h3>
                <p className="text-xs text-slate-500">Dhanvantari Boys Hostel Block B.</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-purple-100 text-purple-800 text-xs font-bold">
                AC Double Sharing
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="font-semibold text-slate-500">Allocated Room:</span>
                <span className="font-black text-slate-900 text-sm">Block B - Room 304</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="font-semibold text-slate-500">Roommate Name:</span>
                <span className="font-extrabold text-slate-900">Aditya Sharma (2024-MBBS-042)</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="font-semibold text-slate-500">Hostel Warden:</span>
                <span className="font-bold text-slate-800">Prof. Dr. G. S. Kulkarni (+91 98220 11234)</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="font-semibold text-slate-500">In-Time Curfew:</span>
                <span className="font-bold text-red-600">10:00 PM Strict Daily</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Room Amenities:</span>
                <span className="font-bold text-slate-800">2 Study Tables, AC, Wi-Fi 6, Attached Bath</span>
              </div>
            </div>
          </div>

          {/* Monthly Mess Tracker Card */}
          <div className="lg:col-span-6 erp-card p-5 space-y-4">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Monthly Mess Card & Meal Tracking</span>
                </h3>
                <p className="text-xs text-slate-500">Digital QR meal check-in counter.</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">
                July 2026 Active
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Breakfast</div>
                <div className="text-lg font-black text-slate-900">22 / 25</div>
                <div className="text-[10px] text-emerald-600 font-bold">Attended</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Lunch</div>
                <div className="text-lg font-black text-slate-900">24 / 25</div>
                <div className="text-[10px] text-emerald-600 font-bold">Attended</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Dinner</div>
                <div className="text-lg font-black text-slate-900">23 / 25</div>
                <div className="text-[10px] text-emerald-600 font-bold">Attended</div>
              </div>
            </div>

            <div className="pt-2 text-xs flex justify-between items-center text-slate-700 font-bold border-t border-slate-200">
              <span>Monthly Catering Dues: ₹6,500</span>
              <button
                onClick={() => setActiveTab('fees')}
                className="text-purple-700 underline hover:text-purple-900 font-extrabold"
              >
                Pay Mess Bill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TICKETS & DIGITAL GATE PASS */}
      {activeTab === 'tickets' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Maintenance Ticketing */}
          <div className="lg:col-span-7 erp-card p-5 space-y-4">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-purple-600" />
                  <span>Hostel Maintenance Ticket Portal</span>
                </h3>
                <p className="text-xs text-slate-500">Raise repair requests for electrical, plumbing, or room issues.</p>
              </div>
            </div>

            <form onSubmit={handleRaiseTicket} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Issue Category</label>
                <select
                  value={ticketIssue}
                  onChange={(e) => setTicketIssue(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-600"
                >
                  <option value="Plumbing / Water Leakage">Plumbing / Water Leakage</option>
                  <option value="Electrical / Lighting">Electrical / Lighting</option>
                  <option value="Wi-Fi / LAN Network">Wi-Fi / LAN Network</option>
                  <option value="Air Conditioner Maintenance">Air Conditioner Maintenance</option>
                  <option value="Carpentry / Furniture">Carpentry / Furniture</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Detailed Description of Issue</label>
                <textarea
                  rows={2}
                  required
                  value={ticketDesc}
                  onChange={(e) => setTicketDesc(e.target.value)}
                  placeholder="Describe exact issue (e.g. water leaking from washroom faucet)..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-purple-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Submit Maintenance Ticket</span>
              </button>
            </form>

            <div className="space-y-2 pt-3 border-t border-slate-200">
              <h4 className="text-xs font-extrabold text-slate-900">Your Active Maintenance Tickets</h4>
              {tickets.map((t) => (
                <div key={t.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-purple-700">{t.id} - {t.issueType}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black ${
                        t.status === 'RESOLVED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <p className="text-slate-700">{t.description}</p>
                  <div className="text-[10px] text-slate-400 font-mono">Raised on {t.dateRaised}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Digital Gate Pass Request */}
          <div className="lg:col-span-5 erp-card p-5 space-y-4">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Key className="w-5 h-5 text-emerald-600" />
                  <span>Digital Gate Pass Generator</span>
                </h3>
                <p className="text-xs text-slate-500">Automated warden approval for out-station leave.</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Destination Address</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 font-semibold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Out Date & Time</label>
                  <input
                    type="datetime-local"
                    value={outTime}
                    onChange={(e) => setOutTime(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-[11px]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Expected In Time</label>
                  <input
                    type="datetime-local"
                    value={inTime}
                    onChange={(e) => setInTime(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Leave Reason</label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900"
                />
              </div>

              <button
                onClick={() => setGatePassGenerated(true)}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-sm flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4" />
                <span>Generate Warden Signed QR Gate Pass</span>
              </button>

              {gatePassGenerated && (
                <div className="p-4 bg-emerald-50 border-2 border-dashed border-emerald-400 rounded-xl space-y-3 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-black text-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span>GATE PASS APPROVED & ISSUED</span>
                  </div>
                  <div className="w-28 h-28 bg-white border-2 border-slate-900 mx-auto rounded-lg flex flex-col items-center justify-center p-2 shadow-inner">
                    <QrCode className="w-20 h-20 text-slate-900" />
                  </div>
                  <div className="text-[11px] font-mono text-slate-700 space-y-0.5">
                    <div>Pass ID: <strong className="text-slate-900">GP-2026-9012</strong></div>
                    <div>Destination: {destination}</div>
                    <div className="text-emerald-700 font-bold">Warden E-Sign Verified</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PAYMENT CHECKOUT MODAL */}
      {selectedFeeForPayment && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-600" />
                <h3 className="text-base font-black text-slate-900">Secure Payment Checkout</h3>
              </div>
              <button
                onClick={() => setSelectedFeeForPayment(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 space-y-2 text-xs">
              <div className="text-purple-900 font-bold">{selectedFeeForPayment.category}</div>
              <div className="flex justify-between items-end">
                <span className="text-slate-500 font-semibold">Total Payable Amount:</span>
                <span className="text-xl font-black text-purple-900">₹{selectedFeeForPayment.amount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <form onSubmit={handleProcessPayment} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-2">Select Payment Method</label>
                <div className="grid grid-cols-3 gap-2 font-bold">
                  {(['UPI', 'CARD', 'NETBANKING'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`py-2 rounded-lg border text-center transition-all ${
                        paymentMethod === method
                          ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                          : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {paymentMethod === 'UPI' && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Enter VPA / UPI ID</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. rohan@okaxis / 9822011234@paytm"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-purple-600"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessingPayment}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isProcessingPayment ? (
                  <span>Processing Razorpay Settlement...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Confirm & Pay ₹{selectedFeeForPayment.amount.toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
