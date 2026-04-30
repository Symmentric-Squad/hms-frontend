import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorGuard } from '../../core/guards/doctor.guard';
import { AppointmentHistory } from './pages/appointment-history/appointment-history.component';
import { DoctorLayoutComponent } from './doctor-layout';
import { PatientsComponent } from './pages/patients/patients.component';
import { DoctorDashboardComponent } from './pages/dashboard/dashboard.component';
import { P } from '@angular/cdk/keycodes';
import { DoctorReportsComponent } from './pages/resports/reports.component';
import { AppointmentsComponent } from './example-table.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorLayoutComponent,
    canActivate: [DoctorGuard],
    children: [
      {
        path: '',
        component: DoctorDashboardComponent,
      },
      {
        path: 'appointments',
        component: AppointmentHistory,
      },
      {
        path: 'patients',
        component: PatientsComponent
      },
      {
        path: 'reports',
        component: DoctorReportsComponent
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class DoctorRoutingModule {}
