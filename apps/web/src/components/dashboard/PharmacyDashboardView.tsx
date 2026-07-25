'use client';

import React, { useState } from 'react';
import {
  Pill,
  Barcode,
  Clock,
  Activity,
  ShieldCheck,
  LayoutDashboard,
} from 'lucide-react';
import { MedicineStockInventory } from '@/components/pharmacy/MedicineStockInventory';
import { BarcodeDispenser } from '@/components/pharmacy/BarcodeDispenser';
import { BatchExpiryTracker } from '@/components/pharmacy/BatchExpiryTracker';
import { LISLabVerification } from '@/components/pharmacy/LISLabVerification';

export const PharmacyDashboardView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'stock' | 'dispenser' | 'expiry' | 'lis'>('overview');

  return (
    <div className="space-y-5 font-sans">
      {/* Header Banner */}
      <div className="erp-card p-4 bg-white border-l-4 border-l-blue-600 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-blue-50 text-blue-700 flex items-center justify-center font-extrabold">
            <Pill className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900">Pharmacy & LIS Diagnostics Terminal</h1>
            <p className="text-xs text-slate-500">
              WebGPU Stock Grids • 2D Barcode Match Verification • FEFO Expiry Timeline • LIS Bi-Directional Analyzer Sync
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-blue-800 bg-blue-50 px-3 py-1.5 rounded border border-blue-200 font-bold">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Barcode Dispenser Hardware Sync Active</span>
        </div>
      </div>

      {/* Navigation Bar */}
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
            onClick={() => setActiveTab('stock')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'stock'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Pill className="w-4 h-4 text-blue-500" />
            <span>1. Medicine Stock Inventory</span>
          </button>

          <button
            onClick={() => setActiveTab('dispenser')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'dispenser'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Barcode className="w-4 h-4 text-emerald-500" />
            <span>2. Barcode Dispenser</span>
          </button>

          <button
            onClick={() => setActiveTab('expiry')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'expiry'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-500" />
            <span>3. Batch Expiry Tracker</span>
          </button>

          <button
            onClick={() => setActiveTab('lis')}
            className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'lis'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4 text-purple-500" />
            <span>4. LIS Lab Verification</span>
          </button>
        </div>
      </div>

      {/* RENDER MODULES */}
      {activeTab === 'stock' && <MedicineStockInventory />}

      {activeTab === 'dispenser' && <BarcodeDispenser />}

      {activeTab === 'expiry' && <BatchExpiryTracker />}

      {activeTab === 'lis' && <LISLabVerification />}

      {/* OVERVIEW DEFAULT */}
      {activeTab === 'overview' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => setActiveTab('stock')}
              className="erp-card p-4 space-y-1 cursor-pointer hover:border-blue-500 transition-all"
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase flex justify-between">
                <span>Medicine Stock</span>
                <Pill className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">5 SKUs Active</div>
              <div className="text-[11px] text-amber-700 font-bold">2 SKUs Below Par (Frosted Glow)</div>
            </div>

            <div
              onClick={() => setActiveTab('dispenser')}
              className="erp-card p-4 space-y-1 cursor-pointer hover:border-emerald-500 transition-all"
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase flex justify-between">
                <span>2D Barcode Dispenser</span>
                <Barcode className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-sm font-extrabold text-emerald-700">Scanner Hardware Sync</div>
              <div className="text-[11px] text-slate-500 font-medium">Metallic Blue Match Verification</div>
            </div>

            <div
              onClick={() => setActiveTab('expiry')}
              className="erp-card p-4 space-y-1 cursor-pointer hover:border-amber-500 transition-all"
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase flex justify-between">
                <span>Batch Expiry & FEFO</span>
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">FEFO Enforced</div>
              <div className="text-[11px] text-amber-700 font-bold">Reverse PO Return Active</div>
            </div>

            <div
              onClick={() => setActiveTab('lis')}
              className="erp-card p-4 space-y-1 cursor-pointer hover:border-purple-500 transition-all"
            >
              <div className="text-[11px] font-bold text-slate-500 uppercase flex justify-between">
                <span>LIS Machine Sync</span>
                <Activity className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-sm font-extrabold text-purple-700">Bi-Directional Sync</div>
              <div className="text-[11px] text-slate-500 font-medium">Pathologist Verification Queue</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="erp-card p-4 space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Barcode className="w-4 h-4 text-emerald-600" />
                <span>Barcode Dispenser & Safety Verification</span>
              </h3>
              <p className="text-xs text-slate-500">Instant 2D hardware barcode scanner verification against doctor prescriptions.</p>
              <button
                onClick={() => setActiveTab('dispenser')}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm"
              >
                Open Barcode Dispenser
              </button>
            </div>

            <div className="erp-card p-4 space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-600" />
                <span>LIS Machine Analyzer Verification</span>
              </h3>
              <p className="text-xs text-slate-500">Dual-pane split-screen lab test result validation with pathologist e-sign.</p>
              <button
                onClick={() => setActiveTab('lis')}
                className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all shadow-sm"
              >
                Open LIS Validation Queue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
