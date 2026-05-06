import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <!-- Full-page centered wrapper -->
    <div class="min-h-screen bg-gray-50 flex items-center justify-center p-5">

      <!-- Card -->
      <div class="bg-white rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] w-full max-w-[580px] flex flex-col overflow-hidden">

        <!-- Card Header -->
        <div class="px-6 pt-6 pb-4 border-b border-gray-100 text-center">
          <h2 class="text-[22px] font-bold text-slate-800 m-0">Patient Registration</h2>
        </div>

        <!-- Form Body -->
        <form class="px-6 py-5" (ngSubmit)="register()" #registrationForm="ngForm">
          <div class="grid grid-cols-2 gap-[14px]">

            <!-- Full Name -->
            <div class="flex flex-col gap-[5px]">
              <label class="text-[13px] font-semibold text-gray-700">
                Full Name <span class="text-red-500">*</span>
              </label>
              <input
                class="px-[13px] py-[10px] border-[1.5px] border-gray-200 rounded-lg text-sm outline-none transition-all duration-200 bg-white text-gray-700 focus:border-[#0891B2] focus:shadow-[0_0_0_3px_rgba(8,145,178,0.1)]"
                type="text" [(ngModel)]="user.fullName" name="fullName"
                placeholder="John Doe" required
              />
            </div>

            <!-- Email -->
            <div class="flex flex-col gap-[5px]">
              <label class="text-[13px] font-semibold text-gray-700">
                Email <span class="text-red-500">*</span>
              </label>
              <input
                class="px-[13px] py-[10px] border-[1.5px] border-gray-200 rounded-lg text-sm outline-none transition-all duration-200 bg-white text-gray-700 focus:border-[#0891B2] focus:shadow-[0_0_0_3px_rgba(8,145,178,0.1)]"
                type="email" [(ngModel)]="user.email" name="email"
                placeholder="john@example.com" required
              />
            </div>

            <!-- Password -->
            <div class="flex flex-col gap-[5px]">
              <label class="text-[13px] font-semibold text-gray-700">
                Password <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  class="w-full px-[13px] py-[10px] border-[1.5px] border-gray-200 rounded-lg text-sm outline-none transition-all duration-200 bg-white text-gray-700 focus:border-[#0891B2] focus:shadow-[0_0_0_3px_rgba(8,145,178,0.1)]"
                  [type]="'password'"
                  [(ngModel)]="user.password" name="password"
                  placeholder="Min. 8 characters" required
                />
              </div>
            </div>

            <!-- Gender -->
            <div class="flex flex-col gap-[5px]">
              <label class="text-[13px] font-semibold text-gray-700">
                Gender <span class="text-red-500">*</span>
              </label>
              <select
                class="px-[13px] py-[10px] border-[1.5px] border-gray-200 rounded-lg text-sm outline-none transition-all duration-200 bg-white text-gray-700 focus:border-[#0891B2] focus:shadow-[0_0_0_3px_rgba(8,145,178,0.1)]"
                [(ngModel)]="user.gender" name="gender" required
              >
                <option value="" disabled selected>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <!-- Address -->
            <div class="flex flex-col gap-[5px]">
              <label class="text-[13px] font-semibold text-gray-700">
                Address <span class="text-red-500">*</span>
              </label>
              <input
                class="px-[13px] py-[10px] border-[1.5px] border-gray-200 rounded-lg text-sm outline-none transition-all duration-200 bg-white text-gray-700 focus:border-[#0891B2] focus:shadow-[0_0_0_3px_rgba(8,145,178,0.1)]"
                type="text" [(ngModel)]="user.address" name="address"
                placeholder="Street address" required
              />
            </div>

            <!-- City — 6th field, even count → sits beside Address -->
            <div class="flex flex-col gap-[5px]">
              <label class="text-[13px] font-semibold text-gray-700">
                City <span class="text-red-500">*</span>
              </label>
              <input
                class="px-[13px] py-[10px] border-[1.5px] border-gray-200 rounded-lg text-sm outline-none transition-all duration-200 bg-white text-gray-700 focus:border-[#0891B2] focus:shadow-[0_0_0_3px_rgba(8,145,178,0.1)]"
                type="text" [(ngModel)]="user.city" name="city"
                placeholder="Chennai" required
              />
            </div>

          </div>
        </form>

        <!-- Card Footer -->
        <div class="flex flex-col items-center gap-3 px-6 pt-4 pb-6 border-t border-gray-100">
          <button
            class="w-3xs py-2 bg-gradient-to-r from-[#0d6efd] to-[#0a58ca] text-white border-none rounded-lg text-sm font-bold cursor-pointer transition-all duration-[220ms] shadow-[0_3px_10px_rgba(13,110,253,0.3)] hover:-translate-y-px hover:shadow-[0_5px_16px_rgba(13,110,253,0.4)]"
            type="submit"
            (click)="register()"
          >
            Register
          </button>
          <p class="text-[13px] text-gray-500 m-0">
            Already have an account?
            <a
              class="text-[#0d6efd] font-semibold no-underline ml-1 hover:underline"
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
    this.router.navigate(['/']);
  }
}