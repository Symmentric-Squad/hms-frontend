import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RegisterUserRequest } from '../../core/models/auth.model';

interface ValidationError {
  field: string;
  message: string;
}

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex items-center justify-center p-5">

      <div class="bg-white rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] w-full max-w-[580px] flex flex-col overflow-hidden">

        <div class="px-6 pt-6 pb-4 border-b border-gray-100 text-center">
          <h2 class="text-[22px] font-bold text-slate-800 m-0">📝 Patient Registration</h2>
          <p class="text-sm text-gray-400 mt-1 mb-0">Create your account to get started</p>
        </div>

        <form class="px-6 py-5" (ngSubmit)="register()" #registrationForm="ngForm">
          <div class="grid grid-cols-2 gap-[14px]">

            <div class="flex flex-col gap-[5px]">
              <label class="text-[13px] font-semibold text-gray-700">
                Full Name <span class="text-red-500">*</span>
              </label>
              <input
                class="px-[13px] py-[10px] border-[1.5px] rounded-lg text-sm outline-none transition-all duration-200 bg-white text-gray-700"
                [class.border-red-400]="getFieldError('fullName')"
                [class.border-gray-200]="!getFieldError('fullName')"
                [class.focus:border-red-500]="getFieldError('fullName')"
                [class.focus:border-[#0891B2]]="!getFieldError('fullName')"
                [class.focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]]="getFieldError('fullName')"
                [class.focus:shadow-[0_0_0_3px_rgba(8,145,178,0.1)]]="!getFieldError('fullName')"
                type="text"
                [(ngModel)]="user.fullName"
                name="fullName"
                placeholder="John Doe"
                required
              />
              @if(getFieldError('fullName')) {
                <span class="text-xs text-red-500">{{ getFieldError('fullName') }}</span>
              }
            </div>

            <div class="flex flex-col gap-[5px]">
              <label class="text-[13px] font-semibold text-gray-700">
                Email <span class="text-red-500">*</span>
              </label>
              <input
                class="px-[13px] py-[10px] border-[1.5px] rounded-lg text-sm outline-none transition-all duration-200 bg-white text-gray-700"
                [class.border-red-400]="getFieldError('email')"
                [class.border-gray-200]="!getFieldError('email')"
                [class.focus:border-red-500]="getFieldError('email')"
                [class.focus:border-[#0891B2]]="!getFieldError('email')"
                [class.focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]]="getFieldError('email')"
                [class.focus:shadow-[0_0_0_3px_rgba(8,145,178,0.1)]]="!getFieldError('email')"
                type="email"
                [(ngModel)]="user.email"
                name="email"
                placeholder="john@example.com"
                required
              />
              @if(getFieldError('email')) {
                <span class="text-xs text-red-500">{{ getFieldError('email') }}</span>
              }
            </div>

            <div class="flex flex-col gap-[5px]">
              <label class="text-[13px] font-semibold text-gray-700">
                Password <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  class="w-full px-[13px] py-[10px] border-[1.5px] rounded-lg text-sm outline-none transition-all duration-200 bg-white text-gray-700"
                  [class.border-red-400]="getFieldError('password')"
                  [class.border-gray-200]="!getFieldError('password')"
                  [class.focus:border-red-500]="getFieldError('password')"
                  [class.focus:border-[#0891B2]]="!getFieldError('password')"
                  [class.focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]]="getFieldError('password')"
                  [class.focus:shadow-[0_0_0_3px_rgba(8,145,178,0.1)]]="!getFieldError('password')"
                  [type]="'password'"
                  [(ngModel)]="user.password"
                  name="password"
                  placeholder="Min. 8 characters"
                  required
                />
              </div>
              @if(getFieldError('password')) {
                <span class="text-xs text-red-500">{{ getFieldError('password') }}</span>
              }
            </div>

            <div class="flex flex-col gap-[5px]">
              <label class="text-[13px] font-semibold text-gray-700">
                Gender <span class="text-red-500">*</span>
              </label>
              <select
                class="px-[13px] py-[10px] border-[1.5px] rounded-lg text-sm outline-none transition-all duration-200 bg-white text-gray-700"
                [class.border-red-400]="getFieldError('gender')"
                [class.border-gray-200]="!getFieldError('gender')"
                [class.focus:border-red-500]="getFieldError('gender')"
                [class.focus:border-[#0891B2]]="!getFieldError('gender')"
                [class.focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]]="getFieldError('gender')"
                [class.focus:shadow-[0_0_0_3px_rgba(8,145,178,0.1)]]="!getFieldError('gender')"
                [(ngModel)]="user.gender"
                name="gender"
                required
              >
                <option value="" disabled selected>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              @if(getFieldError('gender')) {
                <span class="text-xs text-red-500">{{ getFieldError('gender') }}</span>
              }
            </div>

            <div class="flex flex-col gap-[5px]">
              <label class="text-[13px] font-semibold text-gray-700">
                Address <span class="text-red-500">*</span>
              </label>
              <input
                class="px-[13px] py-[10px] border-[1.5px] rounded-lg text-sm outline-none transition-all duration-200 bg-white text-gray-700"
                [class.border-red-400]="getFieldError('address')"
                [class.border-gray-200]="!getFieldError('address')"
                [class.focus:border-red-500]="getFieldError('address')"
                [class.focus:border-[#0891B2]]="!getFieldError('address')"
                [class.focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]]="getFieldError('address')"
                [class.focus:shadow-[0_0_0_3px_rgba(8,145,178,0.1)]]="!getFieldError('address')"
                type="text"
                [(ngModel)]="user.address"
                name="address"
                placeholder="Street address"
                required
              />
              @if(getFieldError('address')) {
                <span class="text-xs text-red-500">{{ getFieldError('address') }}</span>
              }
            </div>

            <div class="flex flex-col gap-[5px]">
              <label class="text-[13px] font-semibold text-gray-700">
                City <span class="text-red-500">*</span>
              </label>
              <input
                class="px-[13px] py-[10px] border-[1.5px] rounded-lg text-sm outline-none transition-all duration-200 bg-white text-gray-700"
                [class.border-red-400]="getFieldError('city')"
                [class.border-gray-200]="!getFieldError('city')"
                [class.focus:border-red-500]="getFieldError('city')"
                [class.focus:border-[#0891B2]]="!getFieldError('city')"
                [class.focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]]="getFieldError('city')"
                [class.focus:shadow-[0_0_0_3px_rgba(8,145,178,0.1)]]="!getFieldError('city')"
                type="text"
                [(ngModel)]="user.city"
                name="city"
                placeholder="Chennai"
                required
              />
              @if(getFieldError('city')) {
                <span class="text-xs text-red-500">{{ getFieldError('city') }}</span>
              }
            </div>

          </div>
        </form>

        <div class="flex flex-col items-center gap-3 px-6 pt-4 pb-6 border-t border-gray-100">
          <button
            class="w-full py-[11px] bg-gradient-to-r from-[#0d6efd] to-[#0a58ca] text-white border-none rounded-lg text-sm font-bold cursor-pointer transition-all duration-[220ms] shadow-[0_3px_10px_rgba(13,110,253,0.3)] hover:-translate-y-px hover:shadow-[0_5px_16px_rgba(13,110,253,0.4)]"
            type="submit"
            (click)="register()"
          >
            Register
          </button>
          <p class="text-[13px] text-gray-500 m-0">
            Already have an account?
            <a
              class="text-[#0d6efd] font-semibold no-underline ml-1 hover:underline cursor-pointer"
              [routerLink]="['/']"
              fragment="login"
            >Login here</a>
          </p>
        </div>

      </div>
    </div>
  `
})
export class RegisterComponent {
  showPassword = false;
  authService = inject(AuthService);
  validationErrors: ValidationError[] = [];

  user: RegisterUserRequest = {
    fullName: '',
    email: '',
    password: '',
    address: '',
    city: '',
    gender: '',
  };

  constructor(private router: Router) {}

  getFieldError(field: string): string | null {
    const error = this.validationErrors.find(e => e.field === field);
    return error?.message || null;
  }

  private validateForm(): boolean {
    this.validationErrors = [];

    // Full Name validation
    if (!this.user.fullName?.trim()) {
      this.validationErrors.push({ field: 'fullName', message: 'Full name is required' });
    } else if (this.user.fullName.trim().length < 3) {
      this.validationErrors.push({ field: 'fullName', message: 'Full name must be at least 3 characters' });
    } else if (!/^[a-zA-Z\s]+$/.test(this.user.fullName)) {
      this.validationErrors.push({ field: 'fullName', message: 'Full name can only contain letters and spaces' });
    }

    // Email validation
    if (!this.user.email?.trim()) {
      this.validationErrors.push({ field: 'email', message: 'Email is required' });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user.email)) {
      this.validationErrors.push({ field: 'email', message: 'Please enter a valid email address' });
    }

    // Password validation
    if (!this.user.password?.trim()) {
      this.validationErrors.push({ field: 'password', message: 'Password is required' });
    } else if (this.user.password.length < 8) {
      this.validationErrors.push({ field: 'password', message: 'Password must be at least 8 characters' });
    } else if (!/[A-Z]/.test(this.user.password)) {
      this.validationErrors.push({ field: 'password', message: 'Password must contain at least one uppercase letter' });
    } else if (!/[a-z]/.test(this.user.password)) {
      this.validationErrors.push({ field: 'password', message: 'Password must contain at least one lowercase letter' });
    } else if (!/[0-9]/.test(this.user.password)) {
      this.validationErrors.push({ field: 'password', message: 'Password must contain at least one number' });
    }

    // Gender validation
    if (!this.user.gender?.trim()) {
      this.validationErrors.push({ field: 'gender', message: 'Please select a gender' });
    }

    // Address validation
    if (!this.user.address?.trim()) {
      this.validationErrors.push({ field: 'address', message: 'Address is required' });
    } else if (this.user.address.trim().length < 5) {
      this.validationErrors.push({ field: 'address', message: 'Address must be at least 5 characters' });
    }

    // City validation
    if (!this.user.city?.trim()) {
      this.validationErrors.push({ field: 'city', message: 'City is required' });
    } else if (!/^[a-zA-Z\s]+$/.test(this.user.city)) {
      this.validationErrors.push({ field: 'city', message: 'City can only contain letters and spaces' });
    }

    return this.validationErrors.length === 0;
  }

  /**
   * Register user with validation
   */
  // register() {
  //   if (!this.validateForm()) {
  //     console.log('Validation errors:', this.validationErrors);
  //     return;
  //   }

  //   console.log('User registered:', this.user);
  //   alert(`Registration successful for ${this.user.fullName}`);
  //   // TODO: Call authService.register(this.user) instead
  //   this.router.navigate(['/']);
  // }

  register() {
    if (!this.validateForm()) {
      console.log('Validation errors:', this.validationErrors);
      return;
    }

    // Show loading state
    const registerButton = document.querySelector('button[type="submit"]');
    if (registerButton) {
      // registerButton.disabled = true;
      registerButton.textContent = 'Registering...';
    }

    // Call AuthService to register user
    this.authService.registerUser(this.user).subscribe({
      next: (response) => {
        console.log('User registered successfully:', response);
        // alert(`Registration successful for ${this.user.fullName}`);
        
        // Reset form
        this.user = {
          fullName: '',
          email: '',
          password: '',
          address: '',
          city: '',
          gender: '',
        };
        this.validationErrors = [];

        // Navigate to login or dashboard
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Registration error:', error);
        
        // Handle specific error messages from backend
        if (error.status === 409) {
          this.validationErrors.push({
            field: 'email',
            message: 'Email already exists. Please use a different email.'
          });
        } else if (error.status === 400) {
          const errorMessage = error.error?.message || 'Invalid registration data';
          this.validationErrors.push({
            field: 'general',
            message: errorMessage
          });
        } else {
          this.validationErrors.push({
            field: 'general',
            message: error.error?.message || 'Registration failed. Please try again.'
          });
        }

        alert('Registration failed: ' + (error.error?.message || 'Please try again.'));
      },
      complete: () => {
        // Re-enable button
        if (registerButton) {
          // registerButton.disabled = false;
          registerButton.textContent = 'Register';
        }
      }
    });
  }
}