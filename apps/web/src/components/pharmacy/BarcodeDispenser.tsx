'use client';

import React, { useState } from 'react';
import {
  Barcode,
  CheckCircle2,
  AlertOctagon,
  ShieldCheck,
  Zap,
  RotateCcw,
  Check,
  X,
  FileCheck,
  Search,
} from 'lucide-react';

export interface PrescribedItem {
  id: string;
  drugName: string;
  prescribedDose: string;
  route: string;
  expectedBarcode: string;
  status: 'PENDING_SCAN' | 'VERIFIED_MATCH' | 'DISCREPANCY_LOCKED';
  scannedBarcode?: string;
}

const DOCTOR_PRESCRIPTION: PrescribedItem[] = [
  { id: 'rx-item-1', drugName: 'Augmentin (Amoxicillin-Clavulanate)', prescribedDose: '625mg', route: 'Oral', expectedBarcode: 'BC-AUGMENTIN-625', status: 'PENDING_SCAN' },
  { id: 'rx-item-2', drugName: 'Pan (Pantoprazole)', prescribedDose: '40mg', route: 'Oral', expectedBarcode: 'BC-PAN-40', status: 'PENDING_SCAN' },
  { id: 'rx-item-3', drugName: 'Dolo (Paracetamol)', prescribedDose: '650mg', route: 'Oral', expectedBarcode: 'BC-DOLO-650', status: 'PENDING_SCAN' },
];

export const BarcodeDispenser: React.FC = () => {
  const [patientName, setPatientName] = useState('Savitri Devi (UHID-9081 / OPD Token #042)');
  const [prescriptionItems, setPrescriptionItems] = useState<PrescribedItem[]>(DOCTOR_PRESCRIPTION);
  const [scannedInput, setScannedInput] = useState('');
  const [activeDiscrepancy, setActiveDiscrepancy] = useState<{
    scannedCode: string;
    expectedCode: string;
    reason: string;
  } | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSimulateScan = (scannedCode: string) => {
    if (!scannedCode.trim()) return;

    // Check if code matches any item in prescription
    const matchingIndex = prescriptionItems.findIndex((item) => item.expectedBarcode === scannedCode);

    if (matchingIndex !== -1) {
      // MATCH FOUND! Illuminate row in METALLIC BLUE
      setPrescriptionItems((prev) =>
        prev.map((item, idx) =>
          idx === matchingIndex
            ? { ...item, status: 'VERIFIED_MATCH', scannedBarcode: scannedCode }
            : item
        )
      );
      setToastMessage(`VISUAL MATCH VERIFIED: Scanned ${scannedCode} matches Doctor E-Prescription!`);
      setTimeout(() => setToastMsgNull(), 4000);
    } else {
      // DISCREPANCY! HARD-STOP LOCK UNTIL MANUAL OVERRIDE
      setActiveDiscrepancy({
        scannedCode,
        expectedCode: prescriptionItems.find((p) => p.status === 'PENDING_SCAN')?.expectedBarcode || 'N/A',
        reason: `HARD-STOP DISCREPANCY: Scanned Barcode [${scannedCode}] does not match any item in the Doctor's active e-prescription! Dispensing blocked.`,
      });
    }

    setScannedInput('');
  };

  const setToastMsgNull = () => setToastMessage(null);

  const handleManualOverride = () => {
    setActiveDiscrepancy(null);
    setToastMessage('Pharmacist Manual Override Authorized. Dispenser unlocked.');
    setTimeout(() => setToastMsgNull(), 4000);
  };

  const verifiedCount = prescriptionItems.filter((i) => i.status === 'VERIFIED_MATCH').length;
  const isFullyDispensed = verifiedCount === prescriptionItems.length;

  return (
    <div className="space-y-5 font-sans">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-inner backdrop-blur-md">
              <Barcode className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">Barcode Dispenser & Safety Verification</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-500/30 text-blue-200 border border-blue-400/40">
                  2D Scanner Hardware Sync
                </span>
              </div>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Instant Hardware Integration • Metallic Blue Match Highlight • Hard-Stop Discrepancy Lock
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
              <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Scanned Verified</div>
              <div className="text-lg font-black text-emerald-400">{verifiedCount} / {prescriptionItems.length} Items</div>
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

      {/* HARD-STOP DISCREPANCY ALERT PANEL */}
      {activeDiscrepancy && (
        <div className="p-5 rounded-2xl bg-red-600 text-white border-2 border-red-400 shadow-2xl space-y-3 animate-in zoom-in-95">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <AlertOctagon className="w-8 h-8 text-white shrink-0 animate-bounce" />
              <div>
                <h3 className="text-base font-black uppercase tracking-wider">HARD-STOP DISCREPANCY WARNING PANEL</h3>
                <p className="text-xs text-red-100 font-extrabold mt-0.5">{activeDiscrepancy.reason}</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-red-950/70 rounded-xl border border-red-400/40 text-xs font-bold text-red-200 flex justify-between items-center">
            <span>Scanned Code: <strong className="font-mono text-white">{activeDiscrepancy.scannedCode}</strong></span>
            <button
              onClick={handleManualOverride}
              className="px-3.5 py-1.5 rounded-xl bg-white text-red-950 font-black text-xs hover:bg-red-50 shadow-md"
            >
              Authorize Pharmacist Manual Override
            </button>
          </div>
        </div>
      )}

      {/* SCANNER HARDWARE SIMULATOR INPUT BAR */}
      <div className="p-4 rounded-2xl backdrop-blur-md bg-white/80 border border-slate-200 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase text-slate-800 flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-600" /> 2D Barcode Scanner Hardware Reader Input
          </h3>
          <span className="text-[10px] font-mono text-slate-500 font-bold">Listen Mode: ACTIVE</span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSimulateScan(scannedInput);
          }}
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <Barcode className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Scan medication barcode box (e.g. BC-AUGMENTIN-625, BC-PAN-40, BC-DOLO-650)..."
              value={scannedInput}
              onChange={(e) => setScannedInput(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-mono text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Simulate Hardware Scan</span>
          </button>
        </form>

        <div className="flex flex-wrap gap-2 text-xs font-bold pt-1">
          <span className="text-slate-500">Quick Test Scans:</span>
          <button
            onClick={() => handleSimulateScan('BC-AUGMENTIN-625')}
            className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
          >
            Scan Augmentin 625mg
          </button>
          <button
            onClick={() => handleSimulateScan('BC-PAN-40')}
            className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
          >
            Scan Pan 40mg
          </button>
          <button
            onClick={() => handleSimulateScan('BC-WRONG-MEDICINE')}
            className="px-2.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
          >
            Scan Mismatched Drug (Trigger Alert)
          </button>
        </div>
      </div>

      {/* PRESCRIPTION ITEMS TABLE WITH METALLIC BLUE MATCH HIGHLIGHT */}
      <div className="p-5 rounded-2xl backdrop-blur-md bg-white/80 border border-slate-200 shadow-lg space-y-4">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-blue-700 tracking-wider">Patient Active E-Prescription</span>
            <h3 className="text-base font-black text-slate-900">{patientName}</h3>
          </div>
          {isFullyDispensed ? (
            <span className="erp-badge-green text-xs flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Fully Dispensed
            </span>
          ) : (
            <span className="erp-badge-blue text-xs flex items-center gap-1">
              <Barcode className="w-4 h-4 text-blue-600" /> Verification Pending
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="erp-table">
            <thead>
              <tr>
                <th>Prescribed Medication</th>
                <th>Dose & Route</th>
                <th>Expected 2D Barcode</th>
                <th>Scan Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {prescriptionItems.map((item) => {
                const isMatched = item.status === 'VERIFIED_MATCH';

                return (
                  <tr
                    key={item.id}
                    className={`transition-all ${
                      isMatched
                        ? 'bg-blue-600/20 border-l-4 border-l-blue-600 text-blue-950 font-extrabold shadow-lg shadow-blue-500/10 ring-2 ring-blue-500/30'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="font-extrabold text-slate-900 text-xs">
                      <div>{item.drugName}</div>
                    </td>
                    <td className="text-xs font-bold text-slate-700">{item.prescribedDose} ({item.route})</td>
                    <td className="font-mono text-xs text-slate-500 font-bold">{item.expectedBarcode}</td>
                    <td>
                      {isMatched ? (
                        <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-black text-xs flex items-center gap-1.5 w-fit shadow-md animate-in zoom-in-95">
                          <CheckCircle2 className="w-3.5 h-3.5" /> METALLIC BLUE MATCH VERIFIED
                        </span>
                      ) : (
                        <span className="erp-badge-yellow text-xs flex items-center gap-1 w-fit">
                          <Barcode className="w-3.5 h-3.5 text-amber-600" /> Awaiting Scanner Input
                        </span>
                      )}
                    </td>
                    <td>
                      {!isMatched && (
                        <button
                          onClick={() => handleSimulateScan(item.expectedBarcode)}
                          className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center gap-1"
                        >
                          <Zap className="w-3 h-3 fill-current" />
                          <span>Scan Item</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
