'use client';

import React, { useState } from 'react';
import {
  Clock,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Calendar,
  FileText,
  Send,
  Sparkles,
  ShieldCheck,
  Building,
  Filter,
} from 'lucide-react';

export interface BatchItem {
  id: string;
  drugName: string;
  batchNo: string;
  expiryDate: string;
  daysToExpiry: number;
  expiryWindow: '30_DAYS' | '60_DAYS' | '90_DAYS';
  quantity: number;
  unitCost: number;
  manufacturer: string;
  isFefoRecommended: boolean;
  status: 'IN_STOCK' | 'VENDOR_RETURN_ROUTED';
  reversePoNo?: string;
}

const INITIAL_BATCHES: BatchItem[] = [
  {
    id: 'bt-1',
    drugName: 'Ceftriaxone 1g Injection',
    batchNo: 'B2025-1192',
    expiryDate: 'Aug 15, 2026',
    daysToExpiry: 21,
    expiryWindow: '30_DAYS',
    quantity: 85,
    unitCost: 65,
    manufacturer: 'Aristo Pharmaceuticals',
    isFefoRecommended: true,
    status: 'IN_STOCK',
  },
  {
    id: 'bt-2',
    drugName: 'Insulin Glargine Pen 100IU',
    batchNo: 'B2025-4421',
    expiryDate: 'Aug 28, 2026',
    daysToExpiry: 34,
    expiryWindow: '60_DAYS',
    quantity: 40,
    unitCost: 450,
    manufacturer: 'Sanofi India Ltd',
    isFefoRecommended: true,
    status: 'IN_STOCK',
  },
  {
    id: 'bt-3',
    drugName: 'Amoxicillin-Clavulanate 625mg',
    batchNo: 'B2026-0912',
    expiryDate: 'Sep 25, 2026',
    daysToExpiry: 62,
    expiryWindow: '90_DAYS',
    quantity: 210,
    unitCost: 22,
    manufacturer: 'GlaxoSmithKline',
    isFefoRecommended: false,
    status: 'IN_STOCK',
  },
];

export const BatchExpiryTracker: React.FC = () => {
  const [batches, setBatches] = useState<BatchItem[]>(INITIAL_BATCHES);
  const [selectedWindow, setSelectedWindow] = useState<'ALL' | '30_DAYS' | '60_DAYS' | '90_DAYS'>('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleGenerateVendorReturn = (id: string) => {
    setBatches((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status: 'VENDOR_RETURN_ROUTED',
              reversePoNo: `R-PO-2026-${Math.floor(9000 + Math.random() * 1000)}`,
            }
          : b
      )
    );

    setToastMessage('Reverse Purchase Order (R-PO) Generated! Stock routed to manufacturer return queue.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredBatches = batches.filter((b) => {
    if (selectedWindow === 'ALL') return true;
    return b.expiryWindow === selectedWindow;
  });

  const count30 = batches.filter((b) => b.expiryWindow === '30_DAYS').length;
  const count60 = batches.filter((b) => b.expiryWindow === '60_DAYS').length;
  const count90 = batches.filter((b) => b.expiryWindow === '90_DAYS').length;

  return (
    <div className="space-y-5 font-sans">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-inner backdrop-blur-md">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">Batch Expiry & FEFO Enforcement Engine</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-500/30 text-amber-200 border border-amber-400/40">
                  Loss Prevention Auditor
                </span>
              </div>
              <p className="text-xs text-amber-200/80 mt-0.5">
                Timeline Clustering (30/60/90 Days) • FEFO First-Expire-First-Out • Reverse PO Vendor Return Routing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
              <div className="text-[10px] text-amber-200 uppercase font-bold tracking-wider">30-Day Critical Risk</div>
              <div className="text-lg font-black text-red-400">{count30} Batches</div>
            </div>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-600 text-white rounded-lg shadow-lg flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TIMELINE CLUSTERING CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => setSelectedWindow('30_DAYS')}
          className="erp-card p-4 space-y-1 cursor-pointer bg-red-50/50 border-red-200 hover:border-red-500 transition-all"
        >
          <div className="text-[11px] font-bold text-red-900 uppercase flex justify-between">
            <span>30-Day Expiry Cluster</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-xl font-black text-red-600">{count30} Batches</div>
          <div className="text-[10px] text-red-600 font-bold">Immediate Vendor Return Priority</div>
        </div>

        <div
          onClick={() => setSelectedWindow('60_DAYS')}
          className="erp-card p-4 space-y-1 cursor-pointer bg-amber-50/50 border-amber-200 hover:border-amber-500 transition-all"
        >
          <div className="text-[11px] font-bold text-amber-900 uppercase flex justify-between">
            <span>60-Day Expiry Cluster</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-black text-amber-700">{count60} Batches</div>
          <div className="text-[10px] text-amber-700 font-bold">FEFO Dispense Recommendation</div>
        </div>

        <div
          onClick={() => setSelectedWindow('90_DAYS')}
          className="erp-card p-4 space-y-1 cursor-pointer bg-blue-50/50 border-blue-200 hover:border-blue-500 transition-all"
        >
          <div className="text-[11px] font-bold text-blue-900 uppercase flex justify-between">
            <span>90-Day Expiry Cluster</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl font-black text-slate-900">{count90} Batches</div>
          <div className="text-[10px] text-blue-700 font-bold">Normal Shelf Life Monitoring</div>
        </div>
      </div>

      {/* BATCH EXPIRY LEDGER TABLE */}
      <div className="erp-card p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-sm font-black text-slate-900">Pharmaceutical Batch Expiry & FEFO Roster</h3>
            <p className="text-xs text-slate-500">First-Expire First-Out recommendation with vendor return automation.</p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="text-slate-600">Timeline Window:</span>
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              {(['ALL', '30_DAYS', '60_DAYS', '90_DAYS'] as const).map((win) => (
                <button
                  key={win}
                  onClick={() => setSelectedWindow(win)}
                  className={`px-3 py-1 rounded-md transition-all ${
                    selectedWindow === win ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {win.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="erp-table">
            <thead>
              <tr>
                <th>Drug Formulation</th>
                <th>Batch Number</th>
                <th>Manufacturer</th>
                <th>Expiration Date</th>
                <th>Days Remaining</th>
                <th>FEFO Priority</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBatches.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="font-extrabold text-slate-900 text-xs">{b.drugName}</td>
                  <td className="font-mono text-xs text-slate-600 font-bold">{b.batchNo}</td>
                  <td className="text-xs font-bold text-slate-700">{b.manufacturer}</td>
                  <td className="font-mono text-xs font-bold text-slate-800">{b.expiryDate}</td>
                  <td className="font-mono text-xs font-black">
                    <span className={b.daysToExpiry <= 30 ? 'text-red-600' : 'text-amber-700'}>
                      {b.daysToExpiry} Days Left
                    </span>
                  </td>
                  <td>
                    {b.isFefoRecommended ? (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-sm">
                        FEFO #1 RECOMMENDED BATCH
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs font-mono">-- Standard --</span>
                    )}
                  </td>
                  <td>
                    {b.status === 'IN_STOCK' ? (
                      <span className="erp-badge-green text-xs flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active Stock
                      </span>
                    ) : (
                      <span className="erp-badge-yellow text-xs flex items-center gap-1 w-fit font-bold">
                        <RotateCcw className="w-3.5 h-3.5 text-amber-600" /> R-PO: {b.reversePoNo}
                      </span>
                    )}
                  </td>
                  <td>
                    {b.status === 'IN_STOCK' && (
                      <button
                        onClick={() => handleGenerateVendorReturn(b.id)}
                        className="px-2.5 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300 flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reverse PO Return</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
