import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginCardComponent } from '../login-section/login-card.component';
import { LoginSubmitEvent, RoleConfig } from '../login-section/login.model';
import { LoginRequest } from '../../../core/models/auth.model';

@Component({
  selector: 'app-login-section',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginCardComponent],
  template: `
    <section id="login" class="bg-linear-to-br from-[#f0f6ff] via-[#e8f4fd] to-[#f5f0ff] pt-24 pb-20 px-10 text-center">
      <h2 class="text-3xl font-bold text-blue-600">Portal Login</h2>
      <h6 class="text-xs text-gray-500 mt-1 mb-12">Select your role and sign in to access your dashboard</h6>

      <div class="mx-auto flex w-full max-w-275 flex-col sm:flex-row items-center md:items-start justify-center gap-7">
        @for(config of roles; track $index){
          <app-login-card
            [role]="config.role"
            [label]="config.label"
            [icon]="config.icon"
            [subtitle]="config.subtitle"
            [isActive]="activeLogin === config.role"
            [errorMessage]="loginError[config.role] || ''"
            [showRegisterLink]="config.showRegisterLink ?? false"
            [isLoading]="isLoading[config.role] || false"
            (cardClick)="setActiveLogin($event)"
            (loginSubmit)="onLogin($event)"
          ></app-login-card>
        }
      </div>
    </section>
  `
})
export class LoginSectionComponent {
  authService = inject(AuthService);
  router = inject(Router);

  activeLogin: string | null = null;
  loginError: Record<string, string> = {};
  isLoading: Record<string, boolean> = {};

  roles: RoleConfig[] = [
    {
      role: 'admin',
      label: 'Admin Login',
      icon: 'guard.svg',
      subtitle: 'Manage hospital operations',
    },
    {
      role: 'doctor',
      label: 'Doctor Login',
      icon: 'steth.svg',
      subtitle: 'Access patient & appointment data',
    },
    {
      role: 'patient',
      label: 'Patient Login',
      icon: 'patient.svg',
      subtitle: 'View appointments & health records',
      showRegisterLink: true,
    },
  ];

  setActiveLogin(role: string): void {
    this.activeLogin = this.activeLogin === role ? null : role;
    this.loginError = {};
  }

  onLogin({ role, credentials }: LoginSubmitEvent): void {
    // Clear previous errors
    this.loginError[role] = '';

    // Client-side validation
    const validationError = this.validateCredentials(credentials, role);
    if (validationError) {
      this.loginError[role] = validationError;
      return;
    }

    // Set loading state for this role
    this.isLoading[role] = true;

    // Build login request
    const loginRequest: LoginRequest = {
      username: credentials.username,
      password: credentials.password,
    };

    // Call appropriate service method based on role
    this.callLoginService(role, loginRequest);
  }

  /**
   * Validate credentials on client side
   */
  private validateCredentials(
    credentials: { username: string; password: string },
    role: string
  ): string | null {
    // Username validation
    if (!credentials.username?.trim()) {
      return 'Username is required.';
    }

    if (credentials.username.length < 3) {
      return 'Username must be at least 3 characters.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.username)) {
      return 'Username can only be the mail ID provided.';
    }

    // Password validation
    if (!credentials.password?.trim()) {
      return 'Password is required.';
    }

    if (credentials.password.length < 6) {
      return 'Password must be at least 6 characters.';
    }

    return null;
  }

  /**
   * Call the appropriate login service based on role
   */
  private callLoginService(role: string, request: LoginRequest): void {
    let loginObservable;

    switch (role) {
      case 'admin':
        loginObservable = this.authService.loginAdmin(request);
        break;
      case 'doctor':
        loginObservable = this.authService.loginDoctor(request);
        break;
      case 'patient':
        loginObservable = this.authService.loginUser(request);
        break;
      default:
        this.loginError[role] = 'Invalid role.';
        this.isLoading[role] = false;
        return;
    }

    // Subscribe to login request
    loginObservable.subscribe({
      next: (response) => {
        console.log(`${role} login successful:`, response);

        // Store session (handled by AuthService via tap operator)
        // Navigate to appropriate dashboard
        this.navigateToDashboard(role);

        // Close the card
        this.activeLogin = null;
      },
      error: (error) => {
        console.error(`${role} login error:`, error);
        this.handleLoginError(role, error);
      },
      complete: () => {
        this.isLoading[role] = false;
      },
    });
  }

  /**
   * Handle login errors from API
   */
  private handleLoginError(role: string, error: any): void {
    if (error.status === 401) {
      this.loginError[role] = 'Invalid username or password.';
    } else if (error.status === 400) {
      this.loginError[role] = error.error?.message || 'Invalid login credentials.';
    } else if (error.status === 403) {
      this.loginError[role] = 'Access denied. Please check your account status.';
    } else if (error.status === 0) {
      this.loginError[role] = 'Network error. Please check your connection.';
    } else {
      this.loginError[role] = error.error?.message || 'Login failed. Please try again.';
    }
  }

  /**
   * Navigate to dashboard based on role
   */
  private navigateToDashboard(role: string): void {
    const routes: Record<string, string> = {
      admin: '/admin',
      doctor: '/doctor',
      patient: '/patient',
    };

    const route = routes[role];
    if (route) {
      this.router.navigate([route]);
    }
  }
}