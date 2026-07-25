'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Award,
  Calendar,
  CheckCircle2,
  FileCheck,
  Building,
  UserCheck,
  Sliders,
} from 'lucide-react';
import { StudentLogbookEntryDto } from '@plux-max/types';

export const AcademicPostingWidget: React.FC = () => {
  const [subTab, setSubTab] = useState<'LOGBOOK' | 'OSCE' | 'IA' | 'ROSTER' | 'FACULTY' | 'HOSTEL'>('LOGBOOK');

  const [logbookEntries, setLogbookEntries] = useState<StudentLogbookEntryDto[]>([
    {
      id: 'log-1',
      studentId: 'std-101',
      studentName: 'Rohan Deshmukh',
      competencyCode: 'SU11.1 (Pre-op Patient Assessment)',
      performedLevel: 'PERFORMED',
      patientUhid: 'UHID-2026-9081',
      clinicalNotes: 'Assessed 45M for inguinal hernia repair. Checked airway, ASA grading & blood crossmatch.',
      rating: 5,
      facultySign: true,
      signedBy: 'Dr. Rajesh Kumar (HOD Surgery)',
      createdAt: '2026-07-20T10:30:00Z',
    },
    {
      id: 'log-2',
      studentId: 'std-101',
      studentName: 'Rohan Deshmukh',
      competencyCode: 'IM3.4 (Acute Myocardial Infarction)',
      performedLevel: 'ASSISTED',
      patientUhid: 'UHID-2026-9082',
      clinicalNotes: 'Observed thrombolytic therapy and IV heparin bolus in Cardiac ICU.',
      rating: 4,
      facultySign: false,
      signedBy: undefined,
      createdAt: '2026-07-23T14:15:00Z',
    },
  ]);

  const [historyScore, setHistoryScore] = useState(5);
  const [examScore, setExamScore] = useState(4);
  const [commScore, setCommScore] = useState(5);
  const [skillScore, setSkillScore] = useState(4);

  const totalOsce = historyScore + examScore + commScore + skillScore;

  const handleSignOff = (id: string) => {
    setLogbookEntries((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, facultySign: true, signedBy: 'Dr. Rajesh Kumar (Verified E-Sign)' }
          : e,
      ),
    );
  };

  return (
    <div className="erp-card">
      <div className="erp-card-header flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <GraduationCap className="w-5 h-5 text-[#0052CC]" />
          <div>
            <h3 className="text-sm font-extrabold text-[#091E42]">Medical College Academic ERP</h3>
            <p className="text-[11px] text-[#5E6C84]">NMC CBME Competency e-Logbook, OSCE Examiner & 40% IA Gatekeeper</p>
          </div>
        </div>
        <span className="erp-badge-blue">NMC Mandatory Compliant</span>
      </div>

      <div className="p-4 space-y-4">
        {/* Sub-Tab Navigation Pills */}
        <div className="flex flex-wrap gap-1.5 border-b border-[#EBECF0] pb-3">
          {[
            { id: 'LOGBOOK', label: 'NMC CBME e-Logbook', icon: BookOpen },
            { id: 'OSCE', label: 'OSCE / OSPE Examiner', icon: Sliders },
            { id: 'IA', label: 'NMC 40% IA Gatekeeper', icon: Award },
            { id: 'ROSTER', label: 'Clinical Ward Rosters', icon: Calendar },
            { id: 'FACULTY', label: 'Faculty MSR & Research', icon: UserCheck },
            { id: 'HOSTEL', label: 'Hostel & Medical Library', icon: Building },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = subTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold transition-colors ${
                  isActive
                    ? 'bg-[#0052CC] text-white shadow-sm'
                    : 'bg-[#FAFBFC] border border-[#DFE1E6] text-[#172B4D] hover:bg-[#F4F5F7]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#0052CC]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sub-Tab Content */}
        {subTab === 'LOGBOOK' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-[#5E6C84]">
              <span>Student Clinical Procedural Entries (DOAP Scale)</span>
              <span className="font-bold text-[#0052CC]">{logbookEntries.length} Entries Registered</span>
            </div>

            <div className="overflow-x-auto">
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Competency Code</th>
                    <th>Student Name</th>
                    <th>Procedure Level</th>
                    <th>Faculty E-Sign</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {logbookEntries.map((entry) => (
                    <tr key={entry.id}>
                      <td className="font-bold text-[#091E42]">{entry.competencyCode}</td>
                      <td>{entry.studentName}</td>
                      <td>
                        <span className="erp-badge-blue">{entry.performedLevel}</span>
                      </td>
                      <td>
                        {entry.facultySign ? (
                          <span className="erp-badge-green flex items-center gap-1 w-fit">
                            <CheckCircle2 className="w-3 h-3" /> Signed: {entry.signedBy}
                          </span>
                        ) : (
                          <span className="erp-badge-yellow flex items-center gap-1 w-fit">
                            Pending E-Sign
                          </span>
                        )}
                      </td>
                      <td>
                        {!entry.facultySign && (
                          <button
                            onClick={() => handleSignOff(entry.id)}
                            className="px-2 py-0.5 rounded bg-[#0052CC] text-white text-xs font-bold hover:bg-[#0747A6] flex items-center gap-1"
                          >
                            <FileCheck className="w-3 h-3" /> Faculty Sign
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {subTab === 'OSCE' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7 bg-[#FAFBFC] p-3.5 rounded border border-[#DFE1E6] space-y-3">
              <div className="text-xs font-bold text-[#091E42] uppercase tracking-wider">
                OSCE Station 4: Cardiovascular Examination Rubric
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#5E6C84]">1. Patient History & Consent</span>
                  <span className="font-mono font-bold text-[#0052CC]">{historyScore} / 5</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={historyScore}
                  onChange={(e) => setHistoryScore(Number(e.target.value))}
                  className="w-full accent-[#0052CC]"
                />
                <div className="flex justify-between">
                  <span className="text-[#5E6C84]">2. Precordial Auscultation</span>
                  <span className="font-mono font-bold text-[#0052CC]">{examScore} / 5</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={examScore}
                  onChange={(e) => setExamScore(Number(e.target.value))}
                  className="w-full accent-[#0052CC]"
                />
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FAFBFC] p-3.5 rounded border border-[#DFE1E6] flex flex-col justify-between space-y-3">
              <div>
                <span className="text-xs font-bold text-[#5E6C84]">OSCE Station Total Score</span>
                <div className="text-3xl font-black text-[#091E42] font-mono">
                  {totalOsce} <span className="text-sm font-normal text-[#5E6C84]">/ 20</span>
                </div>
              </div>
              <button
                onClick={() => alert(`OSCE Score ${totalOsce}/20 recorded!`)}
                className="w-full py-1.5 rounded bg-[#0052CC] text-white font-bold text-xs hover:bg-[#0747A6]"
              >
                Submit Station Evaluation
              </button>
            </div>
          </div>
        )}

        {subTab === 'IA' && (
          <div className="p-3 rounded bg-[#FAFBFC] border border-[#DFE1E6] flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-[#0052CC] font-bold">MBBS-2023-042 • Rohan Deshmukh</span>
              <h4 className="text-xs font-bold text-[#091E42] mt-0.5">General Surgery Internal Assessment (Theory 32/50 + Practical 36/50)</h4>
            </div>
            <span className="erp-badge-green font-bold">ELIGIBLE FOR EXAM (68%)</span>
          </div>
        )}

        {subTab === 'ROSTER' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded bg-[#FAFBFC] border border-[#DFE1E6] space-y-1">
              <span className="erp-badge-blue">ACTIVE ROTATION</span>
              <h4 className="font-bold text-[#091E42]">General Surgery Ward 4</h4>
              <p className="text-[#5E6C84]">01-Jul-2026 to 15-Aug-2026</p>
            </div>
            <div className="p-3 rounded bg-[#FAFBFC] border border-[#DFE1E6] space-y-1">
              <span className="erp-badge-yellow">UPCOMING ROTATION</span>
              <h4 className="font-bold text-[#091E42]">Pediatric Emergency ICU</h4>
              <p className="text-[#5E6C84]">16-Aug-2026 to 30-Sep-2026</p>
            </div>
          </div>
        )}

        {subTab === 'FACULTY' && (
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 rounded bg-[#FAFBFC] border border-[#DFE1E6]">
              <div className="text-[#5E6C84]">Didactic Lectures</div>
              <div className="text-lg font-black text-[#0052CC] mt-1">42 / 45 hrs</div>
            </div>
            <div className="p-3 rounded bg-[#FAFBFC] border border-[#DFE1E6]">
              <div className="text-[#5E6C84]">Bedside Teaching</div>
              <div className="text-lg font-black text-[#006644] mt-1">88 / 90 hrs</div>
            </div>
            <div className="p-3 rounded bg-[#FAFBFC] border border-[#DFE1E6]">
              <div className="text-[#5E6C84]">PubMed Publications</div>
              <div className="text-lg font-black text-[#403294] mt-1">14 Papers</div>
            </div>
          </div>
        )}

        {subTab === 'HOSTEL' && (
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded bg-[#FAFBFC] border border-[#DFE1E6] space-y-1">
              <h4 className="font-bold text-[#091E42]">Hostel Allotment</h4>
              <p className="text-[#5E6C84]">Block B (Charaka Hall) Room 304</p>
              <span className="erp-badge-green">Outpass Approved</span>
            </div>
            <div className="p-3 rounded bg-[#FAFBFC] border border-[#DFE1E6] space-y-1">
              <h4 className="font-bold text-[#091E42]">Central Library</h4>
              <p className="text-[#5E6C84]">Bailey & Love Surgery 27th Ed</p>
              <span className="erp-badge-blue">PubMed Access Active</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
