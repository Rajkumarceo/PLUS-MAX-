'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, ArrowRight, Layers, ShieldCheck, LogIn, GraduationCap, UserCheck, Stethoscope, DollarSign, Building2, BrainCircuit, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between">
      {/* 1. Header Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-extrabold shadow-sm">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              PLUX <span className="text-blue-600">MAX ERP</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
            <a href="#portals" className="hover:text-blue-600 transition-colors">Role Portals</a>
            <a href="#modules" className="hover:text-blue-600 transition-colors">25 Enterprise Modules</a>
            <a href="#compliance" className="hover:text-blue-600 transition-colors">NMC & NABH Standards</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-3.5 py-1.5 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <LogIn className="w-4 h-4 text-blue-600" />
              <span>Role Sign In</span>
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span>Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          Enterprise Multi-Tenant Healthcare & Academic Operating System
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          Unified Hospital & College ERP. <br />
          <span className="text-blue-600">High-Speed, Strict Multi-Tenant RBAC.</span>
        </h1>

        <p className="text-base text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
          Integrated multi-tenant ecosystem uniting Patient EMR, Clinical Diagnostics, 18% GST Financial Billing, Medical Student NMC Postings, and AI Clinical Triage with zero cross-role data leakage.
        </p>

        {/* 3. Role Portals Grid */}
        <div id="portals" className="pt-4 max-w-5xl mx-auto">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 text-left">
            Select Role Portal to Launch Isolated Context:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <Link
              href="/student"
              className="p-4 rounded-lg bg-white border border-slate-200 hover:border-blue-600 transition-colors space-y-2 shadow-sm group"
            >
              <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Student Portal
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  NMC e-Logbook, 40% IA Gatekeeper, Attendance & Postings
                </p>
              </div>
              <div className="text-[11px] font-bold text-blue-600 flex items-center gap-1 pt-1">
                <span>Enter Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/staff"
              className="p-4 rounded-lg bg-white border border-slate-200 hover:border-blue-600 transition-colors space-y-2 shadow-sm group"
            >
              <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Staff Portal
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  HR Payroll, Shift Duty Schedule & Ward Bed Operations
                </p>
              </div>
              <div className="text-[11px] font-bold text-blue-600 flex items-center gap-1 pt-1">
                <span>Enter Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/dashboard"
              className="p-4 rounded-lg bg-white border border-slate-200 hover:border-blue-600 transition-colors space-y-2 shadow-sm group"
            >
              <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Stethoscope className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Doctor / Faculty EMR
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  OPD Consult Queue, Faculty E-Sign & AI Triage
                </p>
              </div>
              <div className="text-[11px] font-bold text-blue-600 flex items-center gap-1 pt-1">
                <span>Enter Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/dashboard"
              className="p-4 rounded-lg bg-white border border-slate-200 hover:border-blue-600 transition-colors space-y-2 shadow-sm group"
            >
              <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Hospital Admin POS
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  18% GST Tax Invoices, Razorpay POS & Ledger
                </p>
              </div>
              <div className="text-[11px] font-bold text-blue-600 flex items-center gap-1 pt-1">
                <span>Enter Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. 25 Core Enterprise Modules Section */}
      <section id="modules" className="max-w-6xl mx-auto px-6 py-10 space-y-6">
        <div className="border-b border-slate-200 pb-3 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-black text-slate-900">The 25 Core Enterprise Modules</h2>
            <p className="text-xs text-slate-500">Architected into 8 isolated domains with sub-second data synchronization</p>
          </div>
          <span className="erp-badge-blue">DPDP Act 2023 & NMC Compliant</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: '1', title: 'Public Website & Booking', desc: 'Online OPD slot booking & course admissions', icon: Activity },
            { id: '2', title: 'Core Hospital ERP', desc: 'Patient UHID, Ward/Bed Occupancy, OT & ICU', icon: Building2 },
            { id: '3', title: 'Clinical & Diagnostics', desc: 'LIS Laboratory, LIS Radiology & Pharmacy POS', icon: Stethoscope },
            { id: '4', title: 'Financial ERP', desc: 'Patient Billing, 18% GST Taxing & POS Terminal', icon: DollarSign },
            { id: '5', title: 'Medical College ERP', desc: 'Student roll, Clinical Postings & NMC exams', icon: GraduationCap },
            { id: '6', title: 'HR & Biometrics', desc: 'Doctor & Nurse biometric staff attendance', icon: UserCheck },
            { id: '7', title: 'AI Predictive Engine', desc: 'ICD-10 coding, triage risk & bed forecasting', icon: BrainCircuit },
            { id: '8', title: 'Super Admin Multi-Tenant', desc: 'Tenant isolation, white-labeling & SaaS billing', icon: ShieldCheck },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="p-4 rounded-lg bg-white border border-slate-200 space-y-2 hover:border-blue-600 transition-colors shadow-sm">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-blue-600" />
                  <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-6 text-center text-xs text-slate-500 mt-12">
        PLUX MAX Enterprise ERP &copy; 2026. India DPDP Act 2023, NMC & NABH Compliant.
      </footer>
    </main>
  );
}
