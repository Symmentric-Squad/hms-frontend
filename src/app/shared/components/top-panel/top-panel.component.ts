import { Component } from "@angular/core";
import { AppUser } from "../../models/app-user";
import { TitleCasePipe } from "../../pipe/custom-title-case.pipe";
import { FormsModule } from "@angular/forms";

interface ProfileUser {
  name: string;
  gender: "Male" | "Female" | string;
  address: string;
  city: string;
  email: string;
  lastUpdated: Date
}

@Component({
  selector: 'app-top-panel',
  template: `
    <header class="admin-topbar">
      <div class="topbar-title">
        <h1>{{ currentUser.role | customTitleCase }} Management Panel</h1>
      </div>
      @if(currentUser) {
        <div class="topbar-user" (click)="showProfileModal = true">
          @if(currentUser.role === 'ADMIN') {
            <span class="user-badge">🛡️ {{ currentUser.role }}</span>
          } @else if (currentUser.role === 'DOCTOR') {
            <span class="user-badge">🩺 {{ currentUser.role }}</span>
          } @else {
            <span class="user-badge">👥 {{ currentUser.role }}</span>
          }
          <span class="user-name">{{ currentUser.username }}</span>
        </div>
      }
    </header>

    @if(showProfileModal) {
      <div class="modal-overlay" (click)="showProfileModal = false">
        <div class="modal-box" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>🙍 Edit Profile</h3>
            <button class="modal-close" (click)="showProfileModal = false">✕</button>
          </div>
          <div class="modal-body">
            <form (ngSubmit)="updateProfile()" #profileForm="ngForm">
              <div class="form-row">
                <div class="form-field">
                  <label>Name</label>
                  <input type="text" [(ngModel)]="user.name" name="name" placeholder="Your name" required />
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
              </div>
              <div class="form-row">
                <div class="form-field">
                  <label>Address</label>
                  <input type="text" [(ngModel)]="user.address" name="address" placeholder="Street address" required />
                </div>
                <div class="form-field">
                  <label>City</label>
                  <input type="text" [(ngModel)]="user.city" name="city" placeholder="City" required />
                </div>
              </div>
              <div class="form-field">
                <label>Email</label>
                <input type="email" [(ngModel)]="user.email" name="email" placeholder="email@example.com" required />
              </div>
              <div class="modal-footer">
                <button type="button" class="cancel-btn" (click)="showProfileModal = false">Cancel</button>
                <button type="submit" class="save-btn">Update Profile</button>
              </div>
              <p class="last-updated">Last Updated: {{ user.lastUpdated.toISOString().split('T')[0] }}</p>
            </form>
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    .admin-main { margin-left: 240px; flex: 1; display: flex; flex-direction: column; transition: margin-left 0.3s ease; min-height: 100vh; }
    .admin-main.expanded { margin-left: 64px; }
    .admin-topbar { background: white; padding: 14px 32px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 2px 8px rgba(0,0,0,0.07); position: sticky; top: 0; z-index: 50; }
    .admin-topbar h1 { font-size: 20px; font-weight: 700; color: #1e293b; margin: 0; }
    .topbar-user { display: flex; align-items: center; gap: 10px; cursor: pointer; }
    .user-badge { background: linear-gradient(90deg, #0d6efd, #0a58ca); color: white; padding: 4px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; }
    .user-name { font-weight: 600; color: #374151; font-size: 14px; text-transform: capitalize; }
    .admin-content { padding: 28px 32px; flex: 1; }
  `,
  imports: [TitleCasePipe, FormsModule]
})
export class TopPanelComponent {
  // TODO: fetch the user details from the service
  currentUser: AppUser = {
    id: '1',
    username: 'Suresh',
    role: 'ADMIN',
  };

  showProfileModal = false;

  user: ProfileUser = {
    name: 'Suresh',
    gender: 'Male',
    address: '100 Nehru Street',
    city: 'Chennai',
    email: 'abc@asd.com',
    lastUpdated: new Date(),
  };

  updateProfile(): void {
    this.user.lastUpdated = new Date();
    console.log('Profile Updated', this.user);
    this.showProfileModal = false;
  }
}