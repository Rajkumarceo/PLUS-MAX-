'use client';

import React, { useState } from 'react';
import {
  UserCheck,
  Clock,
  CreditCard,
  Calendar,
  CheckCircle2,
  ShieldAlert,
  AlertCircle,
  Award,
  FileCheck,
  BookOpen,
  Users,
  Clock3,
  LayoutDashboard,
} from 'lucide-react';
import { StaffDashboardData } from '@plux-max/types';
import { FacultyLogbookESign } from '@/components/staff/FacultyLogbookESign';
import { IAMarksGradebook } from '@/components/staff/IAMarksGradebook';
import { WardAttendanceModule } from '@/components/staff/WardAttendanceModule';
import { ShiftRosterModule } from '@/components/staff/ShiftRosterModule';

export const StaffDashboardView: React.FC = () => {
  const [staffData] = useState<StaffDashboardData>({
    staffId: 'stf-204',
    employeeCode: 'EMP-SURG-882',
    name: 'Dr. Rajesh Kumar (HOD Surgery / Faculty)',
    designation: 'HOD Surgery & Senior Faculty Assessor',
    department: 'Department of General Surgery',
    shiftHours: '08:00 AM - 04:00 PM (Morning Shift)',
    monthlySalary: 185000,
    leaveBalanceDays: 14,
    assignedModule: 'LIVE_WARD_BED_MATRIX',
    operatingMetrics: {
      pendingTasks: 4,
      completedToday: 18,
      systemAlerts: 1,
    },
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'logbook' | 'gradebook' | 'attendance' | 'roster'>('overview');

  return (
    <div className="space-y-5">
      {/* Staff HR Header Banner */}
      <div className="erp-card p-4 bg-white border-l-4 border-l-blue-600 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-700 flex items-center justify-center font-extrabold">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-slate-900">{staffData.name}</h2>
                <span className="erp-badge-blue">{staffData.employeeCode}</span>
              </div>
              <p className="text-xs text-slate-500">
                {staffData.designation} • {staffData.department}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-50 px-3 py-1.5 rounded border border-blue-200 font-bold">
            <ShieldAlert className="w-4 h-4 text-blue-600" />
            <span>Faculty Evaluation Portal (Staff ID: {staffData.staffId})</span>
          </div>
        </div>
      </div>

      {/* Navigation Bar for Staff & Faculty Modules */}
      <div className="erp-card p-2.5 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('logbook')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'logbook'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <FileCheck className="w-4 h-4 text-blue-500" />
            <span>1. Faculty Logbook E-Sign</span>
          </button>

          <button
            onClick={() => setActiveTab('gradebook')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'gradebook'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-500" />
            <span>2. IA Marks Gradebook</span>
          </button>

          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'attendance'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-500" />
            <span>3. Ward Attendance</span>
          </button>

          <button
            onClick={() => setActiveTab('roster')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'roster'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Clock3 className="w-4 h-4 text-amber-500" />
            <span>4. Shift Roster & Leave</span>
          </button>
        </div>
      </div>

      {/* RENDER MODULES */}
      {activeTab === 'logbook' && <FacultyLogbookESign />}

      {activeTab === 'gradebook' && <IAMarksGradebook />}

      {activeTab === 'attendance' && <WardAttendanceModule />}

      {activeTab === 'roster' && <ShiftRosterModule />}

      {/* DEFAULT DASHBOARD OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-5">
          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => setActiveTab('roster')}
              className="erp-card p-4 space-y-1 cursor-pointer hover:border-blue-500 transition-all"
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Assigned Duty Shift</span>
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-sm font-extrabold text-slate-900">{staffData.shiftHours}</div>
              <div className="text-[11px] font-semibold text-emerald-700">Biometric Verified (07:58 AM)</div>
            </div>

            <div
              onClick={() => setActiveTab('logbook')}
              className="erp-card p-4 space-y-1 cursor-pointer hover:border-blue-500 transition-all"
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Logbook Sign-offs</span>
                <FileCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">4 Pending</div>
              <div className="text-[11px] font-bold text-emerald-700">NMC SHA-256 Enabled</div>
            </div>

            <div
              onClick={() => setActiveTab('roster')}
              className="erp-card p-4 space-y-1 cursor-pointer hover:border-purple-500 transition-all"
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Available Leave Balance</span>
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">{staffData.leaveBalanceDays} Days</div>
              <div className="text-[11px] text-slate-500 font-medium">Casual & Earned Leave</div>
            </div>

            <div
              onClick={() => setActiveTab('gradebook')}
              className="erp-card p-4 space-y-1 cursor-pointer hover:border-amber-500 transition-all"
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>40% IA Gatekeeper</span>
                <Award className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-sm font-extrabold text-blue-600">Gradebook Sync Active</div>
              <div className="text-[11px] text-slate-500 font-medium font-mono">Exam Hall Ticket Clearance</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="erp-card p-4 space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-blue-600" />
                <span>Quick Faculty E-Sign Queue</span>
              </h3>
              <p className="text-xs text-slate-500">Student logbook entries waiting for your digital sign-off.</p>
              <button
                onClick={() => setActiveTab('logbook')}
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm"
              >
                Open Full Faculty E-Sign Desk
              </button>
            </div>

            <div className="erp-card p-4 space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-600" />
                <span>Internal Assessment (IA) Gradebook</span>
              </h3>
              <p className="text-xs text-slate-500">Class performance statistics & 40% eligibility threshold highlights.</p>
              <button
                onClick={() => setActiveTab('gradebook')}
                className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all shadow-sm"
              >
                Open IA Gradebook Spreadsheet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
