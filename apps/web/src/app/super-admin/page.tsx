'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { SuperAdminTenantWidget } from '@/components/dashboard/SuperAdminTenantWidget';
import { AIAnalyticsWidget } from '@/components/dashboard/AIAnalyticsWidget';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

export default function SuperAdminPortalPage() {
  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#172B4D] flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="erp-card p-4 bg-white border-l-4 border-l-red-600 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-red-50 text-red-700 flex items-center justify-center font-extrabold">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-extrabold text-slate-900">Super Admin Global SaaS Command Center</h1>
                <p className="text-xs text-slate-500">
                  Multi-Tenant Provisioner, Domain Binding & Global SaaS Billing Controls
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-red-800 bg-red-50 px-3 py-1.5 rounded border border-red-200 font-bold">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              <span>Global Master Root Key Active</span>
            </div>
          </div>

          <SuperAdminTenantWidget />
          <AIAnalyticsWidget />
        </main>
      </div>
    </div>
  );
}
