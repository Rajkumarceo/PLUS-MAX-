'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Activity, ShieldCheck, GraduationCap, Stethoscope, DollarSign, ShieldAlert, LogIn, ArrowRight, UserCheck, Building2 } from 'lucide-react';
import { PersonaRoleKey } from '@plux-max/types';

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<PersonaRoleKey>('STUDENT');
  const [email, setEmail] = useState('rohan.mbbs2023@aiims.edu');
  const [password, setPassword] = useState('••••••••••••');

  const handleRoleSelect = (roleKey: PersonaRoleKey, defaultEmail: string) => {
    setSelectedRole(roleKey);
    setEmail(defaultEmail);
  };

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'STUDENT') {
      router.push('/student');
    } else if (selectedRole === 'NURSE') {
      router.push('/staff');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F5F7] text-[#172B4D] font-sans flex flex-col justify-between p-4 sm:p-6">
      {/* Navigation Header */}
      <nav className="max-w-6xl mx-auto w-full bg-white border border-[#DFE1E6] rounded-lg px-5 py-3 flex items-center justify-between shadow-sm">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-[#0052CC] flex items-center justify-center text-white font-extrabold">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-base font-extrabold text-[#091E42]">
            PLUX <span className="text-[#0052CC]">MAX ERP</span>
          </span>
        </Link>
        <div className="flex items-center gap-2 text-xs font-bold text-[#5E6C84]">
          <span className="erp-badge-blue">DPDP Act 2023 & NMC Compliant</span>
        </div>
      </nav>

      {/* Login Form Center */}
      <div className="max-w-xl mx-auto w-full my-8">
        <div className="erp-card p-6 space-y-6">
          <div className="border-b border-[#EBECF0] pb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#DEEBFF] text-[#0747A6] flex items-center justify-center font-extrabold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-[#091E42]">PLUX MAX Role Portal Authentication</h1>
              <p className="text-xs text-[#5E6C84]">Select your assigned role persona to enter isolated ERP workspace</p>
            </div>
          </div>

          {/* Role Selection Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {[
              { role: 'STUDENT', title: 'Student (MBBS)', email: 'rohan.mbbs2023@aiims.edu', icon: GraduationCap },
              { role: 'NURSE', title: 'Staff (Nurse/Pharm)', email: 'nurse.priya@aiims.edu', icon: UserCheck },
              { role: 'DOCTOR', title: 'Doctor / Faculty', email: 'dr.rajesh@aiims.edu', icon: Stethoscope },
              { role: 'HOSPITAL_ADMIN', title: 'Hospital Admin', email: 'admin.billing@aiims.edu', icon: DollarSign },
              { role: 'COLLEGE_ADMIN', title: 'College Governance', email: 'dean.academics@aiims.edu', icon: Building2 },
              { role: 'SUPER_ADMIN', title: 'Super Admin', email: 'root@pluxmax.com', icon: ShieldAlert },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = selectedRole === item.role;
              return (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => handleRoleSelect(item.role as PersonaRoleKey, item.email)}
                  className={`p-3 rounded border text-left flex flex-col gap-1 transition-all text-xs font-bold ${
                    isSelected
                      ? 'bg-[#DEEBFF] border-[#0052CC] text-[#0747A6]'
                      : 'bg-[#FAFBFC] border-[#DFE1E6] text-[#172B4D] hover:bg-[#F4F5F7]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#0052CC]' : 'text-[#5E6C84]'}`} />
                  <span className="font-extrabold mt-1">{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Form Input */}
          <form onSubmit={handleAuthenticate} className="space-y-3.5 bg-[#FAFBFC] p-4 rounded border border-[#DFE1E6]">
            <div>
              <label className="text-xs font-bold text-[#172B4D] block mb-1">User Email Identity</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-1.5 rounded border border-[#DFE1E6] bg-white text-xs text-[#172B4D] font-mono focus:outline-none focus:border-[#0052CC]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#172B4D] block mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-1.5 rounded border border-[#DFE1E6] bg-white text-xs text-[#172B4D] font-mono focus:outline-none focus:border-[#0052CC]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded bg-[#0052CC] hover:bg-[#0747A6] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Authenticate & Enter {selectedRole} Portal</span>
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-[#5E6C84] py-2">
        PLUX MAX Enterprise SaaS &copy; 2026. Sub-second Multi-Tenant Data Boundary Protection.
      </footer>
    </main>
  );
}
