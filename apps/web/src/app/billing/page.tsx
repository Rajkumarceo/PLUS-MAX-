'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { FinancialPOSWidget } from '@/components/dashboard/FinancialPOSWidget';
import { DollarSign, ShieldCheck } from 'lucide-react';

export default function BillingPortalPage() {
  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#172B4D] flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="erp-card p-4 bg-white border-l-4 border-l-emerald-600 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center font-extrabold">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-extrabold text-slate-900">Financial ERP & 18% GST POS Terminal</h1>
                <p className="text-xs text-slate-500">
                  Tax Invoicing, Razorpay POS Ledger & TPA Insurance Pre-Authorization
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Tax Compliant Ledger Active</span>
            </div>
          </div>

          <FinancialPOSWidget />
        </main>
      </div>
    </div>
  );
}
