'use client';

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  UserCheck,
  Building2,
  FileCheck,
  ChevronRight,
  Sparkles,
  CheckCircle,
  PlusCircle,
  X,
  Stethoscope,
  Info,
} from 'lucide-react';

export interface RotationPosting {
  id: string;
  department: string;
  unit: string;
  unitHead: string;
  reportingFaculty: string;
  wardLocation: string;
  startDate: string;
  endDate: string;
  durationWeeks: number;
  status: 'ACTIVE' | 'UPCOMING' | 'COMPLETED';
  reportingTime: string;
  requiredLogsCount: number;
  completedLogsCount: number;
  learningObjectives: string[];
}

const ROTATIONS: RotationPosting[] = [
  {
    id: 'rot-101',
    department: 'General Surgery',
    unit: 'Unit II (Surgical Gastroenterology)',
    unitHead: 'Dr. Aris Thorne (HOD Surgery)',
    reportingFaculty: 'Dr. Vikramaditya Rao (Assoc. Prof)',
    wardLocation: 'Surgical Male Ward 3A & OT Complex 2',
    startDate: 'Jul 01, 2026',
    endDate: 'Jul 28, 2026',
    durationWeeks: 4,
    status: 'ACTIVE',
    reportingTime: '08:00 AM - 01:30 PM (Daily)',
    requiredLogsCount: 20,
    completedLogsCount: 16,
    learningObjectives: [
      'Pre-operative checklist validation & surgical scrubbing',
      'Assisting in laparoscopic cholecystectomy & appendectomy',
      'Post-operative wound dressing, suture removal & drain monitoring',
      'Acute abdomen clinical evaluation in emergency triage',
    ],
  },
  {
    id: 'rot-102',
    department: 'Obstetrics & Gynaecology',
    unit: 'Unit I (High Risk Obstetrics)',
    unitHead: 'Dr. Maya Lin (HOD OBG)',
    reportingFaculty: 'Dr. Neha Sharma (Asst. Prof)',
    wardLocation: 'Labor Room Suite & Ante-natal Ward 4B',
    startDate: 'Aug 01, 2026',
    endDate: 'Aug 28, 2026',
    durationWeeks: 4,
    status: 'UPCOMING',
    reportingTime: '08:00 AM - 02:00 PM (Daily)',
    requiredLogsCount: 15,
    completedLogsCount: 0,
    learningObjectives: [
      'Conducting partogram plotting & fetal heart rate auscultation',
      'Assisting in normal vaginal deliveries & episiotomy repair',
      'Antenatal clinic assessment of pre-eclampsia & gestational diabetes',
    ],
  },
  {
    id: 'rot-103',
    department: 'Paediatrics & Neonatology',
    unit: 'Unit III (Paediatric ICU & NICU)',
    unitHead: 'Dr. Rajesh Deshmukh',
    reportingFaculty: 'Dr. Sunita Kapoor',
    wardLocation: 'Paediatric Ward 2 & Level-3 NICU',
    startDate: 'Sep 01, 2026',
    endDate: 'Sep 21, 2026',
    durationWeeks: 3,
    status: 'UPCOMING',
    reportingTime: '08:30 AM - 01:30 PM (Daily)',
    requiredLogsCount: 12,
    completedLogsCount: 0,
    learningObjectives: [
      'APGAR scoring & newborn resuscitation techniques',
      'Growth charting & WHO z-score assessment',
      'Paediatric drug dosage calculation & IV cannulation assistance',
    ],
  },
  {
    id: 'rot-104',
    department: 'General Medicine',
    unit: 'Unit I (Cardio-Respiratory)',
    unitHead: 'Dr. Alan Vance',
    reportingFaculty: 'Dr. Priya Nair',
    wardLocation: 'Medical Ward 5A & ICCU',
    startDate: 'May 01, 2026',
    endDate: 'Jun 28, 2026',
    durationWeeks: 8,
    status: 'COMPLETED',
    reportingTime: '08:00 AM - 01:30 PM (Daily)',
    requiredLogsCount: 30,
    completedLogsCount: 30,
    learningObjectives: [
      'Comprehensive medical history taking & systemic examination',
      'ECG recording & ABG analysis interpretation',
      'Pleural tap & lumbar puncture observation',
    ],
  },
];

export interface ClinicalPostingsModuleProps {
  onQuickLog: (ward: string, faculty: string) => void;
}

export const ClinicalPostingsModule: React.FC<ClinicalPostingsModuleProps> = ({ onQuickLog }) => {
  const [selectedRotation, setSelectedRotation] = useState<RotationPosting | null>(ROTATIONS[0]);
  const [isSlideoutOpen, setIsSlideoutOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'UPCOMING' | 'COMPLETED'>('ALL');

  const filteredRotations = ROTATIONS.filter((r) => {
    if (statusFilter === 'ALL') return true;
    return r.status === statusFilter;
  });

  const activeRotation = ROTATIONS.find((r) => r.status === 'ACTIVE') || ROTATIONS[0];

  return (
    <div className="space-y-5">
      {/* Banner */}
      <div className="erp-card p-4 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow-inner">
              <Stethoscope className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">My Clinical Postings & Hospital Rotations</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                  NMC MSR Roster
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                Spatial Calendar Rotation Timeline • Slide-out Ward Logistics • Direct Quick-Log Integration
              </p>
            </div>
          </div>

          <button
            onClick={() => onQuickLog(activeRotation.wardLocation, activeRotation.reportingFaculty)}
            className="px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Quick-Log Active Ward Procedure</span>
          </button>
        </div>
      </div>

      {/* ACTIVE ROTATION HERO CARD */}
      <div className="erp-card p-4 bg-white border-l-4 border-l-emerald-600 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase tracking-wider">
              NOW ACTIVE ROTATION
            </span>
            <h3 className="text-lg font-black text-slate-900">{activeRotation.department}</h3>
            <span className="text-xs font-bold text-slate-500">({activeRotation.unit})</span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-600 pt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {activeRotation.wardLocation}
            </span>
            <span className="flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> {activeRotation.reportingFaculty}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-600" /> {activeRotation.reportingTime}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 pt-2 md:pt-0 border-slate-200">
          <div className="text-right">
            <div className="text-[10px] text-slate-500 font-bold uppercase">Log Progress</div>
            <div className="text-sm font-black text-slate-900">
              {activeRotation.completedLogsCount} / {activeRotation.requiredLogsCount} Logs
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedRotation(activeRotation);
              setIsSlideoutOpen(true);
            }}
            className="px-3.5 py-2 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all flex items-center gap-1"
          >
            <span>View Full Ward Details</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SPATIAL TIMELINE / ROTATION CALENDAR */}
      <div className="erp-card p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-emerald-600" />
              <span>Interactive Spatial Rotation Calendar & Timeline</span>
            </h3>
            <p className="text-xs text-slate-500">Track current, upcoming, and completed hospital clinical postings.</p>
          </div>

          <div className="flex gap-1 text-xs font-bold bg-slate-100 p-1 rounded-lg">
            {(['ALL', 'ACTIVE', 'UPCOMING', 'COMPLETED'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-md transition-all ${
                  statusFilter === st ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredRotations.map((rot) => {
            const isActive = rot.status === 'ACTIVE';
            const isCompleted = rot.status === 'COMPLETED';

            return (
              <div
                key={rot.id}
                onClick={() => {
                  setSelectedRotation(rot);
                  setIsSlideoutOpen(true);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 relative overflow-hidden ${
                  isActive
                    ? 'border-emerald-500 bg-emerald-50/40 shadow-md ring-2 ring-emerald-500/20'
                    : isCompleted
                    ? 'border-slate-200 bg-slate-50 opacity-90'
                    : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      isActive
                        ? 'bg-emerald-600 text-white'
                        : isCompleted
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {rot.status}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 font-mono">{rot.durationWeeks} Wks</span>
                </div>

                <div>
                  <h4 className="text-sm font-black text-slate-900">{rot.department}</h4>
                  <p className="text-xs text-slate-600 font-medium truncate">{rot.unit}</p>
                </div>

                <div className="space-y-1 text-[11px] text-slate-600 pt-2 border-t border-slate-200/60">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>{rot.startDate} - {rot.endDate}</span>
                  </div>
                  <div className="flex items-center gap-1 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{rot.wardLocation}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-700">
                    {rot.completedLogsCount}/{rot.requiredLogsCount} Logs
                  </span>
                  <span className="text-emerald-700 font-bold flex items-center gap-0.5 text-[11px]">
                    Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SLIDE-OUT MODAL / PANEL FOR POSTING DETAILS */}
      {isSlideoutOpen && selectedRotation && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-end transition-all">
          <div className="w-full max-w-lg bg-white h-full overflow-y-auto p-6 space-y-6 shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-6 h-6 text-emerald-600" />
                <div>
                  <h3 className="text-lg font-black text-slate-900">{selectedRotation.department}</h3>
                  <span className="text-xs font-bold text-slate-500">{selectedRotation.unit}</span>
                </div>
              </div>
              <button
                onClick={() => setIsSlideoutOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Posting Overview Details */}
            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-semibold text-slate-500">Unit Head:</span>
                  <span className="font-extrabold text-slate-900">{selectedRotation.unitHead}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-semibold text-slate-500">Reporting Faculty:</span>
                  <span className="font-extrabold text-slate-900">{selectedRotation.reportingFaculty}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-semibold text-slate-500">Ward Location:</span>
                  <span className="font-extrabold text-slate-900">{selectedRotation.wardLocation}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-semibold text-slate-500">Reporting Time:</span>
                  <span className="font-extrabold text-slate-900">{selectedRotation.reportingTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">Duration:</span>
                  <span className="font-extrabold text-slate-900">
                    {selectedRotation.startDate} - {selectedRotation.endDate} ({selectedRotation.durationWeeks} Weeks)
                  </span>
                </div>
              </div>

              {/* Key Clinical Learning Objectives */}
              <div className="space-y-2">
                <h4 className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Mandatory Clinical Competency Objectives</span>
                </h4>
                <ul className="space-y-2">
                  {selectedRotation.learningObjectives.map((obj, i) => (
                    <li key={i} className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-200/60 flex items-start gap-2 text-slate-800">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-semibold">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Log CTA inside Modal */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <button
                onClick={() => {
                  setIsSlideoutOpen(false);
                  onQuickLog(selectedRotation.wardLocation, selectedRotation.reportingFaculty);
                }}
                className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Log Clinical Entry for this Rotation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
