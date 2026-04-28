import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { LandingPageNavBar } from "../../components/landing-navbar/landing-navbar.component";
import { AuthService, AppUser } from "../../../core/services/auth.service";

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.css',
    imports: [LandingPageNavBar, CommonModule, FormsModule, RouterModule],
})
export class LandingComponent {
  activeLogin: string | null = null;
  showAdminPass = false;
  showDoctorPass = false;
  showPatientPass = false;

  adminCreds = { username: '', password: '' };
  doctorCreds = { username: '', password: '' };
  patientCreds = { username: '', password: '' };
  loginError: Record<string, string> = {};

  private mockUserDatabase = new Map<string, { username: string; password: string }>([
    ['admin', { username: 'admin', password: 'admin123' }],
    ['doctor', { username: 'doctor', password: 'doctor123' }],
    ['patient', { username: 'patient', password: 'patient123' }],
  ]);

  constructor(private auth: AuthService, private router: Router) {}

  setActiveLogin(role: string) {
    this.activeLogin = this.activeLogin === role ? null : role;
    this.loginError = {};
  }

  onLogin(role: string) {
  this.loginError[role] = '';
  
  const creds = role === 'admin' ? this.adminCreds : role === 'doctor' ? this.doctorCreds : this.patientCreds;
  
  const sqlPattern = /^[a-zA-Z0-9]*$/; 
  
  if (!creds.username || !sqlPattern.test(creds.username)) {
    this.loginError[role] = 'Invalid username format.';
    return;
  }

  const user = this.mockUserDatabase.get(role);

  if (user && user.username === creds.username && user.password === creds.password) {
    const appUser: AppUser = { 
      id: 'mock-id', 
      username: creds.username, 
      role: role.toUpperCase() 
    };
    this.auth.setCurrentUser(appUser);
    this.router.navigate([`/${role}`]);
  } else {
    this.loginError[role] = 'Invalid username or password. Please try again.';
  }
}

    ngOnInit() {
        const filterButtons = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
        const galleryItems = document.querySelectorAll<HTMLElement>('.gallery-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter || '')) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}