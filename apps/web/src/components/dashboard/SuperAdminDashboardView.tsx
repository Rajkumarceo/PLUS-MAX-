'use client';

import React, { useState } from 'react';
import {
  Database,
  Globe,
  Bed,
  ShieldAlert,
  ShieldCheck,
  LayoutDashboard,
} from 'lucide-react';
import { TenantProvisionerModule } from '@/components/superadmin/TenantProvisionerModule';
import { DomainBindingModule } from '@/components/superadmin/DomainBindingModule';
import { BedQuotaLicensingModule } from '@/components/superadmin/BedQuotaLicensingModule';
import { GlobalSystemLogsModule } from '@/components/superadmin/GlobalSystemLogsModule';

export const SuperAdminDashboardView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'provisioner' | 'domain' | 'quota' | 'logs'>('overview');

  return (
    <div className="space-y-5 font-sans">
      {/* Header Banner */}
      <div className="erp-card p-4 bg-white border-l-4 border-l-red-600 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-red-50 text-red-700 flex items-center justify-center font-extrabold">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900">Super Admin Global SaaS Command Center</h1>
            <p className="text-xs text-slate-500">
              Isolated Schemas • White-Label Custom Domains & TLS • Bed Quota Radial Rings • AI Threat Telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-red-800 bg-red-50 px-3 py-1.5 rounded border border-red-200 font-bold">
          <ShieldCheck className="w-4 h-4 text-red-600" />
          <span>Global Root Infrastructure Key Active</span>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="erp-card p-2.5 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('provisioner')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'provisioner'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4 text-red-500" />
            <span>1. Tenant Provisioner</span>
          </button>

          <button
            onClick={() => setActiveTab('domain')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'domain'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Globe className="w-4 h-4 text-blue-500" />
            <span>2. Domain Binding</span>
          </button>

          <button
            onClick={() => setActiveTab('quota')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'quota'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Bed className="w-4 h-4 text-emerald-500" />
            <span>3. Bed Quota Licensing</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'logs'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-purple-500" />
            <span>4. Global System Logs</span>
          </button>
        </div>
      </div>

      {/* RENDER MODULES */}
      {activeTab === 'provisioner' && <TenantProvisionerModule />}

      {activeTab === 'domain' && <DomainBindingModule />}

      {activeTab === 'quota' && <BedQuotaLicensingModule />}

      {activeTab === 'logs' && <GlobalSystemLogsModule />}

      {/* OVERVIEW DEFAULT */}
      {activeTab === 'overview' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => setActiveTab('provisioner')}
              className="erp-card p-4 space-y-1 cursor-pointer hover:border-red-500 transition-all"
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase flex justify-between">
                <span>Tenant Provisioner</span>
                <Database className="w-4 h-4 text-red-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">2 Tenants</div>
              <div className="text-[11px] text-emerald-700 font-bold">Isolated Schemas Active</div>
            </div>

            <div
              onClick={() => setActiveTab('domain')}
              className="erp-card p-4 space-y-1 cursor-pointer hover:border-blue-500 transition-all"
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase flex justify-between">
                <span>Domain Binding</span>
                <Globe className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-sm font-extrabold text-blue-700">Metallic Blue Glow</div>
              <div className="text-[11px] text-slate-500 font-medium">Zero-Touch TLS Active</div>
            </div>

            <div
              onClick={() => setActiveTab('quota')}
              className="erp-card p-4 space-y-1 cursor-pointer hover:border-emerald-500 transition-all"
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase flex justify-between">
                <span>Bed Quota Licensing</span>
                <Bed className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">400 Beds</div>
              <div className="text-[11px] text-amber-700 font-bold">Soft 90% Warning Triggered</div>
            </div>

            <div
              onClick={() => setActiveTab('logs')}
              className="erp-card p-4 space-y-1 cursor-pointer hover:border-purple-500 transition-all"
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase flex justify-between">
                <span>System Security Logs</span>
                <ShieldAlert className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">2 Threats</div>
              <div className="text-[11px] text-red-600 font-bold">Red Glass Threat Panel</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="erp-card p-4 space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Database className="w-4 h-4 text-red-600" />
                <span>Tenant Provisioning & Schema Engine</span>
              </h3>
              <p className="text-xs text-slate-500">1-Click wizard spinning up isolated PostgreSQL schemas and injecting seed data.</p>
              <button
                onClick={() => setActiveTab('provisioner')}
                className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-all shadow-sm"
              >
                Open Tenant Provisioner
              </button>
            </div>

            <div className="erp-card p-4 space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-purple-600" />
                <span>Global System Telemetry & AI Threats</span>
              </h3>
              <p className="text-xs text-slate-500">WebGPU log telemetry stream with AI threat isolation and granular query builder.</p>
              <button
                onClick={() => setActiveTab('logs')}
                className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all shadow-sm"
              >
                Open System Telemetry Logs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
