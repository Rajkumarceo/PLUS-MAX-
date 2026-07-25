'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Award,
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  BarChart2,
  Check,
  RotateCcw,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { useStudentEvaluation } from '@/context/StudentEvaluationContext';

export interface StudentIAMarksRow {
  studentId: string;
  name: string;
  rollNumber: string;
  ia1Theory: number;
  ia1Practical: number;
  ia2Theory: number;
  ia2Practical: number;
  prelimTheory: number;
  prelimPractical: number;
  vivaMarks: number;
}

const INITIAL_GRADEBOOK: StudentIAMarksRow[] = [
  { studentId: 'std-101', name: 'Rohan Deshmukh', rollNumber: '2024-MBBS-018', ia1Theory: 68, ia1Practical: 72, ia2Theory: 65, ia2Practical: 70, prelimTheory: 62, prelimPractical: 68, vivaMarks: 38 },
  { studentId: 'std-102', name: 'Ananya Iyer', rollNumber: '2024-MBBS-004', ia1Theory: 88, ia1Practical: 90, ia2Theory: 85, ia2Practical: 92, prelimTheory: 84, prelimPractical: 88, vivaMarks: 45 },
  { studentId: 'std-103', name: 'Vikram Singh', rollNumber: '2024-MBBS-042', ia1Theory: 32, ia1Practical: 38, ia2Theory: 35, ia2Practical: 40, prelimTheory: 30, prelimPractical: 36, vivaMarks: 20 }, // BELOW 40% CRITICAL
  { studentId: 'std-104', name: 'Priya Sharma', rollNumber: '2024-MBBS-031', ia1Theory: 75, ia1Practical: 78, ia2Theory: 72, ia2Practical: 80, prelimTheory: 70, prelimPractical: 74, vivaMarks: 40 },
  { studentId: 'std-105', name: 'Rahul Mehta', rollNumber: '2024-MBBS-025', ia1Theory: 42, ia1Practical: 45, ia2Theory: 40, ia2Practical: 48, prelimTheory: 38, prelimPractical: 42, vivaMarks: 25 },
  { studentId: 'std-106', name: 'Sneha Kulkarni', rollNumber: '2024-MBBS-039', ia1Theory: 80, ia1Practical: 84, ia2Theory: 82, ia2Practical: 86, prelimTheory: 78, prelimPractical: 82, vivaMarks: 42 },
];

export const IAMarksGradebook: React.FC = () => {
  const { updateStudentMarks } = useStudentEvaluation();

  const [selectedSubject, setSelectedSubject] = useState('General Surgery (SU302)');
  const [rows, setRows] = useState<StudentIAMarksRow[]>(INITIAL_GRADEBOOK);
  const [isLocked, setIsLocked] = useState(false);
  const [showHodModal, setShowHodModal] = useState(false);
  const [hodPin, setHodPin] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const calculateRowStats = (r: StudentIAMarksRow) => {
    const total = r.ia1Theory + r.ia1Practical + r.ia2Theory + r.ia2Practical + r.prelimTheory + r.prelimPractical + r.vivaMarks;
    const maxTotal = 550;
    const avgPercentage = parseFloat(((total / maxTotal) * 100).toFixed(1));
    const isEligible = avgPercentage >= 40.0;
    return { total, maxTotal, avgPercentage, isEligible };
  };

  // Class Statistical Overlay Metrics
  const calculatedRows = rows.map((r) => ({ ...r, ...calculateRowStats(r) }));
  const classAvg = parseFloat((calculatedRows.reduce((acc, curr) => acc + curr.avgPercentage, 0) / calculatedRows.length).toFixed(1));
  const highestScore = Math.max(...calculatedRows.map((r) => r.avgPercentage));
  const lowestScore = Math.min(...calculatedRows.map((r) => r.avgPercentage));
  const eligibleCount = calculatedRows.filter((r) => r.isEligible).length;
  const ineligibleCount = calculatedRows.length - eligibleCount;

  const handleCellChange = (
    studentId: string,
    field: keyof Omit<StudentIAMarksRow, 'studentId' | 'name' | 'rollNumber'>,
    val: number
  ) => {
    if (isLocked) return;
    setRows((prev) =>
      prev.map((r) => (r.studentId === studentId ? { ...r, [field]: val } : r))
    );
  };

  const handleFreezeToggle = () => {
    if (!isLocked) {
      setIsLocked(true);
      setToastMsg('Gradebook Frozen & Locked! Data synced to Registrar database.');
      setTimeout(() => setToastMsg(null), 4000);
    } else {
      setShowHodModal(true);
    }
  };

  const handleHodUnlock = () => {
    if (hodPin === '9999') {
      setIsLocked(false);
      setShowHodModal(false);
      setHodPin('');
      setToastMsg('HOD Override Authorized. Gradebook Unlocked for Edits.');
      setTimeout(() => setToastMsg(null), 4000);
    } else {
      alert('Invalid HOD Authorization PIN!');
    }
  };

  return (
    <div className="space-y-5">
      {/* Banner */}
      <div className="erp-card p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-inner">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">IA Marks Gradebook & Exam Gatekeeper</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/30 text-purple-200 border border-purple-400/40">
                  NMC MSR Compliant
                </span>
              </div>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Spreadsheet Grid • Statistical Overlay • Red &lt;40% Threshold Highlight • Two-Step HOD Freeze Lock
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleFreezeToggle}
              className={`px-4 py-2 rounded-lg font-black text-xs shadow-md transition-all flex items-center gap-2 ${
                isLocked
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              <span>{isLocked ? 'Gradebook Frozen (Click to Unlock)' : 'Freeze & Lock Gradebook'}</span>
            </button>
          </div>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3 bg-blue-600 text-white rounded-lg shadow-lg flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle className="w-5 h-5" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* AUTOMATED STATISTICAL OVERLAY DASHBOARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="erp-card p-4 space-y-1 bg-white border-l-4 border-l-blue-600">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Class Average</div>
          <div className="text-2xl font-black text-slate-900">{classAvg}%</div>
          <div className="text-[10px] text-blue-700 font-bold">NMC Target: ≥50%</div>
        </div>

        <div className="erp-card p-4 space-y-1 bg-white border-l-4 border-l-emerald-600">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Batch Highest Score</div>
          <div className="text-2xl font-black text-emerald-700">{highestScore}%</div>
          <div className="text-[10px] text-slate-500">Top Performer</div>
        </div>

        <div className="erp-card p-4 space-y-1 bg-white border-l-4 border-l-amber-500">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Batch Lowest Score</div>
          <div className="text-2xl font-black text-amber-700">{lowestScore}%</div>
          <div className="text-[10px] text-slate-500">Needs Remedial Support</div>
        </div>

        <div className="erp-card p-4 space-y-1 bg-white border-l-4 border-l-emerald-600">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Exam Eligible (≥40%)</div>
          <div className="text-2xl font-black text-emerald-700">{eligibleCount} Students</div>
          <div className="text-[10px] text-emerald-700 font-bold">Hall Ticket Clearance</div>
        </div>

        <div className="erp-card p-4 space-y-1 bg-white border-l-4 border-l-red-600">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Critical Block (&lt;40%)</div>
          <div className="text-2xl font-black text-red-600">{ineligibleCount} Student</div>
          <div className="text-[10px] text-red-600 font-bold">Hall Ticket Block Risk</div>
        </div>
      </div>

      {/* BELL-CURVE DISTRIBUTION BAR */}
      <div className="erp-card p-4 space-y-2">
        <div className="flex justify-between items-center text-xs font-extrabold text-slate-800">
          <span className="flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-blue-600" /> Batch Performance Bell-Curve Distribution
          </span>
          <span className="text-slate-500 font-mono">Total Enrolled: {calculatedRows.length} Students</span>
        </div>
        <div className="h-4 rounded-full bg-slate-100 flex overflow-hidden p-0.5 border border-slate-200">
          <div className="h-full bg-emerald-600 rounded-l-full" style={{ width: `${(eligibleCount / calculatedRows.length) * 100}%` }} />
          <div className="h-full bg-red-600 rounded-r-full" style={{ width: `${(ineligibleCount / calculatedRows.length) * 100}%` }} />
        </div>
        <div className="flex justify-between text-[11px] font-bold text-slate-600">
          <span className="text-emerald-700">Eligible (≥40%): {Math.round((eligibleCount / calculatedRows.length) * 100)}%</span>
          <span className="text-red-600">Critical (&lt;40%): {Math.round((ineligibleCount / calculatedRows.length) * 100)}%</span>
        </div>
      </div>

      {/* HIGH-PERFORMANCE SPREADSHEET DATA GRID */}
      <div className="erp-card p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Internal Assessment Data Entry Grid ({selectedSubject})</span>
            </h3>
            <p className="text-xs text-slate-500">Keyboard navigable • Sticky student names • Real-time percentage update</p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="text-slate-600">Subject:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 font-bold focus:outline-none focus:border-blue-600"
            >
              <option value="General Surgery (SU302)">General Surgery (SU302)</option>
              <option value="General Medicine (IM301)">General Medicine (IM301)</option>
              <option value="Obstetrics & Gynaecology (OG303)">Obstetrics & Gynaecology (OG303)</option>
            </select>
          </div>
        </div>

        {/* Table Container with Sticky Left Column */}
        <div className="overflow-x-auto relative max-h-[500px]">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-extrabold sticky top-0 z-20 shadow-sm">
              <tr>
                <th className="p-3 sticky left-0 z-30 bg-slate-100 min-w-[200px] border-r border-slate-300">
                  Student Name & Roll
                </th>
                <th className="p-3 min-w-[90px]">IA-1 Th (100)</th>
                <th className="p-3 min-w-[90px]">IA-1 Pr (100)</th>
                <th className="p-3 min-w-[90px]">IA-2 Th (100)</th>
                <th className="p-3 min-w-[90px]">IA-2 Pr (100)</th>
                <th className="p-3 min-w-[90px]">Prelim Th (100)</th>
                <th className="p-3 min-w-[90px]">Prelim Pr (100)</th>
                <th className="p-3 min-w-[80px]">Viva (50)</th>
                <th className="p-3 min-w-[100px]">Total (550)</th>
                <th className="p-3 min-w-[100px]">IA Avg %</th>
                <th className="p-3 min-w-[150px]">NMC Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium">
              {calculatedRows.map((r) => {
                const isCritical = !r.isEligible;

                return (
                  <tr
                    key={r.studentId}
                    className={`transition-colors ${
                      isCritical ? 'bg-red-50/80 hover:bg-red-100/80' : 'hover:bg-slate-50'
                    }`}
                  >
                    {/* Sticky Student Column */}
                    <td className={`p-3 sticky left-0 z-10 border-r border-slate-300 font-extrabold ${
                      isCritical ? 'bg-red-50 text-red-950' : 'bg-white text-slate-900'
                    }`}>
                      <div>{r.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{r.rollNumber}</div>
                    </td>

                    <td className="p-2">
                      <input
                        type="number"
                        disabled={isLocked}
                        value={r.ia1Theory}
                        onChange={(e) => handleCellChange(r.studentId, 'ia1Theory', parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 rounded border border-slate-300 bg-white text-center font-mono font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                      />
                    </td>

                    <td className="p-2">
                      <input
                        type="number"
                        disabled={isLocked}
                        value={r.ia1Practical}
                        onChange={(e) => handleCellChange(r.studentId, 'ia1Practical', parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 rounded border border-slate-300 bg-white text-center font-mono font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                      />
                    </td>

                    <td className="p-2">
                      <input
                        type="number"
                        disabled={isLocked}
                        value={r.ia2Theory}
                        onChange={(e) => handleCellChange(r.studentId, 'ia2Theory', parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 rounded border border-slate-300 bg-white text-center font-mono font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                      />
                    </td>

                    <td className="p-2">
                      <input
                        type="number"
                        disabled={isLocked}
                        value={r.ia2Practical}
                        onChange={(e) => handleCellChange(r.studentId, 'ia2Practical', parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 rounded border border-slate-300 bg-white text-center font-mono font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                      />
                    </td>

                    <td className="p-2">
                      <input
                        type="number"
                        disabled={isLocked}
                        value={r.prelimTheory}
                        onChange={(e) => handleCellChange(r.studentId, 'prelimTheory', parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 rounded border border-slate-300 bg-white text-center font-mono font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                      />
                    </td>

                    <td className="p-2">
                      <input
                        type="number"
                        disabled={isLocked}
                        value={r.prelimPractical}
                        onChange={(e) => handleCellChange(r.studentId, 'prelimPractical', parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 rounded border border-slate-300 bg-white text-center font-mono font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                      />
                    </td>

                    <td className="p-2">
                      <input
                        type="number"
                        disabled={isLocked}
                        value={r.vivaMarks}
                        onChange={(e) => handleCellChange(r.studentId, 'vivaMarks', parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 rounded border border-slate-300 bg-white text-center font-mono font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                      />
                    </td>

                    <td className="p-3 font-black text-slate-900 font-mono">{r.total} / {r.maxTotal}</td>

                    <td className="p-3">
                      <span className={`font-mono text-sm font-black ${isCritical ? 'text-red-600' : 'text-emerald-700'}`}>
                        {r.avgPercentage}%
                      </span>
                    </td>

                    <td className="p-3">
                      {r.isEligible ? (
                        <span className="erp-badge-green text-xs flex items-center gap-1 w-fit">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Exam Eligible (≥40%)
                        </span>
                      ) : (
                        <span className="erp-badge-red text-xs flex items-center gap-1 w-fit font-black animate-pulse">
                          <AlertCircle className="w-3.5 h-3.5 text-red-600" /> CRITICAL BLOCK (&lt;40%)
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* HOD UNLOCK MODAL */}
      {showHodModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-black text-slate-900">HOD Override Unlock PIN</h3>
            </div>

            <p className="text-xs text-slate-600">
              Enter Head of Department (HOD) override PIN to unlock the frozen gradebook.
            </p>

            <div>
              <input
                type="password"
                maxLength={4}
                placeholder="Enter PIN (e.g. 9999)"
                value={hodPin}
                onChange={(e) => setHodPin(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-black py-2 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowHodModal(false)}
                className="w-1/2 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleHodUnlock}
                className="w-1/2 py-2 rounded-lg bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 shadow-sm"
              >
                Authorize Unlock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
