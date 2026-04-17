import { Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { DoctorGuard } from './core/guards/doctor.guard';
import { PatientGuard } from './core/guards/patient.guard';

export const routes: Routes = [
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
        loadComponent: () => import('./shared/pages/login.component')
        .then(m => m.LoginComponent)
      }
];
