'use client';

import React, { useState } from 'react';
import { useStudentEvaluation } from '@/context/StudentEvaluationContext';
import {
  GraduationCap,
  CheckCircle,
  AlertCircle,
  Calendar,
  BookOpen,
  Clock,
  ShieldCheck,
  FileCheck,
  Send,
} from 'lucide-react';

export const StudentDashboardView: React.FC = () => {
  const { students, logbookSubmissions, addStudentLogbookEntry } = useStudentEvaluation();

  // Find Rohan Deshmukh's record
  const student = students.find((s) => s.studentId === 'std-101') || students[0];

  const [newCompetencyCode, setNewCompetencyCode] = useState('OG8.2 - Antenatal Care & Fetal Monitoring');
  const [newLevel, setNewLevel] = useState<'PERFORMED' | 'ASSISTED' | 'OBSERVED'>('PERFORMED');
  const [newNotes, setNewNotes] = useState('');
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);

  const handleAddLogbookEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotes.trim()) return;

    addStudentLogbookEntry(newCompetencyCode, newLevel, newNotes);
    setNewNotes('');
    setShowSubmitSuccess(true);
    setTimeout(() => setShowSubmitSuccess(false), 3500);
  };

  if (!student) return null;

  return (
    <div className="space-y-5">
      {/* Student Personal Banner & Data Boundaries Notice */}
      <div className="erp-card p-4 bg-white border-l-4 border-l-blue-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-blue-50 text-blue-700 flex items-center justify-center font-extrabold">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-slate-900">{student.name}</h2>
              <span className="erp-badge-blue">{student.rollNumber}</span>
            </div>
            <p className="text-xs text-slate-500">
              {student.course} • Semester {student.semester}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200 font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Strict Student Portal Context (User ID: {student.studentId})</span>
        </div>
      </div>

      {/* 4 Dynamic Stat Cards (Synchronized with Faculty Grading Desk) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance Metric */}
        <div className="erp-card p-4 space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Overall Attendance</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{student.attendancePercentage}%</div>
          <div className="text-[11px] font-semibold text-emerald-700">
            {student.attendancePercentage >= 75
              ? 'Above 75% NMC Mandatory Limit'
              : 'Warning: Below 75% Attendance'}
          </div>
        </div>

        {/* Internal Marks (40% Gatekeeper) */}
        <div className="erp-card p-4 space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Internal Assessment Score</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{student.iaTotalPercentage}%</div>
          <div className="text-[11px] font-bold text-emerald-700">
            {student.isIaEligible ? (
              <span className="text-emerald-700">Eligible for University Exam (≥40%)</span>
            ) : (
              <span className="text-red-600">Ineligible (&lt;40% Threshold)</span>
            )}
          </div>
        </div>

        {/* Fee Payment Status */}
        <div className="erp-card p-4 space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Semester Fee Status</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">{student.feeStatus}</div>
          <div className="text-[11px] text-slate-500 font-medium">Pending Balance: ₹0.00</div>
        </div>

        {/* Assigned Clinical Ward */}
        <div className="erp-card p-4 space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Active Clinical Posting</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-sm font-extrabold text-slate-900 truncate">{student.assignedWard}</div>
          <div className="text-[11px] text-blue-700 font-semibold">Ends Aug 15, 2026</div>
        </div>
      </div>

      {/* Main Student Work Area: Submit Entry + Real-Time Logbook History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Submit New NMC CBME Logbook Entry */}
        <div className="lg:col-span-5 erp-card space-y-4 p-4">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-extrabold text-slate-900">Submit NMC CBME Logbook Entry</h3>
            </div>
            {showSubmitSuccess && (
              <span className="erp-badge-green text-[10px]">Submitted to Faculty Queue!</span>
            )}
          </div>

          <form onSubmit={handleAddLogbookEntry} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">NMC Competency Code</label>
              <select
                value={newCompetencyCode}
                onChange={(e) => setNewCompetencyCode(e.target.value)}
                className="w-full px-3 py-1.5 rounded border border-slate-300 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600"
              >
                <option value="OG8.2 - Antenatal Care & Fetal Monitoring">
                  OG8.2 - Antenatal Care & Fetal Monitoring
                </option>
                <option value="SU11.1 - Pre-operative Surgical Checklist">
                  SU11.1 - Pre-operative Surgical Checklist
                </option>
                <option value="IM3.4 - Acute ECG Interpretation">
                  IM3.4 - Acute ECG Interpretation
                </option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Level of Participation</label>
              <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                {(['PERFORMED', 'ASSISTED', 'OBSERVED'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setNewLevel(lvl)}
                    className={`py-1.5 rounded border text-center transition-all ${
                      newLevel === lvl
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Clinical Procedure Notes</label>
              <textarea
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                rows={3}
                required
                placeholder="Describe patient case details, clinical findings, and procedure performed under supervision..."
                className="w-full px-3 py-2 rounded border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Entry to Faculty Queue</span>
            </button>
          </form>
        </div>

        {/* Right Column: High-Density Synchronized Logbook History */}
        <div className="lg:col-span-7 erp-card">
          <div className="erp-card-header flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900">Registered Logbook History & Faculty E-Signs</h3>
            <span className="text-xs font-bold text-slate-500">
              {logbookSubmissions.filter((l) => l.studentId === 'std-101').length} Entries Registered
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Competency Code</th>
                  <th>Level</th>
                  <th>Faculty E-Sign Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {logbookSubmissions
                  .filter((l) => l.studentId === 'std-101')
                  .map((entry) => (
                    <tr key={entry.id}>
                      <td className="font-extrabold text-slate-900">
                        <div>{entry.competencyCode}</div>
                        <div className="text-[10px] text-slate-500 font-mono font-normal line-clamp-1">
                          {entry.procedureNotes}
                        </div>
                      </td>
                      <td>
                        <span className="erp-badge-blue">{entry.performedLevel}</span>
                      </td>
                      <td>
                        {entry.status === 'SIGNED' ? (
                          <div className="space-y-0.5">
                            <span className="erp-badge-green flex items-center gap-1 w-fit">
                              <CheckCircle className="w-3 h-3 text-emerald-600" /> Signed: {entry.signedBy}
                            </span>
                            {entry.signatureHash && (
                              <div className="text-[9px] font-mono text-emerald-700">{entry.signatureHash}</div>
                            )}
                          </div>
                        ) : entry.status === 'REVISION_REQUESTED' ? (
                          <span className="erp-badge-yellow flex items-center gap-1 w-fit">
                            <AlertCircle className="w-3 h-3 text-amber-600" /> Revision: {entry.facultyFeedback}
                          </span>
                        ) : (
                          <span className="erp-badge-blue flex items-center gap-1 w-fit">
                            <Clock className="w-3 h-3 text-blue-600" /> Pending Faculty E-Sign
                          </span>
                        )}
                      </td>
                      <td className="text-slate-500 text-xs font-mono">{entry.submissionDate}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
