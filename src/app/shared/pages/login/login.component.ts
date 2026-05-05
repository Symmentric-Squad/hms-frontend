import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, AppUser } from '../../../core/services/auth.service';

import { DynamicFormConfig } from '../../models/form.models';
import { DynamicFormComponent } from "../../components/dynamic-form/dynamic-form.component";
import { timeInterval } from 'rxjs';

export const loginFormConfig: DynamicFormConfig = {
  submitLabel: 'Login',
  fields: [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'Enter username',
      validators: [Validators.required]
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter password',
      validators: [Validators.required]
    }
  ]
};

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, DynamicFormComponent],
  template:`
  <app-dynamic-form
  [config]="loginForm"
  (formSubmit)="onSubmit($event)"
></app-dynamic-form>
  `,
})

export class LoginComponent implements OnInit { // Added OnInit interface
  role: string | null = null;
  error: string | null = null;

  loginForm = loginFormConfig;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

    private mockUserDatabase = new Map<string, { username: string; password: string }>([
    ['admin', { username: 'admin', password: 'admin123' }],
    ['doctor', { username: 'doctor', password: 'doctor123' }],
    ['patient', { username: 'patient', password: 'patient123' }],
  ]);
  ngOnInit(): void {
    this.role = this.route.snapshot.paramMap.get('role');
    console.log('LoginComponent initialized for role:', this.role);
  }

  // Receive the data emitted from the DynamicFormComponent
  onSubmit(formData: any) {
    console.log('Login attempt with:', formData);
    this.error = null;

    const { username, password } = formData;
    
    // Safety check: ensure role exists to match mock DB keys
    const roleKey = this.role?.toLowerCase() || '';
    const user = this.mockUserDatabase.get(roleKey);

    if (user && user.username === username && user.password === password) {
      const appUser: AppUser = {
        id: 'mock-id',
        username,
        role: roleKey.toUpperCase(),
      };
      
      this.auth.setCurrentUser(appUser);
      console.log('Success:', appUser);
      this.router.navigate([`/${roleKey}`]);
    } else {
      this.error = 'Invalid username or password';
      console.error(this.error);
    }
  }
}