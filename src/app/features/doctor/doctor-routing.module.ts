import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorGuard } from '../../core/guards/doctor.guard';
import { DoctorLayoutComponent } from './doctor-layout';
import { DoctorAppointmentsPage } from './pages/appointment/appointment.component';
import { DoctorDashboardPage } from './pages/dashboard/dashboard.component';
import { PatientDetails } from './pages/patient-details/patient-details.component';
import { DoctorPatientsPage } from './pages/patient/patient.component';
import { DoctorReportsPage } from './pages/report/report.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorLayoutComponent,
    canActivate: [DoctorGuard],
    children: [
      {
        path: '',
        component: DoctorDashboardPage,
      },
      {
        path: 'appointments',
        component: DoctorAppointmentsPage,
      },
      {
        path: 'patients',
        component: DoctorPatientsPage
      },
      {
        path: 'reports',
        component: DoctorReportsPage
      },
      {
        path: 'patients/:id',
        component: PatientDetails
      }
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class DoctorRoutingModule {}
