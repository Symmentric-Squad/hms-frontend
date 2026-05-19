import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminRemarkRequest, AppointmentRequest, AppointmentResponse, ChangePasswordRequest, ContactQueryDetailResponse, ContactQueryListResponse, CreateDoctorRequest, CreatePatientRequest, DashboardResponse, DoctorResponse, MedicalHistoryRequest, MedicalHistoryResponse, PatientResponse, SpecializationRequest, SpecializationResponse, UpdateDoctorRequest, UpdatePatientRequest, UpdateUserRequest, UserResponse } from '../models/admin.model';



@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  // GET /api/admin/dashboard
  getDashboard(): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>(`${this.baseUrl}/admin/dashboard`);
  }

  // GET /api/admin/contact-queries/unread
  getUnreadQueries(): Observable<ContactQueryListResponse[]> {
    return this.http.get<ContactQueryListResponse[]>(
      `${this.baseUrl}/admin/contact-queries/unread`,
    );
  }

  // GET /api/admin/contact-queries/read
  getReadQueries(): Observable<ContactQueryListResponse[]> {
    return this.http.get<ContactQueryListResponse[]>(`${this.baseUrl}/admin/contact-queries/read`);
  }

  // GET /api/admin/contact-queries/:id
  getQueryById(id: number): Observable<ContactQueryDetailResponse> {
    return this.http.get<ContactQueryDetailResponse>(`${this.baseUrl}/admin/contact-queries/${id}`);
  }

  // PATCH /api/admin/contact-queries/:id/remark
  addRemark(id: number, request: AdminRemarkRequest): Observable<string> {
    return this.http.patch<string>(`${this.baseUrl}/admin/contact-queries/${id}/remark`, request, {
      responseType: 'text' as 'json',
    });
  }

  // PUT /api/admin/:id/change-password
  changePassword(id: number, request: ChangePasswordRequest): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/admin/${id}/change-password`, request, {
      responseType: 'text' as 'json',
    });
  }

  // GET /api/doctors
  getAllDoctors(): Observable<DoctorResponse[]> {
    return this.http.get<DoctorResponse[]>(`${this.baseUrl}/doctors`);
  }

  // POST /api/doctors
  createDoctor(request: CreateDoctorRequest): Observable<DoctorResponse> {
    return this.http.post<DoctorResponse>(`${this.baseUrl}/doctors`, request);
  }

  // PUT /api/doctors/:id
  updateDoctor(id: number, request: UpdateDoctorRequest): Observable<DoctorResponse> {
    return this.http.put<DoctorResponse>(`${this.baseUrl}/doctors/${id}`, request);
  }

  // GET /api/doctor-specializations
  getAllSpecializations(): Observable<SpecializationResponse[]> {
    return this.http.get<SpecializationResponse[]>(`${this.baseUrl}/doctor-specializations`);
  }

  // POST /api/doctor-specializations
  createSpecialization(request: SpecializationRequest): Observable<SpecializationResponse> {
    return this.http.post<SpecializationResponse>(
      `${this.baseUrl}/doctor-specializations`,
      request,
    );
  }

  // PATCH /api/doctor-specializations/:id
  updateSpecialization(
    id: number,
    request: SpecializationRequest,
  ): Observable<SpecializationResponse> {
    return this.http.patch<SpecializationResponse>(
      `${this.baseUrl}/doctor-specializations/${id}`,
      request,
    );
  }

  // DELETE /api/doctor-specializations/:id
  deleteSpecialization(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/doctor-specializations/${id}`, {
      responseType: 'text' as 'json',
    });
  }

  // GET /api/patients
  getAllPatients(): Observable<PatientResponse[]> {
    return this.http.get<PatientResponse[]>(`${this.baseUrl}/patients`);
  }

  // GET /api/patients/:id
  getPatientById(id: number): Observable<PatientResponse> {
    return this.http.get<PatientResponse>(`${this.baseUrl}/patients/${id}`);
  }

  // GET /api/patients/doctor/:doctorId
  getPatientsByDoctor(doctorId: number): Observable<PatientResponse[]> {
    return this.http.get<PatientResponse[]>(`${this.baseUrl}/patients/doctor/${doctorId}`);
  }

  // POST /api/patients
  createPatient(request: CreatePatientRequest): Observable<PatientResponse> {
    return this.http.post<PatientResponse>(`${this.baseUrl}/patients`, request);
  }

  // PUT /api/patients/:id
  updatePatient(id: number, request: UpdatePatientRequest): Observable<PatientResponse> {
    return this.http.put<PatientResponse>(`${this.baseUrl}/patients/${id}`, request);
  }

  // POST /api/patients/:patientId/medical-history
  addMedicalHistory(
    patientId: number,
    request: MedicalHistoryRequest,
  ): Observable<MedicalHistoryResponse> {
    return this.http.post<MedicalHistoryResponse>(
      `${this.baseUrl}/patients/${patientId}/medical-history`,
      request,
    );
  }

  // GET /api/patients/:patientId/medical-history
  getMedicalHistory(patientId: number): Observable<MedicalHistoryResponse[]> {
    return this.http.get<MedicalHistoryResponse[]>(
      `${this.baseUrl}/patients/${patientId}/medical-history`,
    );
  }

  // POST /api/appointments
  createAppointment(request: AppointmentRequest): Observable<AppointmentResponse> {
    return this.http.post<AppointmentResponse>(`${this.baseUrl}/appointments`, request);
  }

  //GET /api/appointments
  getAllAppointments(): Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(`${this.baseUrl}/appointments`);
  }

  //GET /api/appointments/user/:userId
  getAppointmentHistory(userId: string): Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(`${this.baseUrl}/appointments/user/${userId}`);
  }

  // GET /api/users/:id
  getUserById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/users/${id}`);
  }

  // PUT /api/users/:id
  updateUser(id: number, request: UpdateUserRequest): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.baseUrl}/users/${id}`, request);
  }

  //DELETE /api/users/:id
  deleteUser(id: number): Observable<String>{
    return this.http.delete<String>(`${this.baseUrl}/users/${id}`);
  }
}
