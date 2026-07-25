'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  FileCheck,
  Send,
  Plus,
  HeartHandshake,
  MessageSquare,
  ShieldCheck,
  Tag,
  Calendar,
  UserCheck,
  Award,
  Sparkles,
  Filter,
} from 'lucide-react';
import { useStudentEvaluation } from '@/context/StudentEvaluationContext';

export interface LogbookModuleProps {
  initialWard?: string;
  initialFaculty?: string;
  onNavigateToPostings?: () => void;
}

// Sample NMC Competency Database (representative sample of 2,683 CBME competencies)
const NMC_COMPETENCIES = [
  { code: 'OG8.2', title: 'Antenatal Care & High Risk Fetal Monitoring', domain: 'P', subject: 'Obstetrics & Gynaecology', target: 15, completed: 12 },
  { code: 'SU11.1', title: 'Pre-operative & Post-operative Surgical Safety Checklist', domain: 'SH', subject: 'General Surgery', target: 20, completed: 18 },
  { code: 'IM3.4', title: 'Acute 12-Lead ECG Interpretation & Arrhythmia Triage', domain: 'KH', subject: 'General Medicine', target: 25, completed: 25 },
  { code: 'PE4.2', title: 'Neonatal Resuscitation Protocol & APGAR Scoring', domain: 'P', subject: 'Paediatrics', target: 10, completed: 8 },
  { code: 'CM5.1', title: 'Epidemiological Investigation of Disease Outbreak in Rural Community', domain: 'K', subject: 'Community Medicine', target: 5, completed: 4 },
  { code: 'AN2.3', title: 'Dissection & Identification of Femoral Triangle Structures', domain: 'P', subject: 'Anatomy', target: 8, completed: 8 },
  { code: 'PY1.5', title: 'Perform Spirometry & Interpret Restrictive/Obstructive Patterns', domain: 'SH', subject: 'Physiology', target: 12, completed: 10 },
  { code: 'PA4.2', title: 'Peripheral Blood Smear Examination & Malarial Parasite Staining', domain: 'P', subject: 'Pathology', target: 15, completed: 15 },
  { code: 'PH2.1', title: 'Rational Prescription Writing for Essential Anti-hypertensive Drugs', domain: 'KH', subject: 'Pharmacology', target: 20, completed: 17 },
  { code: 'AETCOM 2.5', title: 'Informed Consent in High-Risk Surgical Procedures & Family Communication', domain: 'P', subject: 'AETCOM', target: 6, completed: 5 },
];

export const LogbookModule: React.FC<LogbookModuleProps> = ({ initialWard, initialFaculty }) => {
  const { logbookSubmissions, addStudentLogbookEntry } = useStudentEvaluation();

  const [activeTab, setActiveTab] = useState<'tracker' | 'doap' | 'fap' | 'verification'>('tracker');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');

  // DOAP / AETCOM Form State
  const [activityType, setActivityType] = useState<'DOAP' | 'AETCOM'>('DOAP');
  const [compCode, setCompCode] = useState(NMC_COMPETENCIES[0].code + ' - ' + NMC_COMPETENCIES[0].title);
  const [doapLevel, setDoapLevel] = useState<'PERFORMED' | 'ASSISTED' | 'OBSERVED'>('PERFORMED');
  const [patientId, setPatientId] = useState('');
  const [wardLocation, setWardLocation] = useState(initialWard || 'General Medicine Ward 4B');
  const [supervisor, setSupervisor] = useState(initialFaculty || 'Dr. Aris Thorne (HOD Surgery)');
  const [procedureNotes, setProcedureNotes] = useState('');
  const [aetcomReflection, setAetcomReflection] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // FAP Form State
  const [fapFamilyId, setFapFamilyId] = useState('FAP-RURAL-882');
  const [fapVisitNo, setFapVisitNo] = useState('Visit 3 (Semester 4)');
  const [fapHealthAssessment, setFapHealthAssessment] = useState('');
  const [clinicalReflectionText, setClinicalReflectionText] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!procedureNotes.trim()) return;

    const fullNotes = `[${activityType} | Ward: ${wardLocation} | Patient: ${patientId || 'N/A'} | Supervisor: ${supervisor}] ${procedureNotes}`;
    addStudentLogbookEntry(compCode, doapLevel, fullNotes);
    setProcedureNotes('');
    setPatientId('');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  const handleFapSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fapHealthAssessment.trim()) return;

    const fapNotes = `[FAP ${fapVisitNo} - ${fapFamilyId}] Assessment: ${fapHealthAssessment}. Reflection: ${clinicalReflectionText}`;
    addStudentLogbookEntry('CM5.1 - Family Adoption Programme', 'PERFORMED', fapNotes);
    setFapHealthAssessment('');
    setClinicalReflectionText('');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  const filteredCompetencies = NMC_COMPETENCIES.filter((c) => {
    const matchesSearch =
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain === 'ALL' || c.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  const getDomainBadge = (domain: string) => {
    switch (domain) {
      case 'K':
        return <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">K - Knowledge</span>;
      case 'KH':
        return <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200">KH - Know How</span>;
      case 'SH':
        return <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200">SH - Show How</span>;
      case 'P':
        return <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">P - Perform</span>;
      default:
        return null;
    }
  };

  const mySubmissions = logbookSubmissions.filter((l) => l.studentId === 'std-101');

  return (
    <div className="space-y-5">
      {/* Module Header & Summary Banner */}
      <div className="erp-card p-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-inner">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">My NMC e-Logbook</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/40">
                  NMC CBME Standard
                </span>
              </div>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Mandatory 2,683 Competency Repository • Digital DOAP & AETCOM Verification • Cryptographic Faculty E-Sign
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Logged / Target</div>
              <div className="text-lg font-black text-emerald-400">137 / 180 <span className="text-xs text-white/70 font-normal">Entries</span></div>
            </div>
            <div className="text-right bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Faculty Signed</div>
              <div className="text-lg font-black text-white">92.4%</div>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/10 text-xs font-bold">
          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeTab === 'tracker'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white/10 text-blue-100 hover:bg-white/20'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>2,683 Competency Tracker</span>
          </button>
          <button
            onClick={() => setActiveTab('doap')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeTab === 'doap'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white/10 text-blue-100 hover:bg-white/20'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>DOAP & AETCOM Logging</span>
          </button>
          <button
            onClick={() => setActiveTab('fap')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeTab === 'fap'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white/10 text-blue-100 hover:bg-white/20'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>FAP & Clinical Reflections</span>
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeTab === 'verification'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white/10 text-blue-100 hover:bg-white/20'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Faculty Verification Status ({mySubmissions.length})</span>
          </button>
        </div>
      </div>

      {showSuccessToast && (
        <div className="p-3 bg-emerald-600 text-white rounded-lg shadow-lg flex items-center justify-between text-xs font-bold animate-bounce">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>Logbook Entry submitted successfully! Encrypted & queued for Faculty Digital Sign-off.</span>
          </div>
          <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded font-mono">STATUS: PENDING</span>
        </div>
      )}

      {/* TAB 1: 2,683 COMPETENCY TRACKER */}
      {activeTab === 'tracker' && (
        <div className="erp-card space-y-4 p-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by Competency Code (e.g. OG8.2, SU11.1), Topic, or Subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-600">Domain Filter:</span>
              <div className="flex gap-1">
                {['ALL', 'K', 'KH', 'SH', 'P'].map((dom) => (
                  <button
                    key={dom}
                    onClick={() => setSelectedDomain(dom)}
                    className={`px-2.5 py-1 rounded text-xs font-extrabold transition-all ${
                      selectedDomain === dom
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {dom}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Competency Code</th>
                  <th>Domain Tag</th>
                  <th>Subject / Discipline</th>
                  <th>Required Target</th>
                  <th>Completed Logs</th>
                  <th>Progress</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompetencies.map((item) => {
                  const pct = Math.round((item.completed / item.target) * 100);
                  return (
                    <tr key={item.code} className="hover:bg-slate-50">
                      <td className="font-extrabold text-slate-900">
                        <div className="text-xs font-bold text-blue-700">{item.code}</div>
                        <div className="text-[11px] text-slate-700 font-semibold max-w-xs">{item.title}</div>
                      </td>
                      <td>{getDomainBadge(item.domain)}</td>
                      <td className="text-xs font-semibold text-slate-600">{item.subject}</td>
                      <td className="text-xs font-bold text-slate-800">{item.target} sessions</td>
                      <td className="text-xs font-black text-slate-900">{item.completed} sessions</td>
                      <td className="w-36">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                pct >= 100 ? 'bg-emerald-600' : pct >= 70 ? 'bg-blue-600' : 'bg-amber-500'
                              }`}
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-extrabold text-slate-700 font-mono">{pct}%</span>
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setCompCode(`${item.code} - ${item.title}`);
                            setActiveTab('doap');
                          }}
                          className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200 flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Log Session</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: DOAP & AETCOM LOGGING FORMS */}
      {activeTab === 'doap' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8 erp-card p-5 space-y-4">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-blue-600" />
                  <span>Clinical Activity Logging Form (NMC Standard)</span>
                </h3>
                <p className="text-xs text-slate-500">Document clinical encounters, DOAP sessions, and AETCOM reflections.</p>
              </div>

              {/* Selector for DOAP vs AETCOM */}
              <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActivityType('DOAP')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activityType === 'DOAP' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  DOAP Session
                </button>
                <button
                  type="button"
                  onClick={() => setActivityType('AETCOM')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activityType === 'AETCOM' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  AETCOM Module
                </button>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">NMC Competency Code & Title</label>
                <select
                  value={compCode}
                  onChange={(e) => setCompCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  {NMC_COMPETENCIES.map((c) => (
                    <option key={c.code} value={`${c.code} - ${c.title}`}>
                      [{c.code}] [{c.domain}] {c.title} ({c.subject})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Level of Participation</label>
                  <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
                    {(['PERFORMED', 'ASSISTED', 'OBSERVED'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setDoapLevel(lvl)}
                        className={`py-1.5 rounded-lg border text-center transition-all ${
                          doapLevel === lvl
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Patient IP/OP ID (De-identified)</label>
                  <input
                    type="text"
                    placeholder="e.g. IP-89201 / Female 45Y"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Clinical Ward / Posting Location</label>
                  <input
                    type="text"
                    value={wardLocation}
                    onChange={(e) => setWardLocation(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Supervisor / Faculty Name</label>
                  <input
                    type="text"
                    value={supervisor}
                    onChange={(e) => setSupervisor(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {activityType === 'DOAP' ? 'Procedure Summary & Learning Outcome' : 'AETCOM Ethical Reflection & Communication Findings'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={procedureNotes}
                  onChange={(e) => setProcedureNotes(e.target.value)}
                  placeholder={
                    activityType === 'DOAP'
                      ? 'Describe patient history, clinical findings, procedure steps undertaken, instruments handled, and key supervisor instructions...'
                      : 'Summarize ethical dilemma handled, doctor-patient empathy displayed, informed consent procedure, or communication barriers overcome...'
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit {activityType} Entry for Faculty Verification</span>
              </button>
            </form>
          </div>

          {/* Quick Guidelines Panel */}
          <div className="lg:col-span-4 space-y-4">
            <div className="erp-card p-4 space-y-3 bg-blue-50/50 border-blue-200">
              <div className="flex items-center gap-2 text-blue-900 font-extrabold text-sm">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>NMC Logbook Guidelines</span>
              </div>
              <ul className="text-xs space-y-2 text-slate-700 font-medium list-disc pl-4">
                <li>Every entry must be logged within 24 hours of clinical procedure execution.</li>
                <li>Patient identities must be strictly de-identified (use IP/OP number only).</li>
                <li>
                  <strong className="text-slate-900">DOAP Levels:</strong>
                  <br />
                  <span className="text-[11px] text-slate-600">Demonstrate (Faculty shows), Observe (Student watches), Assist (Student aids), Perform (Student conducts under supervision).</span>
                </li>
                <li>Digital signatures of faculty carry cryptographically verifiable SHA-256 hashes for university audit.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FAP & REFLECTIONS */}
      {activeTab === 'fap' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 erp-card p-5 space-y-4">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-emerald-600" />
                  <span>Family Adoption Programme (FAP) Visit Logger</span>
                </h3>
                <p className="text-xs text-slate-500">NMC mandated community health tracking across MBBS professional years.</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                Community Med CM5.1
              </span>
            </div>

            <form onSubmit={handleFapSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Adopted Family ID</label>
                  <input
                    type="text"
                    value={fapFamilyId}
                    onChange={(e) => setFapFamilyId(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Visit Stage</label>
                  <select
                    value={fapVisitNo}
                    onChange={(e) => setFapVisitNo(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Visit 1 (Semester 1)">Visit 1 (Semester 1) - Initial Demographics</option>
                    <option value="Visit 2 (Semester 2)">Visit 2 (Semester 2) - Environmental Sanitation</option>
                    <option value="Visit 3 (Semester 4)">Visit 3 (Semester 4) - Immunization & Nutrition</option>
                    <option value="Visit 4 (Semester 6)">Visit 4 (Semester 6) - Non-communicable Disease Screening</option>
                    <option value="Visit 5 (Semester 8)">Visit 5 (Semester 8) - Final Health Status Audit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Family Health Assessment & Interventions</label>
                <textarea
                  rows={3}
                  required
                  value={fapHealthAssessment}
                  onChange={(e) => setFapHealthAssessment(e.target.value)}
                  placeholder="Record family vitals, sanitation survey, maternal/child nutrition, chronic illness counseling, and referrals provided..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Student Clinical Reflection</label>
                <textarea
                  rows={3}
                  value={clinicalReflectionText}
                  onChange={(e) => setClinicalReflectionText(e.target.value)}
                  placeholder="Personal reflection on social determinants of health, rural health barriers, and communication challenges encountered..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit FAP Log to Department of Community Medicine</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="erp-card p-4 space-y-3">
              <h4 className="text-sm font-extrabold text-slate-900 border-b border-slate-200 pb-2">
                Adopted Family Profile Card
              </h4>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="font-semibold text-slate-500">Family Head:</span>
                  <span className="font-extrabold text-slate-900">Ramesh Shinde (Age 52)</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="font-semibold text-slate-500">Village:</span>
                  <span className="font-bold text-slate-800">Shivaji Nagar, District Pune</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="font-semibold text-slate-500">Total Members:</span>
                  <span className="font-bold text-slate-800">5 Members (2 Children)</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="font-semibold text-slate-500">Socioeconomic Status:</span>
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px]">
                    Modified Kuppuswamy Class III
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">Assigned Mentor:</span>
                  <span className="font-bold text-slate-900">Dr. Sunita Deshmukh (Assoc. Prof SPM)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FACULTY VERIFICATION DASHBOARD */}
      {activeTab === 'verification' && (
        <div className="erp-card p-4 space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Faculty Digital Sign-Off Queue & History</h3>
              <p className="text-xs text-slate-500">Real-time status of all submitted competency entries.</p>
            </div>
            <div className="flex gap-2">
              <span className="erp-badge-green text-xs flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Signed: {mySubmissions.filter((s) => s.status === 'SIGNED').length}
              </span>
              <span className="erp-badge-blue text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-600" /> Pending: {mySubmissions.filter((s) => s.status === 'PENDING').length}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Submission ID</th>
                  <th>Competency & Details</th>
                  <th>Participation Level</th>
                  <th>Verification Status</th>
                  <th>Faculty E-Signature Hash</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {mySubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50">
                    <td className="font-mono text-xs font-bold text-slate-500">{sub.id}</td>
                    <td>
                      <div className="font-extrabold text-slate-900 text-xs">{sub.competencyCode}</div>
                      <div className="text-[11px] text-slate-600 max-w-sm truncate">{sub.procedureNotes}</div>
                    </td>
                    <td>
                      <span className="erp-badge-blue text-[10px] font-bold">{sub.performedLevel}</span>
                    </td>
                    <td>
                      {sub.status === 'SIGNED' ? (
                        <span className="erp-badge-green text-xs flex items-center gap-1 w-fit">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Approved by {sub.signedBy}
                        </span>
                      ) : sub.status === 'REVISION_REQUESTED' ? (
                        <span className="erp-badge-yellow text-xs flex items-center gap-1 w-fit">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Revision: {sub.facultyFeedback}
                        </span>
                      ) : (
                        <span className="erp-badge-blue text-xs flex items-center gap-1 w-fit">
                          <Clock className="w-3.5 h-3.5 text-blue-600" /> Pending Verification
                        </span>
                      )}
                    </td>
                    <td className="font-mono text-[10px] text-slate-500">
                      {sub.signatureHash ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {sub.signatureHash}
                        </span>
                      ) : (
                        <span className="text-slate-400">-- Unsigned --</span>
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
    </div>
  );
};
