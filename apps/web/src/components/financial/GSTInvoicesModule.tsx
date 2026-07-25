'use client';

import React, { useState } from 'react';
import {
  FileText,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Receipt,
  Plus,
  RefreshCcw,
  ShieldCheck,
  Building,
  Download,
  Filter,
  Search,
  Sparkles,
} from 'lucide-react';

export interface GSTInvoice {
  id: string;
  invoiceNo: string;
  patientName: string;
  patientState: string;
  isInterState: boolean;
  serviceCategory: string;
  sacCode: '9993' | '9997'; // 9993 = Healthcare 0% Exempt, 9997 = Cosmetic 18%
  taxRate: number; // 0 or 18
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalAmount: number;
  date: string;
  status: 'ISSUED' | 'CREDIT_NOTE_ISSUED';
  creditNoteNo?: string;
}

const INITIAL_INVOICES: GSTInvoice[] = [
  {
    id: 'inv-101',
    invoiceNo: 'INV-2026-89101',
    patientName: 'Aarav Sharma (MH-PAT-091)',
    patientState: 'Maharashtra',
    isInterState: false,
    serviceCategory: 'General Surgery & Inpatient Care',
    sacCode: '9993',
    taxRate: 0,
    subtotal: 45000,
    cgst: 0,
    sgst: 0,
    igst: 0,
    totalAmount: 45000,
    date: 'Jul 24, 2026',
    status: 'ISSUED',
  },
  {
    id: 'inv-102',
    invoiceNo: 'INV-2026-89102',
    patientName: 'Priya Verma (GJ-PAT-044)',
    patientState: 'Gujarat',
    isInterState: true,
    serviceCategory: 'Cosmetic Dermatology & FUE Hair Restoration',
    sacCode: '9997',
    taxRate: 18,
    subtotal: 120000,
    cgst: 0,
    sgst: 0,
    igst: 21600,
    totalAmount: 141600,
    date: 'Jul 25, 2026',
    status: 'ISSUED',
  },
  {
    id: 'inv-103',
    invoiceNo: 'INV-2026-89103',
    patientName: 'Vikramaditya Rao (MH-PAT-012)',
    patientState: 'Maharashtra',
    isInterState: false,
    serviceCategory: 'Aesthetic Skin Resurfacing Procedure',
    sacCode: '9997',
    taxRate: 18,
    subtotal: 25000,
    cgst: 2250,
    sgst: 2250,
    igst: 0,
    totalAmount: 29500,
    date: 'Jul 25, 2026',
    status: 'ISSUED',
  },
];

export const GSTInvoicesModule: React.FC = () => {
  const [invoices, setInvoices] = useState<GSTInvoice[]>(INITIAL_INVOICES);
  const [searchTerm, setSearchTerm] = useState('');
  const [sacFilter, setSacFilter] = useState<'ALL' | '9993' | '9997'>('ALL');

  // New Invoice Form State
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientState, setNewPatientState] = useState('Maharashtra');
  const [newServiceCategory, setNewServiceCategory] = useState<'HEALTHCARE' | 'COSMETIC'>('HEALTHCARE');
  const [newAmount, setNewAmount] = useState(10000);
  const [showNewModal, setShowNewModal] = useState(false);

  const isInterState = newPatientState !== 'Maharashtra';
  const sacCode = newServiceCategory === 'HEALTHCARE' ? '9993' : '9997';
  const taxRate = sacCode === '9993' ? 0 : 18;

  let calculatedCgst = 0;
  let calculatedSgst = 0;
  let calculatedIgst = 0;

  if (taxRate === 18) {
    if (isInterState) {
      calculatedIgst = newAmount * 0.18;
    } else {
      calculatedCgst = newAmount * 0.09;
      calculatedSgst = newAmount * 0.09;
    }
  }

  const calculatedTotal = newAmount + calculatedCgst + calculatedSgst + calculatedIgst;

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName.trim()) return;

    const newInv: GSTInvoice = {
      id: `inv-${Date.now()}`,
      invoiceNo: `INV-2026-${Math.floor(89000 + Math.random() * 1000)}`,
      patientName: newPatientName,
      patientState: newPatientState,
      isInterState,
      serviceCategory: newServiceCategory === 'HEALTHCARE' ? 'Inpatient Clinical Healthcare' : 'Cosmetic & Aesthetic Procedure',
      sacCode,
      taxRate,
      subtotal: newAmount,
      cgst: calculatedCgst,
      sgst: calculatedSgst,
      igst: calculatedIgst,
      totalAmount: calculatedTotal,
      date: 'Jul 25, 2026',
      status: 'ISSUED',
    };

    setInvoices([newInv, ...invoices]);
    setNewPatientName('');
    setShowNewModal(false);
  };

  const handleIssueCreditNote = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? {
              ...inv,
              status: 'CREDIT_NOTE_ISSUED',
              creditNoteNo: `CN-2026-${Math.floor(9000 + Math.random() * 1000)}`,
            }
          : inv
      )
    );
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.serviceCategory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSac = sacFilter === 'ALL' || inv.sacCode === sacFilter;
    return matchesSearch && matchesSac;
  });

  const totalGstCollected = invoices.reduce((acc, inv) => acc + (inv.cgst + inv.sgst + inv.igst), 0);

  return (
    <div className="space-y-5 font-sans">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white shadow-xl border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow-inner backdrop-blur-md">
              <Receipt className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">18% GST Invoicing & Compliance Engine</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                  GSTIN 27AAACT9012E1Z5
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                SAC 9993 (0% Exempt) vs SAC 9997 (18% Taxed) • CGST/SGST vs IGST Engine • Compliant Credit Notes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
              <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">Total GST Collected</div>
              <div className="text-lg font-black text-emerald-300">₹{totalGstCollected.toLocaleString('en-IN')}</div>
            </div>
            <button
              onClick={() => setShowNewModal(true)}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create Compliant Invoice</span>
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH & SAC ROUTING CONTROLS */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/80 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search invoice number, patient, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-900 focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="text-slate-600">SAC Routing Filter:</span>
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setSacFilter('ALL')}
              className={`px-3 py-1 rounded-md transition-all ${
                sacFilter === 'ALL' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              All Invoices
            </button>
            <button
              onClick={() => setSacFilter('9993')}
              className={`px-3.5 py-1 rounded-md transition-all ${
                sacFilter === '9993' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              SAC 9993 (0% Healthcare)
            </button>
            <button
              onClick={() => setSacFilter('9997')}
              className={`px-3.5 py-1 rounded-md transition-all ${
                sacFilter === '9997' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              SAC 9997 (18% Cosmetic)
            </button>
          </div>
        </div>
      </div>

      {/* INVOICE TABLE */}
      <div className="erp-card p-4 space-y-4">
        <div className="overflow-x-auto">
          <table className="erp-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Patient & Registered State</th>
                <th>Service & SAC Code</th>
                <th>Subtotal</th>
                <th>Tax Breakdown</th>
                <th>Total Payable</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50">
                  <td className="font-mono text-xs font-black text-blue-700">{inv.invoiceNo}</td>
                  <td>
                    <div className="font-extrabold text-slate-900 text-xs">{inv.patientName}</div>
                    <div className="text-[11px] text-slate-500 font-bold">
                      {inv.patientState} {inv.isInterState ? '(Inter-State IGST)' : '(Intra-State CGST+SGST)'}
                    </div>
                  </td>
                  <td>
                    <div className="text-xs font-semibold text-slate-800">{inv.serviceCategory}</div>
                    <span
                      className={`px-2 py-0.2 rounded text-[10px] font-black uppercase ${
                        inv.sacCode === '9993'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      SAC {inv.sacCode} ({inv.taxRate}% Tax)
                    </span>
                  </td>
                  <td className="font-mono font-extrabold text-xs text-slate-900">₹{inv.subtotal.toLocaleString('en-IN')}</td>
                  <td className="font-mono text-[11px]">
                    {inv.taxRate === 0 ? (
                      <span className="text-emerald-700 font-bold">Exempt (0% GST)</span>
                    ) : inv.isInterState ? (
                      <span className="text-purple-800 font-bold">IGST 18%: ₹{inv.igst.toLocaleString('en-IN')}</span>
                    ) : (
                      <span className="text-blue-800 font-bold">
                        CGST 9%: ₹{inv.cgst} | SGST 9%: ₹{inv.sgst}
                      </span>
                    )}
                  </td>
                  <td className="font-mono font-black text-sm text-slate-900">₹{inv.totalAmount.toLocaleString('en-IN')}</td>
                  <td>
                    {inv.status === 'ISSUED' ? (
                      <span className="erp-badge-green text-xs flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Issued
                      </span>
                    ) : (
                      <span className="erp-badge-yellow text-xs flex items-center gap-1 w-fit">
                        <RefreshCcw className="w-3.5 h-3.5 text-amber-600" /> Credit Note: {inv.creditNoteNo}
                      </span>
                    )}
                  </td>
                  <td>
                    {inv.status === 'ISSUED' && (
                      <button
                        onClick={() => handleIssueCreditNote(inv.id)}
                        className="px-2.5 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs border border-amber-300 flex items-center gap-1"
                      >
                        <RefreshCcw className="w-3.5 h-3.5" />
                        <span>Issue Credit Note</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE NEW COMPLIANT INVOICE MODAL */}
      {showNewModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-emerald-600" />
                <span>Generate GST Compliant Invoice</span>
              </h3>
              <button onClick={() => setShowNewModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Patient Name & UHID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Deshmukh (UHID-8921)"
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Patient Registered State</label>
                  <select
                    value={newPatientState}
                    onChange={(e) => setNewPatientState(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 font-bold text-slate-900"
                  >
                    <option value="Maharashtra">Maharashtra (Intra-State)</option>
                    <option value="Gujarat">Gujarat (Inter-State IGST)</option>
                    <option value="Karnataka">Karnataka (Inter-State IGST)</option>
                    <option value="Delhi">Delhi (Inter-State IGST)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Service Category</label>
                  <select
                    value={newServiceCategory}
                    onChange={(e) => setNewServiceCategory(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 font-bold text-slate-900"
                  >
                    <option value="HEALTHCARE">Healthcare Services (SAC 9993 - 0% Tax)</option>
                    <option value="COSMETIC">Cosmetic / Hair Restoration (SAC 9997 - 18% Tax)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Base Amount (INR)</label>
                <input
                  type="number"
                  min={100}
                  value={newAmount}
                  onChange={(e) => setNewAmount(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 font-mono font-bold text-slate-900"
                />
              </div>

              {/* Tax Calculation Live Preview */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 font-mono text-[11px]">
                <div className="flex justify-between text-slate-600">
                  <span>SAC Code & Tax Rate:</span>
                  <span className="font-bold text-purple-700">SAC {sacCode} ({taxRate}%)</span>
                </div>
                {taxRate === 18 && (
                  isInterState ? (
                    <div className="flex justify-between text-slate-800">
                      <span>IGST (18%):</span>
                      <span className="font-bold">₹{calculatedIgst}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between text-slate-800">
                      <span>CGST (9%): ₹{calculatedCgst} | SGST (9%): ₹{calculatedSgst}</span>
                      <span className="font-bold">Total GST: ₹{calculatedCgst + calculatedSgst}</span>
                    </div>
                  )
                )}
                <div className="flex justify-between border-t border-slate-200 pt-1 text-xs font-black text-slate-900">
                  <span>Grand Total:</span>
                  <span>₹{calculatedTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow-md transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Issue Compliant GST Invoice</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
