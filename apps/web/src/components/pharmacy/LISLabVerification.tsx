'use client';

import React, { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Cpu,
  Sliders,
  ShieldCheck,
  Check,
  Sparkles,
  RefreshCcw,
  Search,
} from 'lucide-react';

export interface LabSample {
  id: string;
  sampleBarcode: string;
  patientName: string;
  patientAgeGender: string;
  analyzerMachine: string;
  testName: string;
  parameters: {
    name: string;
    value: number;
    unit: string;
    refRange: string;
    isAbnormal: boolean;
    flag: 'NORMAL' | 'HIGH' | 'CRITICAL_LOW' | 'CRITICAL_HIGH';
  }[];
  status: 'PENDING_VALIDATION' | 'AUTHORIZED';
  authorizedBy?: string;
  authTimestamp?: string;
}

const INITIAL_SAMPLES: LabSample[] = [
  {
    id: 'smp-101',
    sampleBarcode: 'SMP-HEM-98210',
    patientName: 'Savitri Devi',
    patientAgeGender: '58Y / Female',
    analyzerMachine: 'Sysmex XN-1000 Automated Hematology Analyzer',
    testName: 'Complete Blood Count (CBC) with Differential',
    parameters: [
      { name: 'Hemoglobin (Hb)', value: 8.2, unit: 'g/dL', refRange: '12.0 - 16.0', isAbnormal: true, flag: 'CRITICAL_LOW' },
      { name: 'Total WBC Count', value: 14500, unit: '/uL', refRange: '4,000 - 11,000', isAbnormal: true, flag: 'HIGH' },
      { name: 'Platelet Count', value: 245000, unit: '/uL', refRange: '150,000 - 450,000', isAbnormal: false, flag: 'NORMAL' },
      { name: 'Hematocrit (PCV)', value: 26.5, unit: '%', refRange: '36.0 - 46.0', isAbnormal: true, flag: 'CRITICAL_LOW' },
    ],
    status: 'PENDING_VALIDATION',
  },
  {
    id: 'smp-102',
    sampleBarcode: 'SMP-BIO-98211',
    patientName: 'Rajesh Shinde',
    patientAgeGender: '42Y / Male',
    analyzerMachine: 'Roche Cobas 6000 Clinical Chemistry Analyzer',
    testName: 'Serum Electrolytes & Renal Function Panel',
    parameters: [
      { name: 'Serum Creatinine', value: 1.1, unit: 'mg/dL', refRange: '0.7 - 1.3', isAbnormal: false, flag: 'NORMAL' },
      { name: 'Blood Urea Nitrogen (BUN)', value: 14, unit: 'mg/dL', refRange: '7.0 - 20.0', isAbnormal: false, flag: 'NORMAL' },
      { name: 'Serum Sodium (Na+)', value: 138, unit: 'mEq/L', refRange: '135 - 145', isAbnormal: false, flag: 'NORMAL' },
      { name: 'Serum Potassium (K+)', value: 4.2, unit: 'mEq/L', refRange: '3.5 - 5.1', isAbnormal: false, flag: 'NORMAL' },
    ],
    status: 'PENDING_VALIDATION',
  },
];

export const LISLabVerification: React.FC = () => {
  const [samples, setSamples] = useState<LabSample[]>(INITIAL_SAMPLES);
  const [selectedSample, setSelectedSample] = useState<LabSample>(INITIAL_SAMPLES[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAuthorizeSingle = (id: string) => {
    setSamples((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: 'AUTHORIZED',
              authorizedBy: 'Dr. Sunita Kapoor (Lead Pathologist)',
              authTimestamp: 'Jul 25, 2026 11:20 AM',
            }
          : s
      )
    );

    setToastMessage(`Lab Sample [${selectedSample.sampleBarcode}] Authorized & Pushed to Doctor EMR!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleBatchAuthorizeNormals = () => {
    setSamples((prev) =>
      prev.map((s) => {
        const hasCritical = s.parameters.some((p) => p.isAbnormal);
        if (!hasCritical && s.status === 'PENDING_VALIDATION') {
          return {
            ...s,
            status: 'AUTHORIZED',
            authorizedBy: 'Dr. Sunita Kapoor (Lead Pathologist)',
            authTimestamp: 'Jul 25, 2026 11:20 AM',
          };
        }
        return s;
      })
    );

    setToastMessage('Batch Authorized all normal lab samples!');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const pendingCount = samples.filter((s) => s.status === 'PENDING_VALIDATION').length;

  return (
    <div className="space-y-5 font-sans">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-inner backdrop-blur-md">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">LIS Machine Analyzer Verification Engine</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-500/30 text-blue-200 border border-blue-400/40">
                  Bi-Directional Analyzer Sync
                </span>
              </div>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Automated Machine Analyzer Ingestion • Split-Screen Dual-Pane Validation UI • Pathologist Anomaly Flagging
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleBatchAuthorizeNormals}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Batch Authorize Normal Results</span>
            </button>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-600 text-white rounded-lg shadow-lg flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SPLIT-SCREEN DUAL-PANE VALIDATION UI GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT PANE: ANALYZER QUEUE & SAMPLE SELECTION */}
        <div className="lg:col-span-5 p-5 rounded-2xl backdrop-blur-md bg-white/80 border border-slate-200 shadow-lg space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-600" />
              <h3 className="text-xs font-black uppercase text-slate-900">Analyzer Queue ({pendingCount} Pending)</h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
              Machine Sync Active
            </span>
          </div>

          <div className="space-y-3">
            {samples.map((smp) => {
              const isSelected = selectedSample.id === smp.id;
              const hasAnomaly = smp.parameters.some((p) => p.isAbnormal);

              return (
                <div
                  key={smp.id}
                  onClick={() => setSelectedSample(smp)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                      : 'bg-slate-50 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono font-black text-blue-700">{smp.sampleBarcode}</span>
                    {hasAnomaly && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-red-100 text-red-800 border border-red-200">
                        ANOMALY FLAGGED
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-slate-900">{smp.patientName} ({smp.patientAgeGender})</h4>
                    <p className="text-xs text-slate-600 font-bold">{smp.testName}</p>
                    <p className="text-[10px] text-slate-400 font-mono truncate">{smp.analyzerMachine}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANE: DUAL-PANE RAW MACHINE DATA VS REFERENCE RANGES */}
        <div className="lg:col-span-7 p-5 rounded-2xl backdrop-blur-md bg-white/80 border border-slate-200 shadow-lg space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-blue-700 tracking-wider">Pathologist Verification Pane</span>
              <h3 className="text-base font-black text-slate-900">{selectedSample.testName}</h3>
            </div>
            {selectedSample.status === 'AUTHORIZED' ? (
              <span className="erp-badge-green text-xs flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Authorized by Pathologist
              </span>
            ) : (
              <span className="erp-badge-blue text-xs flex items-center gap-1">
                <Activity className="w-4 h-4 text-blue-600" /> Awaiting Pathologist E-Sign
              </span>
            )}
          </div>

          {/* DUAL PANE COMPARISON TABLE */}
          <div className="overflow-x-auto">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Test Parameter</th>
                  <th>Raw Machine Result</th>
                  <th>Biological Ref Range</th>
                  <th>Anomaly Flag</th>
                </tr>
              </thead>
              <tbody>
                {selectedSample.parameters.map((param, idx) => (
                  <tr
                    key={idx}
                    className={`transition-all ${
                      param.isAbnormal ? 'bg-red-50/80 font-bold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="font-extrabold text-slate-900 text-xs">{param.name}</td>
                    <td className="font-mono text-sm font-black">
                      <span className={param.isAbnormal ? 'text-red-600' : 'text-slate-900'}>
                        {param.value} {param.unit}
                      </span>
                    </td>
                    <td className="font-mono text-xs font-bold text-slate-500">{param.refRange} {param.unit}</td>
                    <td>
                      {param.isAbnormal ? (
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-red-600 text-white shadow-sm flex items-center gap-1 w-fit animate-pulse">
                          <AlertTriangle className="w-3 h-3" /> {param.flag}
                        </span>
                      ) : (
                        <span className="erp-badge-green text-[10px] flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> NORMAL
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* AUTHORIZE CTA */}
          {selectedSample.status === 'PENDING_VALIDATION' && (
            <div className="pt-3 border-t border-slate-200">
              <button
                onClick={() => handleAuthorizeSingle(selectedSample.id)}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Authorize & Push Results to Doctor EMR</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
