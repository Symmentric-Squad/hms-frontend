import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDashboardComponent } from './pages/patient-dashboard.component';
import { PatientBookAppointmentComponent } from './pages/patient-appointment';
import { PatientProfileComponent } from './pages/update-profile';
import { PatientAppointmentHistoryComponent } from './pages/patient-appointment-history';
import { PatientMedicalHistoryComponent } from './pages/patient-medical-history';
import { PatientLayoutComponent } from './patient-layout';
import { PatientGuard } from '../../core/guards/patient.guard';
import { LoginComponent } from '../../shared/pages/login/login.component';
import { RegisterComponent } from '../../shared/pages/register/register.component';
const routes: Routes = [
  {
    path: '',
    component: PatientLayoutComponent,
    canActivate: [PatientGuard],
    children: [
      {
        path: '',
        component: PatientDashboardComponent,
      },
      {
        path: 'appointment',
        component: PatientBookAppointmentComponent,
      },
      {
        path: 'profile',
        component: PatientProfileComponent,
      },
      {
        path: 'appointment-history',
        component: PatientAppointmentHistoryComponent,
      },
      {
        path: 'medical-history',
        component: PatientMedicalHistoryComponent,
      },
      
  { path: 'login', component: LoginComponent },
  { path: 'patient/appointment', component: PatientBookAppointmentComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
