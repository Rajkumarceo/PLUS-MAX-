'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  Receipt,
  CreditCard,
  ShieldCheck,
  FileText,
  ShieldAlert,
  LayoutDashboard,
} from 'lucide-react';
import { GSTInvoicesModule } from '@/components/financial/GSTInvoicesModule';
import { RazorpayPOSTerminal } from '@/components/financial/RazorpayPOSTerminal';
import { TPAPreAuthModule } from '@/components/financial/TPAPreAuthModule';
import { PatientBillingModule } from '@/components/financial/PatientBillingModule';

export const FinancialDashboardView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'gst' | 'pos' | 'tpa' | 'billing'>('overview');

  return (
    <div className="space-y-5 font-sans">
      {/* Header Banner */}
      <div className="erp-card p-4 bg-white border-l-4 border-l-emerald-600 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center font-extrabold">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900">Financial ERP & POS Billing Terminal</h1>
            <p className="text-xs text-slate-500">
              Apple-Style Glassmorphism • WebGPU Data Grids • 18% GST Compliance • Razorpay Hardware POS • TPA Pre-Auth
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200 font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>GSTIN 27AAACT9012E1Z5 Audit Active</span>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="erp-card p-2.5 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('gst')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'gst'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Receipt className="w-4 h-4 text-emerald-500" />
            <span>1. 18% GST Invoices</span>
          </button>

          <button
            onClick={() => setActiveTab('pos')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'pos'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4 text-blue-500" />
            <span>2. Razorpay POS Terminal</span>
          </button>

          <button
            onClick={() => setActiveTab('tpa')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'tpa'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-purple-500" />
            <span>3. Insurance TPA Pre-auth</span>
          </button>

          <button
            onClick={() => setActiveTab('billing')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'billing'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-indigo-500" />
            <span>4. Patient Master Billing</span>
          </button>
        </div>
      </div>

      {/* MODULE RENDER */}
      {activeTab === 'gst' && <GSTInvoicesModule />}

      {activeTab === 'pos' && <RazorpayPOSTerminal />}

      {activeTab === 'tpa' && <TPAPreAuthModule />}

      {activeTab === 'billing' && <PatientBillingModule />}

      {/* OVERVIEW DEFAULT */}
      {activeTab === 'overview' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => setActiveTab('gst')}
              className="erp-card p-4 space-y-1 cursor-pointer hover:border-emerald-500 transition-all"
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase flex justify-between">
                <span>GST Tax Compliance</span>
                <Receipt className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">18% GST Engine</div>
              <div className="text-[11px] text-emerald-700 font-bold">SAC 9993 0% Exempt Active</div>
            </div>

            <div
              onClick={() => setActiveTab('pos')}
              className="erp-card p-4 space-y-1 cursor-pointer hover:border-blue-500 transition-all"
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase flex justify-between">
                <span>Smart POS Bridge</span>
                <CreditCard className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-sm font-extrabold text-blue-700">Razorpay API Linked</div>
              <div className="text-[11px] text-slate-500 font-medium">PCI-DSS Tokenized</div>
            </div>

            <div
              onClick={() => setActiveTab('tpa')}
              className="erp-card p-4 space-y-1 cursor-pointer hover:border-purple-500 transition-all"
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase flex justify-between">
                <span>TPA Insurance Network</span>
                <ShieldCheck className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">₹1,65,000</div>
              <div className="text-[11px] text-purple-700 font-bold">Pre-Auth Approved</div>
            </div>

            <div
              onClick={() => setActiveTab('billing')}
              className="erp-card p-4 space-y-1 cursor-pointer hover:border-indigo-500 transition-all"
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase flex justify-between">
                <span>Master Inpatient Folio</span>
                <FileText className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">₹81,500</div>
              <div className="text-[11px] text-slate-500 font-medium">Pre-Discharge Audit Ready</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="erp-card p-4 space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Receipt className="w-4 h-4 text-emerald-600" />
                <span>18% GST Invoicing & SAC Routing</span>
              </h3>
              <p className="text-xs text-slate-500">Automated SAC 9993 (Healthcare 0%) vs SAC 9997 (Cosmetic 18%).</p>
              <button
                onClick={() => setActiveTab('gst')}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm"
              >
                Open GST Invoicing Engine
              </button>
            </div>

            <div className="erp-card p-4 space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span>Razorpay Hardware POS Bridge</span>
              </h3>
              <p className="text-xs text-slate-500">Real-time ledger updates & PCI-DSS tokenization.</p>
              <button
                onClick={() => setActiveTab('pos')}
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm"
              >
                Open Razorpay POS Terminal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
