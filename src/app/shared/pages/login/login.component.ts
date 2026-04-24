import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, AppUser } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  role: string | null = null;
  loading = false;
  error: string | null = null;

  form!: FormGroup;

  private mockUserDatabase = new Map<string, { username: string; password: string }>([
    ['admin', { username: 'admin', password: 'admin123' }],
    ['doctor', { username: 'doctor', password: 'doctor123' }],
    ['patient', { username: 'patient', password: 'patient123' }],
  ]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // read role from URL param
    this.role = this.route.snapshot.paramMap.get('role') || null;
  }

  onSubmit() {
    this.error = null;
    if (this.form.invalid) return;

    const { username, password } = this.form.value;
    const user = this.mockUserDatabase.get(this.role || '');

    if (user && user.username === username && user.password === password) {
      const appUser: AppUser = {
        id: 'mock-id',
        username,
        role: (this.role || 'PATIENT').toUpperCase(),
      };
      this.auth.setCurrentUser(appUser);
      this.router.navigate([`/${this.role}`]);
    } else {
      this.error = 'Invalid username or password';
    }
  }
}
