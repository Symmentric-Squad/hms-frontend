import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="registration-card">
      <h2>📝 Patient Registration</h2>
      <p>Please fill in your details to register</p>

      <form (ngSubmit)="register()" #registrationForm="ngForm">
        <div class="form-field">
          <label>Full Name</label>
          <input type="text" [(ngModel)]="user.fullName" name="fullName" required />
        </div>

        <div class="form-field">
          <label>Email</label>
          <input type="email" [(ngModel)]="user.email" name="email" required />
        </div>

        <div class="form-field">
          <label>Password</label>
          <input type="password" [(ngModel)]="user.password" name="password" required />
        </div>

        <div class="form-field">
          <label>Address</label>
          <input type="text" [(ngModel)]="user.address" name="address" required />
        </div>

        <div class="form-field">
          <label>City</label>
          <input type="text" [(ngModel)]="user.city" name="city" required />
        </div>

        <div class="form-field">
          <label>Gender</label>
          <select [(ngModel)]="user.gender" name="gender" required>
            <option value="" disabled selected>Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit" class="register-btn">Register</button>
      </form>

      <!-- Styled login link -->
      <div class="login-link">
        Already have an account?
        <a  [routerLink]="['/login-patient']">Login here</a>
      </div>
    </div>
  `,
  styles: [`
    .registration-card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
      max-width: 600px;
      margin: 0 auto;
    }

    .registration-card h2 {
      font-size: 22px;
      font-weight: 700;
      color: #0d6efd;
      text-align: center;
      margin-bottom: 20px;
    }

    .registration-card p {
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

    .form-field input,
    .form-field select {
      padding: 10px 14px;
      border: 1.5px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .form-field input:focus,
    .form-field select:focus {
      border-color: #0d6efd;
      box-shadow: 0 0 0 3px rgba(13,110,253,0.1);
    }

    .register-btn {
      background: linear-gradient(90deg, #0d6efd, #0a58ca);
      color: white;
      padding: 10px 18px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .register-btn:hover {
      background: #0a58ca;
    }

    .login-link {
      margin-top: 16px;
      text-align: center;
      font-size: 13px;
      color: #1e1f20ff;
    }
     .login-link a {
  color: #0d6efd;
  font-weight: 600;
  text-decoration: none;
  margin-left: 4px;
}
    

    
  `]
})
export class RegisterComponent {
  user = {
    fullName: '',
    email: '',
    password: '',
    address: '',
    city: '',
    gender: ''
  };

  constructor(private router: Router) {}

  register() {
    console.log('User registered:', this.user);
    alert(`Registration successful for ${this.user.fullName}`);
    // Redirect to patient login (styled version)
    this.router.navigate(['/login-patient']);

  }
}
