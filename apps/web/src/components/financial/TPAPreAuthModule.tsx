'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Building,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileCheck,
  Zap,
  Plus,
  Send,
  Download,
  Check,
  X,
  Sparkles,
} from 'lucide-react';

export interface TPAClaim {
  id: string;
  claimNo: string;
  patientName: string;
  policyNo: string;
  tpaProvider: string;
  diagnosis: string;
  estimatedAmount: number;
  approvedAmount: number;
  status: 'PRE_AUTH_APPROVED' | 'EMERGENCY_BYPASS' | 'PENDING_APPROVAL' | 'DISCHARGE_PACKET_READY';
  isEmergency: boolean;
  date: string;
}

const INITIAL_CLAIMS: TPAClaim[] = [
  {
    id: 'clm-901',
    claimNo: 'TPA-STAR-8812',
    patientName: 'Savitri Devi (UHID-9081)',
    policyNo: 'POL-STAR-771209',
    tpaProvider: 'Star Health & Allied Insurance',
    diagnosis: 'Acute Coronary Syndrome / CABG',
    estimatedAmount: 180000,
    approvedAmount: 165000,
    status: 'PRE_AUTH_APPROVED',
    isEmergency: false,
    date: 'Jul 24, 2026',
  },
  {
    id: 'clm-902',
    claimNo: 'TPA-HDFC-9912',
    patientName: 'Rajesh Shinde (UHID-9082)',
    policyNo: 'POL-HDFC-551982',
    tpaProvider: 'HDFC ERGO Health Insurance',
    diagnosis: 'Acute Appendicitis / Laparoscopic Appendectomy',
    estimatedAmount: 65000,
    approvedAmount: 65000,
    status: 'EMERGENCY_BYPASS',
    isEmergency: true,
    date: 'Jul 25, 2026',
  },
];

export const TPAPreAuthModule: React.FC = () => {
  const [claims, setClaims] = useState<TPAClaim[]>(INITIAL_CLAIMS);

  // Form State
  const [patientName, setPatientName] = useState('');
  const [policyNo, setPolicyNo] = useState('');
  const [tpaProvider, setTpaProvider] = useState('Star Health & Allied Insurance');
  const [diagnosis, setDiagnosis] = useState('');
  const [estimatedAmount, setEstimatedAmount] = useState(75000);
  const [isEmergencyBypass, setIsEmergencyBypass] = useState(false);
  const [showPreAuthModal, setShowPreAuthModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCreatePreAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) return;

    const newClaim: TPAClaim = {
      id: `clm-${Date.now()}`,
      claimNo: `TPA-PACKET-${Math.floor(8000 + Math.random() * 1000)}`,
      patientName,
      policyNo,
      tpaProvider,
      diagnosis,
      estimatedAmount,
      approvedAmount: isEmergencyBypass ? estimatedAmount : Math.round(estimatedAmount * 0.9),
      status: isEmergencyBypass ? 'EMERGENCY_BYPASS' : 'PENDING_APPROVAL',
      isEmergency: isEmergencyBypass,
      date: 'Jul 25, 2026',
    };

    setClaims([newClaim, ...claims]);
    setPatientName('');
    setShowPreAuthModal(false);
    setToastMessage(
      isEmergencyBypass
        ? 'EMERGENCY CASHLESS BYPASS EXECUTED! Provisional Bed Allocated. Reconciliation pushed to background.'
        : 'Digital Pre-Auth Packet Transmitted to TPA Portal!'
    );
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <div className="space-y-5 font-sans">
      {/* Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-inner backdrop-blur-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">Insurance TPA Pre-Authorization Engine</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-500/30 text-blue-200 border border-blue-400/40">
                  Enterprise TPA Network API
                </span>
              </div>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Digital Pre-Auth Packaging • Emergency Cashless Bypass • Automated Discharge Claim Packets
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsEmergencyBypass(true);
                setShowPreAuthModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-lg transition-all flex items-center gap-1.5 animate-pulse"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Emergency Cashless Bypass</span>
            </button>
            <button
              onClick={() => {
                setIsEmergencyBypass(false);
                setShowPreAuthModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>New Planned Pre-Auth</span>
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

      {/* METRICS DASHBOARD */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="erp-card p-4 space-y-1 bg-blue-50/50 border-blue-200">
          <div className="text-[11px] font-bold text-blue-800 uppercase flex justify-between">
            <span>Pre-Auth Approved</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-900">₹1,65,000</div>
          <div className="text-[10px] text-blue-700 font-bold">Star Health Approved</div>
        </div>

        <div className="erp-card p-4 space-y-1 bg-red-50/50 border-red-200">
          <div className="text-[11px] font-bold text-red-800 uppercase flex justify-between">
            <span>Emergency Cashless Bypass</span>
            <Zap className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-red-600">1 Active Bed</div>
          <div className="text-[10px] text-red-600 font-bold">Provisional Care Active</div>
        </div>

        <div className="erp-card p-4 space-y-1 bg-emerald-50/50 border-emerald-200">
          <div className="text-[11px] font-bold text-emerald-800 uppercase flex justify-between">
            <span>Discharge Packets Ready</span>
            <FileCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">2 Packets</div>
          <div className="text-[10px] text-emerald-700 font-bold">Itemized Bill + Summary</div>
        </div>
      </div>

      {/* CLAIMS & PRE-AUTH TABLE */}
      <div className="erp-card p-4 space-y-4">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900">Enterprise TPA Pre-Authorization Claims Roster</h3>
            <p className="text-xs text-slate-500">Live claim status across integrated insurance providers.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="erp-table">
            <thead>
              <tr>
                <th>Claim Ref #</th>
                <th>Patient & Policy</th>
                <th>TPA Provider</th>
                <th>Diagnosis & Plan</th>
                <th>Estimated / Approved Amount</th>
                <th>Pre-Auth Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((clm) => (
                <tr key={clm.id} className="hover:bg-slate-50">
                  <td className="font-mono text-xs font-black text-blue-700">{clm.claimNo}</td>
                  <td>
                    <div className="font-extrabold text-slate-900 text-xs">{clm.patientName}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{clm.policyNo}</div>
                  </td>
                  <td className="text-xs font-bold text-slate-800">{clm.tpaProvider}</td>
                  <td className="text-xs font-semibold text-slate-700">{clm.diagnosis}</td>
                  <td className="font-mono text-xs font-black text-slate-900">
                    ₹{clm.estimatedAmount.toLocaleString('en-IN')} /{' '}
                    <span className="text-emerald-700">₹{clm.approvedAmount.toLocaleString('en-IN')}</span>
                  </td>
                  <td>
                    {clm.status === 'PRE_AUTH_APPROVED' ? (
                      <span className="erp-badge-green text-xs flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Pre-Auth Approved
                      </span>
                    ) : clm.status === 'EMERGENCY_BYPASS' ? (
                      <span className="erp-badge-red text-xs flex items-center gap-1 w-fit font-black">
                        <Zap className="w-3.5 h-3.5 text-red-600" /> Emergency Cashless Bypass
                      </span>
                    ) : (
                      <span className="erp-badge-blue text-xs flex items-center gap-1 w-fit">
                        <Clock className="w-3.5 h-3.5 text-blue-600" /> Pending Approval
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => alert(`Automated Discharge Packet generated for ${clm.claimNo}. Includes Itemized Bill, Discharge Summary & Lab Reports.`)}
                      className="px-3 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-xs border border-blue-200 flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-600" />
                      <span>Download TPA Packet</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PRE-AUTH REQUEST MODAL */}
      {showPreAuthModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                {isEmergencyBypass ? <Zap className="w-5 h-5 text-red-600" /> : <ShieldCheck className="w-5 h-5 text-blue-600" />}
                <span>{isEmergencyBypass ? 'Emergency Cashless Bypass Protocol' : 'Digital Pre-Auth Packet'}</span>
              </h3>
              <button onClick={() => setShowPreAuthModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePreAuth} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Patient Name & UHID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meena Kapoor (UHID-9821)"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Policy / Card Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. POL-STAR-8812"
                    value={policyNo}
                    onChange={(e) => setPolicyNo(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 font-mono font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">TPA Provider</label>
                  <select
                    value={tpaProvider}
                    onChange={(e) => setTpaProvider(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 font-bold text-slate-900"
                  >
                    <option value="Star Health & Allied Insurance">Star Health & Allied Insurance</option>
                    <option value="HDFC ERGO Health Insurance">HDFC ERGO Health Insurance</option>
                    <option value="ICICI Lombard Health">ICICI Lombard Health</option>
                    <option value="Niva Bupa Health Insurance">Niva Bupa Health Insurance</option>
                    <option value="Medi Assist TPA Services">Medi Assist TPA Services</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Proposed Clinical Diagnosis</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acute Appendicitis / Laparoscopic Surgery"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Estimated Total Bill Amount (INR)</label>
                <input
                  type="number"
                  value={estimatedAmount}
                  onChange={(e) => setEstimatedAmount(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 font-mono font-bold text-slate-900"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-xl text-white font-black shadow-md transition-all flex items-center justify-center gap-2 ${
                  isEmergencyBypass ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isEmergencyBypass ? <Zap className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                <span>{isEmergencyBypass ? 'Execute Emergency Cashless Bypass' : 'Transmit Pre-Auth Packet to TPA'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
