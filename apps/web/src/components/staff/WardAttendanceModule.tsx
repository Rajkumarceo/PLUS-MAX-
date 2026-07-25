'use client';

import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Building,
  AlertCircle,
  Bell,
  Sparkles,
  ShieldCheck,
  Check,
  UserCheck,
} from 'lucide-react';
import { useStudentEvaluation } from '@/context/StudentEvaluationContext';

export interface WardStudent {
  id: string;
  name: string;
  rollNumber: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  bedAssignment: string;
  section: string;
  hoursAttended: number;
}

const INITIAL_ROSTER: WardStudent[] = [
  { id: 'std-101', name: 'Rohan Deshmukh', rollNumber: '2024-MBBS-018', status: 'PRESENT', bedAssignment: 'Bed 304 - Surgical Ward 3A', section: 'Male Post-Op Section A', hoursAttended: 4 },
  { id: 'std-102', name: 'Ananya Iyer', rollNumber: '2024-MBBS-004', status: 'PRESENT', bedAssignment: 'Bed 306 - Surgical Ward 3A', section: 'Male Post-Op Section A', hoursAttended: 4 },
  { id: 'std-103', name: 'Vikram Singh', rollNumber: '2024-MBBS-042', status: 'ABSENT', bedAssignment: 'Bed 310 - Trauma Bay B', section: 'Emergency Triage', hoursAttended: 0 },
  { id: 'std-104', name: 'Priya Sharma', rollNumber: '2024-MBBS-031', status: 'LATE', bedAssignment: 'Minor OT Suite 2', section: 'Operating Complex', hoursAttended: 2 },
  { id: 'std-105', name: 'Rahul Mehta', rollNumber: '2024-MBBS-025', status: 'PRESENT', bedAssignment: 'Surgical ICU Bed 2', section: 'Intensive Care Unit', hoursAttended: 4 },
];

export const WardAttendanceModule: React.FC = () => {
  const { updateStudentAttendance } = useStudentEvaluation();

  const [roster, setRoster] = useState<WardStudent[]>(INITIAL_ROSTER);
  const [activeView, setActiveView] = useState<'roster' | 'spatial'>('roster');
  const [absenteeToast, setAbsenteeToast] = useState<string | null>(null);

  const handleToggleStatus = (id: string, newStatus: 'PRESENT' | 'ABSENT' | 'LATE') => {
    setRoster((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          // Trigger attendance update
          if (newStatus === 'PRESENT') updateStudentAttendance(id, +0.5);
          else if (newStatus === 'ABSENT') {
            updateStudentAttendance(id, -0.8);
            setAbsenteeToast(`Automated Absentee Trigger Sent! Missed 4 Clinical Hours logged for ${s.name}.`);
            setTimeout(() => setAbsenteeToast(null), 4500);
          }
          return { ...s, status: newStatus };
        }
        return s;
      })
    );
  };

  const presentCount = roster.filter((r) => r.status === 'PRESENT').length;
  const absentCount = roster.filter((r) => r.status === 'ABSENT').length;
  const lateCount = roster.filter((r) => r.status === 'LATE').length;

  return (
    <div className="space-y-5">
      {/* Banner */}
      <div className="erp-card p-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow-inner">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">On-the-Go Ward Round Attendance</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                  Mobile Touch Optimized
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                Single-Tap Roster • Spatial Ward 360 Deployment Map • Automated Absentee Hours Trigger
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold bg-white/10 p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setActiveView('roster')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeView === 'roster' ? 'bg-emerald-500 text-slate-950 font-black shadow-sm' : 'text-white hover:bg-white/10'
              }`}
            >
              Quick-Toggle Roster
            </button>
            <button
              onClick={() => setActiveView('spatial')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeView === 'spatial' ? 'bg-emerald-500 text-slate-950 font-black shadow-sm' : 'text-white hover:bg-white/10'
              }`}
            >
              Spatial Ward Map
            </button>
          </div>
        </div>
      </div>

      {absenteeToast && (
        <div className="p-3 bg-red-600 text-white rounded-lg shadow-lg flex items-center justify-between text-xs font-bold animate-bounce">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <span>{absenteeToast}</span>
          </div>
          <span className="text-[10px] bg-red-800 px-2 py-0.5 rounded font-mono">DATABASE SYNCED</span>
        </div>
      )}

      {/* METRICS DASHBOARD */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="erp-card p-4 space-y-1 bg-emerald-50/50 border-emerald-200">
          <div className="text-[11px] font-bold text-emerald-800 uppercase flex justify-between">
            <span>Present On Ward</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">{presentCount} Students</div>
          <div className="text-[10px] text-emerald-600 font-bold">Clinical Hours Logged</div>
        </div>

        <div className="erp-card p-4 space-y-1 bg-red-50/50 border-red-200">
          <div className="text-[11px] font-bold text-red-800 uppercase flex justify-between">
            <span>Absentees</span>
            <XCircle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-red-600">{absentCount} Student</div>
          <div className="text-[10px] text-red-600 font-bold">Portal Warning Triggered</div>
        </div>

        <div className="erp-card p-4 space-y-1 bg-amber-50/50 border-amber-200">
          <div className="text-[11px] font-bold text-amber-800 uppercase flex justify-between">
            <span>Late Arrivals</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-700">{lateCount} Student</div>
          <div className="text-[10px] text-amber-600 font-bold">Grace Period Applied</div>
        </div>
      </div>

      {/* VIEW 1: QUICK-TOGGLE TOUCH ROSTER */}
      {activeView === 'roster' && (
        <div className="erp-card p-4 space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">General Surgery Unit II Ward Roster</h3>
              <p className="text-xs text-slate-500">Single-tap controls for round attendance marking.</p>
            </div>
            <span className="text-xs font-bold text-slate-600 font-mono">Date: Jul 25, 2026</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roster.map((std) => (
              <div
                key={std.id}
                className={`p-4 rounded-xl border transition-all space-y-3 ${
                  std.status === 'PRESENT'
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : std.status === 'ABSENT'
                    ? 'bg-red-50/40 border-red-300'
                    : 'bg-amber-50/40 border-amber-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900">{std.name}</h4>
                    <p className="text-xs font-mono text-slate-500">{std.rollNumber}</p>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded text-[11px] font-black uppercase ${
                      std.status === 'PRESENT'
                        ? 'bg-emerald-600 text-white'
                        : std.status === 'ABSENT'
                        ? 'bg-red-600 text-white'
                        : 'bg-amber-500 text-slate-950'
                    }`}
                  >
                    {std.status}
                  </span>
                </div>

                <div className="text-xs text-slate-700 font-semibold space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{std.bedAssignment}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">Zone: {std.section}</div>
                </div>

                {/* Touch Quick-Toggle Buttons */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200">
                  <button
                    onClick={() => handleToggleStatus(std.id, 'PRESENT')}
                    className={`py-2 rounded-lg font-bold text-xs shadow-sm transition-all ${
                      std.status === 'PRESENT'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-emerald-100 hover:text-emerald-800'
                    }`}
                  >
                    Present
                  </button>
                  <button
                    onClick={() => handleToggleStatus(std.id, 'ABSENT')}
                    className={`py-2 rounded-lg font-bold text-xs shadow-sm transition-all ${
                      std.status === 'ABSENT'
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-red-100 hover:text-red-800'
                    }`}
                  >
                    Absent
                  </button>
                  <button
                    onClick={() => handleToggleStatus(std.id, 'LATE')}
                    className={`py-2 rounded-lg font-bold text-xs shadow-sm transition-all ${
                      std.status === 'LATE'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-100 text-slate-700 hover:bg-amber-100 hover:text-amber-800'
                    }`}
                  >
                    Late
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: SPATIAL WARD MAP */}
      {activeView === 'spatial' && (
        <div className="erp-card p-5 space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-emerald-600" />
                <span>360-Degree Hospital Ward Spatial Map</span>
              </h3>
              <p className="text-xs text-slate-500">Live deployment zones for MBBS student clinical postings.</p>
            </div>
          </div>

          {/* Ward Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {/* Zone 1 */}
            <div className="p-4 rounded-xl bg-slate-50 border-2 border-dashed border-emerald-400 space-y-3">
              <div className="text-xs font-black text-emerald-900 uppercase">Zone A: Surgical ICU (Beds 1-4)</div>
              <div className="space-y-2">
                {roster.filter((r) => r.section.includes('Intensive')).map((std) => (
                  <div key={std.id} className="p-2 bg-white rounded-lg border border-slate-200 text-xs font-bold shadow-sm">
                    <div className="text-slate-900">{std.name}</div>
                    <div className="text-[10px] text-emerald-700 font-mono">{std.bedAssignment}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone 2 */}
            <div className="p-4 rounded-xl bg-slate-50 border-2 border-dashed border-blue-400 space-y-3">
              <div className="text-xs font-black text-blue-900 uppercase">Zone B: Surgical Ward 3A (Beds 5-12)</div>
              <div className="space-y-2">
                {roster.filter((r) => r.section.includes('Post-Op')).map((std) => (
                  <div key={std.id} className="p-2 bg-white rounded-lg border border-slate-200 text-xs font-bold shadow-sm">
                    <div className="text-slate-900">{std.name}</div>
                    <div className="text-[10px] text-blue-700 font-mono">{std.bedAssignment}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone 3 */}
            <div className="p-4 rounded-xl bg-slate-50 border-2 border-dashed border-red-400 space-y-3">
              <div className="text-xs font-black text-red-900 uppercase">Zone C: Emergency Triage</div>
              <div className="space-y-2">
                {roster.filter((r) => r.section.includes('Emergency')).map((std) => (
                  <div key={std.id} className="p-2 bg-white rounded-lg border border-slate-200 text-xs font-bold shadow-sm">
                    <div className="text-slate-900">{std.name}</div>
                    <div className="text-[10px] text-red-700 font-mono">{std.bedAssignment}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone 4 */}
            <div className="p-4 rounded-xl bg-slate-50 border-2 border-dashed border-purple-400 space-y-3">
              <div className="text-xs font-black text-purple-900 uppercase">Zone D: OT Complex Suite 2</div>
              <div className="space-y-2">
                {roster.filter((r) => r.section.includes('Operating')).map((std) => (
                  <div key={std.id} className="p-2 bg-white rounded-lg border border-slate-200 text-xs font-bold shadow-sm">
                    <div className="text-slate-900">{std.name}</div>
                    <div className="text-[10px] text-purple-700 font-mono">{std.bedAssignment}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
