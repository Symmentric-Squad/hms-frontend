import { Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { DoctorGuard } from './core/guards/doctor.guard';
import { PatientGuard } from './core/guards/patient.guard';
import { RouterModule } from '@angular/router';
import { LoginPatientComponent } from './shared/pages/login/login-patient/login-patient.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/pages/landing/landing.component')
        .then(m => m.LandingComponent)
    },
    { 
        path: 'admin', 
        canActivate: [AdminGuard], 
        loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule) 
      },
      { 
        path: 'doctor', 
        canActivate: [DoctorGuard], 
        loadChildren: () => import('./features/doctor/doctor.module').then(m => m.DoctorModule) 
      },
      { 
        path: 'patient', 
        canActivate: [PatientGuard],
        loadChildren: () => import('./features/patient/patient.module').then(m => m.PatientModule) 
      },
      {
        path: 'login/:role',
        loadComponent: () => import('./shared/pages/login/login.component')
        .then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./shared/pages/register/register.component')
        .then(m => m.RegisterComponent)
      },
      {
  path: 'login-patient',
  loadComponent: () => import('./shared/pages/login/login-patient/login-patient.component')
    .then(m => m.LoginPatientComponent)
},
      {
        path: '**',
        loadComponent: () => import('./shared/pages/not-found/not-found.component')
        .then(m => m.NotFoundComponent)
      }
];
