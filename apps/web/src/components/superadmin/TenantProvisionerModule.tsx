'use client';

import React, { useState } from 'react';
import {
  Building2,
  Database,
  CheckCircle2,
  Sparkles,
  Layers,
  Globe,
  ShieldCheck,
  Server,
  Plus,
  RefreshCw,
  Cpu,
  FileCheck,
} from 'lucide-react';

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  specialty: string;
  region: string;
  schemaId: string;
  status: 'ACTIVE' | 'PROVISIONING' | 'SUSPENDED';
  licensedBeds: number;
  createdAt: string;
  seedDataInjected: boolean;
}

const INITIAL_TENANTS: Tenant[] = [
  {
    id: 't-101',
    name: 'City Super Specialty Hospital',
    subdomain: 'cityhospital',
    specialty: 'Multispecialty & Trauma',
    region: 'Maharashtra (ABDM Certified)',
    schemaId: 'tenant_schema_cityhospital_mumbai',
    status: 'ACTIVE',
    licensedBeds: 250,
    createdAt: 'Jul 12, 2026',
    seedDataInjected: true,
  },
  {
    id: 't-102',
    name: 'Apex Heart & Vascular Institute',
    subdomain: 'apexheart',
    specialty: 'Cardiothoracic Surgery',
    region: 'Gujarat (NABH Accredited)',
    schemaId: 'tenant_schema_apexheart_ahmedabad',
    status: 'ACTIVE',
    licensedBeds: 100,
    createdAt: 'Jul 20, 2026',
    seedDataInjected: true,
  },
];

export const TenantProvisionerModule: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>(INITIAL_TENANTS);

  // Setup Wizard State
  const [showWizard, setShowWizard] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [hospitalName, setHospitalName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [specialty, setSpecialty] = useState('Multispecialty');
  const [region, setRegion] = useState('Maharashtra (ABDM Certified)');
  const [licensedBeds, setLicensedBeds] = useState(150);

  const [provisioningProgress, setProvisioningProgress] = useState(0);
  const [isProvisioning, setIsProvisioning] = useState(false);

  const handleStartProvisioning = () => {
    if (!hospitalName.trim() || !subdomain.trim()) return;
    setStep(3);
    setIsProvisioning(true);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      setProvisioningProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setIsProvisioning(false);

        const newTenant: Tenant = {
          id: `t-${Date.now()}`,
          name: hospitalName,
          subdomain,
          specialty,
          region,
          schemaId: `tenant_schema_${subdomain.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
          status: 'ACTIVE',
          licensedBeds,
          createdAt: 'Jul 25, 2026',
          seedDataInjected: true,
        };

        setTenants([newTenant, ...tenants]);
      }
    }, 800);
  };

  const resetWizard = () => {
    setShowWizard(false);
    setStep(1);
    setHospitalName('');
    setSubdomain('');
    setProvisioningProgress(0);
  };

  return (
    <div className="space-y-5 font-sans">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400/30 flex items-center justify-center text-red-300 shadow-inner backdrop-blur-md">
              <Database className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">Automated Tenant Provisioner & Schema Engine</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-red-500/30 text-red-200 border border-red-400/40">
                  Zero Data Bleed Isolation
                </span>
              </div>
              <p className="text-xs text-red-200/80 mt-0.5">
                Isolated Schema Deployment • Frosted-Glass Setup Wizard • Automated ICD-10 & Med Dictionary Seeding
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowWizard(true)}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-lg transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Provision New Hospital Tenant</span>
            </button>
          </div>
        </div>
      </div>

      {/* PROVISIONED TENANTS ROSTER */}
      <div className="erp-card p-4 space-y-4">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900">Provisioned Multi-Tenant Infrastructure Roster</h3>
            <p className="text-xs text-slate-500">Isolated database schemas running on global multi-region cloud cluster.</p>
          </div>
          <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-black">
            {tenants.length} Tenants Online
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="erp-table">
            <thead>
              <tr>
                <th>Hospital Network</th>
                <th>Subdomain & Route</th>
                <th>Isolated Database Schema</th>
                <th>Specialty & Region</th>
                <th>Licensed Beds</th>
                <th>Seed Status</th>
                <th>Tenant Health</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="font-extrabold text-slate-900 text-xs">
                    <div>{t.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">ID: {t.id}</div>
                  </td>
                  <td className="font-mono text-xs font-bold text-blue-700">{t.subdomain}.plusmax.io</td>
                  <td className="font-mono text-xs font-bold text-purple-800">{t.schemaId}</td>
                  <td>
                    <div className="text-xs font-bold text-slate-800">{t.specialty}</div>
                    <div className="text-[10px] text-slate-500">{t.region}</div>
                  </td>
                  <td className="font-mono text-xs font-black text-slate-900">{t.licensedBeds} Beds</td>
                  <td>
                    <span className="erp-badge-green text-[10px] flex items-center gap-1 w-fit">
                      <FileCheck className="w-3 h-3 text-emerald-600" /> ICD-10 Seeded
                    </span>
                  </td>
                  <td>
                    <span className="erp-badge-green text-xs flex items-center gap-1 w-fit">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Schema Healthy
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FROSTED-GLASS SETUP WIZARD MODAL */}
      {showWizard && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-600" />
                <h3 className="text-base font-black text-slate-900">Tenant Provisioning Wizard</h3>
              </div>
              {!isProvisioning && (
                <button onClick={resetWizard} className="text-slate-400 hover:text-slate-600">
                  ✕
                </button>
              )}
            </div>

            {/* Step Indicators */}
            <div className="flex items-center justify-between text-xs font-black text-slate-500 border-b border-slate-200 pb-3">
              <span className={step >= 1 ? 'text-red-600 font-extrabold' : ''}>1. Hospital Config</span>
              <span>→</span>
              <span className={step >= 2 ? 'text-red-600 font-extrabold' : ''}>2. Compliance & Beds</span>
              <span>→</span>
              <span className={step === 3 ? 'text-red-600 font-extrabold' : ''}>3. Schema Spin-Up</span>
            </div>

            {/* STEP 1: HOSPITAL CONFIG */}
            {step === 1 && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Hospital Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Max Healthcare Super Specialty"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">SaaS Subdomain URI</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      required
                      placeholder="e.g. maxhealth"
                      value={subdomain}
                      onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                      className="flex-1 px-3 py-2 rounded-l-lg border border-slate-300 bg-slate-50 font-mono font-bold text-slate-900"
                    />
                    <span className="px-3 py-2 bg-slate-200 text-slate-700 font-mono font-bold rounded-r-lg border border-l-0 border-slate-300">
                      .plusmax.io
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (hospitalName && subdomain) setStep(2);
                    }}
                    disabled={!hospitalName || !subdomain}
                    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black shadow-md transition-all"
                  >
                    Next: Compliance & Capacity →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: COMPLIANCE & BEDS */}
            {step === 2 && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Primary Medical Specialty</label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 font-bold text-slate-900"
                  >
                    <option value="Multispecialty & Trauma">Multispecialty & Trauma</option>
                    <option value="Cardiothoracic Surgery">Cardiothoracic Surgery</option>
                    <option value="Oncology & Bone Marrow">Oncology & Bone Marrow</option>
                    <option value="Pediatrics & NICU">Pediatrics & NICU</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Compliance Region</label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-lg border border-slate-300 bg-slate-50 font-bold text-slate-900"
                    >
                      <option value="Maharashtra (ABDM Certified)">Maharashtra (ABDM Certified)</option>
                      <option value="Gujarat (NABH Accredited)">Gujarat (NABH Accredited)</option>
                      <option value="Karnataka (NABH Accredited)">Karnataka (NABH Accredited)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Licensed Bed Quota</label>
                    <input
                      type="number"
                      min={10}
                      step={10}
                      value={licensedBeds}
                      onChange={(e) => setLicensedBeds(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 font-mono font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleStartProvisioning}
                    className="w-2/3 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black shadow-md"
                  >
                    Spin Up Isolated Schema
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PROVISIONING ANIMATION */}
            {step === 3 && (
              <div className="py-6 space-y-4 text-center">
                {isProvisioning ? (
                  <>
                    <RefreshCw className="w-10 h-10 mx-auto text-red-600 animate-spin" />
                    <div className="space-y-1">
                      <div className="text-sm font-black text-slate-900">Spinning Up Isolated PostgreSQL Schema...</div>
                      <div className="text-xs font-mono text-purple-700 font-bold">
                        tenant_schema_{subdomain.toLowerCase()}
                      </div>
                    </div>

                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
                      <div
                        className="bg-red-600 h-full transition-all duration-300"
                        style={{ width: `${provisioningProgress}%` }}
                      ></div>
                    </div>

                    <div className="text-[10px] font-mono text-slate-500">
                      {provisioningProgress < 50
                        ? 'Creating isolated database schema...'
                        : 'Injecting ICD-10 clinical dictionary & default drug inventory...'}
                    </div>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600 animate-bounce" />
                    <div className="text-base font-black text-slate-900">TENANT PROVISIONED SUCCESSFULLY!</div>
                    <p className="text-xs text-slate-600">
                      Domain Route: <strong>{subdomain}.plusmax.io</strong> • Seed Data Injected cleanly.
                    </p>
                    <button
                      onClick={resetWizard}
                      className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs"
                    >
                      Close Wizard & View Roster
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
