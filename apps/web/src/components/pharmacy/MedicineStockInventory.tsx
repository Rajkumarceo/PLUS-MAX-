'use client';

import React, { useState } from 'react';
import {
  Pill,
  Search,
  AlertTriangle,
  ArrowRightLeft,
  Building,
  CheckCircle2,
  Package,
  Plus,
  Sparkles,
  RefreshCcw,
  ShieldCheck,
  TrendingDown,
} from 'lucide-react';

export interface InventoryItem {
  id: string;
  genericName: string;
  brandName: string;
  supplier: string;
  storeLocation: 'INPATIENT' | 'OUTPATIENT' | 'EMERGENCY';
  qoh: number; // Quantity on Hand
  parLevel: number; // Min threshold
  unitPrice: number;
  batchNo: string;
}

const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'sku-1', genericName: 'Paracetamol', brandName: 'Dolo 650mg', supplier: 'Micro Labs Ltd', storeLocation: 'INPATIENT', qoh: 4800, parLevel: 1000, unitPrice: 2.5, batchNo: 'B2026-9081' },
  { id: 'sku-2', genericName: 'Amoxicillin-Clavulanate', brandName: 'Augmentin 625mg', supplier: 'GlaxoSmithKline', storeLocation: 'OUTPATIENT', qoh: 340, parLevel: 500, unitPrice: 22.0, batchNo: 'B2026-4410' }, // BELOW PAR -> FROSTED AMBER GLOW
  { id: 'sku-3', genericName: 'Ceftriaxone Injection', brandName: 'Monocef 1g', supplier: 'Aristo Pharmaceuticals', storeLocation: 'EMERGENCY', qoh: 45, parLevel: 150, unitPrice: 65.0, batchNo: 'B2025-1192' }, // BELOW PAR -> FROSTED AMBER GLOW
  { id: 'sku-4', genericName: 'Pantoprazole', brandName: 'Pan 40mg', supplier: 'Alkem Laboratories', storeLocation: 'INPATIENT', qoh: 3200, parLevel: 800, unitPrice: 9.5, batchNo: 'B2026-8812' },
  { id: 'sku-5', genericName: 'Atorvastatin', brandName: 'Lipvas 20mg', supplier: 'Cipla Ltd', storeLocation: 'OUTPATIENT', qoh: 1500, parLevel: 400, unitPrice: 14.0, batchNo: 'B2026-3390' },
];

export const MedicineStockInventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [searchTerm, setSearchTerm] = useState('');
  const [storeFilter, setStoreFilter] = useState<'ALL' | 'INPATIENT' | 'OUTPATIENT' | 'EMERGENCY'>('ALL');

  // Inter-Store Transfer State
  const [selectedItemForTransfer, setSelectedItemForTransfer] = useState<InventoryItem | null>(null);
  const [transferQty, setTransferQty] = useState(100);
  const [targetStore, setTargetStore] = useState<'INPATIENT' | 'OUTPATIENT' | 'EMERGENCY'>('EMERGENCY');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleExecuteTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemForTransfer) return;

    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === selectedItemForTransfer.id) {
          return { ...item, qoh: Math.max(0, item.qoh - transferQty) };
        }
        return item;
      })
    );

    setToastMsg(`Transferred ${transferQty} units of ${selectedItemForTransfer.brandName} to ${targetStore} Pharmacy!`);
    setSelectedItemForTransfer(null);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStore = storeFilter === 'ALL' || item.storeLocation === storeFilter;
    return matchesSearch && matchesStore;
  });

  const totalSKUs = inventory.length;
  const lowStockCount = inventory.filter((i) => i.qoh < i.parLevel).length;

  return (
    <div className="space-y-5 font-sans">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-inner backdrop-blur-md">
              <Pill className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">Central Medicine Stock Inventory</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-500/30 text-blue-200 border border-blue-400/40">
                  Real-Time SKU Engine
                </span>
              </div>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Zero-Latency Data Grid • Dynamic Frosted Amber Reorder Glow • Multi-Store Inter-Department Transfers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
              <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Low Stock Reorders</div>
              <div className="text-lg font-black text-amber-400">{lowStockCount} SKUs Below Par</div>
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

      {/* MULTI-STORE SPATIAL DISTRIBUTION DASHBOARD */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => setStoreFilter('INPATIENT')}
          className="erp-card p-4 space-y-1 cursor-pointer bg-blue-50/40 border-blue-200 hover:border-blue-500 transition-all"
        >
          <div className="text-[11px] font-bold text-blue-900 uppercase flex justify-between">
            <span>Inpatient Main Pharmacy</span>
            <Building className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl font-black text-slate-900">
            {inventory.filter((i) => i.storeLocation === 'INPATIENT').reduce((acc, curr) => acc + curr.qoh, 0).toLocaleString()} Units
          </div>
          <div className="text-[10px] text-blue-700 font-bold">24/7 IPD Ward Supply</div>
        </div>

        <div
          onClick={() => setStoreFilter('OUTPATIENT')}
          className="erp-card p-4 space-y-1 cursor-pointer bg-purple-50/40 border-purple-200 hover:border-purple-500 transition-all"
        >
          <div className="text-[11px] font-bold text-purple-900 uppercase flex justify-between">
            <span>Outpatient OPD Pharmacy</span>
            <Building className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-xl font-black text-slate-900">
            {inventory.filter((i) => i.storeLocation === 'OUTPATIENT').reduce((acc, curr) => acc + curr.qoh, 0).toLocaleString()} Units
          </div>
          <div className="text-[10px] text-purple-700 font-bold">OPD Counter Dispensing</div>
        </div>

        <div
          onClick={() => setStoreFilter('EMERGENCY')}
          className="erp-card p-4 space-y-1 cursor-pointer bg-red-50/40 border-red-200 hover:border-red-500 transition-all"
        >
          <div className="text-[11px] font-bold text-red-900 uppercase flex justify-between">
            <span>Emergency ER Pharmacy</span>
            <Building className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-xl font-black text-slate-900">
            {inventory.filter((i) => i.storeLocation === 'EMERGENCY').reduce((acc, curr) => acc + curr.qoh, 0).toLocaleString()} Units
          </div>
          <div className="text-[10px] text-red-700 font-bold">Trauma & ICU STAT Supply</div>
        </div>
      </div>

      {/* CONTROLS & INVENTORY TABLE */}
      <div className="erp-card p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by Generic Name (e.g. Paracetamol), Brand Name, or Supplier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="text-slate-600">Store Filter:</span>
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              {(['ALL', 'INPATIENT', 'OUTPATIENT', 'EMERGENCY'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStoreFilter(st)}
                  className={`px-3 py-1 rounded-md transition-all ${
                    storeFilter === st ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Inventory Data Grid */}
        <div className="overflow-x-auto">
          <table className="erp-table">
            <thead>
              <tr>
                <th>Brand Name & Formulation</th>
                <th>Generic Formulation</th>
                <th>Supplier & Batch</th>
                <th>Store Location</th>
                <th>Quantity on Hand (QOH)</th>
                <th>Par Level</th>
                <th>Reorder Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => {
                const isBelowPar = item.qoh < item.parLevel;

                return (
                  <tr
                    key={item.id}
                    className={`transition-all ${
                      isBelowPar
                        ? 'bg-amber-500/10 border-l-4 border-l-amber-500 shadow-md ring-1 ring-amber-400/30'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="font-extrabold text-slate-900 text-xs">
                      <div>{item.brandName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">₹{item.unitPrice} / unit</div>
                    </td>
                    <td className="text-xs font-semibold text-slate-700">{item.genericName}</td>
                    <td>
                      <div className="text-xs font-bold text-slate-800">{item.supplier}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{item.batchNo}</div>
                    </td>
                    <td>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-blue-100 text-blue-800">
                        {item.storeLocation}
                      </span>
                    </td>
                    <td className="font-mono text-xs font-black text-slate-900">{item.qoh.toLocaleString()} units</td>
                    <td className="font-mono text-xs font-bold text-slate-500">{item.parLevel} units</td>
                    <td>
                      {isBelowPar ? (
                        <span className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-black text-xs shadow-sm flex items-center gap-1 w-fit animate-pulse">
                          <AlertTriangle className="w-3.5 h-3.5" /> REORDER NEEDED
                        </span>
                      ) : (
                        <span className="erp-badge-green text-xs flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Optimal Stock
                        </span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => setSelectedItemForTransfer(item)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 flex items-center gap-1"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5 text-blue-600" />
                        <span>Transfer</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* INTER-STORE TRANSFER MODAL */}
      {selectedItemForTransfer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-blue-600" />
                <span>Inter-Departmental Stock Transfer</span>
              </h3>
              <button onClick={() => setSelectedItemForTransfer(null)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-xs text-slate-800 space-y-1">
              <div className="font-extrabold text-blue-900">{selectedItemForTransfer.brandName} ({selectedItemForTransfer.genericName})</div>
              <div>Current Store: <strong>{selectedItemForTransfer.storeLocation}</strong></div>
              <div>Available QOH: <strong>{selectedItemForTransfer.qoh} units</strong></div>
            </div>

            <form onSubmit={handleExecuteTransfer} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Destination Pharmacy</label>
                <select
                  value={targetStore}
                  onChange={(e) => setTargetStore(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 font-bold text-slate-900"
                >
                  <option value="INPATIENT">Inpatient Main Pharmacy</option>
                  <option value="OUTPATIENT">Outpatient OPD Pharmacy</option>
                  <option value="EMERGENCY">Emergency ER Pharmacy</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Transfer Quantity (Units)</label>
                <input
                  type="number"
                  min={1}
                  max={selectedItemForTransfer.qoh}
                  value={transferQty}
                  onChange={(e) => setTransferQty(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 font-mono font-bold text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-md transition-all flex items-center justify-center gap-2"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>Execute Instant Stock Transfer</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
