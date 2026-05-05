import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentRequest, AppointmentResponse, ContactQueryRequest, DoctorResponse, MedicalHistoryResponse, SpecializationResponse, UpdateUserRequest, UserResponse } from '../models/public.model';



@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private baseUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  // GET /api/users/:id
  getUserById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/users/${id}`);
  }

  // PUT /api/users/:id
  updateUser(id: number, request: UpdateUserRequest): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.baseUrl}/users/${id}`, request);
  }

  // GET /api/doctors
  getAllDoctors(): Observable<DoctorResponse[]> {
    return this.http.get<DoctorResponse[]>(`${this.baseUrl}/doctors`);
  }

  // GET /api/doctors/:id
  getDoctorById(id: number): Observable<DoctorResponse> {
    return this.http.get<DoctorResponse>(`${this.baseUrl}/doctors/${id}`);
  }

  // GET /api/doctor-specializations
  getAllSpecializations(): Observable<SpecializationResponse[]> {
    return this.http.get<SpecializationResponse[]>(`${this.baseUrl}/doctor-specializations`);
  }

  // POST /api/appointments
  bookAppointment(request: AppointmentRequest): Observable<AppointmentResponse> {
    return this.http.post<AppointmentResponse>(`${this.baseUrl}/appointments`, request);
  }

  // GET /api/appointments/user/:userId
  getMyAppointments(userId: number): Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(`${this.baseUrl}/appointments/user/${userId}`);
  }

  // PATCH /api/appointments/:id/cancel-by-user
  cancelAppointment(appointmentId: number): Observable<string> {
    return this.http.patch<string>(
      `${this.baseUrl}/appointments/${appointmentId}/cancel-by-user`,
      null,
      {
        responseType: 'text' as 'json',
      },
    );
  }

  // GET /api/patients/:patientId/medical-history
  getMedicalHistory(patientId: number): Observable<MedicalHistoryResponse[]> {
    return this.http.get<MedicalHistoryResponse[]>(
      `${this.baseUrl}/patients/${patientId}/medical-history`,
    );
  }

  // POST /api/contact-queries
  submitContactQuery(request: ContactQueryRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/contact-queries`, request, {
      responseType: 'text' as 'json',
    });
  }
}
