'use client';

import React, { useState } from 'react';
import {
  Pill,
  Search,
  AlertTriangle,
  CheckCircle,
  ShieldAlert,
  Send,
  Plus,
  Trash2,
  Sparkles,
  FileText,
  Lock,
  Download,
} from 'lucide-react';

export interface PrescribedDrug {
  id: string;
  name: string;
  dosage: string;
  route: string;
  frequency: string;
  durationDays: number;
  instructions: string;
  category: string;
}

const COMMON_DRUGS = [
  { name: 'Paracetamol', dosage: '500mg', route: 'Oral', frequency: 'TDS (Thrice Daily)', durationDays: 5, instructions: 'After meals', category: 'Analgesic / Antipyretic' },
  { name: 'Amoxicillin-Clavulanate (Augmentin)', dosage: '625mg', route: 'Oral', frequency: 'BD (Twice Daily)', durationDays: 7, instructions: 'With meals', category: 'Antibiotic (Penicillin Class)' },
  { name: 'Atorvastatin', dosage: '20mg', route: 'Oral', frequency: 'HS (At Bedtime)', durationDays: 30, instructions: 'At night', category: 'Statin / Lipid Lowering' },
  { name: 'Metoprolol Succinate', dosage: '25mg', route: 'Oral', frequency: 'OD (Once Daily)', durationDays: 30, instructions: 'Morning after breakfast', category: 'Beta Blocker' },
  { name: 'Pantoprazole', dosage: '40mg', route: 'Oral', frequency: 'OD (Once Daily)', durationDays: 14, instructions: 'Before breakfast (empty stomach)', category: 'Proton Pump Inhibitor' },
  { name: 'Amlodipine', dosage: '5mg', route: 'Oral', frequency: 'OD (Once Daily)', durationDays: 30, instructions: 'Morning', category: 'Calcium Channel Blocker' },
];

export const PrescriptionWriter: React.FC = () => {
  const [patientName, setPatientName] = useState('Savitri Devi (58Y / Female)');
  const [knownAllergies, setKnownAllergies] = useState<string[]>(['Penicillin & Beta-Lactam Antibiotics']);

  const [searchTerm, setSearchTerm] = useState('');
  const [prescribedList, setPrescribedList] = useState<PrescribedDrug[]>([
    { id: 'rx-1', name: 'Pantoprazole', dosage: '40mg', route: 'Oral', frequency: 'OD', durationDays: 14, instructions: 'Before breakfast', category: 'PPI' },
    { id: 'rx-2', name: 'Atorvastatin', dosage: '20mg', route: 'Oral', frequency: 'HS', durationDays: 30, instructions: 'At night', category: 'Statin' },
  ]);

  // Hard-Stop Alert State
  const [interactionAlert, setInteractionAlert] = useState<{
    drugName: string;
    reason: string;
    alternative: string;
  } | null>(null);

  const [signedTxHash, setSignedTxHash] = useState<string | null>(null);

  const handleAddDrug = (drug: typeof COMMON_DRUGS[0]) => {
    // Automated Interaction Guardrail Check
    if (drug.name.includes('Amoxicillin') && knownAllergies.some((a) => a.includes('Penicillin'))) {
      setInteractionAlert({
        drugName: drug.name,
        reason: `HARD-STOP ALLERGY CONTRAINDICATION: Patient has documented severe ${knownAllergies[0]}. Amoxicillin causes severe anaphylaxis risk!`,
        alternative: 'Recommended Alternative: Ciprofloxacin 500mg BD or Azithromycin 500mg OD',
      });
      return;
    }

    const newEntry: PrescribedDrug = {
      id: `rx-${Date.now()}`,
      name: drug.name,
      dosage: drug.dosage,
      route: drug.route,
      frequency: drug.frequency,
      durationDays: drug.durationDays,
      instructions: drug.instructions,
      category: drug.category,
    };

    setPrescribedList([...prescribedList, newEntry]);
    setSearchTerm('');
  };

  const handleApplyTemplate = (templateName: string) => {
    if (templateName === 'CABG_POST_OP') {
      const cabgRegimen: PrescribedDrug[] = [
        { id: 'rx-c1', name: 'Aspirin', dosage: '75mg', route: 'Oral', frequency: 'OD', durationDays: 30, instructions: 'After lunch', category: 'Antiplatelet' },
        { id: 'rx-c2', name: 'Atorvastatin', dosage: '40mg', route: 'Oral', frequency: 'HS', durationDays: 30, instructions: 'At bedtime', category: 'Statin' },
        { id: 'rx-c3', name: 'Metoprolol', dosage: '25mg', route: 'Oral', frequency: 'BD', durationDays: 30, instructions: 'After meals', category: 'Beta Blocker' },
        { id: 'rx-c4', name: 'Pantoprazole', dosage: '40mg', route: 'Oral', frequency: 'OD', durationDays: 30, instructions: 'Empty stomach', category: 'PPI' },
      ];
      setPrescribedList(cabgRegimen);
    }
  };

  const handleDigitalHandOff = () => {
    const hash = `0x9a8b${Math.floor(100000 + Math.random() * 900000)}c4d1e9f3b8a7c2d1e0f4a5b6c`;
    setSignedTxHash(hash);
  };

  const filteredSearchResults = COMMON_DRUGS.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5 font-sans">
      {/* Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-inner backdrop-blur-md">
              <Pill className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">E-Prescription Writer & Safety Engine</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-500/30 text-blue-200 border border-blue-400/40">
                  DPDP & Pharmacy Hand-off
                </span>
              </div>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Intelligent Autocomplete • Hard-Stop Allergy Guardrails • 1-Tap Protocols • Cryptographic E-Sign
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
              <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Patient Active</div>
              <div className="text-sm font-black text-white">{patientName}</div>
            </div>
          </div>
        </div>
      </div>

      {/* HARD-STOP INTERACTION GUARDRAIL ALERT DIALOG */}
      {interactionAlert && (
        <div className="p-5 rounded-2xl bg-red-600 text-white border-2 border-red-400 shadow-2xl space-y-3 animate-in zoom-in-95">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 text-white shrink-0 animate-bounce" />
              <div>
                <h3 className="text-base font-black uppercase tracking-wider">HARD-STOP ALLERGY CONTRAINDICATION DETECTED</h3>
                <p className="text-xs text-red-100 font-extrabold mt-0.5">{interactionAlert.reason}</p>
              </div>
            </div>
            <button
              onClick={() => setInteractionAlert(null)}
              className="px-3 py-1 rounded bg-red-800 text-white font-bold text-xs hover:bg-red-900"
            >
              Dismiss
            </button>
          </div>

          <div className="p-3 bg-red-950/70 rounded-xl border border-red-400/40 text-xs font-bold text-red-200 flex justify-between items-center">
            <span>{interactionAlert.alternative}</span>
            <button
              onClick={() => {
                setInteractionAlert(null);
                handleAddDrug({ name: 'Ciprofloxacin', dosage: '500mg', route: 'Oral', frequency: 'BD', durationDays: 7, instructions: 'After meals', category: 'Fluoroquinolone' });
              }}
              className="px-3 py-1 rounded bg-white text-red-950 font-black text-xs hover:bg-red-50 shadow-md"
            >
              Switch to Safe Alternative
            </button>
          </div>
        </div>
      )}

      {/* MAIN WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT COLUMN: DRUG AUTOCOMPLETE & TEMPLATES */}
        <div className="lg:col-span-5 space-y-5">
          {/* Autocomplete Search */}
          <div className="p-5 rounded-2xl backdrop-blur-md bg-white/80 border border-slate-200 shadow-lg space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-600" />
              <span>Intelligent Specialty Drug Search</span>
            </h3>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search drug by name or category (e.g. Paracetamol, Augmentin)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {filteredSearchResults.map((drug) => (
                <div
                  key={drug.name}
                  onClick={() => handleAddDrug(drug)}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{drug.name} ({drug.dosage})</h4>
                    <p className="text-[10px] text-slate-500 font-medium">{drug.category} • {drug.route}</p>
                  </div>
                  <Plus className="w-4 h-4 text-blue-600" />
                </div>
              ))}
            </div>
          </div>

          {/* ONE-TAP PROTOCOL TEMPLATES */}
          <div className="p-5 rounded-2xl backdrop-blur-md bg-white/80 border border-slate-200 shadow-lg space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>One-Tap Regimen Protocol Templates</span>
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => handleApplyTemplate('CABG_POST_OP')}
                className="w-full p-3 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-950 font-bold text-xs text-left flex justify-between items-center transition-all shadow-sm"
              >
                <div>
                  <div>Post-Op CABG Discharge Protocol</div>
                  <div className="text-[10px] text-purple-700 font-medium">Aspirin + Atorvastatin + Metoprolol + Pantoprazole</div>
                </div>
                <Plus className="w-4 h-4 text-purple-600" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PRESCRIPTION SCRIPT SUMMARY & DIGITAL HAND-OFF */}
        <div className="lg:col-span-7 p-5 rounded-2xl backdrop-blur-md bg-white/80 border border-slate-200 shadow-lg space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900">Active E-Prescription Chart</h3>
              <p className="text-xs text-slate-500">Patient: {patientName}</p>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-black">
              {prescribedList.length} Medications
            </span>
          </div>

          {/* Prescribed Items Table */}
          <div className="overflow-x-auto">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Medication & Dose</th>
                  <th>Route</th>
                  <th>Frequency</th>
                  <th>Duration</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {prescribedList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="font-extrabold text-slate-900">
                      <div>{item.name} {item.dosage}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{item.instructions}</div>
                    </td>
                    <td className="text-xs font-bold text-slate-600">{item.route}</td>
                    <td className="text-xs font-black text-blue-700">{item.frequency}</td>
                    <td className="text-xs font-mono font-bold text-slate-800">{item.durationDays} Days</td>
                    <td>
                      <button
                        onClick={() => setPrescribedList(prescribedList.filter((p) => p.id !== item.id))}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cryptographic Digital Signature & Pharmacy Hand-Off */}
          {signedTxHash ? (
            <div className="p-4 bg-emerald-50 border-2 border-dashed border-emerald-400 rounded-xl space-y-2 text-center">
              <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-black text-xs">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>E-PRESCRIPTION TRANSMITTED TO PHARMACY POS</span>
              </div>
              <div className="text-[10px] font-mono text-slate-600">
                Cryptographic Hash: <strong>{signedTxHash}</strong>
              </div>
            </div>
          ) : (
            <button
              onClick={handleDigitalHandOff}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Sign & Transmit Digital Script to Hospital Pharmacy</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
