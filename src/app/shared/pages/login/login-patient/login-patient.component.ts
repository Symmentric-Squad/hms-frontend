import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login-patient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="login-card">
      <h2>🔐 Patient Login</h2>
      <p>Please enter your credentials</p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
        <div class="form-field">
          <label>Email</label>
          <input formControlName="email" class="input" />
          <div class="error" *ngIf="form.get('email')?.touched && form.get('email')?.invalid">
            Email is required.
          </div>
        </div>

        <div class="form-field">
          <label>Password</label>
          <input type="password" formControlName="password" class="input" />
          <div class="error" *ngIf="form.get('password')?.touched && form.get('password')?.invalid">
            Password is required (min 6 chars).
          </div>
        </div>

        <button type="submit" class="login-btn" [disabled]="form.invalid || loading">
          Login
        </button>

        <div class="error" *ngIf="error">{{ error }}</div>
      </form>

      <div class="register-link">
        Don’t have an account?
        <a [routerLink]="['/register']">Register here</a>
      </div>
    </div>
  `,
  styles: [`
    /* same styles as before */
    .login-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  max-width: 500px;
  margin: 40px auto;
}

.login-card h2 {
  font-size: 22px;
  font-weight: 700;
  color: #0d6efd;
  text-align: center;
  margin-bottom: 10px;
}

.login-card p {
  font-size: 14px;
  color: #555;
  text-align: center;
  margin-bottom: 20px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.form-field label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.input {
  padding: 10px 14px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 3px rgba(13,110,253,0.1);
}

.login-btn {
  background: linear-gradient(90deg, #0d6efd, #0a58ca);
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s;
}

.login-btn:hover {
  background: #0a58ca;
}

.error {
  color: #dc3545;
  font-size: 12px;
}

.register-link {
  margin-top: 16px;
  text-align: center;
  font-size: 13px;
  color: #555;
}

.register-link a {
  color: #0d6efd;
  font-weight: 600;
  text-decoration: none;
  margin-left: 4px;
}

.register-link a:hover {
  text-decoration: underline;
}

  `]
})
export class LoginPatientComponent {
  form;
  loading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/patient/appointment']);
    }, 1000);
  }
}
