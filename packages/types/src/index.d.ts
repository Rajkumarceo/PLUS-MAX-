export declare enum UserRoleType {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    DOCTOR = "DOCTOR",
    NURSE = "NURSE",
    STAFF = "STAFF",
    STUDENT = "STUDENT",
    FACULTY = "FACULTY",
    PATIENT = "PATIENT"
}
export interface TenantContext {
    tenantId: string;
    tenantCode: string;
    domain?: string;
}
export type PersonaRoleKey = 'STUDENT' | 'DOCTOR' | 'NURSE' | 'HOSPITAL_ADMIN' | 'COLLEGE_ADMIN' | 'SUPER_ADMIN';
export interface UserPersonaDto {
    roleKey: PersonaRoleKey;
    title: string;
    name: string;
    email: string;
    avatarBadge: string;
    tenantName: string;
    defaultDomain: string;
    permissions: string[];
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
    code: string;
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
    isEligibleForUniversityExam: boolean;
    attendancePercentage: number;
}
export interface EmployeeAttendanceDto {
    employeeId: string;
    employeeCode: string;
    name: string;
    designation: string;
    checkIn?: string;
    checkOut?: string;
    status: 'PRESENT' | 'ABSENT' | 'LEAVE';
}
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
