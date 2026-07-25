'use client';

import React from 'react';
import { useRBAC, RoleType } from '@/context/RBACContext';
import {
  Stethoscope,
  DollarSign,
  GraduationCap,
  Users,
  BrainCircuit,
  ShieldAlert,
  CheckCircle2,
  Lock,
  UserCheck,
  Pill,
  Briefcase,
  Crown,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentRole, switchRole } = useRBAC();

  const allDomains: Array<{
    roleKey: RoleType;
    title: string;
    route: string;
    icon: any;
    modules: string[];
  }> = [
    {
      roleKey: 'student',
      title: 'Student Portal',
      route: '/student',
      icon: GraduationCap,
      modules: ['My NMC e-Logbook', 'My Attendance & IA 40%', 'My Clinical Postings', 'My Fees & Hostel'],
    },
    {
      roleKey: 'staff',
      title: 'Staff & Faculty Portal',
      route: '/staff',
      icon: UserCheck,
      modules: ['Faculty Logbook E-Sign', 'IA Marks Gradebook', 'Ward Attendance', 'Shift Roster'],
    },
    {
      roleKey: 'doctor',
      title: 'Doctor EMR & Clinical',
      route: '/doctor',
      icon: Stethoscope,
      modules: ['OPD Consult Queue', 'AI Clinical Triage', 'OT Surgery Schedule', 'Prescription Writer'],
    },
    {
      roleKey: 'admin',
      title: 'Hospital & College Admin',
      route: '/admin',
      icon: Briefcase,
      modules: ['Revenue Analytics', 'NMC Accreditation MSR', 'NABH Compliance Audit', 'Bed Occupancy'],
    },
    {
      roleKey: 'billing',
      title: 'Financial ERP & POS',
      route: '/billing',
      icon: DollarSign,
      modules: ['18% GST Invoices', 'Razorpay POS Terminal', 'Insurance TPA Pre-auth', 'Patient Billing'],
    },
    {
      roleKey: 'pharmacy',
      title: 'Pharmacy & LIS Module',
      route: '/pharmacy',
      icon: Pill,
      modules: ['Medicine Stock Inventory', 'Barcode Dispenser', 'Batch Expiry Tracker', 'LIS Lab Verification'],
    },
    {
      roleKey: 'super-admin',
      title: 'Super Admin SaaS',
      route: '/super-admin',
      icon: ShieldAlert,
      modules: ['Tenant Provisioner', 'Domain Binding', 'Bed Quota Licensing', 'Global System Logs'],
    },
  ];

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-md border-r border-slate-200 h-[calc(100vh-53px)] overflow-y-auto p-3.5 flex flex-col justify-between hidden md:flex shrink-0 shadow-sm font-sans">
      <div className="space-y-4">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 flex items-center justify-between border-b border-slate-200 pb-2">
          <span className="font-poppins font-extrabold text-slate-900">Titanobova Suites</span>
          <span className="titan-gold-badge text-[9px]">
            RBAC Router
          </span>
        </div>

        <nav className="space-y-1.5">
          {allDomains.map((domain) => {
            const Icon = domain.icon;
            const isActive = currentRole.role === domain.roleKey;

            return (
              <div key={domain.roleKey} className="space-y-1">
                <button
                  onClick={() => switchRole(domain.roleKey)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-800 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-amber-600'}`} />
                    <span className="font-poppins font-semibold">{domain.title}</span>
                  </div>
                  {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                </button>

                {isActive && (
                  <div className="pl-6 pt-1 pb-2 space-y-1 border-l-2 border-amber-500 ml-3 mt-1">
                    {domain.modules.map((mod, idx) => (
                      <div
                        key={idx}
                        className="text-[11px] font-bold text-slate-700 hover:text-amber-700 py-1 px-2 rounded-lg hover:bg-amber-50/50 cursor-pointer flex items-center gap-1.5 transition-all"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>{mod}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs space-y-1 text-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-1.5 text-amber-900 font-black text-[11px]">
          <Crown className="w-3.5 h-3.5 text-amber-600" />
          <span>Titanobova Enterprise Shield</span>
        </div>
        <p className="text-[10px] text-slate-600 font-medium">Multi-tenant isolation & zero-latency WebGPU routing active.</p>
      </div>
    </aside>
  );
};
