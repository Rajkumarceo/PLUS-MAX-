'use client';

import React, { useState } from 'react';
import { useRBAC, RoleType, ROLE_PROFILES } from '@/context/RBACContext';
import {
  Activity,
  Building2,
  Bell,
  Search,
  KeyRound,
  ShieldCheck,
  X,
  GraduationCap,
  Stethoscope,
  DollarSign,
  ShieldAlert,
  LogIn,
  UserCheck,
  Pill,
  Briefcase,
} from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenNotifications?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenNotifications }) => {
  const { currentRole, switchRole } = useRBAC();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoleKey, setSelectedRoleKey] = useState<RoleType>(currentRole.role);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSwitchRole = (roleKey: RoleType) => {
    switchRole(roleKey);
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 px-6 py-2.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-black text-sm">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
                PLUX MAX <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">ERP v2.0</span>
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-bold text-slate-900">{currentRole.tenantName}</span>
            <span className="erp-badge-green ml-1">DPDP & NMC Compliant</span>
          </div>
        </div>

        {/* Global Search Input */}
        <div className="hidden lg:flex items-center relative w-72">
          <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => onOpenSearch && onOpenSearch()}
            placeholder="Search UHID, Student Roll, Invoices..."
            className="w-full pl-9 pr-3 py-1.5 rounded border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600"
          />
        </div>

        {/* Actions & Role Switcher */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
          >
            <KeyRound className="w-3.5 h-3.5 text-white" />
            <span>Switch Role / Portal</span>
          </button>

          <button
            onClick={() => onOpenNotifications && onOpenNotifications()}
            className="relative p-1.5 rounded border border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-white transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600" />
          </button>

          <div
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2.5 pl-3 border-l border-slate-200 cursor-pointer hover:opacity-90"
          >
            <div className="w-8 h-8 rounded bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-800 font-bold text-xs">
              {currentRole.badge}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-slate-900">{currentRole.name}</div>
              <div className="text-[10px] text-blue-600 font-semibold">{currentRole.title}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Role Switcher & Authentication Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full border border-slate-200 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    PLUX MAX Role & Route Switcher
                  </h3>
                  <p className="text-xs text-slate-500">Triggers Next.js file-based router.push to dedicated page</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded hover:bg-slate-100 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { key: 'student', label: 'Student Portal (/student)', icon: GraduationCap },
                { key: 'staff', label: 'Staff Portal (/staff)', icon: UserCheck },
                { key: 'doctor', label: 'Doctor EMR (/doctor)', icon: Stethoscope },
                { key: 'admin', label: 'Admin ERP (/admin)', icon: Briefcase },
                { key: 'billing', label: 'GST Billing (/billing)', icon: DollarSign },
                { key: 'pharmacy', label: 'Pharmacy & LIS (/pharmacy)', icon: Pill },
                { key: 'super-admin', label: 'Super Admin (/super-admin)', icon: ShieldAlert },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = selectedRoleKey === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setSelectedRoleKey(item.key as RoleType)}
                    className={`p-3 rounded border text-left flex items-center gap-2.5 transition-all text-xs font-bold ${
                      isSelected
                        ? 'bg-blue-50 border-blue-600 text-blue-700'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="bg-slate-50 p-3.5 rounded border border-slate-200 space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Target Persona:</span>
                <span className="font-bold text-slate-900">{ROLE_PROFILES[selectedRoleKey]?.title}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Target Route:</span>
                <span className="font-mono font-bold text-blue-600">{ROLE_PROFILES[selectedRoleKey]?.route}</span>
              </div>
              <button
                onClick={() => handleSwitchRole(selectedRoleKey)}
                className="w-full py-2.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Navigate Router to {ROLE_PROFILES[selectedRoleKey]?.route}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
