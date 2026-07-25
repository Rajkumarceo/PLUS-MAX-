'use client';

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  ArrowLeftRight,
  FileText,
  CheckCircle,
  Clock3,
  UserCheck,
  Building,
  Plus,
  Send,
  Sparkles,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export interface ShiftEvent {
  id: string;
  date: string;
  title: string;
  type: 'CLINICAL_SHIFT' | 'LECTURE' | 'OT_DUTY' | 'ON_CALL_NIGHT';
  time: string;
  location: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'SWAP_REQUESTED';
}

const INITIAL_SHIFTS: ShiftEvent[] = [
  { id: 'sh-101', date: 'Jul 25, 2026', title: 'Emergency Surgery Ward Round & OPD', type: 'CLINICAL_SHIFT', time: '08:00 AM - 04:00 PM', location: 'Surgical OPD & Ward 3A', status: 'SCHEDULED' },
  { id: 'sh-102', date: 'Jul 26, 2026', title: 'Phase 3 MBBS Lecture: Acute Abdomen Diagnosis', type: 'LECTURE', time: '11:00 AM - 12:00 PM', location: 'Lecture Hall 2 (Main Academic Building)', status: 'SCHEDULED' },
  { id: 'sh-103', date: 'Jul 27, 2026', title: 'Laparoscopic Cholecystectomy Surgery OT List', type: 'OT_DUTY', time: '08:30 AM - 02:00 PM', location: 'Major OT Suite 3', status: 'SCHEDULED' },
  { id: 'sh-104', date: 'Jul 28, 2026', title: 'Trauma & Emergency On-Call Night Duty', type: 'ON_CALL_NIGHT', time: '08:00 PM - 08:00 AM', location: 'Casualty Emergency Triage', status: 'SCHEDULED' },
];

export interface SwapRequest {
  id: string;
  requestedDuty: string;
  originalDate: string;
  colleagueName: string;
  proposedDate: string;
  reason: string;
  status: 'PENDING_HOD' | 'APPROVED' | 'REJECTED';
}

const INITIAL_SWAPS: SwapRequest[] = [
  { id: 'SWP-902', requestedDuty: 'On-Call Night Duty (Jul 28)', originalDate: 'Jul 28, 2026', colleagueName: 'Dr. Neha Sharma (Assoc. Prof)', proposedDate: 'Aug 02, 2026', reason: 'Medical conference attendance in Mumbai', status: 'PENDING_HOD' },
];

export interface LeaveRecord {
  id: string;
  leaveType: 'CASUAL' | 'EARNED' | 'CONFERENCE';
  startDate: string;
  endDate: string;
  daysCount: number;
  reason: string;
  status: 'APPROVED' | 'PENDING_HOD' | 'REJECTED';
}

const INITIAL_LEAVES: LeaveRecord[] = [
  { id: 'LV-8801', leaveType: 'CONFERENCE', startDate: 'Aug 05, 2026', endDate: 'Aug 07, 2026', daysCount: 3, reason: 'National Surgical Oncology Summit Presentation', status: 'APPROVED' },
  { id: 'LV-8802', leaveType: 'CASUAL', startDate: 'Aug 14, 2026', endDate: 'Aug 14, 2026', daysCount: 1, reason: 'Personal family event', status: 'PENDING_HOD' },
];

export const ShiftRosterModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'swap' | 'leave'>('timeline');
  const [shifts, setShifts] = useState<ShiftEvent[]>(INITIAL_SHIFTS);
  const [swaps, setSwaps] = useState<SwapRequest[]>(INITIAL_SWAPS);
  const [leaves, setLeaves] = useState<LeaveRecord[]>(INITIAL_LEAVES);

  // Shift Swap Form State
  const [selectedShiftToSwap, setSelectedShiftToSwap] = useState(INITIAL_SHIFTS[3].id);
  const [targetColleague, setTargetColleague] = useState('Dr. Neha Sharma (Assoc. Prof)');
  const [proposedTradeDate, setProposedTradeDate] = useState('2026-08-02');
  const [swapReason, setSwapReason] = useState('Academic conference duty');

  // Leave Form State
  const [leaveType, setLeaveType] = useState<'CASUAL' | 'EARNED' | 'CONFERENCE'>('CASUAL');
  const [leaveStart, setLeaveStart] = useState('2026-08-14');
  const [leaveEnd, setLeaveEnd] = useState('2026-08-14');
  const [leaveReasonText, setLeaveReasonText] = useState('');

  const handleProposeSwap = (e: React.FormEvent) => {
    e.preventDefault();
    const shift = shifts.find((s) => s.id === selectedShiftToSwap);
    if (!shift) return;

    const newSwap: SwapRequest = {
      id: `SWP-${Math.floor(900 + Math.random() * 100)}`,
      requestedDuty: `${shift.title} (${shift.date})`,
      originalDate: shift.date,
      colleagueName: targetColleague,
      proposedDate: proposedTradeDate,
      reason: swapReason,
      status: 'PENDING_HOD',
    };

    setSwaps([newSwap, ...swaps]);
    alert('Shift Swap Request submitted to HOD Approval Queue!');
  };

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveReasonText.trim()) return;

    const newLeave: LeaveRecord = {
      id: `LV-${Math.floor(8800 + Math.random() * 100)}`,
      leaveType: leaveType,
      startDate: leaveStart,
      endDate: leaveEnd,
      daysCount: 1,
      reason: leaveReasonText,
      status: 'PENDING_HOD',
    };

    setLeaves([newLeave, ...leaves]);
    setLeaveReasonText('');
    alert('Leave Application submitted to Department Head!');
  };

  return (
    <div className="space-y-5">
      {/* Banner */}
      <div className="erp-card p-4 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-inner">
              <CalendarIcon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">Faculty Shift Roster & Leave Portal</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/40">
                  HR & Roster Engine
                </span>
              </div>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Interactive Schedule Timeline • Shift Swap Marketplace • Automated HOD Leave Approval Workflow
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right bg-white/10 px-3.5 py-1.5 rounded-lg border border-white/10">
              <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Casual Leave Balance</div>
              <div className="text-lg font-black text-emerald-400">8 Days</div>
            </div>
            <div className="text-right bg-white/10 px-3.5 py-1.5 rounded-lg border border-white/10">
              <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Earned Leave Balance</div>
              <div className="text-lg font-black text-white">12 Days</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/10 text-xs font-bold">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeTab === 'timeline'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white/10 text-blue-100 hover:bg-white/20'
            }`}
          >
            <Clock3 className="w-4 h-4" />
            <span>Interactive Duty Timeline</span>
          </button>
          <button
            onClick={() => setActiveTab('swap')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeTab === 'swap'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white/10 text-blue-100 hover:bg-white/20'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>Shift Swap Marketplace ({swaps.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('leave')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeTab === 'leave'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white/10 text-blue-100 hover:bg-white/20'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Leave Management ({leaves.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE DUTY TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="erp-card p-4 space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Faculty Weekly Roster Schedule</h3>
              <p className="text-xs text-slate-500">Includes clinical shifts, lectures, OT duties, and emergency on-call shifts.</p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-600">Department of General Surgery</span>
          </div>

          <div className="space-y-3">
            {shifts.map((sh) => {
              const isNight = sh.type === 'ON_CALL_NIGHT';
              const isLecture = sh.type === 'LECTURE';
              const isOT = sh.type === 'OT_DUTY';

              return (
                <div
                  key={sh.id}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-all ${
                    isNight
                      ? 'bg-purple-50/60 border-purple-200'
                      : isLecture
                      ? 'bg-blue-50/60 border-blue-200'
                      : isOT
                      ? 'bg-teal-50/60 border-teal-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-extrabold text-slate-500">{sh.date}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          isNight
                            ? 'bg-purple-600 text-white'
                            : isLecture
                            ? 'bg-blue-600 text-white'
                            : isOT
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-700 text-white'
                        }`}
                      >
                        {sh.type.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-slate-900">{sh.title}</h4>
                    <div className="flex items-center gap-4 text-xs text-slate-600 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" /> {sh.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-slate-500" /> {sh.location}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedShiftToSwap(sh.id);
                      setActiveTab('swap');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold shadow-sm flex items-center gap-1"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5 text-blue-600" />
                    <span>Request Trade</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: SHIFT SWAP MARKETPLACE */}
      {activeTab === 'swap' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 erp-card p-5 space-y-4">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <ArrowLeftRight className="w-5 h-5 text-blue-600" />
                  <span>Propose Shift Trade Request</span>
                </h3>
                <p className="text-xs text-slate-500">Automated HOD routing & colleague notification.</p>
              </div>
            </div>

            <form onSubmit={handleProposeSwap} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Shift to Trade Away</label>
                <select
                  value={selectedShiftToSwap}
                  onChange={(e) => setSelectedShiftToSwap(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  {shifts.map((s) => (
                    <option key={s.id} value={s.id}>
                      [{s.date}] {s.title} ({s.time})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Colleague to Swap With</label>
                <select
                  value={targetColleague}
                  onChange={(e) => setTargetColleague(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="Dr. Neha Sharma (Assoc. Prof)">Dr. Neha Sharma (Assoc. Prof Surgery)</option>
                  <option value="Dr. Vikramaditya Rao (Asst. Prof)">Dr. Vikramaditya Rao (Asst. Prof Surgery)</option>
                  <option value="Dr. Priya Nair (Sr. Resident)">Dr. Priya Nair (Sr. Resident Surgery)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Proposed Trade Date</label>
                <input
                  type="date"
                  value={proposedTradeDate}
                  onChange={(e) => setProposedTradeDate(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 font-mono text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Reason for Shift Swap</label>
                <input
                  type="text"
                  required
                  value={swapReason}
                  onChange={(e) => setSwapReason(e.target.value)}
                  placeholder="e.g. Attending national medical conference / emergency leave..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-black shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Trade Proposal to HOD Routing</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 erp-card p-5 space-y-4">
            <h4 className="font-black text-slate-900 text-sm border-b border-slate-200 pb-2">
              Your Active Shift Swap Requests
            </h4>

            <div className="space-y-3">
              {swaps.map((swp) => (
                <div key={swp.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-extrabold text-blue-700">{swp.id}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">
                      {swp.status}
                    </span>
                  </div>

                  <div className="text-slate-900 font-bold">{swp.requestedDuty}</div>
                  <div className="text-slate-600">Trading with: <strong>{swp.colleagueName}</strong></div>
                  <div className="text-[11px] text-slate-500 font-mono">Proposed Trade: {swp.proposedDate}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LEAVE MANAGEMENT */}
      {activeTab === 'leave' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 erp-card p-5 space-y-4">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <span>Faculty Leave Application Portal</span>
                </h3>
                <p className="text-xs text-slate-500">Submit CL, EL, or Conference Duty leave requests.</p>
              </div>
            </div>

            <form onSubmit={handleApplyLeave} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Leave Category</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 font-bold text-slate-900"
                >
                  <option value="CASUAL">Casual Leave (CL)</option>
                  <option value="EARNED">Earned Leave (EL)</option>
                  <option value="CONFERENCE">Academic Conference Duty Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Start Date</label>
                  <input
                    type="date"
                    value={leaveStart}
                    onChange={(e) => setLeaveStart(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 font-mono text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">End Date</label>
                  <input
                    type="date"
                    value={leaveEnd}
                    onChange={(e) => setLeaveEnd(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 font-mono text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Reason for Leave & Station Address</label>
                <textarea
                  rows={3}
                  required
                  value={leaveReasonText}
                  onChange={(e) => setLeaveReasonText(e.target.value)}
                  placeholder="State reason for leave and out-of-station contact details..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-black shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Leave Application to HOD Approval</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 erp-card p-5 space-y-4">
            <h4 className="font-black text-slate-900 text-sm border-b border-slate-200 pb-2">
              Leave History & Approval Status
            </h4>

            <div className="space-y-3">
              {leaves.map((l) => (
                <div key={l.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-purple-700">{l.id} - {l.leaveType}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black ${
                        l.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {l.status}
                    </span>
                  </div>

                  <div className="text-slate-900 font-bold">
                    {l.startDate} - {l.endDate} ({l.daysCount} Day)
                  </div>
                  <p className="text-slate-600">{l.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
