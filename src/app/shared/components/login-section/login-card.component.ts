import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface Credentials {
  username: string;
  password: string;
}

export interface LoginPayload {
  role: string;
  credentials: Credentials;
}

export type Role = 'admin' | 'doctor' | 'patient';

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template:`
  <div 
  class="login-card" 
  [ngClass]="{ active: isActive }"
  (click)="!isActive && onCardClick()"
>
  <!-- Card Header with Role-Based Gradient -->
  <div class="login-card-header" [ngClass]="getHeaderGradientClass()">
    <!-- SVG Icon Support -->
    <ng-container *ngIf="icon">
      <!-- Inline SVG for better performance -->
      <div class="role-icon-wrapper">
        <img 
          [src]="icon" 
          [alt]="label"
          class="role-icon-svg brightness-0 invert"
          [attr.data-role]="role"
        />
      </div>
    </ng-container>

    <h3>{{ label }}</h3>
    <p>{{ subtitle }}</p>
  </div>

  <!-- Card Body - Login Form -->
  <div class="login-card-body" *ngIf="isActive" (click)="stopPropagation($event)">
    <form (ngSubmit)="onSubmit()" novalidate>
      <!-- Username Field -->
      <div class="login-form-group">
        <label [for]="'username-' + role">Username</label>
        <input
          [id]="'username-' + role"
          type="text"
          [(ngModel)]="credentials.username"
          [name]="role + 'Username'"
          placeholder="Enter username"
          [disabled]="isLoading"
          required
        />
      </div>

      <!-- Password Field -->
      <div class="login-form-group">
        <label [for]="'password-' + role">Password</label>
        <div class="password-wrapper">
          <input
            [id]="'password-' + role"
            [type]="showPassword ? 'text' : 'password'"
            [(ngModel)]="credentials.password"
            [name]="role + 'Password'"
            placeholder="Enter password"
            [disabled]="isLoading"
            required
          />
          <span
            class="toggle-pass"
            (click)="showPassword = !showPassword"
            [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'"
            [class.disabled]="isLoading"
          >
            <!-- {{ showPassword ? '🙈' : '👁️' }} -->
          </span>
        </div>
      </div>

      <!-- Error Message -->
      <div *ngIf="errorMessage" class="login-error">
        {{ errorMessage }}
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="login-btn"
        [ngClass]="getButtonClass()"
        [disabled]="isLoading"
      >
        {{ isLoading ? '⏳ Logging in...' : 'Login' }}
      </button>
    </form>

    <!-- Register Link -->
    <div *ngIf="showRegisterLink" class="register-link">
      Don't have an account?
      <a routerLink="/register">Register here</a>
    </div>
  </div>

  <!-- Collapsed State Message -->
  <div class="login-card-footer" *ngIf="!isActive">
    <span>Click to expand</span>
  </div>
</div>
  `,
  styles:`
  /* ============================================
   LOGIN CARD COMPONENT
   ============================================ */

:host {
  display: inline-block;
  width: 100%;
}

.login-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.35s ease;
  flex: 1;
  min-width: 260px;
  max-width: 340px;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
}

.login-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.13);
}

.login-card.active {
  border-color: #0d6efd;
  box-shadow: 0 8px 36px rgba(13, 110, 253, 0.18);
  transform: translateY(-4px);
}

/* ============================================
   HEADER STYLING
   ============================================ */

.login-card-header {
  padding: 28px 24px 22px;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.admin-header {
  background: linear-gradient(135deg, #0d6efd, #0a58ca);
}

.doctor-header {
  background: linear-gradient(135deg, #198754, #157347);
}

.patient-header {
  background: linear-gradient(135deg, #ea4343, #c0392b);
}

.login-card-header h3 {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: white;
}

.login-card-header p {
  font-size: 13px;
  margin: 0;
  opacity: 0.85;
  color: white;
}

/* ============================================
   SVG & ICON STYLING
   ============================================ */

.role-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  margin: 0 auto;
}

/* SVG Icon */
.role-icon-svg {
  width: 42px;
  height: 42px;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2));
  display: block;
}

/* Mask-based Icon (for non-SVG URIs) */
.role-icon-mask {
  width: 42px;
  height: 42px;
  background-color: white;
  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: contain;
  -webkit-mask-position: center;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2));
  margin: 0 auto;
}

/* ============================================
   FORM STYLING
   ============================================ */

.login-card-body {
  padding: 24px;
  animation: fadeSlideIn 0.3s ease;
  flex-grow: 1;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 16px;
  text-align: left;
}

.login-form-group label {
  font-weight: 600;
  font-size: 13px;
  color: #444;
}

.login-form-group input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.25s, box-shadow 0.25s;
  box-sizing: border-box;
  outline: none;
  background: white;
  color: #333;
}

.login-form-group input:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.1);
}

.login-form-group input:disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

/* ============================================
   PASSWORD FIELD STYLING
   ============================================ */

.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-wrapper input {
  padding-right: 40px;
}

.toggle-pass {
  position: absolute;
  right: 12px;
  cursor: pointer;
  font-size: 16px;
  user-select: none;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.toggle-pass:hover:not(.disabled) {
  opacity: 1;
}

.toggle-pass.disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

/* ============================================
   ERROR MESSAGE STYLING
   ============================================ */

.login-error {
  background: #fff5f5;
  border: 1px solid #fca5a5;
  color: #dc2626;
  font-size: 12px;
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 14px;
  text-align: left;
  animation: slideIn 0.2s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ============================================
   BUTTON STYLING
   ============================================ */

.login-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  letter-spacing: 0.3px;
  color: white;
  margin-bottom: 12px;
}

.admin-btn {
  background: linear-gradient(90deg, #0d6efd, #0a58ca);
}

.doctor-btn {
  background: linear-gradient(90deg, #198754, #157347);
}

.patient-btn {
  background: linear-gradient(90deg, #ea4343, #c0392b);
}

.login-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
}

.login-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  transform: none;
}

/* ============================================
   FOOTER & REGISTER LINK
   ============================================ */

.login-card-footer {
  padding: 18px;
  text-align: center;
  color: #aaa;
  font-size: 13px;
  border-top: 1px solid #f0f0f0;
}

.register-link {
  text-align: center;
  font-size: 13px;
  color: #666;
}

.register-link a {
  color: #0d6efd;
  font-weight: 600;
  text-decoration: none;
  transition: text-decoration 0.2s;
}

.register-link a:hover {
  text-decoration: underline;
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */

@media (max-width: 768px) {
  .login-card {
    max-width: 100%;
    min-width: auto;
  }

  .login-card-header {
    padding: 24px 20px 18px;
  }

  .login-card-header h3 {
    font-size: 18px;
  }

  .login-card-body {
    padding: 20px;
  }

  .login-form-group input {
    padding: 9px 12px;
    font-size: 13px;
  }

  .login-btn {
    padding: 11px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .login-card {
    border-radius: 12px;
  }

  .login-card-header {
    padding: 20px 16px 14px;
  }

  .login-card-header h3 {
    font-size: 16px;
  }

  .login-card-header p {
    font-size: 12px;
  }

  .role-icon-svg,
  .role-icon-mask {
    width: 36px;
    height: 36px;
  }

  .login-card-body {
    padding: 16px;
  }

  .login-form-group label {
    font-size: 12px;
  }

  .login-form-group input {
    padding: 8px 10px;
    font-size: 12px;
    border-radius: 6px;
  }

  .toggle-pass {
    right: 8px;
    font-size: 14px;
  }

  .login-btn {
    padding: 10px;
    font-size: 13px;
  }

  .login-error {
    font-size: 11px;
    padding: 7px 10px;
  }

  .register-link {
    font-size: 12px;
  }
}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginCardComponent {
  @Input() icon: string = '';
  @Input() label: string = '';
  @Input() subtitle: string = '';
  @Input() role: Role = 'patient';
  @Input() showRegisterLink: boolean = false;
  @Input() isActive: boolean = false;
  @Input() errorMessage: string = '';
  @Input() isLoading: boolean = false;

  @Output() cardClick = new EventEmitter<Role>();
  @Output() loginSubmit = new EventEmitter<LoginPayload>();

  showPassword: boolean = false;

  credentials: Credentials = {
    username: '',
    password: ''
  };

  onCardClick(): void {
    this.cardClick.emit(this.role);
    if (this.isActive) {
      this.resetForm();
    }
  }

  onSubmit(): void {
    if (!this.credentials.username || !this.credentials.password) {
      return;
    }

    this.loginSubmit.emit({
      role: this.role,
      credentials: this.credentials
    });
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  resetForm(): void {
    this.credentials = { username: '', password: '' };
    this.showPassword = false;
  }

  getHeaderGradientClass(): string {
    const gradients: Record<Role, string> = {
      admin: 'admin-header',
      doctor: 'doctor-header',
      patient: 'patient-header'
    };
    return gradients[this.role];
  }

  getButtonClass(): string {
    const buttons: Record<Role, string> = {
      admin: 'admin-btn',
      doctor: 'doctor-btn',
      patient: 'patient-btn'
    };
    return buttons[this.role];
  }
}