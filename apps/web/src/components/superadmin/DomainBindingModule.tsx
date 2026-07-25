'use client';

import React, { useState } from 'react';
import {
  Globe,
  Lock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Server,
  ShieldCheck,
  Zap,
  ExternalLink,
  Plus,
  Network,
} from 'lucide-react';

export interface DomainBinding {
  id: string;
  tenantName: string;
  customDomain: string;
  cnameTarget: string;
  ipAddress: string;
  dnsStatus: 'VERIFIED' | 'PROPAGATING' | 'FAILED';
  sslStatus: 'ISSUED' | 'PROVISIONING' | 'RENEWING';
  sslIssuer: string;
  sslExpiresAt: string;
}

const INITIAL_DOMAINS: DomainBinding[] = [
  {
    id: 'dom-1',
    tenantName: 'City Super Specialty Hospital',
    customDomain: 'portal.cityhospital.com',
    cnameTarget: 'cityhospital.plusmax.io',
    ipAddress: '104.21.88.19 (Cloudflare Edge)',
    dnsStatus: 'VERIFIED',
    sslStatus: 'ISSUED',
    sslIssuer: 'Let\'s Encrypt Authority X3 (TLS 1.3)',
    sslExpiresAt: 'Oct 24, 2026',
  },
  {
    id: 'dom-2',
    tenantName: 'Apex Heart Institute',
    customDomain: 'emr.apexheart.in',
    cnameTarget: 'apexheart.plusmax.io',
    ipAddress: '104.21.88.19 (Cloudflare Edge)',
    dnsStatus: 'VERIFIED',
    sslStatus: 'ISSUED',
    sslIssuer: 'Let\'s Encrypt Authority X3 (TLS 1.3)',
    sslExpiresAt: 'Nov 12, 2026',
  },
  {
    id: 'dom-3',
    tenantName: 'Metro Children\'s Clinic',
    customDomain: 'care.metrokids.org',
    cnameTarget: 'metrokids.plusmax.io',
    ipAddress: '104.21.88.19 (Cloudflare Edge)',
    dnsStatus: 'PROPAGATING',
    sslStatus: 'PROVISIONING',
    sslIssuer: 'Auto-Issuing ACME Cert...',
    sslExpiresAt: 'Pending',
  },
];

export const DomainBindingModule: React.FC = () => {
  const [domains, setDomains] = useState<DomainBinding[]>(INITIAL_DOMAINS);
  const [newTenantName, setNewTenantName] = useState('Metro Children\'s Clinic');
  const [newCustomDomain, setNewCustomDomain] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleVerifyDNS = (id: string) => {
    setDomains((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              dnsStatus: 'VERIFIED',
              sslStatus: 'ISSUED',
              sslIssuer: 'Let\'s Encrypt Authority X3 (TLS 1.3)',
              sslExpiresAt: 'Oct 25, 2026',
            }
          : d
      )
    );

    setToastMsg('DNS Record & Zero-Touch SSL Certificate Verified!');
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleAddDomainBinding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomDomain.trim()) return;

    const newBinding: DomainBinding = {
      id: `dom-${Date.now()}`,
      tenantName: newTenantName,
      customDomain: newCustomDomain,
      cnameTarget: `${newCustomDomain.split('.')[0]}.plusmax.io`,
      ipAddress: '104.21.88.19 (Cloudflare Edge)',
      dnsStatus: 'VERIFIED',
      sslStatus: 'ISSUED',
      sslIssuer: 'Let\'s Encrypt Authority X3 (TLS 1.3)',
      sslExpiresAt: 'Oct 25, 2026',
    };

    setTenantsDomain([newBinding, ...domains]);
    setNewCustomDomain('');
    setShowAddModal(false);
  };

  const setTenantsDomain = (list: DomainBinding[]) => setDomains(list);

  return (
    <div className="space-y-5 font-sans">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-inner backdrop-blur-md">
              <Globe className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">Custom Domain Binding & Zero-Touch SSL Router</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-500/30 text-blue-200 border border-blue-400/40">
                  White-Label Reverse Proxy
                </span>
              </div>
              <p className="text-xs text-blue-200/80 mt-0.5">
                DNS Visualizer with Metallic Blue Glow • Auto-Issuing TLS 1.3 Certificates • Reverse Proxy Tenant Shard Routing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Bind Custom Domain</span>
            </button>
          </div>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-600 text-white rounded-lg shadow-lg flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* DNS VISUALIZER & SSL ROSTER */}
      <div className="erp-card p-4 space-y-4">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900">Custom Domain DNS Visualizer & SSL Ledger</h3>
            <p className="text-xs text-slate-500">Real-time CNAME and TLS 1.3 certificate status monitoring.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="erp-table">
            <thead>
              <tr>
                <th>Hospital Tenant</th>
                <th>White-Label Custom Domain</th>
                <th>CNAME Routing Target</th>
                <th>DNS Propagation</th>
                <th>Zero-Touch SSL Certificate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {domains.map((dom) => {
                const isVerified = dom.dnsStatus === 'VERIFIED';

                return (
                  <tr
                    key={dom.id}
                    className={`transition-all ${
                      isVerified
                        ? 'bg-blue-600/10 border-l-4 border-l-blue-600 shadow-md ring-1 ring-blue-500/20'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="font-extrabold text-slate-900 text-xs">{dom.tenantName}</td>
                    <td className="font-mono text-xs font-extrabold text-blue-700">
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-4 h-4 text-blue-600" />
                        <span>https://{dom.customDomain}</span>
                      </div>
                    </td>
                    <td className="font-mono text-xs text-slate-600 font-bold">{dom.cnameTarget}</td>
                    <td>
                      {isVerified ? (
                        <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-black text-xs flex items-center gap-1.5 w-fit shadow-md shadow-blue-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" /> METALLIC BLUE VERIFIED
                        </span>
                      ) : (
                        <span className="erp-badge-yellow text-xs flex items-center gap-1 w-fit">
                          <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin" /> Propagating CNAME
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{dom.sslIssuer}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">Expires: {dom.sslExpiresAt}</div>
                    </td>
                    <td>
                      {!isVerified ? (
                        <button
                          onClick={() => handleVerifyDNS(dom.id)}
                          className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center gap-1"
                        >
                          <Zap className="w-3.5 h-3.5 fill-current" />
                          <span>Verify DNS Now</span>
                        </button>
                      ) : (
                        <a
                          href={`https://${dom.customDomain}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline text-xs font-bold flex items-center gap-1"
                        >
                          <span>Test Route</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* BIND DOMAIN MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <span>Bind White-Label Custom Domain</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddDomainBinding} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Custom Domain FQDN</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. portal.cityhospital.com"
                  value={newCustomDomain}
                  onChange={(e) => setNewCustomDomain(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 font-mono font-bold text-slate-900"
                />
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-slate-800 space-y-1 font-mono">
                <div className="font-bold text-blue-900">Required DNS CNAME Setup</div>
                <div>Host: <strong>@ / portal</strong></div>
                <div>Target: <strong>cityhospital.plusmax.io</strong></div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-md transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Bind Domain & Auto-Provision SSL</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
