import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginCredentials, LoginSubmitEvent } from './login.model';

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: 'login-section.css',
  template:`
  <div
  class="login-card"
  [class.active]="isActive"
  (click)="onCardClick()"
>
  <!-- Header -->
  <div class="login-card-header {{ role }}-header">
    <div class="role-icon">{{ icon }}</div>
    <h3>{{ label }}</h3>
    <p>{{ subtitle }}</p>
  </div>

  <!-- Expanded body -->
  <div
    class="login-card-body"
    *ngIf="isActive"
    (click)="stopPropagation($event)"
  >
    <form (ngSubmit)="onSubmit()" novalidate>
      <!-- Username -->
      <div class="login-form-group">
        <label>Username</label>
        <input
          type="text"
          [(ngModel)]="credentials.username"
          [name]="role + 'Username'"
          placeholder="Enter {{ role }} username"
          required
        />
      </div>

      <!-- Password -->
      <div class="login-form-group">
        <label>Password</label>
        <div class="password-wrapper">
          <input
            [type]="showPassword ? 'text' : 'password'"
            [(ngModel)]="credentials.password"
            [name]="role + 'Password'"
            placeholder="Enter password"
            required
          />
          <span
            class="toggle-pass"
            (click)="showPassword = !showPassword"
          >
            {{ showPassword ? '🙈' : '👁️' }}
          </span>
        </div>
      </div>

      <!-- Error -->
      <div class="login-error" *ngIf="errorMessage">{{ errorMessage }}</div>

      <!-- Submit -->
      <button type="submit" class="login-btn {{ role }}-btn">
        Login as {{ label.replace(' Login', '') }}
      </button>
    </form>

    <!-- Register link (patient only) -->
    <div class="register-link" *ngIf="showRegisterLink">
      Don't have an account? <a routerLink="/register">Register here</a>
    </div>
  </div>

  <!-- Collapsed footer -->
  <div class="login-card-footer" *ngIf="!isActive">
    <span>Click to expand</span>
  </div>
</div>
`
})
export class LoginCardComponent implements OnChanges {
  /** Role identifier: 'admin' | 'doctor' | 'patient' */
  @Input() role!: string;

  /** Display label shown in the card header, e.g. "Admin Login" */
  @Input() label!: string;

  /** Emoji / icon shown in the card header */
  @Input() icon!: string;

  /** Subtitle shown below the label */
  @Input() subtitle!: string;

  /** Whether this card is currently expanded */
  @Input() isActive = false;

  /** Error message to display (controlled by parent) */
  @Input() errorMessage = '';

  /** Show a register link at the bottom (patient card) */
  @Input() showRegisterLink = false;

  /** Emitted when the card header is clicked */
  @Output() cardClick = new EventEmitter<string>();

  /** Emitted on form submit with role + credentials */
  @Output() loginSubmit = new EventEmitter<LoginSubmitEvent>();

  credentials: LoginCredentials = { username: '', password: '' };
  showPassword = false;

  ngOnChanges(changes: SimpleChanges): void {
    // Clear credentials when card is collapsed
    if (changes['isActive'] && !this.isActive) {
      this.credentials = { username: '', password: '' };
      this.showPassword = false;
    }
  }

  onCardClick(): void {
    this.cardClick.emit(this.role);
  }

  onSubmit(): void {
    this.loginSubmit.emit({ role: this.role, credentials: { ...this.credentials } });
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}