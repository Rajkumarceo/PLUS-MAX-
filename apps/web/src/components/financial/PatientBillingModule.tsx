'use client';

import React, { useState } from 'react';
import {
  FileText,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Clock,
  Pill,
  Activity,
  Bed,
  ShieldCheck,
  CreditCard,
  Building,
  Check,
  X,
  Sparkles,
} from 'lucide-react';

export interface FolioItem {
  id: string;
  department: 'PHARMACY' | 'LABORATORY' | 'WARD_BED' | 'SURGERY_OT';
  description: string;
  amount: number;
  timestamp: string;
  status: 'POSTED' | 'PENDING_CLEARANCE';
}

const SAMPLE_FOLIO: FolioItem[] = [
  { id: 'fol-1', department: 'WARD_BED', description: 'ICU Bed Stay (3 Days @ ₹8,000/day)', amount: 24000, timestamp: 'Jul 22 08:00 AM', status: 'POSTED' },
  { id: 'fol-2', department: 'SURGERY_OT', description: 'Major OT Charge & Anesthesia Protocol', amount: 45000, timestamp: 'Jul 23 10:30 AM', status: 'POSTED' },
  { id: 'fol-3', department: 'LABORATORY', description: 'STAT Serum Troponin-I & Cardiac Markers', amount: 3500, timestamp: 'Jul 23 11:15 AM', status: 'POSTED' },
  { id: 'fol-4', department: 'PHARMACY', description: 'Post-Op Antibiotic IV & Drip Supplies', amount: 6200, timestamp: 'Jul 24 04:00 PM', status: 'POSTED' },
  { id: 'fol-5', department: 'PHARMACY', description: 'Pending Discharge Prescription Medicines', amount: 2800, timestamp: 'Jul 25 09:00 AM', status: 'PENDING_CLEARANCE' },
];

export const PatientBillingModule: React.FC = () => {
  const [patientName, setPatientName] = useState('Savitri Devi (IP-98210 / Bed 304)');
  const [tpaApprovalAmount, setTpaApprovalAmount] = useState(65000);
  const [folioItems, setFolioItems] = useState<FolioItem[]>(SAMPLE_FOLIO);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [copayPaymentMethod, setCopayPaymentMethod] = useState<'UPI' | 'POS_CARD' | 'CASH'>('UPI');
  const [isDischarged, setIsDischarged] = useState(false);

  const totalBill = folioItems.reduce((acc, f) => acc + f.amount, 0);
  const pendingPharmacyDues = folioItems.filter((f) => f.status === 'PENDING_CLEARANCE').reduce((acc, f) => acc + f.amount, 0);
  const nonCoveredCopayBalance = Math.max(0, totalBill - tpaApprovalAmount);

  const handleClearPharmacyDues = () => {
    setFolioItems((prev) =>
      prev.map((f) => ({ ...f, status: 'POSTED' }))
    );
  };

  const handleFinalSplitCheckout = () => {
    setIsDischarged(true);
    setShowCheckoutModal(false);
  };

  return (
    <div className="space-y-5 font-sans">
      {/* Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow-inner backdrop-blur-md">
              <DollarSign className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">Patient Master Folio Billing & Discharge</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                  Zero-Latency Ingestion
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                Real-Time Department Folio Ingestion • Pre-Discharge Audit • Multi-Modal Split Payment Settlement
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
              <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">Total Accumulated Folio</div>
              <div className="text-xl font-black text-white">₹{totalBill.toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>
      </div>

      {isDischarged && (
        <div className="p-4 bg-emerald-600 text-white rounded-2xl shadow-xl flex items-center justify-between text-xs font-black animate-bounce">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6" />
            <span>PATIENT DISCHARGE CLEARED! Split Payment Settled (TPA: ₹{tpaApprovalAmount.toLocaleString('en-IN')} | Co-pay: ₹{nonCoveredCopayBalance.toLocaleString('en-IN')}).</span>
          </div>
          <span className="px-2.5 py-1 bg-emerald-800 rounded text-[10px]">FOLIO CLOSED</span>
        </div>
      )}

      {/* PRE-DISCHARGE REVIEW DASHBOARD PANEL */}
      <div className="p-5 rounded-2xl backdrop-blur-md bg-white/80 border border-slate-200 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">Inpatient Folio Card</span>
            <h3 className="text-base font-black text-slate-900">{patientName}</h3>
          </div>

          {/* Pending Pharmacy Dues Highlight Warning */}
          {pendingPharmacyDues > 0 ? (
            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-300 flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-amber-900 font-extrabold text-xs">
                <AlertCircle className="w-4 h-4 text-amber-600 animate-pulse" />
                <span>Pending Pharmacy Dues: ₹{pendingPharmacyDues.toLocaleString('en-IN')}</span>
              </div>
              <button
                onClick={handleClearPharmacyDues}
                className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm"
              >
                Clear Dues
              </button>
            </div>
          ) : (
            <span className="erp-badge-green text-xs flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Department Dues Cleared
            </span>
          )}
        </div>

        {/* Itemized Folio Table */}
        <div className="overflow-x-auto">
          <table className="erp-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Service Charge Item</th>
                <th>Posting Timestamp</th>
                <th>Status</th>
                <th>Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              {folioItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="font-extrabold text-xs">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        item.department === 'PHARMACY'
                          ? 'bg-purple-100 text-purple-800'
                          : item.department === 'LABORATORY'
                          ? 'bg-blue-100 text-blue-800'
                          : item.department === 'SURGERY_OT'
                          ? 'bg-teal-100 text-teal-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {item.department}
                    </span>
                  </td>
                  <td className="font-extrabold text-slate-900 text-xs">{item.description}</td>
                  <td className="text-xs text-slate-500 font-mono">{item.timestamp}</td>
                  <td>
                    {item.status === 'POSTED' ? (
                      <span className="erp-badge-green text-[10px] flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Folio Posted
                      </span>
                    ) : (
                      <span className="erp-badge-yellow text-[10px] flex items-center gap-1 w-fit">
                        <Clock className="w-3 h-3 text-amber-600" /> Pending Clearance
                      </span>
                    )}
                  </td>
                  <td className="font-mono font-black text-xs text-slate-900">₹{item.amount.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SPLIT PAYMENT BREAKDOWN & DISCHARGE CTA */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <div className="text-[10px] text-slate-500 font-bold uppercase">Total Inpatient Bill</div>
              <div className="text-xl font-black text-slate-900">₹{totalBill.toLocaleString('en-IN')}</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <div className="text-[10px] text-slate-500 font-bold uppercase">TPA Cashless Coverage</div>
              <div className="text-xl font-black text-blue-700">₹{tpaApprovalAmount.toLocaleString('en-IN')}</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <div className="text-[10px] text-slate-500 font-bold uppercase">Non-Covered Family Co-pay</div>
              <div className="text-xl font-black text-amber-600">₹{nonCoveredCopayBalance.toLocaleString('en-IN')}</div>
            </div>
          </div>

          <button
            onClick={() => setShowCheckoutModal(true)}
            disabled={isDischarged || pendingPharmacyDues > 0}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Process Split Payment & Execute Patient Discharge</span>
          </button>
        </div>
      </div>

      {/* MULTI-MODAL SPLIT PAYMENT CHECKOUT MODAL */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-600" />
                <span>Multi-Modal Split Settlement</span>
              </h3>
              <button onClick={() => setShowCheckoutModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Primary TPA Cashless Claim:</span>
                  <span className="font-bold text-blue-700">₹{tpaApprovalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-extrabold text-sm border-t border-slate-200 pt-1">
                  <span>Out-of-Pocket Co-pay Balance:</span>
                  <span className="text-amber-600">₹{nonCoveredCopayBalance.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-2">Select Co-pay Settlement Method</label>
                <div className="grid grid-cols-3 gap-2 font-bold">
                  {(['UPI', 'POS_CARD', 'CASH'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setCopayPaymentMethod(m)}
                      className={`py-2 rounded-xl border text-center transition-all ${
                        copayPaymentMethod === m
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {m.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleFinalSplitCheckout}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Settlement & Issue Discharge Summary</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
