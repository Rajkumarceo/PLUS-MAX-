'use client';

import React, { useState } from 'react';
import {
  Building2,
  Clock,
  UserCheck,
  ShieldAlert,
  Calendar,
  CheckCircle,
  Plus,
  Sparkles,
  AlertTriangle,
  Layers,
  ChevronRight,
  Activity,
} from 'lucide-react';

export interface OTSlot {
  id: string;
  theaterName: string;
  status: 'ACTIVE_SURGERY' | 'STERILIZATION' | 'READY' | 'PREP';
  currentProcedure?: string;
  patientName?: string;
  leadSurgeon?: string;
  anesthesiologist?: string;
  scrubNurse?: string;
  startTime?: string;
  endTime?: string;
  conflictDetected?: boolean;
  conflictReason?: string;
}

const INITIAL_THEATERS: OTSlot[] = [
  {
    id: 'ot-1',
    theaterName: 'Major OT Suite 1 (Cardiothoracic)',
    status: 'ACTIVE_SURGERY',
    currentProcedure: 'CABG Off-Pump Bypass Grafting',
    patientName: 'Anil Kumar (IP-98210)',
    leadSurgeon: 'Dr. Aris Thorne (HOD Surgery)',
    anesthesiologist: 'Dr. Vikramaditya Rao',
    scrubNurse: 'Sr. Nurse Priya',
    startTime: '08:30 AM',
    endTime: '01:30 PM',
    conflictDetected: false,
  },
  {
    id: 'ot-2',
    theaterName: 'Major OT Suite 2 (Laparoscopic GI)',
    status: 'STERILIZATION',
    currentProcedure: 'Post-Laparoscopic Sterilization Cycle',
    startTime: '10:30 AM',
    endTime: '11:15 AM',
    conflictDetected: false,
  },
  {
    id: 'ot-3',
    theaterName: 'OT Suite 3 (Orthopaedic Joint Replacement)',
    status: 'READY',
    currentProcedure: 'Total Knee Arthroplasty (Scheduled 11:30 AM)',
    patientName: 'Subhash Patri',
    leadSurgeon: 'Dr. Neha Sharma',
    anesthesiologist: 'Dr. Vikramaditya Rao', // Double Booking Alert!
    scrubNurse: 'Sr. Nurse Sunita',
    startTime: '11:30 AM',
    endTime: '02:30 PM',
    conflictDetected: true,
    conflictReason: 'Metallic Blue Alert: Anesthesiologist Dr. Vikramaditya Rao double-booked in OT 1 and OT 3 at 11:30 AM!',
  },
  {
    id: 'ot-4',
    theaterName: 'OT Suite 4 (Neurosurgery)',
    status: 'PREP',
    currentProcedure: 'Pre-Op Craniotomy Positioning',
    patientName: 'Rajesh Shinde',
    leadSurgeon: 'Dr. Alan Vance',
    anesthesiologist: 'Dr. Sunita Kapoor',
    scrubNurse: 'Sr. Nurse Rekha',
    startTime: '02:00 PM',
    endTime: '05:30 PM',
    conflictDetected: false,
  },
];

export const OTSurgerySchedule: React.FC = () => {
  const [theaters, setTheaters] = useState<OTSlot[]>(INITIAL_THEATERS);
  const [selectedOT, setSelectedOT] = useState<OTSlot>(INITIAL_THEATERS[0]);
  const [showAddModal, setShowAddModal] = useState(false);

  const activeConflict = theaters.find((t) => t.conflictDetected);

  return (
    <div className="space-y-5 font-sans">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shadow-inner backdrop-blur-md">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">OT Surgery Schedule & Spatial Theater View</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-teal-500/30 text-teal-200 border border-teal-400/40">
                  Resource Optimization Engine
                </span>
              </div>
              <p className="text-xs text-teal-200/80 mt-0.5">
                360° Floor Map • Interactive Gantt Timeline • Surgical Team Personnel Matrix & Conflict Alerts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
              <div className="text-[10px] text-teal-200 uppercase font-bold tracking-wider">Active Surgeries</div>
              <div className="text-lg font-black text-emerald-400">2 In Progress</div>
            </div>
          </div>
        </div>
      </div>

      {/* METALLIC BLUE CONFLICT ALERT BANNER */}
      {activeConflict && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white border-2 border-blue-400 shadow-xl flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-blue-300 shrink-0" />
            <div>
              <div className="text-xs font-black uppercase text-blue-200 tracking-wider">
                Surgical Team Scheduling Conflict Detected
              </div>
              <p className="text-xs font-extrabold text-white mt-0.5">{activeConflict.conflictReason}</p>
            </div>
          </div>
          <button
            onClick={() => alert('Conflict Resolution: Re-assigned Dr. Sunita Kapoor as Anesthesiologist for OT 3.')}
            className="px-3.5 py-1.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-black text-xs shadow-md transition-all shrink-0"
          >
            Auto-Resolve Conflict
          </button>
        </div>
      )}

      {/* SECTION 1: 360-DEGREE SPATIAL THEATER FLOOR MAP */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-teal-600" />
          <span>360-Degree Operating Theater Floor Map</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {theaters.map((ot) => {
            const isActive = ot.status === 'ACTIVE_SURGERY';
            const isSterile = ot.status === 'STERILIZATION';
            const isReady = ot.status === 'READY';

            return (
              <div
                key={ot.id}
                onClick={() => setSelectedOT(ot)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 relative backdrop-blur-md ${
                  isActive
                    ? 'bg-red-50/50 border-red-300 ring-2 ring-red-400/20 shadow-md'
                    : isSterile
                    ? 'bg-amber-50/50 border-amber-300'
                    : isReady
                    ? 'bg-emerald-50/50 border-emerald-300'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      isActive
                        ? 'bg-red-600 text-white'
                        : isSterile
                        ? 'bg-amber-500 text-slate-950'
                        : isReady
                        ? 'bg-emerald-600 text-white'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {ot.status.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-500">{ot.startTime}</span>
                </div>

                <div>
                  <h4 className="text-xs font-black text-slate-900">{ot.theaterName}</h4>
                  <p className="text-xs font-bold text-slate-700 mt-1 line-clamp-1">
                    {ot.currentProcedure || 'No Active Procedure'}
                  </p>
                </div>

                {ot.leadSurgeon && (
                  <div className="text-[11px] text-slate-600 space-y-0.5 pt-2 border-t border-slate-200">
                    <div>Lead: <strong className="text-slate-900">{ot.leadSurgeon}</strong></div>
                    <div>Anesthesiologist: <strong className="text-slate-900">{ot.anesthesiologist}</strong></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: SURGICAL TIMELINE GANTT CHART */}
      <div className="p-5 rounded-2xl backdrop-blur-md bg-white/80 border border-slate-200 shadow-lg space-y-4">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>Interactive Surgical Timeline & Prep Buffers (Gantt View)</span>
            </h3>
            <p className="text-xs text-slate-500">Auto-calculates 30-min pre-op buffer and 30-min sterilization clean-up.</p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-600">Operating Floor - Block B</span>
        </div>

        {/* Time Grid Hours Header */}
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-10 gap-1 text-[10px] font-mono font-bold text-slate-400 text-center border-b border-slate-200 pb-1">
            <span>08:00 AM</span>
            <span>09:00 AM</span>
            <span>10:00 AM</span>
            <span>11:00 AM</span>
            <span>12:00 PM</span>
            <span>01:00 PM</span>
            <span>02:00 PM</span>
            <span>03:00 PM</span>
            <span>04:00 PM</span>
            <span>05:00 PM</span>
          </div>

          {/* Timeline Slots */}
          {theaters.map((ot) => (
            <div key={ot.id} className="space-y-1">
              <div className="text-xs font-bold text-slate-800 flex justify-between">
                <span>{ot.theaterName}</span>
                <span className="font-mono text-slate-500">{ot.startTime} - {ot.endTime}</span>
              </div>
              <div className="h-7 bg-slate-100 rounded-lg overflow-hidden flex p-0.5 border border-slate-200 relative">
                {/* 30 min Prep Buffer */}
                <div className="w-[10%] bg-amber-200 text-amber-900 text-[9px] font-bold flex items-center justify-center rounded-l">
                  Prep
                </div>
                {/* Main Procedure Block */}
                <div className="flex-1 bg-teal-600 text-white text-[10px] font-black flex items-center justify-center truncate px-2">
                  {ot.currentProcedure}
                </div>
                {/* 30 min Sterilization Buffer */}
                <div className="w-[10%] bg-purple-200 text-purple-900 text-[9px] font-bold flex items-center justify-center rounded-r">
                  Clean
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
