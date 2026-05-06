import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginCredentials, LoginSubmitEvent } from './login.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template:`
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 transform flex-1 w-[340px] border-2 border-transparent"
    [ngClass]="{
      'border-blue-600 shadow-2xl -translate-y-1.5 flex-[1.3] max-w-[380px]': isActive
    }"
    (click)="onCardClick()"
  >
    <!-- Header -->
    <div [ngClass]="['py-7 px-6 text-center text-white', headerGradient]">
      <!-- <div class="text-[42px] mb-2.5 drop-shadow-md">{{ icon }}</div> -->
      <div class="svg-host" 
          [style.mask-image]="'url(' + icon + ')'"
          [style.webkit-mask-image]="'url(' + icon + ')'"
          [style.background-color]="'white'"
          [style.width.px]=64
          [style.height.px]=64>
      </div>
      <h3 class="text-lg font-bold mb-1.5">{{ label }}</h3>
      <p class="text-sm opacity-90">{{ subtitle }}</p>
    </div>

    <!-- Expanded body -->
    <div *ngIf="isActive" (click)="stopPropagation($event)" class="p-6">
      <form (ngSubmit)="onSubmit()" novalidate>
        <!-- Username -->
        <div class="flex flex-col gap-1.5 mb-4 text-left">
          <label class="font-semibold text-sm text-gray-700">Username</label>
          <input
            type="text"
            [(ngModel)]="credentials.username"
            [name]="role + 'Username'"
            placeholder="Enter {{ role }} username"
            required
            class="w-full px-3 py-2.5 border border-gray-200 rounded-md text-sm font-inherit outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-200"
          />
        </div>

        <!-- Password -->
        <div class="flex flex-col gap-1.5 mb-4 text-left">
          <label class="font-semibold text-sm text-gray-700">Password</label>
          <div class="relative flex items-center">
            <input
              [type]="showPassword ? 'text' : 'password'"
              [(ngModel)]="credentials.password"
              [name]="role + 'Password'"
              placeholder="Enter password"
              required
              class="w-full px-3 py-2.5 border border-gray-200 rounded-md text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-200 pr-10"
            />
            <span
              class="absolute right-3 cursor-pointer text-base select-none opacity-60 hover:opacity-100"
              (click)="showPassword = !showPassword"
            >
              {{ showPassword ? '🙈' : '👁️' }}
            </span>
          </div>
        </div>

        <!-- Error -->
        <div *ngIf="errorMessage" class="bg-red-50 border border-red-300 text-red-600 text-xs px-3 py-2 rounded-sm mb-3 text-left">{{ errorMessage }}</div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full py-3 rounded-md text-sm font-bold tracking-wide text-white transition duration-200 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-md"
            [ngClass]="[buttonGradient]"
        >
          Login as {{ label.replace(' Login', '') }}
        </button>
      </form>

      <!-- Register link (patient only) -->
      <div *ngIf="showRegisterLink" class="text-sm text-gray-600 mt-3 text-center">
        Don't have an account? <a routerLink="/register" class="text-blue-600 font-semibold hover:underline">Register here</a>
      </div>
    </div>

    <!-- Collapsed footer -->
    <div *ngIf="!isActive" class="px-4 py-4 text-center text-gray-400 text-sm border-t border-gray-100">
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

  get headerGradient(): string {
    switch (this.role) {
      case 'admin':
        return 'bg-gradient-to-br from-blue-600 to-blue-800';
      case 'doctor':
        return 'bg-gradient-to-br from-green-600 to-green-700';
      case 'patient':
        return 'bg-gradient-to-br from-red-500 to-red-600';
      default:
        return '';
    }
  }

  get buttonGradient(): string {
    switch (this.role) {
      case 'admin':
        return 'bg-gradient-to-r from-blue-600 to-blue-800';
      case 'doctor':
        return 'bg-gradient-to-r from-green-600 to-green-700';
      case 'patient':
        return 'bg-gradient-to-r from-red-500 to-red-600';
      default:
        return 'bg-gray-400';
    }
  }

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