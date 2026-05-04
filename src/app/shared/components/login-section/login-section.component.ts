import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, AppUser } from '../../../core/services/auth.service';
import { LoginCardComponent } from './login-card.component';
import { LoginSubmitEvent, RoleConfig } from './login.model';

@Component({
  selector: 'app-login-section',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginCardComponent],
  styleUrl: 'login-section.css',
  template:`
  <section id="login" class="login-section text-center">
  <h2 class="text-3xl font-bold">Portal Login</h2>
  <h6>Select your role and sign in to access your dashboard</h6>

  <div class="login-cards">
    <app-login-card
      *ngFor="let config of roles"
      [role]="config.role"
      [label]="config.label"
      [icon]="config.icon"
      [subtitle]="config.subtitle"
      [isActive]="activeLogin === config.role"
      [errorMessage]="loginError[config.role] || ''"
      [showRegisterLink]="config.showRegisterLink ?? false"
      (cardClick)="setActiveLogin($event)"
      (loginSubmit)="onLogin($event)"
    ></app-login-card>
  </div>
</section>
  `
})
export class LoginSectionComponent {
  activeLogin: string | null = null;
  loginError: Record<string, string> = {};

  roles: RoleConfig[] = [
    {
      role: 'admin',
      label: 'Admin Login',
      icon: '🛡️',
      subtitle: 'Manage hospital operations',
    },
    {
      role: 'doctor',
      label: 'Doctor Login',
      icon: '🩺',
      subtitle: 'Access patient & appointment data',
    },
    {
      role: 'patient',
      label: 'Patient Login',
      icon: '🏥',
      subtitle: 'View appointments & health records',
      showRegisterLink: true,
    },
  ];

  // Replace with real API calls in production
  private mockUserDatabase = new Map<string, { username: string; password: string }>([
    ['admin',   { username: 'admin',   password: 'admin123'   }],
    ['doctor',  { username: 'doctor',  password: 'doctor123'  }],
    ['patient', { username: 'patient', password: 'patient123' }],
  ]);

  constructor(private auth: AuthService, private router: Router) {}

  setActiveLogin(role: string): void {
    this.activeLogin = this.activeLogin === role ? null : role;
    this.loginError = {};
  }

  onLogin({ role, credentials }: LoginSubmitEvent): void {
    this.loginError[role] = '';

    const alphanumeric = /^[a-zA-Z0-9]+$/;
    if (!credentials.username || !alphanumeric.test(credentials.username)) {
      this.loginError[role] = 'Invalid username format.';
      return;
    }

    const user = this.mockUserDatabase.get(role);
    if (user && user.username === credentials.username && user.password === credentials.password) {
      const appUser: AppUser = {
        id: 'mock-id',
        username: credentials.username,
        role: role.toUpperCase(),
      };
      this.auth.setCurrentUser(appUser);
      this.router.navigate([`/${role}`]);
    } else {
      this.loginError[role] = 'Invalid username or password. Please try again.';
    }
  }
}