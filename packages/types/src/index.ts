// ==========================================
// PLUX MAX ENTERPRISE ERP - SHARED TYPES
// ==========================================

export enum UserRoleType {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  NURSE = 'NURSE',
  STAFF = 'STAFF',
  STUDENT = 'STUDENT',
  FACULTY = 'FACULTY',
  PATIENT = 'PATIENT',
}

export interface TenantContext {
  tenantId: string;
  tenantCode: string;
  domain?: string;
}

export type PersonaRoleKey = 'STUDENT' | 'DOCTOR' | 'NURSE' | 'HOSPITAL_ADMIN' | 'COLLEGE_ADMIN' | 'SUPER_ADMIN';

export type PermissionKey =
  | 'student:profile:read_own'
  | 'student:attendance:read_own'
  | 'student:marks:read_own'
  | 'student:postings:read_own'
  | 'student:logbook:write_own'
  | 'student:fees:read_own'
  | 'staff:profile:read_own'
  | 'staff:payroll:read_own'
  | 'staff:shift:read_own'
  | 'staff:leave:request_own'
  | 'emr:patient:read_assigned'
  | 'emr:patient:write_assigned'
  | 'emr:opd:operate'
  | 'emr:logbook:signoff'
  | 'emr:triage:read'
  | 'pharmacy:inventory:read'
  | 'pharmacy:inventory:write'
  | 'pharmacy:dispense:operate'
  | 'lab:orders:read'
  | 'lab:reports:write'
  | 'billing:invoices:create'
  | 'billing:invoices:read'
  | 'billing:pos:collect'
  | 'hospital:beds:read'
  | 'hospital:beds:manage'
  | 'academic:curriculum:manage'
  | 'academic:students:read_all'
  | 'academic:exams:evaluate'
  | 'academic:nmc_report:generate'
  | 'superadmin:tenants:manage'
  | 'superadmin:subscriptions:manage'
  | '*:*';

export interface UserPersonaDto {
  roleKey: PersonaRoleKey;
  title: string;
  name: string;
  email: string;
  avatarBadge: string;
  tenantName: string;
  defaultDomain: string;
  permissions: PermissionKey[];
}

export interface JwtClaimPayload {
  sub: string;
  tenantId: string;
  tenantCode: string;
  email: string;
  roleKey: PersonaRoleKey;
  profileId: string;
  permissions: PermissionKey[];
  iat?: number;
  exp?: number;
}

export interface StudentDashboardData {
  studentId: string;
  name: string;
  rollNumber: string;
  course: string;
  currentSemester: number;
  attendancePercentage: number;
  feeStatus: 'PAID' | 'PENDING' | 'OVERDUE';
  pendingFeeAmount: number;
  internalAssessmentScore: number;
  isIaEligible: boolean;
  assignedWard: string;
  activePostings: Array<{
    id: string;
    wardName: string;
    startDate: string;
    endDate: string;
    status: string;
  }>;
  recentLogbookEntries: Array<{
    id: string;
    competencyCode: string;
    performedLevel: string;
    facultySign: boolean;
    signedBy?: string;
    createdAt: string;
  }>;
}

export interface StaffDashboardData {
  staffId: string;
  employeeCode: string;
  name: string;
  designation: string;
  department: string;
  shiftHours: string;
  monthlySalary: number;
  leaveBalanceDays: number;
  assignedModule: string;
  operatingMetrics: {
    pendingTasks: number;
    completedToday: number;
    systemAlerts: number;
  };
}

export interface MultiRoleLoginDto {
  email: string;
  password?: string;
  roleKey: PersonaRoleKey;
  tenantCode?: string;
  mfaCode?: string;
}

export interface AuthUserPayload {
  userId: string;
  tenantId: string;
  email: string;
  userType: UserRoleType;
  roles: string[];
  permissions: string[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ------------------------------------------
// Domain 1: Public Web & Appointments
// ------------------------------------------
export interface AppointmentBookingDto {
  patientId: string;
  doctorId: string;
  appointmentTime: string;
  reason?: string;
}

export interface DoctorCardDto {
  id: string;
  name: string;
  specialization: string;
  qualification: string;
  experienceYears: number;
  consultationFee: number;
  departmentName: string;
  avatarUrl?: string;
}

// ------------------------------------------
// Domain 2: Core Hospital ERP
// ------------------------------------------
export interface PatientRegistrationDto {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  phone: string;
  email?: string;
  bloodGroup?: string;
  address?: string;
  emergencyContact?: string;
  nationalId?: string;
}

export interface BedOccupancyStatus {
  wardId: string;
  wardName: string;
  wardType: string;
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  occupancyRate: number;
}

// ------------------------------------------
// Domain 3: Clinical & Diagnostics
// ------------------------------------------
export interface PharmacyItemDto {
  id: string;
  name: string;
  category: string;
  sku: string;
  unitPrice: number;
  stockQty: number;
  reorderLevel: number;
}

export interface LabOrderDto {
  id: string;
  patientUhid: string;
  patientName: string;
  testName: string;
  category: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  reportUrl?: string;
  createdAt: string;
}

// ------------------------------------------
// Domain 4: Financial ERP
// ------------------------------------------
export interface CreateInvoiceDto {
  patientId: string;
  items: {
    description: string;
    unitPrice: number;
    quantity: number;
  }[];
  discount?: number;
  gstRatePercentage?: number;
}

export interface PaymentProcessDto {
  invoiceId: string;
  amount: number;
  paymentMode: 'CASH' | 'CARD' | 'UPI' | 'RAZORPAY' | 'STRIPE' | 'INSURANCE';
  transactionId?: string;
}

// ------------------------------------------
// Domain 5: Academic (Medical College) ERP
// ------------------------------------------
export interface StudentProfileDto {
  id: string;
  rollNumber: string;
  name: string;
  batchYear: number;
  courseName: string;
  currentYear: number;
  currentSemester: number;
  attendancePercentage: number;
}

export interface ClinicalPostingDto {
  id: string;
  studentId: string;
  studentName: string;
  wardName: string;
  startDate: string;
  endDate: string;
  status: string;
  evalScore?: number;
}

export interface CbmeCompetencyDto {
  id: string;
  code: string; // e.g. "SU11.1", "IM3.4"
  subject: string;
  topic: string;
  description: string;
  levelRequired: 'K' | 'KH' | 'SH' | 'P';
}

export interface StudentLogbookEntryDto {
  id: string;
  studentId: string;
  studentName: string;
  competencyCode: string;
  performedLevel: 'OBSERVED' | 'ASSISTED' | 'PERFORMED';
  patientUhid?: string;
  clinicalNotes?: string;
  rating?: number;
  facultySign: boolean;
  signedBy?: string;
  createdAt: string;
}

export interface OsceEvaluationDto {
  stationNumber: number;
  stationTitle: string;
  historyTakingScore: number;
  physicalExamScore: number;
  communicationScore: number;
  skillExecutionScore: number;
  totalScore: number;
  maxScore: number;
  examinerNotes?: string;
}

export interface InternalAssessmentEligibilityDto {
  studentId: string;
  studentName: string;
  rollNumber: string;
  subject: string;
  theoryIaScore: number;
  practicalIaScore: number;
  combinedIaPercentage: number;
  isEligibleForUniversityExam: boolean; // NMC mandate >= 40%
  attendancePercentage: number;
}

// ------------------------------------------
// Domain 6: HR & Admin
// ------------------------------------------
export interface EmployeeAttendanceDto {
  employeeId: string;
  employeeCode: string;
  name: string;
  designation: string;
  checkIn?: string;
  checkOut?: string;
  status: 'PRESENT' | 'ABSENT' | 'LEAVE';
}

// ------------------------------------------
// Domain 7: AI Predictive Analytics
// ------------------------------------------
export interface TriagePredictionRequest {
  symptoms: string;
  vitals: {
    bpSystolic: number;
    bpDiastolic: number;
    heartRate: number;
    spo2: number;
    temperatureFahrenheit: number;
  };
}

export interface TriagePredictionResult {
  triageCategory: 'RED' | 'YELLOW' | 'GREEN';
  urgencyLevel: 'CRITICAL' | 'URGENT' | 'STABLE';
  confidenceScore: number;
  suggestedICD10Code: string;
  suggestedICD10Description: string;
  recommendedAction: string;
}

// ------------------------------------------
// Domain 8: Super Admin
// ------------------------------------------
export interface TenantRegistrationDto {
  name: string;
  code: string;
  domain?: string;
  planName: string;
  adminEmail: string;
  adminFirstName: string;
  adminLastName: string;
  adminPassword: string;
}
