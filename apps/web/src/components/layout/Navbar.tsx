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
  Crown,
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
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-2.5 flex items-center justify-between shadow-sm font-sans">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl titan-accent-gold flex items-center justify-center text-slate-950 font-black text-sm shadow-md">
              <Crown className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-slate-900 font-poppins">
                  Titanobova Private Limited
                </span>
                <span className="titan-gold-badge text-[11px] font-bold">
                  Enterprise Suite v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Unified Healthcare & Medical College SaaS Platform</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-100/70 border border-slate-200 text-xs text-slate-700">
            <Building2 className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-bold text-slate-900">{currentRole.tenantName}</span>
            <span className="erp-badge-green ml-1 font-bold">ABDM & NMC Compliant</span>
          </div>
        </div>

        {/* Global Search Input */}
        <div className="hidden lg:flex items-center relative w-80">
          <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => onOpenSearch && onOpenSearch()}
            placeholder="Search UHID, Student Roll, Invoices, SKUs..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 font-inter"
          />
        </div>

        {/* Actions & Role Switcher */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>Switch Portal Persona</span>
          </button>

          <button
            onClick={() => onOpenNotifications && onOpenNotifications()}
            className="relative p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-white transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          </button>

          <div
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2.5 pl-3 border-l border-slate-200 cursor-pointer hover:opacity-90"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-800 font-bold text-xs">
              {currentRole.badge}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-slate-900">{currentRole.name}</div>
              <div className="text-[11px] text-amber-600 font-bold">{currentRole.title}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Role Switcher & Authentication Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl max-w-lg w-full border border-slate-200 space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl titan-accent-gold flex items-center justify-center text-slate-950">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 font-poppins">
                    Titanobova Portal & Route Switcher
                  </h3>
                  <p className="text-xs text-slate-500">File-based route navigation across enterprise modules</p>
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
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all text-xs font-bold ${
                      isSelected
                        ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-600' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Target Persona:</span>
                <span className="font-bold text-slate-900">{ROLE_PROFILES[selectedRoleKey]?.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target Route:</span>
                <span className="font-mono font-bold text-blue-600">{ROLE_PROFILES[selectedRoleKey]?.route}</span>
              </div>
              <button
                onClick={() => handleSwitchRole(selectedRoleKey)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <LogIn className="w-4 h-4 text-amber-400" />
                <span>Navigate Router to {ROLE_PROFILES[selectedRoleKey]?.route}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
