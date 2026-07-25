'use client';

import React, { useState } from 'react';
import {
  Stethoscope,
  Users,
  BrainCircuit,
  Building2,
  Pill,
  ShieldCheck,
  LayoutDashboard,
} from 'lucide-react';
import { OPDConsultQueue } from '@/components/doctor/OPDConsultQueue';
import { AITriageModule } from '@/components/doctor/AITriageModule';
import { OTSurgerySchedule } from '@/components/doctor/OTSurgerySchedule';
import { PrescriptionWriter } from '@/components/doctor/PrescriptionWriter';

export const DoctorDashboardView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'queue' | 'triage' | 'ot' | 'rx'>('overview');

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="erp-card p-4 bg-white border-l-4 border-l-blue-600 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-blue-50 text-blue-700 flex items-center justify-center font-extrabold">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900">Doctor EMR & Clinical Portal</h1>
            <p className="text-xs text-slate-500">
              Apple-Style Glassmorphism • WebGPU 3D Triage • OT Spatial Timeline • E-Prescription Safety Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200 font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Active OPD Duty Context (Dr. Aris Thorne - HOD Surgery)</span>
        </div>
      </div>

      {/* Navigation Bar for Doctor Modules */}
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
            onClick={() => setActiveTab('queue')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'queue'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-blue-500" />
            <span>1. OPD Consult Queue</span>
          </button>

          <button
            onClick={() => setActiveTab('triage')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'triage'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BrainCircuit className="w-4 h-4 text-purple-500" />
            <span>2. AI Clinical Triage & 3D Anatomy</span>
          </button>

          <button
            onClick={() => setActiveTab('ot')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'ot'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-teal-500" />
            <span>3. OT Surgery Schedule</span>
          </button>

          <button
            onClick={() => setActiveTab('rx')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'rx'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Pill className="w-4 h-4 text-indigo-500" />
            <span>4. Prescription Writer</span>
          </button>
        </div>
      </div>

      {/* RENDER MODULES */}
      {activeTab === 'queue' && <OPDConsultQueue />}

      {activeTab === 'triage' && <AITriageModule />}

      {activeTab === 'ot' && <OTSurgerySchedule />}

      {activeTab === 'rx' && <PrescriptionWriter />}

      {/* OVERVIEW DEFAULT */}
      {activeTab === 'overview' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => setActiveTab('queue')}
              className="erp-card p-4 space-y-1 cursor-pointer hover:border-blue-500 transition-all"
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase flex justify-between">
                <span>OPD Waiting Flow</span>
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">4 Patients</div>
              <div className="text-[11px] text-emerald-700 font-bold">1 Ready For Consult</div>
            </div>

            <div
              onClick={() => setActiveTab('triage')}
              className="erp-card p-4 space-y-1 cursor-pointer hover:border-purple-500 transition-all"
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase flex justify-between">
                <span>AI 3D Triage</span>
                <BrainCircuit className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-sm font-extrabold text-purple-700">WebGPU 360° View</div>
              <div className="text-[11px] text-slate-500 font-medium">ESI Acuity Level 1 Active</div>
            </div>

            <div
              onClick={() => setActiveTab('ot')}
              className="erp-card p-4 space-y-1 cursor-pointer hover:border-teal-500 transition-all"
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase flex justify-between">
                <span>Operating Floor</span>
                <Building2 className="w-4 h-4 text-teal-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">OT 1 Active</div>
              <div className="text-[11px] text-slate-500 font-medium">CABG Off-Pump Surgery</div>
            </div>

            <div
              onClick={() => setActiveTab('rx')}
              className="erp-card p-4 space-y-1 cursor-pointer hover:border-indigo-500 transition-all"
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase flex justify-between">
                <span>Prescription Guard</span>
                <Pill className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-sm font-extrabold text-indigo-700">Hard-Stop Alert Active</div>
              <div className="text-[11px] text-slate-500 font-medium">Penicillin Allergy Guarded</div>
            </div>
          </div>

          {/* Quick Entry Buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="erp-card p-4 space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>OPD Patient Flow Command Center</span>
              </h3>
              <p className="text-xs text-slate-500">Frosted glass smart cards with zero-click vitals snapshot on hover.</p>
              <button
                onClick={() => setActiveTab('queue')}
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm"
              >
                Open OPD Consult Queue
              </button>
            </div>

            <div className="erp-card p-4 space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Pill className="w-4 h-4 text-indigo-600" />
                <span>E-Prescription Writer & Safety Engine</span>
              </h3>
              <p className="text-xs text-slate-500">Intelligent Drug Autocomplete & Digital Pharmacy Hand-off.</p>
              <button
                onClick={() => setActiveTab('rx')}
                className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-sm"
              >
                Open Prescription Writer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
