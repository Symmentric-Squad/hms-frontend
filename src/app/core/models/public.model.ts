export interface UserResponse {
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

export interface DoctorResponse {
  id: number;
  doctorName: string;
  address: string;
  doctorFees: number;
  contactNo: number;
  doctorEmail: string;
  specializationName: string;
}

export interface SpecializationResponse {
  specialization: string;
  creationDate: string;
  updationDate: string | null;
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

export interface MedicalHistoryResponse {
  patientName: string;
  bloodPressure: string;
  bloodSugar: string;
  weight: string;
  temperature: string;
  medicalPrescription: string;
}

export interface ContactQueryRequest {
  fullName: string;
  email: string;
  contactNo: number;
  message: string;
}
