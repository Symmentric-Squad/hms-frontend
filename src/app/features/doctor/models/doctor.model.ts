export interface DoctorResponse {
  id: number;
  doctorName: string;
  address: string;
  doctorFees: number;
  contactNo: number;
  doctorEmail: string;
  specializationName: string;
}

export interface UpdateDoctorRequest {
  specializationId: number;
  doctorName: string;
  address: string;
  doctorFees: number;
  doctorEmail: string;
  contactNo: number;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AppointmentResponse {
  patientName: string;
  doctorName: string;
  specialization: string;
  consultancyFees: number;
  appointmentDate: string;
  appointmentTime: string;
  creationDate: string;
  currentStatus: string;
  status: number;
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

export interface SpecializationResponse {
  specialization: string;
  creationDate: string;
  updationDate: string | null;
}
