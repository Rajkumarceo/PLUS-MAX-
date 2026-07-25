'use client';

import React, { useState } from 'react';
import { UserCheck, Clock, CreditCard, Calendar, CheckCircle2, ShieldAlert, AlertCircle, Award } from 'lucide-react';
import { StaffDashboardData } from '@plux-max/types';
import { StaffEvaluationDesk } from './StaffEvaluationDesk';

export const StaffDashboardView: React.FC = () => {
  const [staffData] = useState<StaffDashboardData>({
    staffId: 'stf-204',
    employeeCode: 'EMP-PHARM-882',
    name: 'Priya Sharma (Senior ICU Charge Nurse / Staff)',
    designation: 'Senior ICU Charge Nurse / Faculty Assessor',
    department: 'ICU & Emergency Operations',
    shiftHours: '08:00 AM - 04:00 PM (Morning Shift)',
    monthlySalary: 72500,
    leaveBalanceDays: 14,
    assignedModule: 'LIVE_WARD_BED_MATRIX',
    operatingMetrics: {
      pendingTasks: 4,
      completedToday: 18,
      systemAlerts: 1,
    },
  });

  const [activeTab, setActiveTab] = useState<'grading' | 'roster'>('grading');

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
            <span>Staff & Faculty Evaluation Desk (Staff ID: {staffData.staffId})</span>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="erp-card p-4 space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Assigned Duty Shift</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-sm font-extrabold text-slate-900">{staffData.shiftHours}</div>
          <div className="text-[11px] font-semibold text-emerald-700">Biometric Verified (07:58 AM)</div>
        </div>

        <div className="erp-card p-4 space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Monthly HR Payroll</span>
            <CreditCard className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">₹{staffData.monthlySalary.toLocaleString()}</div>
          <div className="text-[11px] font-bold text-emerald-700">Processed & Tax Audited</div>
        </div>

        <div className="erp-card p-4 space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Available Leave Balance</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{staffData.leaveBalanceDays} Days</div>
          <div className="text-[11px] text-slate-500 font-medium">Casual & Sick Leave Combined</div>
        </div>

        <div className="erp-card p-4 space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Faculty Desk Action</span>
            <Award className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-sm font-extrabold text-blue-600">Grading & E-Sign Active</div>
          <div className="text-[11px] text-slate-500 font-medium font-mono">Syncs to Student Portal</div>
        </div>
      </div>

      {/* Navigation Sub-Header */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 text-xs font-bold">
        <button
          onClick={() => setActiveTab('grading')}
          className={`px-4 py-2 rounded-t-lg transition-all ${
            activeTab === 'grading'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Faculty Grading & Logbook E-Sign Desk
        </button>

        <button
          onClick={() => setActiveTab('roster')}
          className={`px-4 py-2 rounded-t-lg transition-all ${
            activeTab === 'roster'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          ICU Ward Operating Tasks & Roster
        </button>
      </div>

      {/* Tab Viewport */}
      {activeTab === 'grading' ? (
        <StaffEvaluationDesk />
      ) : (
        <div className="erp-card p-4 space-y-4">
          <div className="erp-card-header flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900">Assigned ICU Ward Duty Tasks</h3>
            <span className="erp-badge-blue">Ward 4 & ICU Block A</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>Pending Bed Handover Tasks</span>
              </div>
              <div className="text-xl font-black text-red-600">
                {staffData.operatingMetrics.pendingTasks} Beds Requiring Check
              </div>
              <p className="text-[11px] text-slate-500">Verify ICU IV drip rates & oxygen pressures before 02:00 PM</p>
            </div>

            <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Shift Operations Log</span>
              </div>
              <div className="text-xl font-black text-emerald-700">
                {staffData.operatingMetrics.completedToday} Patient Vitals Signed
              </div>
              <p className="text-[11px] text-slate-500">All vitals synced directly to Doctor EMR timeline</p>
            </div>

            <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-blue-600" />
                <span>Security & Scope Boundary</span>
              </div>
              <div className="text-sm font-extrabold text-blue-700">Strict Staff Isolation</div>
              <p className="text-[11px] text-slate-500">Access restricted to assigned Ward 4 & ICU Block A</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
