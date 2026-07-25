'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { StudentDashboardView } from '@/components/dashboard/StudentDashboardView';
import { StaffDashboardView } from '@/components/dashboard/StaffDashboardView';
import { AIAnalyticsWidget } from '@/components/dashboard/AIAnalyticsWidget';
import { HospitalBedsWidget } from '@/components/dashboard/HospitalBedsWidget';
import { FinancialPOSWidget } from '@/components/dashboard/FinancialPOSWidget';
import { AcademicPostingWidget } from '@/components/dashboard/AcademicPostingWidget';
import { SuperAdminTenantWidget } from '@/components/dashboard/SuperAdminTenantWidget';
import { Activity, Bed, DollarSign, GraduationCap, X, CheckCircle, Search, Bell, PlusCircle } from 'lucide-react';
import { useRBAC } from '@/context/RBACContext';

export default function DashboardPage() {
  const { currentRole, switchRole } = useRBAC();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedTaskModal, setSelectedTaskModal] = useState<'bed_handover' | 'vitals_sign' | 'admit_patient' | 'gst_invoice' | 'triage' | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#172B4D] flex flex-col font-sans relative">
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
      />

      {/* Floating Action Toast */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#006644] text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle className="w-4 h-4 text-white" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Top Enterprise Metric Bar with Route Triggers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div
              onClick={() => setSelectedTaskModal('bed_handover')}
              className="erp-card p-3 space-y-1 cursor-pointer hover:border-[#0052CC] transition-all group"
            >
              <div className="text-[10px] text-[#5E6C84] font-bold uppercase tracking-wider flex items-center justify-between">
                <span>Occupied Hospital Beds</span>
                <Bed className="w-4 h-4 text-[#0052CC] group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-xl font-black text-[#091E42]">89 / 115</div>
              <div className="text-[10px] text-[#006644] font-bold">77.3% Capacity • Click for Handover</div>
            </div>

            <div
              onClick={() => switchRole('doctor')}
              className="erp-card p-3 space-y-1 cursor-pointer hover:border-[#0052CC] transition-all group"
            >
              <div className="text-[10px] text-[#5E6C84] font-bold uppercase tracking-wider flex items-center justify-between">
                <span>OPD Consultations</span>
                <Activity className="w-4 h-4 text-[#0052CC] group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-xl font-black text-[#091E42]">342</div>
              <div className="text-[10px] text-[#0052CC] font-bold">+14% vs yesterday • Launch /doctor</div>
            </div>

            <div
              onClick={() => switchRole('billing')}
              className="erp-card p-3 space-y-1 cursor-pointer hover:border-[#0052CC] transition-all group"
            >
              <div className="text-[10px] text-[#5E6C84] font-bold uppercase tracking-wider flex items-center justify-between">
                <span>GST Collections (POS)</span>
                <DollarSign className="w-4 h-4 text-[#006644] group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-xl font-black text-[#006644]">₹4,82,500</div>
              <div className="text-[10px] text-[#5E6C84] font-semibold">100% Tax Compliant • Launch /billing</div>
            </div>

            <div
              onClick={() => switchRole('student')}
              className="erp-card p-3 space-y-1 cursor-pointer hover:border-[#0052CC] transition-all group"
            >
              <div className="text-[10px] text-[#5E6C84] font-bold uppercase tracking-wider flex items-center justify-between">
                <span>Active Student Postings</span>
                <GraduationCap className="w-4 h-4 text-[#0052CC] group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-xl font-black text-[#091E42]">128 Students</div>
              <div className="text-[10px] text-[#403294] font-bold">NMC Logbook Synced • Launch /student</div>
            </div>
          </div>

          {/* Dynamic Role-Based Viewport */}
          <div className="space-y-4">
            {currentRole.role === 'student' && <StudentDashboardView />}

            {currentRole.role === 'staff' && <StaffDashboardView />}

            {currentRole.role === 'doctor' && (
              <>
                <HospitalBedsWidget />
                <AIAnalyticsWidget />
              </>
            )}

            {currentRole.role === 'admin' && (
              <>
                <AcademicPostingWidget />
                <HospitalBedsWidget />
                <SuperAdminTenantWidget />
              </>
            )}

            {currentRole.role === 'billing' && <FinancialPOSWidget />}

            {currentRole.role === 'super-admin' && (
              <>
                <SuperAdminTenantWidget />
                <AIAnalyticsWidget />
                <FinancialPOSWidget />
              </>
            )}
          </div>
        </main>
      </div>

      {/* Global Search Dialog Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-[#091E42]/60 flex items-start justify-center pt-20 p-4">
          <div className="bg-white p-5 rounded-lg max-w-xl w-full border border-[#DFE1E6] space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EBECF0] pb-3">
              <div className="flex items-center gap-2 text-[#0052CC] font-bold text-sm">
                <Search className="w-5 h-5" />
                <span>Global Multi-Tenant Directory Search</span>
              </div>
              <button onClick={() => setIsSearchOpen(false)} className="p-1 text-[#5E6C84] hover:bg-[#F4F5F7] rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#5E6C84] uppercase">Instant Route Matches</div>
              <div className="space-y-1.5">
                {[
                  { label: 'Patient: Rajesh V. (UHID: P-90812)', domain: '/doctor', action: () => { switchRole('doctor'); setIsSearchOpen(false); } },
                  { label: 'Student: Rohan Deshmukh (MBBS-2023-042)', domain: '/student', action: () => { switchRole('student'); setIsSearchOpen(false); } },
                  { label: 'Invoice: INV-2026-8809 (₹18,400)', domain: '/billing', action: () => { switchRole('billing'); setIsSearchOpen(false); } },
                  { label: 'Pharmacy: Paracetamol Batch B2026', domain: '/pharmacy', action: () => { switchRole('pharmacy'); setIsSearchOpen(false); } },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={item.action}
                    className="p-2.5 rounded bg-[#FAFBFC] border border-[#DFE1E6] hover:border-[#0052CC] hover:bg-[#DEEBFF] cursor-pointer flex justify-between items-center text-xs font-bold"
                  >
                    <span className="text-[#091E42]">{item.label}</span>
                    <span className="erp-badge-blue">{item.domain}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Drawer Modal */}
      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 bg-[#091E42]/60 flex items-start justify-end p-4">
          <div className="bg-white p-5 rounded-lg max-w-md w-full border border-[#DFE1E6] space-y-4 shadow-2xl mt-12">
            <div className="flex items-center justify-between border-b border-[#EBECF0] pb-3">
              <div className="flex items-center gap-2 text-[#0052CC] font-bold text-sm">
                <Bell className="w-5 h-5 text-[#0052CC]" />
                <span>Enterprise Notifications</span>
              </div>
              <button onClick={() => setIsNotificationsOpen(false)} className="p-1 text-[#5E6C84] hover:bg-[#F4F5F7] rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded bg-[#DEEBFF] border border-[#B3D4FF] text-[#0747A6] space-y-1">
                <div className="font-extrabold flex items-center justify-between">
                  <span>NMC CBME Logbook Synced</span>
                  <span className="text-[10px]">Just now</span>
                </div>
                <p className="text-[11px]">24 new medical student logbook entries signed off by HOD Surgery.</p>
              </div>
              <div className="p-3 rounded bg-[#E3FCEF] border border-[#ABF5D1] text-[#006644] space-y-1">
                <div className="font-extrabold flex items-center justify-between">
                  <span>GST Billing Audit Passed</span>
                  <span className="text-[10px]">10m ago</span>
                </div>
                <p className="text-[11px]">18% GST tax invoices generated today match Razorpay POS ledger 100%.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Task Dialog Modal */}
      {selectedTaskModal && (
        <div className="fixed inset-0 z-50 bg-[#091E42]/60 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full border border-[#DFE1E6] space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EBECF0] pb-3">
              <div className="flex items-center gap-2 text-[#0052CC] font-extrabold text-sm">
                <PlusCircle className="w-5 h-5" />
                <span>Perform Bed Handover Verification</span>
              </div>
              <button onClick={() => setSelectedTaskModal(null)} className="p-1 text-[#5E6C84] hover:bg-[#F4F5F7] rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-[#5E6C84]">
                Confirm execution of operational workflow for tenant <strong className="text-[#091E42]">AIIMS Super Specialty</strong>.
              </p>

              <button
                onClick={() => {
                  setSelectedTaskModal(null);
                  showToast('ICU Bed Handover Verified!');
                }}
                className="w-full py-2.5 rounded bg-[#0052CC] hover:bg-[#0747A6] text-white font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Confirm & Submit Operational Workflow</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
