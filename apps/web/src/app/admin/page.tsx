'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { AcademicPostingWidget } from '@/components/dashboard/AcademicPostingWidget';
import { SuperAdminTenantWidget } from '@/components/dashboard/SuperAdminTenantWidget';
import { HospitalBedsWidget } from '@/components/dashboard/HospitalBedsWidget';
import { Briefcase, ShieldCheck } from 'lucide-react';

export default function AdminPortalPage() {
  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#172B4D] flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="erp-card p-4 bg-white border-l-4 border-l-blue-600 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-blue-50 text-blue-700 flex items-center justify-center font-extrabold">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-extrabold text-slate-900">Hospital & College Admin ERP</h1>
                <p className="text-xs text-slate-500">
                  NMC MSR Accreditation, NABH Compliance Audit & Revenue Operations
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-blue-800 bg-blue-50 px-3 py-1.5 rounded border border-blue-200 font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Dean & Admin Governance Scope</span>
            </div>
          </div>

          <AcademicPostingWidget />
          <HospitalBedsWidget />
          <SuperAdminTenantWidget />
        </main>
      </div>
    </div>
  );
}
