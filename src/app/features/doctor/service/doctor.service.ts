import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DoctorResponse } from '../../admin/models/admin.model';
import { AppointmentResponse, ChangePasswordRequest, CreatePatientRequest, MedicalHistoryRequest, MedicalHistoryResponse, PatientResponse, SpecializationResponse, UpdateDoctorRequest } from '../models/doctor.model';



@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private baseUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  // GET /api/doctors/:id
  getDoctorById(id: number): Observable<DoctorResponse> {
    return this.http.get<DoctorResponse>(`${this.baseUrl}/doctors/${id}`);
  }

  // GET /api/doctors
  getAllDoctors(): Observable<DoctorResponse[]> {
    return this.http.get<DoctorResponse[]>(`${this.baseUrl}/doctors`);
  }

  // PUT /api/doctors/:id
  updateDoctorProfile(id: number, request: UpdateDoctorRequest): Observable<DoctorResponse> {
    return this.http.put<DoctorResponse>(`${this.baseUrl}/doctors/${id}`, request);
  }

  // PUT /api/doctors/:id/change-password  (mapped via DoctorController)
  changePassword(id: number, request: ChangePasswordRequest): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/doctors/${id}/change-password`, request, {
      responseType: 'text' as 'json',
    });
  }

  // GET /api/appointments/doctor/:doctorId
  getAppointments(doctorId: number): Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(`${this.baseUrl}/appointments/doctor/${doctorId}`);
  }

  // PATCH /api/appointments/:id/cancel-by-doctor
  cancelAppointment(appointmentId: number): Observable<string> {
    return this.http.patch<string>(
      `${this.baseUrl}/appointments/${appointmentId}/cancel-by-doctor`,
      null,
      {
        responseType: 'text' as 'json',
      },
    );
  }

  // GET /api/patients/doctor/:doctorId
  getMyPatients(doctorId: number): Observable<PatientResponse[]> {
    return this.http.get<PatientResponse[]>(`${this.baseUrl}/patients/doctor/${doctorId}`);
  }

  // GET /api/patients/:id
  getPatientById(id: number): Observable<PatientResponse> {
    return this.http.get<PatientResponse>(`${this.baseUrl}/patients/${id}`);
  }

  // POST /api/patients
  createPatient(request: CreatePatientRequest): Observable<PatientResponse> {
    return this.http.post<PatientResponse>(`${this.baseUrl}/patients`, request);
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

  // GET /api/doctor-specializations
  getAllSpecializations(): Observable<SpecializationResponse[]> {
    return this.http.get<SpecializationResponse[]>(`${this.baseUrl}/doctor-specializations`);
  }
}
