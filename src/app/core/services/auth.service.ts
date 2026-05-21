import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterUserRequest, RegisterUserResponse } from '../models/auth.model';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  clearCurrentUser() {
    throw new Error('Method not implemented.');
  }
  setCurrentUser(appUser: any) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient, private router: Router) {}

  // POST /api/auth/users/register
  registerUser(request: RegisterUserRequest): Observable<RegisterUserResponse> {
    return this.http.post<RegisterUserResponse>(`${this.baseUrl}/auth/users/register`, request);
  }

  // POST /api/auth/users/login
  loginUser(request: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/users/login`, request)
      .pipe(tap((res) => this.storeSession(res)));
  }

  // POST /api/auth/doctors/login
  loginDoctor(request: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/doctors/login`, request)
      .pipe(tap((res) => this.storeSession(res)));
  }

  // POST /api/auth/admin/login
  loginAdmin(request: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/admin/login`, request)
      .pipe(tap((res) => this.storeSession(res)));
  }

  private storeSession(res: LoginResponse): void {
    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.role);
    localStorage.setItem('userId', res.userId.toString());
    localStorage.setItem('email', res.email);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['./login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserId(): number {
    return Number(localStorage.getItem('userId'));
  }

  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }
  isDoctor(): boolean {
    return this.getRole() === 'DOCTOR';
  }
  isUser(): boolean {
    return this.getRole() === 'USER';
  }
}
