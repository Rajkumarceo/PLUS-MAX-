'use client';

import React, { createContext, useContext, useState } from 'react';

export interface LogbookItem {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  competencyCode: string;
  performedLevel: 'PERFORMED' | 'ASSISTED' | 'OBSERVED';
  procedureNotes: string;
  submissionDate: string;
  status: 'PENDING' | 'SIGNED' | 'REVISION_REQUESTED';
  signedBy?: string;
  signatureHash?: string;
  facultyFeedback?: string;
}

export interface StudentAcademicRecord {
  studentId: string;
  name: string;
  rollNumber: string;
  course: string;
  semester: number;
  theoryMarks: number; // Max 100
  practicalMarks: number; // Max 100
  vivaMarks: number; // Max 50
  iaTotalPercentage: number; // Calculated (Total / 250) * 100
  isIaEligible: boolean; // iaTotalPercentage >= 40
  attendancePercentage: number;
  feeStatus: 'PAID' | 'PENDING';
  assignedWard: string;
}

interface StudentEvaluationContextType {
  students: StudentAcademicRecord[];
  logbookSubmissions: LogbookItem[];
  approveLogbookEntry: (logId: string, facultyName: string) => void;
  requestLogbookRevision: (logId: string, feedback: string) => void;
  addStudentLogbookEntry: (competencyCode: string, level: 'PERFORMED' | 'ASSISTED' | 'OBSERVED', notes: string) => void;
  updateStudentMarks: (studentId: string, theory: number, practical: number, viva: number) => void;
  updateStudentAttendance: (studentId: string, delta: number) => void;
}

const initialStudents: StudentAcademicRecord[] = [
  {
    studentId: 'std-101',
    name: 'Rohan Deshmukh',
    rollNumber: 'MBBS-2023-042',
    course: 'MBBS (Bachelor of Medicine, Bachelor of Surgery)',
    semester: 5,
    theoryMarks: 70,
    practicalMarks: 68,
    vivaMarks: 32,
    iaTotalPercentage: 68.0,
    isIaEligible: true,
    attendancePercentage: 92.4,
    feeStatus: 'PAID',
    assignedWard: 'General Surgery OPD & Ward 4',
  },
  {
    studentId: 'std-102',
    name: 'Ananya Sharma',
    rollNumber: 'MBBS-2023-018',
    course: 'MBBS',
    semester: 5,
    theoryMarks: 30,
    practicalMarks: 35,
    vivaMarks: 15,
    iaTotalPercentage: 32.0,
    isIaEligible: false,
    attendancePercentage: 78.5,
    feeStatus: 'PAID',
    assignedWard: 'OBGYN Delivery Ward',
  },
];

const initialLogbooks: LogbookItem[] = [
  {
    id: 'log-101',
    studentId: 'std-101',
    studentName: 'Rohan Deshmukh',
    rollNumber: 'MBBS-2023-042',
    competencyCode: 'OG8.2 - Antenatal Care & Fetal Monitoring',
    performedLevel: 'PERFORMED',
    procedureNotes: 'Assessed 28-week pregnant patient for symphysio-fundal height, listened to fetal heart rate (FHR) with Doppler.',
    submissionDate: '2026-07-24',
    status: 'PENDING',
  },
  {
    id: 'log-102',
    studentId: 'std-101',
    studentName: 'Rohan Deshmukh',
    rollNumber: 'MBBS-2023-042',
    competencyCode: 'SU11.1 - Pre-operative Surgical Checklist',
    performedLevel: 'PERFORMED',
    procedureNotes: 'Prepared patient consent, verified blood group compatibility, and assisted in hernia repair pre-op prep.',
    submissionDate: '2026-07-20',
    status: 'SIGNED',
    signedBy: 'Dr. Rajesh Kumar (HOD Surgery)',
    signatureHash: 'SIG-NMC-2026-9812A4',
  },
  {
    id: 'log-103',
    studentId: 'std-102',
    studentName: 'Ananya Sharma',
    rollNumber: 'MBBS-2023-018',
    competencyCode: 'IM3.4 - Acute ECG Interpretation',
    performedLevel: 'ASSISTED',
    procedureNotes: 'Analyzed 12-lead ECG for anterior wall ST-elevation myocardial infarction under senior resident guidance.',
    submissionDate: '2026-07-23',
    status: 'PENDING',
  },
];

const StudentEvaluationContext = createContext<StudentEvaluationContextType | undefined>(undefined);

export const StudentEvaluationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<StudentAcademicRecord[]>(initialStudents);
  const [logbookSubmissions, setLogbookSubmissions] = useState<LogbookItem[]>(initialLogbooks);

  const approveLogbookEntry = (logId: string, facultyName: string) => {
    const hash = `SIG-NMC-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setLogbookSubmissions((prev) =>
      prev.map((log) =>
        log.id === logId
          ? {
              ...log,
              status: 'SIGNED',
              signedBy: facultyName,
              signatureHash: hash,
            }
          : log
      )
    );
  };

  const requestLogbookRevision = (logId: string, feedback: string) => {
    setLogbookSubmissions((prev) =>
      prev.map((log) =>
        log.id === logId
          ? {
              ...log,
              status: 'REVISION_REQUESTED',
              facultyFeedback: feedback,
            }
          : log
      )
    );
  };

  const addStudentLogbookEntry = (
    competencyCode: string,
    level: 'PERFORMED' | 'ASSISTED' | 'OBSERVED',
    notes: string
  ) => {
    const newEntry: LogbookItem = {
      id: `log-${Date.now()}`,
      studentId: 'std-101',
      studentName: 'Rohan Deshmukh',
      rollNumber: 'MBBS-2023-042',
      competencyCode,
      performedLevel: level,
      procedureNotes: notes,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'PENDING',
    };
    setLogbookSubmissions((prev) => [newEntry, ...prev]);
  };

  const updateStudentMarks = (studentId: string, theory: number, practical: number, viva: number) => {
    setStudents((prev) =>
      prev.map((std) => {
        if (std.studentId === studentId) {
          const total = theory + practical + viva;
          const percentage = parseFloat(((total / 250) * 100).toFixed(1));
          return {
            ...std,
            theoryMarks: theory,
            practicalMarks: practical,
            vivaMarks: viva,
            iaTotalPercentage: percentage,
            isIaEligible: percentage >= 40.0,
          };
        }
        return std;
      })
    );
  };

  const updateStudentAttendance = (studentId: string, delta: number) => {
    setStudents((prev) =>
      prev.map((std) => {
        if (std.studentId === studentId) {
          const newAtt = Math.min(100, Math.max(0, parseFloat((std.attendancePercentage + delta).toFixed(1))));
          return { ...std, attendancePercentage: newAtt };
        }
        return std;
      })
    );
  };

  return (
    <StudentEvaluationContext.Provider
      value={{
        students,
        logbookSubmissions,
        approveLogbookEntry,
        requestLogbookRevision,
        addStudentLogbookEntry,
        updateStudentMarks,
        updateStudentAttendance,
      }}
    >
      {children}
    </StudentEvaluationContext.Provider>
  );
};

export const useStudentEvaluation = () => {
  const context = useContext(StudentEvaluationContext);
  if (!context) {
    throw new Error('useStudentEvaluation must be used within a StudentEvaluationProvider');
  }
  return context;
};
