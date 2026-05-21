export interface DashboardResponse {
  userCount: number;
  doctorCount: number;
  appointmentCount: number;
  patientCount: number;
  queriesCount: number;
}

export interface ContactQueryListResponse {
  fullName: string;
  email: string;
  contactNo: number;
  message: string;
  postingDate: string;
}

export interface ContactQueryDetailResponse {
  id: number;
  fullName: string;
  email: string;
  contactNo: number;
  message: string;
  postingDate: string;
  adminRemark: string;
  lastUpdationDate: string;
  read: boolean;
}

export interface AdminRemarkRequest {
  adminRemark: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface CreateDoctorRequest {
  specializationId: number;
  doctorName: string;
  address: string;
  doctorFees: number;
  contactNo: number;
  doctorEmail: string;
  password: string;
}

export interface UpdateDoctorRequest {
  specializationId: number;
  doctorName: string;
  address: string;
  doctorFees: number;
  doctorEmail: string;
  contactNo: number;
}

export interface DoctorResponse {
  id: number;
  doctorName: string;
  address: string;
  doctorFees: number;
  contactNo: number;
  doctorEmail: string;
  specializationName: string;
}

export interface SpecializationRequest {
  specialization: string;
}

export interface SpecializationResponse {
  id: number;
  specialization: string;
  creationDate: string;
  updationDate: string | null;
}

export interface CreatePatientRequest {
  doctorId: number;
  patientName: string;
  patientContactNo: number;
  patientEmail: string;
  patientGender: string;
  patientAddress: string;
  patientAge: number;
  patientMedicalHistory: string;
}

export interface UpdatePatientRequest {
  patientName: string;
  patientContactNo: number;
  patientEmail: string;
  patientGender: string;
  patientAddress: string;
  patientAge: number;
  patientMedicalHistory: string;
}

export interface PatientResponse {
  patientId: number;
  doctorId: number;
  patientName: string;
  patientContactNo: number;
  patientEmail: string;
  patientGender: string;
  patientAddress: string;
  patientAge: number;
  patientMedicalHistory: string;
  creationDate: string;
  updationDate: string | null;
}

export interface MedicalHistoryRequest {
  bloodPressure: string;
  bloodSugar: string;
  weight: string;
  temperature: string;
  medicalPrescription: string;
}

export interface MedicalHistoryResponse {
  patientName: string;
  bloodPressure: string;
  bloodSugar: string;
  weight: string;
  temperature: string;
  medicalPrescription: string;
}

export interface AppointmentRequest {
  doctorId: number;
  userId: number;
  consultancyFees: number;
  appointmentDate: string; // "YYYY-MM-DD"
  appointmentTime: string; // "10:30 AM"
}

export interface AppointmentResponse {
  appointmentId: number;
  patientName: string;
  doctorName: string;
  specialization: string;
  consultancyFees: number;
  appointmentDate: string;
  appointmentTime: string;
  creationDate: string;
  currentStatus?: string;
  status: number;
}

export interface UserResponse {
  userId: number;
  fullName: string;
  email: string;
  address: string;
  city: string;
  gender: string;
  regDate: string;
  updationDate: string | null;
}

export interface UpdateUserRequest {
  fullName: string;
  address: string;
  city: string;
  gender: string;
  password?: string;
}
