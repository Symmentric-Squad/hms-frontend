import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginSubmitEvent {
  role: string;
  credentials: LoginCredentials;
}

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div
      class="bg-white rounded-[18px] shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer w-[300px]"
      [class.ring-2]="isActive"
      [class.ring-blue-500]="isActive"
      (click)="onCardClick()"
    >
      
      <div class="text-center mb-4">
        <!-- <div class="text-5xl mb-3">{{ icon }}</div> -->
        <div class="svg-host" 
            [style.mask-image]="'url(' + icon + ')'"
            [style.webkit-mask-image]="'url(' + icon + ')'"
            [style.background-color]="'black'"
            [style.width.px]=48
            [style.height.px]=48>
        </div>
        <h3 class="text-lg font-bold text-gray-800 m-0">{{ label }}</h3>
        <p class="text-xs text-gray-500 mt-1 mb-0">{{ subtitle }}</p>
      </div>

      
      @if(isActive) {
        <form class="space-y-3" (ngSubmit)="onSubmit()" (click)="stopPropagation($event)">

          
          <div class="flex flex-col gap-1">
            <label class="text-xs font-semibold text-gray-700">Username</label>
            <input
              class="w-full px-3 py-2 border-[1.5px] border-gray-200 rounded-lg text-xs outline-none transition-all duration-200 bg-white text-gray-700 focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              type="text"
              [(ngModel)]="credentials.username"
              [name]="role + 'Username'"
              placeholder="Enter username"
              [disabled]="isLoading"
              required
            />
          </div>

          
          <div class="flex flex-col gap-1">
            <label class="text-xs font-semibold text-gray-700">Password</label>
            <div class="relative">
              <input
                class="w-full px-3 py-2 border-[1.5px] border-gray-200 rounded-lg text-xs outline-none transition-all duration-200 bg-white text-gray-700 focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                [type]="showPassword ? 'text' : 'password'"
                [(ngModel)]="credentials.password"
                [name]="role + 'Password'"
                placeholder="Enter password"
                [disabled]="isLoading"
                required
              />
              <span
                class="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-sm select-none"
                (click)="showPassword = !showPassword"
                [class.opacity-50]="isLoading"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </span>
            </div>
          </div>

          
          @if(errorMessage) {
            <div class="bg-red-50 border border-red-200 rounded-lg p-2">
              <p class="text-xs text-red-600 m-0">{{ errorMessage }}</p>
            </div>
          }

          
          <button
            type="submit"
            class="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none rounded-lg text-xs font-bold cursor-pointer transition-all duration-200 shadow-[0_2px_8px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(59,130,246,0.4)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            [disabled]="isLoading"
          >
            {{ isLoading ? '⏳ Logging in...' : 'Login' }}
          </button>

          
          @if(showRegisterLink) {
            <p class="text-xs text-gray-500 text-center mt-3 mb-0">
              Don't have an account?
              <a
                routerLink="/register"
                class="text-blue-600 font-semibold no-underline hover:underline"
              >
                Register here
              </a>
            </p>
          }

        </form>
      }

      
      @if(!isActive) {
        <div class="text-center py-3">
          <span class="text-xs text-gray-400">Click to expand</span>
        </div>
      }
    </div>
  `,
})
export class LoginCardComponent implements OnChanges {
  @Input() role!: string;
  @Input() label!: string;
  @Input() icon!: string;
  @Input() subtitle!: string;
  @Input() isActive = false;
  @Input() errorMessage = '';
  @Input() showRegisterLink = false;
  @Input() isLoading = false;

  @Output() cardClick = new EventEmitter<string>();
  @Output() loginSubmit = new EventEmitter<LoginSubmitEvent>();

  credentials: LoginCredentials = { username: '', password: '' };
  showPassword = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isActive'] && !this.isActive) {
      this.credentials = { username: '', password: '' };
      this.showPassword = false;
    }
  }

  onCardClick(): void {
    if (!this.isLoading) {
      this.cardClick.emit(this.role);
    }
  }

  onSubmit(): void {
    this.loginSubmit.emit({ role: this.role, credentials: { ...this.credentials } });
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}