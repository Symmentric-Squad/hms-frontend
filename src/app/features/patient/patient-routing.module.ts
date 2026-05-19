import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientGuard } from '../../core/guards/patient.guard';
import { PatientAppointmentsPage } from './pages/appointment/appointment.component';
import { PatientDashboardPage } from './pages/dashboard/dashboard.component';
import { PatientReportsPage } from './pages/report/report.component';
import { PaitentLayoutComponent } from './patient.layout';

const routes: Routes = [
  {
    path: '',
    component: PaitentLayoutComponent,
    canActivate: [PatientGuard],
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
