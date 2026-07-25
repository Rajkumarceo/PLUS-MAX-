'use client';

import React from 'react';
import {
  PieChart,
  Award,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  BookOpen,
  Calendar,
  ShieldAlert,
  Info,
  ChevronRight,
  FileCheck,
} from 'lucide-react';
import { useStudentEvaluation } from '@/context/StudentEvaluationContext';

export interface SubjectIAScore {
  subjectCode: string;
  subjectName: string;
  theoryAttendance: number; // percentage
  practicalAttendance: number; // percentage
  clinicalAttendance: number; // percentage
  ia1Score: number; // out of 100
  ia2Score: number; // out of 100
  prelimScore: number; // out of 100
  iaAverage: number; // percentage
  isEligible: boolean; // >= 40%
  warningLevel: 'SAFE' | 'WARNING' | 'CRITICAL';
}

const SUBJECT_SCORES: SubjectIAScore[] = [
  {
    subjectCode: 'MED301',
    subjectName: 'General Medicine & Therapeutics',
    theoryAttendance: 84,
    practicalAttendance: 88,
    clinicalAttendance: 82,
    ia1Score: 68,
    ia2Score: 72,
    prelimScore: 65,
    iaAverage: 68.3,
    isEligible: true,
    warningLevel: 'SAFE',
  },
  {
    subjectCode: 'SUR302',
    subjectName: 'General Surgery & Anaesthesia',
    theoryAttendance: 76,
    practicalAttendance: 80,
    clinicalAttendance: 78,
    ia1Score: 48,
    ia2Score: 42,
    prelimScore: 38,
    iaAverage: 42.7,
    isEligible: true,
    warningLevel: 'WARNING',
  },
  {
    subjectCode: 'OBG303',
    subjectName: 'Obstetrics & Gynaecology',
    theoryAttendance: 71, // Below 75% warning!
    practicalAttendance: 85,
    clinicalAttendance: 75,
    ia1Score: 36,
    ia2Score: 39,
    prelimScore: 35,
    iaAverage: 36.6, // BELOW 40% CRITICAL!
    isEligible: false,
    warningLevel: 'CRITICAL',
  },
  {
    subjectCode: 'PED304',
    subjectName: 'Paediatrics & Neonatology',
    theoryAttendance: 89,
    practicalAttendance: 92,
    clinicalAttendance: 88,
    ia1Score: 78,
    ia2Score: 82,
    prelimScore: 75,
    iaAverage: 78.3,
    isEligible: true,
    warningLevel: 'SAFE',
  },
  {
    subjectCode: 'SPM305',
    subjectName: 'Community Medicine (SPM)',
    theoryAttendance: 80,
    practicalAttendance: 86,
    clinicalAttendance: 84,
    ia1Score: 62,
    ia2Score: 65,
    prelimScore: 60,
    iaAverage: 62.3,
    isEligible: true,
    warningLevel: 'SAFE',
  },
];

export const AttendanceIAModule: React.FC = () => {
  const { students } = useStudentEvaluation();
  const student = students.find((s) => s.studentId === 'std-101') || students[0];

  const criticalSubjects = SUBJECT_SCORES.filter((s) => s.warningLevel === 'CRITICAL' || s.iaAverage < 40);
  const warningSubjects = SUBJECT_SCORES.filter((s) => s.warningLevel === 'WARNING' || (s.iaAverage >= 40 && s.iaAverage < 50));

  // Radial Progress Ring Component
  const RadialRing: React.FC<{
    percentage: number;
    title: string;
    target: number;
    hours: string;
    color: string;
  }> = ({ percentage, title, target, hours, color }) => {
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const isBelowTarget = percentage < target;

    return (
      <div className="erp-card p-4 flex flex-col items-center justify-between space-y-3 border border-slate-200">
        <div className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider text-center">{title}</div>

        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background track */}
            <circle cx="50" cy="50" r={radius} stroke="#E2E8F0" strokeWidth="10" fill="transparent" />
            {/* Target 75% indicator line marker */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke={isBelowTarget ? '#EF4444' : color}
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className={`text-2xl font-black ${isBelowTarget ? 'text-red-600' : 'text-slate-900'}`}>
              {percentage}%
            </span>
            <span className="text-[10px] text-slate-500 font-bold">NMC Min {target}%</span>
          </div>
        </div>

        <div className="text-[11px] text-center font-bold">
          <div className="text-slate-600">{hours}</div>
          {isBelowTarget ? (
            <span className="text-red-600 font-extrabold flex items-center gap-1 justify-center mt-0.5">
              <AlertTriangle className="w-3 h-3" /> Below NMC Limit
            </span>
          ) : (
            <span className="text-emerald-700 font-extrabold flex items-center gap-1 justify-center mt-0.5">
              <CheckCircle2 className="w-3 h-3" /> Eligible ({percentage - target}% Margin)
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {/* Module Banner */}
      <div className="erp-card p-4 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-inner">
              <PieChart className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">My Attendance & Internal Assessment (IA 40%)</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                  Exam Hall Ticket Gatekeeper
                </span>
              </div>
              <p className="text-xs text-blue-200/80 mt-0.5">
                NMC Mandate: Min 75% Theory Attendance, 80% Practical/Clinical Attendance, and Min 40% Cumulative IA Score.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right bg-white/10 px-3.5 py-2 rounded-lg border border-white/10">
              <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Overall IA Average</div>
              <div className="text-xl font-black text-white">{student.iaTotalPercentage}%</div>
            </div>
            <div className="text-right bg-white/10 px-3.5 py-2 rounded-lg border border-white/10">
              <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Univ Exam Eligibility</div>
              <div className={`text-[12px] font-black uppercase px-2 py-0.5 rounded mt-1 ${
                student.isIaEligible ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/40' : 'bg-red-500/30 text-red-300 border border-red-400/40'
              }`}>
                {student.isIaEligible ? 'ELIGIBLE' : 'ACTION REQUIRED'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AUTOMATED ELIGIBILITY ALERT BANNERS */}
      {criticalSubjects.length > 0 && (
        <div className="p-4 bg-red-50 border-l-4 border-l-red-600 rounded-r-xl border border-red-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-900 font-extrabold text-sm">
              <ShieldAlert className="w-5 h-5 text-red-600 animate-pulse" />
              <span>CRITICAL IA ELIGIBILITY ALERT: {criticalSubjects.length} Subject Below 40% Threshold</span>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-red-600 text-white font-black text-[10px]">
              FINAL EXAM BLOCK RISK
            </span>
          </div>

          <div className="text-xs text-red-800 space-y-1">
            {criticalSubjects.map((sub) => (
              <p key={sub.subjectCode} className="font-semibold">
                • <strong className="font-extrabold">{sub.subjectName} ({sub.subjectCode}):</strong> Current IA Average is{' '}
                <span className="font-mono font-black text-red-700">{sub.iaAverage}%</span> (Required: ≥40.0%). You need at least{' '}
                <span className="underline font-bold">58/100</span> in the upcoming Model Prelim exam to secure hall ticket eligibility.
              </p>
            ))}
          </div>
        </div>
      )}

      {warningSubjects.length > 0 && (
        <div className="p-3 bg-amber-50 border-l-4 border-l-amber-500 rounded-r-xl border border-amber-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-900 text-xs font-bold">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>
              Approaching Threshold Alert: {warningSubjects.map((s) => `${s.subjectName} (${s.iaAverage}%)`).join(', ')}. Minimum 40% threshold must be maintained.
            </span>
          </div>
          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Monitor Closely</span>
        </div>
      )}

      {/* SECTION 1: ATTENDANCE VISUALIZATION (RADIAL PROGRESS RINGS) */}
      <div>
        <h3 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>Attendance Visualization (NMC Standard Compliance)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <RadialRing
            percentage={80}
            title="Theory Classes"
            target={75}
            hours="192 / 240 Hours Attended"
            color="#2563EB"
          />
          <RadialRing
            percentage={86}
            title="Practicals & Labs"
            target={80}
            hours="138 / 160 Hours Attended"
            color="#7C3AED"
          />
          <RadialRing
            percentage={78}
            title="Clinical Postings"
            target={80}
            hours="156 / 200 Hours Attended"
            color="#059669"
          />
        </div>
      </div>

      {/* SECTION 2: INTERNAL ASSESSMENT (IA) TRACKING SCORE GRID */}
      <div className="erp-card p-4 space-y-4">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Internal Assessment (IA) Subject Gradebook Grid</span>
            </h3>
            <p className="text-xs text-slate-500">Comprehensive score tracking across IA-1, IA-2, and Prelims.</p>
          </div>
          <span className="text-xs font-bold text-slate-600">Phase 3 Part 1 MBBS</span>
        </div>

        <div className="overflow-x-auto">
          <table className="erp-table">
            <thead>
              <tr>
                <th>Subject Code & Name</th>
                <th>Theory Attd %</th>
                <th>Clinical Attd %</th>
                <th>IA-1 (100)</th>
                <th>IA-2 (100)</th>
                <th>Prelims (100)</th>
                <th>Cumulative IA Avg %</th>
                <th>Eligibility Status</th>
              </tr>
            </thead>
            <tbody>
              {SUBJECT_SCORES.map((sub) => (
                <tr key={sub.subjectCode} className="hover:bg-slate-50">
                  <td className="font-extrabold text-slate-900">
                    <div className="text-xs font-bold text-blue-700">{sub.subjectCode}</div>
                    <div className="text-xs text-slate-800">{sub.subjectName}</div>
                  </td>
                  <td className="text-xs font-mono font-bold">
                    <span className={sub.theoryAttendance < 75 ? 'text-red-600' : 'text-slate-800'}>
                      {sub.theoryAttendance}%
                    </span>
                  </td>
                  <td className="text-xs font-mono font-bold">
                    <span className={sub.clinicalAttendance < 80 ? 'text-red-600' : 'text-slate-800'}>
                      {sub.clinicalAttendance}%
                    </span>
                  </td>
                  <td className="text-xs font-mono font-semibold text-slate-700">{sub.ia1Score}</td>
                  <td className="text-xs font-mono font-semibold text-slate-700">{sub.ia2Score}</td>
                  <td className="text-xs font-mono font-semibold text-slate-700">{sub.prelimScore}</td>
                  <td className="text-xs font-mono font-black text-slate-900">
                    <span className={sub.iaAverage < 40 ? 'text-red-600 text-sm font-black' : 'text-slate-900'}>
                      {sub.iaAverage}%
                    </span>
                  </td>
                  <td>
                    {sub.isEligible ? (
                      <span className="erp-badge-green text-xs flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Exam Eligible (≥40%)
                      </span>
                    ) : (
                      <span className="erp-badge-red text-xs flex items-center gap-1 w-fit font-bold">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600" /> Ineligible (&lt;40%)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
