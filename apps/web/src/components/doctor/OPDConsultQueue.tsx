'use client';

import React, { useState } from 'react';
import {
  Users,
  Clock,
  Activity,
  Heart,
  Thermometer,
  Wind,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Play,
  ArrowRight,
  UserCheck,
  Search,
} from 'lucide-react';

export interface OPDPatient {
  id: string;
  tokenNo: string;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  complaint: string;
  waitTimeMins: number;
  status: 'WAITING' | 'VITALS_DONE' | 'READY_FOR_DOCTOR' | 'IN_CONSULTATION' | 'COMPLETED';
  vitals: {
    bp: string;
    spo2: number;
    temp: number;
    hr: number;
    rr: number;
  };
  avatarUrl: string;
  acuity: 'CRITICAL' | 'URGENT' | 'STABLE';
}

const INITIAL_PATIENTS: OPDPatient[] = [
  {
    id: 'pat-101',
    tokenNo: '#OPD-042',
    name: 'Savitri Devi',
    age: 58,
    gender: 'F',
    complaint: 'Acute retrosternal chest discomfort & mild dyspnea',
    waitTimeMins: 8,
    status: 'READY_FOR_DOCTOR',
    acuity: 'CRITICAL',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    vitals: { bp: '158/96', spo2: 93, temp: 98.4, hr: 108, rr: 22 },
  },
  {
    id: 'pat-102',
    tokenNo: '#OPD-043',
    name: 'Rajesh Shinde',
    age: 42,
    gender: 'M',
    complaint: 'Right lower quadrant abdominal pain for 12 hours',
    waitTimeMins: 14,
    status: 'READY_FOR_DOCTOR',
    acuity: 'URGENT',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    vitals: { bp: '130/84', spo2: 98, temp: 100.2, hr: 88, rr: 18 },
  },
  {
    id: 'pat-103',
    tokenNo: '#OPD-044',
    name: 'Meena Kapoor',
    age: 34,
    gender: 'F',
    complaint: 'Persistent dry cough & low-grade evening fever',
    waitTimeMins: 22,
    status: 'VITALS_DONE',
    acuity: 'STABLE',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    vitals: { bp: '120/78', spo2: 99, temp: 99.1, hr: 76, rr: 16 },
  },
  {
    id: 'pat-104',
    tokenNo: '#OPD-045',
    name: 'Anil Kumar',
    age: 65,
    gender: 'M',
    complaint: 'Routine Post-Op CABG follow-up & BP check',
    waitTimeMins: 30,
    status: 'WAITING',
    acuity: 'STABLE',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    vitals: { bp: '128/82', spo2: 97, temp: 98.6, hr: 72, rr: 15 },
  },
];

export interface OPDConsultQueueProps {
  onSelectPatient?: (patient: OPDPatient) => void;
}

export const OPDConsultQueue: React.FC<OPDConsultQueueProps> = ({ onSelectPatient }) => {
  const [queue, setQueue] = useState<OPDPatient[]>(INITIAL_PATIENTS);
  const [hoveredPatientId, setHoveredPatientId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const advancePatientStatus = (id: string) => {
    setQueue((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          let nextStatus: OPDPatient['status'] = p.status;
          if (p.status === 'WAITING') nextStatus = 'VITALS_DONE';
          else if (p.status === 'VITALS_DONE') nextStatus = 'READY_FOR_DOCTOR';
          else if (p.status === 'READY_FOR_DOCTOR') nextStatus = 'IN_CONSULTATION';
          else if (p.status === 'IN_CONSULTATION') nextStatus = 'COMPLETED';

          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  const filteredQueue = queue.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tokenNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.complaint.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const waitingCount = queue.filter((p) => p.status === 'WAITING').length;
  const readyCount = queue.filter((p) => p.status === 'READY_FOR_DOCTOR' || p.status === 'VITALS_DONE').length;
  const inConsultCount = queue.filter((p) => p.status === 'IN_CONSULTATION').length;

  return (
    <div className="space-y-5 font-sans">
      {/* Apple-Style Glassmorphic Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl border border-white/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-inner backdrop-blur-md">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">OPD Consult Flow Center</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-500/30 text-blue-200 border border-blue-400/40">
                  Zero-Click Vitals Active
                </span>
              </div>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Real-Time Reception Flow Sync • Hover Vitals Inspection • Fluid Motion Queue Swimlanes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
              <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Ready For Consult</div>
              <div className="text-xl font-black text-emerald-400">{readyCount} Patients</div>
            </div>
            <div className="text-right bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
              <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">In Consultation</div>
              <div className="text-xl font-black text-blue-300">{inConsultCount} Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/80 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search patient by Token (#OPD-042), Name, or Chief Complaint..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Reception Desk Live Sync</span>
        </div>
      </div>

      {/* DYNAMIC FLOW QUEUE SWIMLANES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* SWIMLANE 1: READY FOR DOCTOR */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Ready for Doctor ({queue.filter((p) => p.status === 'READY_FOR_DOCTOR').length})</span>
            </h3>
            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">High Priority</span>
          </div>

          <div className="space-y-3">
            {filteredQueue
              .filter((p) => p.status === 'READY_FOR_DOCTOR')
              .map((patient) => (
                <div
                  key={patient.id}
                  onMouseEnter={() => setHoveredPatientId(patient.id)}
                  onMouseLeave={() => setHoveredPatientId(null)}
                  className={`p-4 rounded-2xl transition-all relative overflow-hidden backdrop-blur-md bg-white/80 border shadow-md hover:shadow-xl ${
                    patient.acuity === 'CRITICAL'
                      ? 'border-red-400 ring-2 ring-red-400/20'
                      : 'border-slate-200 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-slate-200 overflow-hidden border border-slate-300 shrink-0">
                        {/* Avatar Image Fallback */}
                        <div className="w-full h-full bg-blue-600 text-white font-black text-sm flex items-center justify-center">
                          {patient.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                      </div>
                      <span
                        className={`absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded text-[9px] font-black text-white ${
                          patient.acuity === 'CRITICAL' ? 'bg-red-600' : 'bg-amber-500'
                        }`}
                      >
                        {patient.acuity}
                      </span>
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-black text-blue-700">{patient.tokenNo}</span>
                        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" /> {patient.waitTimeMins}m wait
                        </span>
                      </div>

                      <h4 className="text-sm font-black text-slate-900 leading-snug">{patient.name}</h4>
                      <p className="text-xs text-slate-500 font-semibold">{patient.age}Y / {patient.gender}</p>
                      <p className="text-xs font-medium text-slate-700 line-clamp-2 pt-0.5">{patient.complaint}</p>
                    </div>
                  </div>

                  {/* ZERO-CLICK VITALS SNAPSHOT HOVER OVERLAY */}
                  {hoveredPatientId === patient.id && (
                    <div className="mt-3 pt-3 border-t border-slate-200/80 bg-blue-50/80 p-3 rounded-xl space-y-2 animate-in fade-in zoom-in-95 duration-150">
                      <div className="flex items-center justify-between text-[11px] font-extrabold text-blue-900">
                        <span className="flex items-center gap-1">
                          <Activity className="w-3.5 h-3.5 text-blue-600" /> Triaged Vitals Snapshot
                        </span>
                        <span className="text-[10px] text-blue-700 font-mono">10 mins ago</span>
                      </div>

                      <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                        <div className="bg-white p-1.5 rounded-lg border border-blue-200">
                          <div className="text-slate-400 font-bold">BP</div>
                          <div className="font-black text-slate-900 font-mono">{patient.vitals.bp}</div>
                        </div>
                        <div className="bg-white p-1.5 rounded-lg border border-blue-200">
                          <div className="text-slate-400 font-bold">SpO2</div>
                          <div className="font-black text-emerald-700 font-mono">{patient.vitals.spo2}%</div>
                        </div>
                        <div className="bg-white p-1.5 rounded-lg border border-blue-200">
                          <div className="text-slate-400 font-bold">TEMP</div>
                          <div className="font-black text-slate-900 font-mono">{patient.vitals.temp}°F</div>
                        </div>
                        <div className="bg-white p-1.5 rounded-lg border border-blue-200">
                          <div className="text-slate-400 font-bold">HR</div>
                          <div className="font-black text-blue-700 font-mono">{patient.vitals.hr} bpm</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action CTA */}
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-bold">Vitals Checked</span>
                    <button
                      onClick={() => advancePatientStatus(patient.id)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center gap-1 transition-all"
                    >
                      <span>Start Consult</span>
                      <Play className="w-3 h-3 fill-current" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* SWIMLANE 2: IN CONSULTATION */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <span>In Consultation ({queue.filter((p) => p.status === 'IN_CONSULTATION').length})</span>
            </h3>
            <span className="text-[10px] font-extrabold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">Active Room</span>
          </div>

          <div className="space-y-3">
            {filteredQueue
              .filter((p) => p.status === 'IN_CONSULTATION')
              .map((patient) => (
                <div
                  key={patient.id}
                  className="p-4 rounded-2xl backdrop-blur-md bg-blue-50/80 border-2 border-blue-500 shadow-lg space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-xs font-black text-blue-800">{patient.tokenNo}</span>
                      <h4 className="text-base font-black text-slate-900">{patient.name}</h4>
                      <p className="text-xs text-slate-600 font-bold">{patient.age}Y / {patient.gender}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase animate-pulse">
                      ON DESK NOW
                    </span>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-blue-200 text-xs font-semibold text-slate-800">
                    {patient.complaint}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => advancePatientStatus(patient.id)}
                      className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Complete Consultation</span>
                    </button>
                  </div>
                </div>
              ))}

            {queue.filter((p) => p.status === 'IN_CONSULTATION').length === 0 && (
              <div className="p-6 rounded-2xl border border-dashed border-slate-300 text-center text-slate-400 text-xs space-y-2">
                <UserCheck className="w-8 h-8 mx-auto text-slate-300" />
                <p className="font-bold text-slate-600">No Patient Currently In Consultation</p>
                <p className="text-[11px]">Click "Start Consult" on any ready patient card.</p>
              </div>
            )}
          </div>
        </div>

        {/* SWIMLANE 3: RECEPTION WAITING / VITALS QUEUE */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              <span>Reception & Vitals Queue ({queue.filter((p) => p.status === 'WAITING' || p.status === 'VITALS_DONE').length})</span>
            </h3>
          </div>

          <div className="space-y-3">
            {filteredQueue
              .filter((p) => p.status === 'WAITING' || p.status === 'VITALS_DONE')
              .map((patient) => (
                <div
                  key={patient.id}
                  className="p-3.5 rounded-2xl backdrop-blur-md bg-white/70 border border-slate-200 hover:border-slate-300 transition-all space-y-2"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono font-bold text-slate-500">{patient.tokenNo}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-100 text-slate-700">
                      {patient.status === 'WAITING' ? 'Awaiting Vitals' : 'Vitals Done'}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-slate-900">{patient.name} ({patient.age}Y)</h4>
                    <p className="text-[11px] text-slate-500 font-medium truncate">{patient.complaint}</p>
                  </div>

                  <div className="flex justify-between items-center pt-1 border-t border-slate-100 text-[11px]">
                    <span className="text-slate-400 font-bold">{patient.waitTimeMins} mins wait</span>
                    <button
                      onClick={() => advancePatientStatus(patient.id)}
                      className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-0.5"
                    >
                      Advance Status <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
