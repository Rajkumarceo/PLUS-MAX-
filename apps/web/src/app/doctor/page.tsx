'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { HospitalBedsWidget } from '@/components/dashboard/HospitalBedsWidget';
import { AIAnalyticsWidget } from '@/components/dashboard/AIAnalyticsWidget';
import { Stethoscope, Activity, FileText, User, ShieldCheck } from 'lucide-react';

export default function DoctorPortalPage() {
  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#172B4D] flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Header Banner */}
          <div className="erp-card p-4 bg-white border-l-4 border-l-blue-600 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-blue-50 text-blue-700 flex items-center justify-center font-extrabold">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-extrabold text-slate-900">Doctor EMR & Clinical Portal</h1>
                <p className="text-xs text-slate-500">
                  OPD Consult Queue, Patient EMR Timeline, Prescription Writer & AI Clinical Triage
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Active OPD Duty Context (HOD Surgery Desk)</span>
            </div>
          </div>

          <HospitalBedsWidget />
          <AIAnalyticsWidget />
        </main>
      </div>
    </div>
  );
}
