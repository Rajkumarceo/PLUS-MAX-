'use client';

import React, { useState } from 'react';
import {
  Bed,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  Sparkles,
  Zap,
  TrendingUp,
} from 'lucide-react';

export interface TenantQuota {
  id: string;
  tenantName: string;
  licensedBeds: number;
  occupiedBeds: number;
  features: {
    aiTriage: boolean;
    spatialOT: boolean;
    advancedLIS: boolean;
    gstPos: boolean;
  };
}

const INITIAL_QUOTAS: TenantQuota[] = [
  {
    id: 'q-1',
    tenantName: 'City Super Specialty Hospital',
    licensedBeds: 250,
    occupiedBeds: 232, // 92.8% -> SOFT ENFORCEMENT (FROSTED AMBER WARNING)
    features: { aiTriage: true, spatialOT: true, advancedLIS: true, gstPos: true },
  },
  {
    id: 'q-2',
    tenantName: 'Apex Heart Institute',
    licensedBeds: 100,
    occupiedBeds: 100, // 100% -> HARD ENFORCEMENT (HARD-STOP ADMISSION BLOCK)
    features: { aiTriage: true, spatialOT: true, advancedLIS: false, gstPos: true },
  },
  {
    id: 'q-3',
    tenantName: 'Metro Children\'s Clinic',
    licensedBeds: 50,
    occupiedBeds: 28, // 56% -> OPTIMAL HEALTHY
    features: { aiTriage: false, spatialOT: false, advancedLIS: true, gstPos: true },
  },
];

export const BedQuotaLicensingModule: React.FC = () => {
  const [quotas, setQuotas] = useState<TenantQuota[]>(INITIAL_QUOTAS);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleToggleFeature = (tenantId: string, featureKey: keyof TenantQuota['features']) => {
    setQuotas((prev) =>
      prev.map((q) => {
        if (q.id === tenantId) {
          const updatedFeatures = { ...q.features, [featureKey]: !q.features[featureKey] };
          return { ...q, features: updatedFeatures };
        }
        return q;
      })
    );

    setToastMsg('Feature Flag Toggled! Updated tenant module entitlements.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleUpgradeLicense = (tenantId: string) => {
    setQuotas((prev) =>
      prev.map((q) => (q.id === tenantId ? { ...q, licensedBeds: q.licensedBeds + 50 } : q))
    );
    setToastMsg('License Capacity Upgraded +50 Beds!');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-5 font-sans">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white shadow-xl border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow-inner backdrop-blur-md">
              <Bed className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">Bed Quota Licensing & Feature Flag Control</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                  SaaS Revenue & Resource Enforcement
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                Capacity Radial Progress Rings • Soft (90%) Frosted Amber & Hard (100%) Admission Block • Modular Feature Flags
              </p>
            </div>
          </div>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-600 text-white rounded-lg shadow-lg flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* TENANT BED QUOTA CARDS WITH RADIAL PROGRESS RINGS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {quotas.map((q) => {
          const usagePct = Math.min(100, Math.round((q.occupiedBeds / q.licensedBeds) * 100));
          const isHardBlock = usagePct >= 100;
          const isSoftAmber = usagePct >= 90 && !isHardBlock;

          // SVG Radial Progress Calculations
          const radius = 32;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - (usagePct / 100) * circumference;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-2xl border transition-all space-y-4 backdrop-blur-md ${
                isHardBlock
                  ? 'bg-red-600/10 border-red-500 shadow-lg shadow-red-500/20 ring-2 ring-red-500/30'
                  : isSoftAmber
                  ? 'bg-amber-500/10 border-amber-400 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/30'
                  : 'bg-white/80 border-slate-200 shadow-md'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-black text-slate-900">{q.tenantName}</h3>
                  <p className="text-xs text-slate-500">Licensed Quota: {q.licensedBeds} Beds</p>
                </div>

                {/* SLEEK SVG RADIAL PROGRESS RING */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r={radius}
                      className="stroke-slate-200"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r={radius}
                      className={`transition-all duration-500 ${
                        isHardBlock
                          ? 'stroke-red-600'
                          : isSoftAmber
                          ? 'stroke-amber-500'
                          : 'stroke-emerald-600'
                      }`}
                      strokeWidth="6"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <span className="absolute font-mono font-black text-xs text-slate-900">{usagePct}%</span>
                </div>
              </div>

              {/* ENFORCEMENT STATE BADGES */}
              {isHardBlock ? (
                <div className="p-2.5 bg-red-600 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-sm animate-pulse">
                  <Lock className="w-4 h-4 text-white shrink-0" />
                  <span>HARD-STOP ENFORCEMENT: 100% Capacity! Admission Blocked in EMR.</span>
                </div>
              ) : isSoftAmber ? (
                <div className="p-2.5 bg-amber-500 text-slate-950 rounded-xl text-xs font-black flex items-center gap-2 shadow-sm">
                  <AlertTriangle className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>SOFT ENFORCEMENT: &gt;90% Capacity. Upgrade notice sent.</span>
                </div>
              ) : (
                <div className="p-2 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Optimal Capacity ({q.occupiedBeds} / {q.licensedBeds} Beds Occupied)</span>
                </div>
              )}

              {/* MODULAR FEATURE FLAG TOGGLES */}
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">Premium Feature Flag Toggles</div>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    onClick={() => handleToggleFeature(q.id, 'aiTriage')}
                    className={`p-2 rounded-lg border text-left flex justify-between items-center transition-all ${
                      q.features.aiTriage ? 'bg-purple-50 text-purple-900 border-purple-300' : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    <span>AI 3D Triage</span>
                    {q.features.aiTriage ? <ToggleRight className="w-5 h-5 text-purple-600" /> : <ToggleLeft className="w-5 h-5 text-slate-300" />}
                  </button>

                  <button
                    onClick={() => handleToggleFeature(q.id, 'spatialOT')}
                    className={`p-2 rounded-lg border text-left flex justify-between items-center transition-all ${
                      q.features.spatialOT ? 'bg-teal-50 text-teal-900 border-teal-300' : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    <span>Spatial OT</span>
                    {q.features.spatialOT ? <ToggleRight className="w-5 h-5 text-teal-600" /> : <ToggleLeft className="w-5 h-5 text-slate-300" />}
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleUpgradeLicense(q.id)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Upgrade License (+50 Beds)</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
