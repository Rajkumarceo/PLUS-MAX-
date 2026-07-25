'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Pill, ShieldCheck, CheckCircle, PackageCheck, AlertCircle } from 'lucide-react';

export default function PharmacyPortalPage() {
  const [stock] = useState([
    { id: 'med-1', name: 'Paracetamol 650mg (IP)', batch: 'B2026-9081', expiry: '2028-12-31', count: 4800, status: 'IN_STOCK' },
    { id: 'med-2', name: 'Amoxicillin 500mg (Cap)', batch: 'B2026-4410', expiry: '2027-06-30', count: 1200, status: 'IN_STOCK' },
    { id: 'med-3', name: 'Ceftriaxone 1g (Inj)', batch: 'B2025-1192', expiry: '2026-08-15', count: 85, status: 'EXPIRING_SOON' },
  ]);

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#172B4D] flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="erp-card p-4 bg-white border-l-4 border-l-blue-600 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-blue-50 text-blue-700 flex items-center justify-center font-extrabold">
                <Pill className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-extrabold text-slate-900">Pharmacy & LIS Diagnostics Module</h1>
                <p className="text-xs text-slate-500">
                  Medicine Stock Inventory, Barcode Dispenser & LIS Laboratory Sample Tracking
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-blue-800 bg-blue-50 px-3 py-1.5 rounded border border-blue-200 font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Pharmacy Barcode Dispenser Active</span>
            </div>
          </div>

          <div className="erp-card p-4 space-y-4">
            <div className="erp-card-header flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900">Medicine Stock & Expiry Ledger</h3>
              <span className="erp-badge-blue">Barcode Verified</span>
            </div>

            <div className="overflow-x-auto">
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Medicine Formulation</th>
                    <th>Batch Code</th>
                    <th>Expiry Date</th>
                    <th>Available Quantity</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stock.map((item) => (
                    <tr key={item.id}>
                      <td className="font-extrabold text-slate-900">{item.name}</td>
                      <td className="font-mono text-xs text-slate-600">{item.batch}</td>
                      <td className="font-mono text-xs text-slate-600">{item.expiry}</td>
                      <td className="font-bold text-slate-900">{item.count} units</td>
                      <td>
                        {item.status === 'IN_STOCK' ? (
                          <span className="erp-badge-green flex items-center gap-1 w-fit">
                            <CheckCircle className="w-3 h-3 text-emerald-600" /> In Stock
                          </span>
                        ) : (
                          <span className="erp-badge-yellow flex items-center gap-1 w-fit">
                            <AlertCircle className="w-3 h-3 text-amber-600" /> Expiring Soon
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
