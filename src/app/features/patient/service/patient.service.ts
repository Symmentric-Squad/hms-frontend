import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChangePasswordRequest } from '../../admin/models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = 'http://localhost:8082/api';
  
  constructor(private http: HttpClient) { }

  getProfile(id: any): Observable<any> {
    return this.http.get<any>(`/api/users/${id}`);
  }

  updateProfile(id: any, profileData: any): Observable<any> {
    return this.http.put<any>(`/api/users/${id}`, profileData);
  }

  bookAppointment(appointmentData: any): Observable<any> {
    return this.http.post<any>('/api/appointments', appointmentData);
  }

  getAppointmentHistory(userId: any): Observable<any> {
    return this.http.get<any>(`/api/appointments/user/${userId}`);
  }

  cancelOwnAppointment(id: any): Observable<any> {
    return this.http.patch(`/api/appointments/${id}/cancel-by-user`, {});
  }

  viewOwnMedicalHistory(patientId: any): Observable<any> {
    return this.http.get<any>(`/api/patients/${patientId}/medical-history`);
  }

  // PUT /api/admin/:id/change-password
  changeuserPassword(id: number, request: ChangePasswordRequest): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/users/${id}/change-password`, request, {
      responseType: 'text' as 'json',
    });
  }
}