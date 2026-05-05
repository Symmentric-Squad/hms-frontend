import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorGuard } from '../../core/guards/doctor.guard';
import { PaitentLayoutComponent } from './patient.layout';
import { PatientDashboardPage } from './pages/dashboard/dashboard.component';
import { PatientAppointmentsPage } from './pages/appointment/appointment.component';
import { PatientReportsPage } from './pages/report/report.component';

const routes: Routes = [
  {
    path: '',
    component: PaitentLayoutComponent,
    canActivate: [DoctorGuard],
    children: [
      {
        path: '',
        component: PatientDashboardPage,
      },
      {
        path: 'appointments',
        component: PatientAppointmentsPage,
      },
      {
        path: 'reports',
        component: PatientReportsPage
      }
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class PatientRoutingModule {}
