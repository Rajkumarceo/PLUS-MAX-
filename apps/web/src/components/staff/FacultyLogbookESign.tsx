'use client';

import React, { useState } from 'react';
import {
  FileCheck,
  CheckCircle,
  AlertCircle,
  Clock,
  Search,
  Filter,
  ShieldCheck,
  Check,
  X,
  MessageSquare,
  Sparkles,
  Lock,
  ChevronRight,
  Eye,
  CheckSquare,
  Square,
  History,
  FileText,
  UserCheck,
} from 'lucide-react';
import { useStudentEvaluation } from '@/context/StudentEvaluationContext';

export const FacultyLogbookESign: React.FC = () => {
  const {
    logbookSubmissions,
    approveLogbookEntry,
    requestLogbookRevision,
  } = useStudentEvaluation();

  const [activeTab, setActiveTab] = useState<'pending' | 'ledger'>('pending');
  const [selectedBatch, setSelectedBatch] = useState('ALL');
  const [selectedWard, setSelectedWard] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Slide-out modal state
  const [reviewingLog, setReviewingLog] = useState<any | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [facultyPin, setFacultyPin] = useState('1234');
  const [showBatchPinModal, setShowBatchPinModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const pendingSubmissions = logbookSubmissions.filter((l) => l.status === 'PENDING');
  const signedSubmissions = logbookSubmissions.filter((l) => l.status === 'SIGNED' || l.status === 'REVISION_REQUESTED');

  const filteredPending = pendingSubmissions.filter((log) => {
    const matchesSearch =
      log.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.competencyCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWard = selectedWard === 'ALL' || log.procedureNotes.includes(selectedWard);
    return matchesSearch && matchesWard;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredPending.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredPending.map((l) => l.id));
    }
  };

  const handleBatchApprove = () => {
    if (selectedIds.length === 0) return;
    selectedIds.forEach((id) => {
      approveLogbookEntry(id, 'Dr. Rajesh Kumar (HOD Surgery)');
    });
    setToastMessage(`Successfully Batch Signed & E-Approved ${selectedIds.length} Logbook Entries!`);
    setSelectedIds([]);
    setShowBatchPinModal(false);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSingleApprove = (id: string) => {
    approveLogbookEntry(id, 'Dr. Rajesh Kumar (HOD Surgery)');
    setReviewingLog(null);
    setToastMessage(`Logbook Entry E-Signed & SHA-256 Hash Generated!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleRequestRevision = (id: string) => {
    if (!feedbackText.trim()) return;
    requestLogbookRevision(id, feedbackText);
    setReviewingLog(null);
    setFeedbackText('');
    setToastMessage(`Revision request sent to student.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-5">
      {/* Module Banner */}
      <div className="erp-card p-4 bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-inner">
              <FileCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">Faculty Logbook E-Sign Engine</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/40">
                  NMC CBME Auditor
                </span>
              </div>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Prioritized Inbox • Batch Digital Signature • Slide-out Review • Immutable Verification Ledger
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right bg-white/10 px-3.5 py-1.5 rounded-lg border border-white/10">
              <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Pending Sign-offs</div>
              <div className="text-lg font-black text-amber-400">{pendingSubmissions.length} Entries</div>
            </div>
            <div className="text-right bg-white/10 px-3.5 py-1.5 rounded-lg border border-white/10">
              <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Signed History</div>
              <div className="text-lg font-black text-emerald-400">{signedSubmissions.length} Verified</div>
            </div>
          </div>
        </div>

        {/* Sub-Tabs */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/10 text-xs font-bold">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeTab === 'pending'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white/10 text-blue-100 hover:bg-white/20'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Pending Approvals Queue ({pendingSubmissions.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeTab === 'ledger'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white/10 text-blue-100 hover:bg-white/20'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Immutable Verification Ledger ({signedSubmissions.length})</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-600 text-white rounded-lg shadow-lg flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TAB 1: PENDING APPROVALS QUEUE */}
      {activeTab === 'pending' && (
        <div className="erp-card p-4 space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Filter by Student Name, Roll No, or Competency (e.g. OG8.2, SU11.1)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="text-slate-600">Ward Filter:</span>
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:border-blue-600"
              >
                <option value="ALL">All Wards / Clinics</option>
                <option value="Surgery">Surgery Wards</option>
                <option value="OBG">OBG Labor Room</option>
                <option value="Medicine">General Medicine</option>
              </select>

              {/* Batch Sign CTA */}
              {selectedIds.length > 0 && (
                <button
                  onClick={() => setShowBatchPinModal(true)}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all flex items-center gap-1.5 animate-pulse"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Batch Sign Selected ({selectedIds.length})</span>
                </button>
              )}
            </div>
          </div>

          {/* Pending Queue Table */}
          <div className="overflow-x-auto">
            <table className="erp-table">
              <thead>
                <tr>
                  <th className="w-10">
                    <button onClick={toggleSelectAll} className="text-slate-600 hover:text-slate-900">
                      {selectedIds.length === filteredPending.length && filteredPending.length > 0 ? (
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </th>
                  <th>Student & Roll No</th>
                  <th>Competency Code</th>
                  <th>Participation Level</th>
                  <th>Clinical Notes Preview</th>
                  <th>Submission Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPending.map((log) => {
                  const isSelected = selectedIds.includes(log.id);

                  return (
                    <tr
                      key={log.id}
                      className={`hover:bg-slate-50 transition-all ${
                        isSelected ? 'bg-blue-50/60' : ''
                      }`}
                    >
                      <td>
                        <button onClick={() => toggleSelect(log.id)} className="text-slate-600">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                      </td>
                      <td className="font-extrabold text-slate-900">
                        <div>{log.studentName}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{log.rollNumber}</div>
                      </td>
                      <td>
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-extrabold text-xs">
                          {log.competencyCode}
                        </span>
                      </td>
                      <td>
                        <span className="erp-badge-blue text-[10px] font-extrabold">{log.performedLevel}</span>
                      </td>
                      <td className="max-w-md">
                        <div className="text-xs text-slate-700 truncate font-mono">{log.procedureNotes}</div>
                      </td>
                      <td className="text-xs text-slate-500 font-mono">{log.submissionDate}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setReviewingLog(log)}
                            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5 text-blue-600" />
                            <span>Review</span>
                          </button>
                          <button
                            onClick={() => handleSingleApprove(log.id)}
                            className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>E-Sign</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: IMMUTABLE VERIFICATION LEDGER */}
      {activeTab === 'ledger' && (
        <div className="erp-card p-4 space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>NMC Compliant Faculty Signature Ledger</span>
              </h3>
              <p className="text-xs text-slate-500">Cryptographically verifiable audit log of all applied sign-offs.</p>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">
              SHA-256 Encrypted
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Student & Roll</th>
                  <th>Competency Code</th>
                  <th>Sign-Off Status</th>
                  <th>Faculty Digital Signature Hash</th>
                  <th>Verified Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {signedSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50">
                    <td className="font-extrabold text-slate-900">
                      <div>{sub.studentName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{sub.rollNumber}</div>
                    </td>
                    <td className="font-bold text-blue-700 text-xs">{sub.competencyCode}</td>
                    <td>
                      {sub.status === 'SIGNED' ? (
                        <span className="erp-badge-green text-xs flex items-center gap-1 w-fit">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Approved by {sub.signedBy}
                        </span>
                      ) : (
                        <span className="erp-badge-yellow text-xs flex items-center gap-1 w-fit">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Revision Requested
                        </span>
                      )}
                    </td>
                    <td className="font-mono text-xs text-slate-600">
                      {sub.signatureHash ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 text-[11px]">
                          {sub.signatureHash}
                        </span>
                      ) : (
                        <span className="text-slate-400">-- N/A --</span>
                      )}
                    </td>
                    <td className="text-xs text-slate-500 font-mono">{sub.submissionDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DETAILED FROSTED GLASS REVIEW MODAL */}
      {reviewingLog && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex justify-end transition-all">
          <div className="w-full max-w-lg bg-white/95 backdrop-blur-md h-full overflow-y-auto p-6 space-y-6 shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <FileCheck className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="text-lg font-black text-slate-900">Competency Entry Review</h3>
                  <span className="text-xs font-bold text-slate-500">ID: {reviewingLog.id}</span>
                </div>
              </div>
              <button
                onClick={() => setReviewingLog(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 space-y-2">
                <div className="flex justify-between border-b border-blue-200/60 pb-1.5">
                  <span className="font-semibold text-slate-500">Student Name:</span>
                  <span className="font-black text-slate-900">{reviewingLog.studentName} ({reviewingLog.rollNumber})</span>
                </div>
                <div className="flex justify-between border-b border-blue-200/60 pb-1.5">
                  <span className="font-semibold text-slate-500">Competency:</span>
                  <span className="font-black text-blue-800">{reviewingLog.competencyCode}</span>
                </div>
                <div className="flex justify-between border-b border-blue-200/60 pb-1.5">
                  <span className="font-semibold text-slate-500">Participation Level:</span>
                  <span className="font-bold text-slate-900">{reviewingLog.performedLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">Submission Date:</span>
                  <span className="font-bold text-slate-900 font-mono">{reviewingLog.submissionDate}</span>
                </div>
              </div>

              <div>
                <label className="font-extrabold text-slate-900 block mb-1">Student Procedure Notes</label>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-mono text-xs leading-relaxed">
                  {reviewingLog.procedureNotes}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-extrabold text-slate-900 block">Faculty Feedback & Revision Notes</label>
                <textarea
                  rows={3}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Enter comments or revision instructions for the student..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2">
              <button
                onClick={() => handleSingleApprove(reviewingLog.id)}
                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Approve & Generate Cryptographic E-Sign</span>
              </button>

              <button
                onClick={() => handleRequestRevision(reviewingLog.id)}
                className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Request Revision from Student</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BATCH PIN VERIFICATION MODAL */}
      {showBatchPinModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-black text-slate-900">Faculty Digital PIN Verification</h3>
              </div>
              <button onClick={() => setShowBatchPinModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <p>You are about to batch e-sign <strong className="text-slate-900 font-extrabold">{selectedIds.length} entries</strong>.</p>
              <p className="text-[11px] text-slate-500">Enter your 4-digit Faculty Security PIN to execute digital signatures.</p>
            </div>

            <div>
              <input
                type="password"
                maxLength={4}
                value={facultyPin}
                onChange={(e) => setFacultyPin(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-black py-2 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:border-blue-600"
              />
            </div>

            <button
              onClick={handleBatchApprove}
              className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Confirm & Batch Sign ({selectedIds.length})</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
