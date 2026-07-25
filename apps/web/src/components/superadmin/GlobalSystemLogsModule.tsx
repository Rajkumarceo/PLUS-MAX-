'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  Terminal,
  AlertOctagon,
  CheckCircle2,
  Lock,
  Cpu,
  Zap,
  Activity,
  Download,
} from 'lucide-react';

export interface TelemetryLog {
  id: string;
  timestamp: string;
  tenantId: string;
  tenantName: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  statusCode: number;
  latencyMs: number;
  clientIp: string;
  isThreatAnomaly: boolean;
  threatReason?: string;
}

const INITIAL_LOGS: TelemetryLog[] = [
  {
    id: 'log-9001',
    timestamp: '11:24:02.102',
    tenantId: 'cityhospital',
    tenantName: 'City Super Specialty Hospital',
    endpoint: '/api/v1/emr/patients/98210',
    method: 'GET',
    statusCode: 200,
    latencyMs: 14,
    clientIp: '103.44.12.89',
    isThreatAnomaly: false,
  },
  {
    id: 'log-9002',
    timestamp: '11:24:04.450',
    tenantId: 'apexheart',
    tenantName: 'Apex Heart Institute',
    endpoint: '/api/v1/auth/login',
    method: 'POST',
    statusCode: 401,
    latencyMs: 8,
    clientIp: '185.220.101.5 (Tor Exit Node)',
    isThreatAnomaly: true,
    threatReason: 'CRITICAL THREAT: Brute-force login attempt detected from Tor Exit Node! 5 failed attempts in 2s.',
  },
  {
    id: 'log-9003',
    timestamp: '11:24:05.190',
    tenantId: 'cityhospital',
    tenantName: 'City Super Specialty Hospital',
    endpoint: '/api/v1/superadmin/cross-tenant-query',
    method: 'POST',
    statusCode: 403,
    latencyMs: 12,
    clientIp: '45.134.14.99',
    isThreatAnomaly: true,
    threatReason: 'CROSS-TENANT INJECTION: Unauthorized attempt to query schema [tenant_schema_apexheart] from City Hospital session!',
  },
  {
    id: 'log-9004',
    timestamp: '11:24:06.880',
    tenantId: 'metrokids',
    tenantName: 'Metro Children\'s Clinic',
    endpoint: '/api/v1/pharmacy/inventory',
    method: 'GET',
    statusCode: 200,
    latencyMs: 19,
    clientIp: '117.200.45.12',
    isThreatAnomaly: false,
  },
];

export const GlobalSystemLogsModule: React.FC = () => {
  const [logs, setLogs] = useState<TelemetryLog[]>(INITIAL_LOGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'THREATS_ONLY' | 'STATUS_200'>('ALL');

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.clientIp.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === 'THREATS_ONLY') return matchesSearch && log.isThreatAnomaly;
    if (filterType === 'STATUS_200') return matchesSearch && log.statusCode === 200;
    return matchesSearch;
  });

  const threatCount = logs.filter((l) => l.isThreatAnomaly).length;

  return (
    <div className="space-y-5 font-sans">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400/30 flex items-center justify-center text-red-300 shadow-inner backdrop-blur-md">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">Global System Security & Telemetry Command Center</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-red-500/30 text-red-200 border border-red-400/40">
                  WebGPU High-Density Stream
                </span>
              </div>
              <p className="text-xs text-red-200/80 mt-0.5">
                Infinite-Scroll Log Grid • Real-Time AI Threat Highlighting • Granular Query Builder
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
              <div className="text-[10px] text-red-200 uppercase font-bold tracking-wider">Active Threat Anomalies</div>
              <div className="text-lg font-black text-red-400">{threatCount} Security Alerts</div>
            </div>
          </div>
        </div>
      </div>

      {/* REAL-TIME AI THREAT ISOLATION PANELS */}
      <div className="space-y-3">
        {logs.filter((l) => l.isThreatAnomaly).map((threat) => (
          <div
            key={threat.id}
            className="p-5 rounded-2xl bg-red-600/90 text-white border-2 border-red-400 shadow-2xl space-y-2 animate-in zoom-in-95 backdrop-blur-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <AlertOctagon className="w-7 h-7 text-white shrink-0 animate-bounce" />
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider">{threat.threatReason}</h3>
                  <p className="text-xs text-red-100 font-mono mt-0.5">
                    Tenant: <strong>{threat.tenantName}</strong> • Endpoint: <strong>{threat.endpoint}</strong> • IP: <strong>{threat.clientIp}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => alert(`Blocked IP ${threat.clientIp} at Firewall API Gateway!`)}
                className="px-3 py-1.5 rounded-xl bg-white text-red-950 font-black text-xs hover:bg-red-50 shadow-md shrink-0"
              >
                Block IP at Gateway
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* GRANULAR QUERY BUILDER & LOG GRID */}
      <div className="erp-card p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Granular Query: Search by Tenant, IP Address (e.g. 103.44.12.89), or Endpoint..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-900 focus:outline-none focus:border-red-600 font-mono"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="text-slate-600">Filter Stream:</span>
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setFilterType('ALL')}
                className={`px-3 py-1 rounded-md transition-all ${
                  filterType === 'ALL' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setFilterType('THREATS_ONLY')}
                className={`px-3 py-1 rounded-md transition-all ${
                  filterType === 'THREATS_ONLY' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Threats Only
              </button>
              <button
                onClick={() => setFilterType('STATUS_200')}
                className={`px-3 py-1 rounded-md transition-all ${
                  filterType === 'STATUS_200' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                HTTP 200 OK
              </button>
            </div>
          </div>
        </div>

        {/* WEBGPU TELEMETRY GRID TABLE */}
        <div className="overflow-x-auto">
          <table className="erp-table font-mono text-xs">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Tenant Network</th>
                <th>HTTP Route</th>
                <th>Client IP</th>
                <th>Status</th>
                <th>Latency</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className={`transition-all ${
                    log.isThreatAnomaly
                      ? 'bg-red-500/10 border-l-4 border-l-red-600 text-red-950 font-bold'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="text-slate-500 font-bold">{log.timestamp}</td>
                  <td className="font-sans font-extrabold text-slate-900">{log.tenantName}</td>
                  <td className="font-bold text-blue-700">{log.method} {log.endpoint}</td>
                  <td className="text-slate-600 font-bold">{log.clientIp}</td>
                  <td>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black ${
                        log.statusCode === 200
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {log.statusCode}
                    </span>
                  </td>
                  <td className="font-black text-slate-800">{log.latencyMs} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
