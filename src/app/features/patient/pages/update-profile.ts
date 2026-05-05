import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-card">
      <h2>🙍 User Profile</h2>
      <p>Manage your personal information</p>

      <form (ngSubmit)="updateProfile()" #profileForm="ngForm">
        <div class="form-field">
          <label>Name</label>
          <input type="text" [(ngModel)]="user.name" name="name" required />
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
            <option value="" disabled>Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="form-field">
          <label>Email</label>
          <input type="email" [(ngModel)]="user.email" name="email" required />
        </div>

        <button type="submit" class="save-btn">💾 Update Profile</button>
      </form>

      <p class="last-updated">Last Updated: {{ user.lastUpdated }}</p>
    </div>
  `,
  styles: [`
    .profile-card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
      max-width: 600px;
      margin: 0 auto;
    }

    .profile-card h2 {
      font-size: 22px;
      font-weight: 700;
      color: #0d6efd;
      margin-bottom: 6px;
      text-align: center;
  margin-bottom: 20px;
    }

    .profile-card p {
       font-size: 14px;
  color: #555;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 6px;
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

    .save-btn {
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

    .save-btn:hover {
      background: #0a58ca;
    }

    .last-updated {
      margin-top: 12px;
      font-size: 13px;
      color: #555;
    }
  `]
})
export class PatientProfileComponent {
  user = {
    name: 'John Doe',
    address: '123 Main Street',
    city: 'Chennai',
    gender: 'Male',
    email: 'john.doe@example.com',
    lastUpdated: '2026-05-04'
  };

  updateProfile() {
    this.user.lastUpdated = new Date().toISOString().split('T')[0];
    alert('Profile updated successfully!');
    // Later: call backend API here
  }
}
