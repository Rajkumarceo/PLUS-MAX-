import { Injectable } from '@nestjs/common';
import {
  ApiResponse,
  StudentProfileDto,
  ClinicalPostingDto,
  CbmeCompetencyDto,
  StudentLogbookEntryDto,
  OsceEvaluationDto,
  InternalAssessmentEligibilityDto,
} from '@plux-max/types';

@Injectable()
export class AcademicService {
  private students: StudentProfileDto[] = [
    {
      id: 'std-101',
      rollNumber: 'MBBS-2023-042',
      name: 'Rohan Deshmukh',
      batchYear: 2023,
      courseName: 'MBBS (Bachelor of Medicine, Bachelor of Surgery)',
      currentYear: 3,
      currentSemester: 5,
      attendancePercentage: 92.4,
    },
    {
      id: 'std-102',
      rollNumber: 'MD-CARDIO-2024-009',
      name: 'Dr. Ananya Ray',
      batchYear: 2024,
      courseName: 'MD Cardiology Specialization',
      currentYear: 2,
      currentSemester: 3,
      attendancePercentage: 98.1,
    },
  ];

  private competencies: CbmeCompetencyDto[] = [
    {
      id: 'cbme-1',
      code: 'SU11.1',
      subject: 'General Surgery',
      topic: 'Pre-operative Patient Evaluation',
      description: 'Describe and demonstrate pre-operative evaluation and preparation of a surgical patient',
      levelRequired: 'SH',
    },
    {
      id: 'cbme-2',
      code: 'IM3.4',
      subject: 'General Medicine',
      topic: 'Acute Myocardial Infarction',
      description: 'Recognize clinical features, order ECG & cardiac troponin biomarkers, and initiate emergency resuscitation',
      levelRequired: 'P',
    },
    {
      id: 'cbme-3',
      code: 'OG8.2',
      subject: 'Obstetrics & Gynecology',
      topic: 'Antenatal Care & Fetal Monitoring',
      description: 'Perform abdominal palpation for fundal height and auscultate fetal heart sound (FHS)',
      levelRequired: 'P',
    },
  ];

  private logbookEntries: StudentLogbookEntryDto[] = [
    {
      id: 'log-1',
      studentId: 'std-101',
      studentName: 'Rohan Deshmukh',
      competencyCode: 'SU11.1',
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
      competencyCode: 'IM3.4',
      performedLevel: 'ASSISTED',
      patientUhid: 'UHID-2026-9082',
      clinicalNotes: 'Observed thrombolytic therapy and IV heparin bolus in Cardiac ICU.',
      rating: 4,
      facultySign: false,
      signedBy: undefined,
      createdAt: '2026-07-23T14:15:00Z',
    },
  ];

  async getStudents(): Promise<ApiResponse<StudentProfileDto[]>> {
    return {
      success: true,
      data: this.students,
      timestamp: new Date().toISOString(),
    };
  }

  async getClinicalPostings(): Promise<ApiResponse<ClinicalPostingDto[]>> {
    const postings: ClinicalPostingDto[] = [
      {
        id: 'post-1',
        studentId: 'std-101',
        studentName: 'Rohan Deshmukh',
        wardName: 'General Surgery OPD & Ward 4',
        startDate: '2026-07-01',
        endDate: '2026-08-15',
        status: 'IN_PROGRESS',
        evalScore: 8.5,
      },
      {
        id: 'post-2',
        studentId: 'std-102',
        studentName: 'Dr. Ananya Ray',
        wardName: 'Cardiac Cath Lab & ICU Unit',
        startDate: '2026-06-15',
        endDate: '2026-09-30',
        status: 'IN_PROGRESS',
        evalScore: 9.8,
      },
    ];

    return {
      success: true,
      data: postings,
      timestamp: new Date().toISOString(),
    };
  }

  async getCbmeCompetencies(): Promise<ApiResponse<CbmeCompetencyDto[]>> {
    return {
      success: true,
      data: this.competencies,
      timestamp: new Date().toISOString(),
    };
  }

  async getLogbookEntries(): Promise<ApiResponse<StudentLogbookEntryDto[]>> {
    return {
      success: true,
      data: this.logbookEntries,
      timestamp: new Date().toISOString(),
    };
  }

  async signOffLogbookEntry(logId: string, facultyName: string): Promise<ApiResponse> {
    const entry = this.logbookEntries.find((l) => l.id === logId);
    if (entry) {
      entry.facultySign = true;
      entry.signedBy = facultyName;
    }
    return {
      success: true,
      message: 'Logbook entry digitally verified and signed by faculty',
      data: entry,
      timestamp: new Date().toISOString(),
    };
  }

  async evaluateOsceStation(dto: OsceEvaluationDto): Promise<ApiResponse<OsceEvaluationDto>> {
    const total =
      dto.historyTakingScore +
      dto.physicalExamScore +
      dto.communicationScore +
      dto.skillExecutionScore;

    const result: OsceEvaluationDto = {
      ...dto,
      totalScore: total,
      maxScore: 20,
    };

    return {
      success: true,
      message: 'OSCE/OSPE station rubric evaluated',
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  async getInternalAssessments(): Promise<ApiResponse<InternalAssessmentEligibilityDto[]>> {
    const data: InternalAssessmentEligibilityDto[] = [
      {
        studentId: 'std-101',
        studentName: 'Rohan Deshmukh',
        rollNumber: 'MBBS-2023-042',
        subject: 'General Surgery',
        theoryIaScore: 32, // Out of 50
        practicalIaScore: 36, // Out of 50
        combinedIaPercentage: 68.0,
        isEligibleForUniversityExam: true, // >= 40% mandate
        attendancePercentage: 92.4,
      },
      {
        studentId: 'std-102',
        studentName: 'Dr. Ananya Ray',
        rollNumber: 'MD-CARDIO-2024-009',
        subject: 'Advanced Clinical Cardiology',
        theoryIaScore: 44,
        practicalIaScore: 47,
        combinedIaPercentage: 91.0,
        isEligibleForUniversityExam: true,
        attendancePercentage: 98.1,
      },
    ];

    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  async getIsolatedStudentDashboard(studentId: string = 'std-101'): Promise<ApiResponse> {
    const student = this.students.find((s) => s.id === studentId) || this.students[0];
    const logbook = this.logbookEntries.filter((l) => l.studentId === studentId);
    
    return {
      success: true,
      data: {
        studentId: student.id,
        name: student.name,
        rollNumber: student.rollNumber,
        course: student.courseName,
        currentSemester: student.currentSemester,
        attendancePercentage: student.attendancePercentage,
        feeStatus: 'PAID',
        pendingFeeAmount: 0,
        internalAssessmentScore: 68.0,
        isIaEligible: true,
        assignedWard: 'General Surgery OPD & Ward 4',
        activePostings: [
          {
            id: 'post-1',
            wardName: 'General Surgery OPD & Ward 4',
            startDate: '2026-07-01',
            endDate: '2026-08-15',
            status: 'IN_PROGRESS',
          },
        ],
        recentLogbookEntries: logbook,
      },
      timestamp: new Date().toISOString(),
    };
  }

  async getIsolatedStaffDashboard(staffId: string = 'stf-204'): Promise<ApiResponse> {
    return {
      success: true,
      data: {
        staffId: staffId,
        employeeCode: 'EMP-PHARM-882',
        name: 'Priya Sharma (Senior Charge Nurse / Staff)',
        designation: 'Senior Charge Nurse',
        department: 'ICU & Emergency Operations',
        shiftHours: '08:00 AM - 04:00 PM (Morning Shift)',
        monthlySalary: 72500,
        leaveBalanceDays: 14,
        assignedModule: 'LIVE_WARD_BED_MATRIX',
        operatingMetrics: {
          pendingTasks: 4,
          completedToday: 18,
          systemAlerts: 1,
        },
      },
      timestamp: new Date().toISOString(),
    };
  }
}
