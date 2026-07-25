'use client';

import React, { useState } from 'react';
import { useStudentEvaluation } from '@/context/StudentEvaluationContext';
import {
  FileCheck,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Award,
  Users,
  Star,
  Check,
  X,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const StaffEvaluationDesk: React.FC = () => {
  const {
    students,
    logbookSubmissions,
    approveLogbookEntry,
    requestLogbookRevision,
    updateStudentMarks,
    updateStudentAttendance,
  } = useStudentEvaluation();

  const [activeSubTab, setActiveSubTab] = useState<'logbook' | 'ia_marks' | 'attendance'>('logbook');
  const [facultyName, setFacultyName] = useState('Dr. Rajesh Kumar (HOD Surgery)');
  const [revisionFeedback, setRevisionFeedback] = useState('');
  const [selectedLogForRevision, setSelectedLogForRevision] = useState<string | null>(null);

  // Editable local marks state for Module B
  const [selectedSubject, setSelectedSubject] = useState('General Surgery');
  const [editingMarks, setEditingMarks] = useState<
    Record<string, { theory: number; practical: number; viva: number }>
  >(() => {
    const initial: Record<string, { theory: number; practical: number; viva: number }> = {};
    students.forEach((s) => {
      initial[s.studentId] = {
        theory: s.theoryMarks,
        practical: s.practicalMarks,
        viva: s.vivaMarks,
      };
    });
    return initial;
  });

  const handleMarkChange = (
    studentId: string,
    field: 'theory' | 'practical' | 'viva',
    val: number
  ) => {
    setEditingMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: val,
      },
    }));
  };

  const handleSaveMarks = (studentId: string) => {
    const marks = editingMarks[studentId];
    if (marks) {
      updateStudentMarks(studentId, marks.theory, marks.practical, marks.viva);
    }
  };

  return (
    <div className="space-y-5">
      {/* Faculty Evaluation Header */}
      <div className="erp-card p-4 bg-white border-l-4 border-l-blue-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-black">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Faculty Evaluation & Grading Desk</h2>
            <p className="text-xs text-slate-500">
              NMC CBME e-Logbook Sign-off, 40% IA Gatekeeper Gradebook & Ward Attendance
            </p>
          </div>
        </div>

        {/* Sub-tab Switcher Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('logbook')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
              activeSubTab === 'logbook'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Module A: Logbooks ({logbookSubmissions.filter((l) => l.status === 'PENDING').length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('ia_marks')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
              activeSubTab === 'ia_marks'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Module B: IA Marks Entry</span>
          </button>

          <button
            onClick={() => setActiveSubTab('attendance')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
              activeSubTab === 'attendance'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Module C: Ward Attendance</span>
          </button>
        </div>
      </div>

      {/* MODULE A: NMC CBME LOGBOOK REVIEW & E-SIGN DESK */}
      {activeSubTab === 'logbook' && (
        <div className="space-y-4">
          <div className="erp-card p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-blue-600" />
                <span>Pending Student NMC CBME Logbook Submissions</span>
              </h3>
              <span className="erp-badge-blue">Real-Time Sync with Student Portal</span>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {logbookSubmissions.map((log) => (
                <div
                  key={log.id}
                  className={`p-4 rounded-lg border transition-all space-y-3 ${
                    log.status === 'SIGNED'
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : log.status === 'REVISION_REQUESTED'
                      ? 'bg-amber-50/50 border-amber-200'
                      : 'bg-white border-slate-200 hover:border-blue-600'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-slate-900">{log.studentName}</span>
                        <span className="erp-badge-blue">{log.rollNumber}</span>
                        <span className="text-xs font-bold text-blue-600">{log.competencyCode}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Level: <strong>{log.performedLevel}</strong> • Submitted: {log.submissionDate}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div>
                      {log.status === 'SIGNED' ? (
                        <span className="erp-badge-green flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>E-Signed by {log.signedBy}</span>
                        </span>
                      ) : log.status === 'REVISION_REQUESTED' ? (
                        <span className="erp-badge-yellow flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Revision Requested</span>
                        </span>
                      ) : (
                        <span className="erp-badge-blue flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Pending Faculty Review</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Procedure Notes */}
                  <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs text-slate-700 font-mono">
                    <strong className="text-slate-900 font-sans">Procedure Notes: </strong>
                    {log.procedureNotes}
                  </div>

                  {/* Signature Digital Stamp Hash */}
                  {log.signatureHash && (
                    <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-700 bg-emerald-100/60 p-2 rounded border border-emerald-200">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Digital Cryptographic E-Sign Hash: <strong>{log.signatureHash}</strong></span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {log.status === 'PENDING' && (
                    <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
                      <button
                        onClick={() => setSelectedLogForRevision(log.id)}
                        className="px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                        <span>Request Revision</span>
                      </button>

                      <button
                        onClick={() => approveLogbookEntry(log.id, facultyName)}
                        className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve & E-Sign Logbook</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODULE B: INTERNAL ASSESSMENT (IA) MARKS ENTRY GRID */}
      {activeSubTab === 'ia_marks' && (
        <div className="space-y-4">
          <div className="erp-card p-4 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>NMC Internal Assessment (IA) Gradebook Entry</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Calculates IA Total % = (Theory + Practical + Viva) / 250 * 100. Gatekeeper threshold &ge; 40%.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <label className="font-bold text-slate-700">Subject:</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-3 py-1.5 rounded border border-slate-300 bg-slate-50 text-slate-900 font-bold focus:outline-none focus:border-blue-600"
                >
                  <option value="General Surgery">General Surgery (SU)</option>
                  <option value="General Medicine">General Medicine (IM)</option>
                  <option value="Obstetrics & Gynecology">Obstetrics & Gynecology (OG)</option>
                </select>
              </div>
            </div>

            {/* High-Density Interactive Gradebook Table */}
            <div className="overflow-x-auto">
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Student Name & Roll</th>
                    <th>Theory (100)</th>
                    <th>Practical (100)</th>
                    <th>Viva (50)</th>
                    <th>Total (250)</th>
                    <th>IA Total %</th>
                    <th>NMC Eligibility Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((std) => {
                    const currentMarks = editingMarks[std.studentId] || {
                      theory: std.theoryMarks,
                      practical: std.practicalMarks,
                      viva: std.vivaMarks,
                    };
                    const total = currentMarks.theory + currentMarks.practical + currentMarks.viva;
                    const livePercentage = parseFloat(((total / 250) * 100).toFixed(1));
                    const isEligible = livePercentage >= 40.0;

                    return (
                      <tr key={std.studentId} className="hover:bg-slate-50">
                        <td>
                          <div className="font-extrabold text-slate-900">{std.name}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{std.rollNumber}</div>
                        </td>

                        <td>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={currentMarks.theory}
                            onChange={(e) =>
                              handleMarkChange(std.studentId, 'theory', parseInt(e.target.value) || 0)
                            }
                            className="w-16 px-2 py-1 rounded border border-slate-300 bg-white font-bold text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                          />
                        </td>

                        <td>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={currentMarks.practical}
                            onChange={(e) =>
                              handleMarkChange(std.studentId, 'practical', parseInt(e.target.value) || 0)
                            }
                            className="w-16 px-2 py-1 rounded border border-slate-300 bg-white font-bold text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                          />
                        </td>

                        <td>
                          <input
                            type="number"
                            min={0}
                            max={50}
                            value={currentMarks.viva}
                            onChange={(e) =>
                              handleMarkChange(std.studentId, 'viva', parseInt(e.target.value) || 0)
                            }
                            className="w-16 px-2 py-1 rounded border border-slate-300 bg-white font-bold text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                          />
                        </td>

                        <td className="font-black text-slate-900">{total} / 250</td>

                        <td>
                          <span
                            className={`text-sm font-black ${
                              isEligible ? 'text-emerald-700' : 'text-red-600'
                            }`}
                          >
                            {livePercentage}%
                          </span>
                        </td>

                        <td>
                          {isEligible ? (
                            <span className="erp-badge-green flex items-center gap-1 w-fit">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Eligible for Exam (≥40%)</span>
                            </span>
                          ) : (
                            <span className="erp-badge-red flex items-center gap-1 w-fit">
                              <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                              <span>Ineligible - Remedial Needed</span>
                            </span>
                          )}
                        </td>

                        <td>
                          <button
                            onClick={() => handleSaveMarks(std.studentId)}
                            className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Submit & Lock</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODULE C: CLINICAL POSTING & ATTENDANCE EVALUATOR */}
      {activeSubTab === 'attendance' && (
        <div className="erp-card p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Daily Ward Attendance & Clinical Skill Evaluator</span>
              </h3>
              <p className="text-xs text-slate-500">Posting Roster: General Surgery OPD & Ward 4</p>
            </div>
            <span className="erp-badge-blue">Auto-Calculates Overall Attendance %</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {students.map((std) => (
              <div key={std.studentId} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">{std.name}</h4>
                    <p className="text-xs text-slate-500 font-mono">{std.rollNumber}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-blue-600">{std.attendancePercentage}%</div>
                    <span className="text-[10px] text-slate-500">Overall Attendance</span>
                  </div>
                </div>

                {/* Daily Ward Attendance Toggle Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                  <span className="text-xs font-bold text-slate-700">Today's Status:</span>
                  <button
                    onClick={() => updateStudentAttendance(std.studentId, +0.5)}
                    className="px-3 py-1 rounded bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                  >
                    Present (+0.5%)
                  </button>
                  <button
                    onClick={() => updateStudentAttendance(std.studentId, -0.8)}
                    className="px-3 py-1 rounded bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-colors"
                  >
                    Absent (-0.8%)
                  </button>
                  <button
                    onClick={() => updateStudentAttendance(std.studentId, 0)}
                    className="px-3 py-1 rounded bg-slate-700 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                  >
                    On Duty
                  </button>
                </div>

                {/* Bedside Case Presentation Score */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-bold text-slate-700">Clinical Skill Rating:</span>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400 cursor-pointer" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Revision Request Feedback Modal Dialog */}
      {selectedLogForRevision && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white p-5 rounded-lg max-w-md w-full border border-slate-200 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-sm font-extrabold text-slate-900">Request Revision from Student</h3>
              <button onClick={() => setSelectedLogForRevision(null)} className="p-1 text-slate-500 hover:bg-slate-100 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Faculty Feedback Notes</label>
              <textarea
                value={revisionFeedback}
                onChange={(e) => setRevisionFeedback(e.target.value)}
                rows={3}
                placeholder="Enter feedback (e.g. Please re-check fundal height measurement notes and re-submit)..."
                className="w-full p-2.5 rounded border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <button
              onClick={() => {
                if (selectedLogForRevision) {
                  requestLogbookRevision(selectedLogForRevision, revisionFeedback);
                  setSelectedLogForRevision(null);
                  setRevisionFeedback('');
                }
              }}
              className="w-full py-2 rounded bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors"
            >
              Send Revision Request Back to Student
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
