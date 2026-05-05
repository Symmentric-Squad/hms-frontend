import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../../core/guards/admin.guard';
import { AdminDashboardPage } from './pages/dashboard/dashboard.component';
import { AdminLayoutComponent } from './admin-layout';
import { AdminPatientsPage } from './pages/patient/patient.component';
import { AdminAppointmentsPage } from './pages/appointment/appointment.component';
import { AdminReportsPage } from './pages/report/report.component';
import { AdminDoctorsPage } from './pages/doctor/doctor.component';
import { AdminSpecialisationPage } from './pages/doc-spec/doc-spec.component';
import { AdminContactUsPage } from './pages/contact-us/contact-us.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component:AdminDashboardPage
      },
      {
        path: 'patients',
        component: AdminPatientsPage
      },
      {
        path: 'doctors',
        component: AdminDoctorsPage
      },
      {
        path: 'appointments',
        component: AdminAppointmentsPage
      },
      {
        path: 'reports',
        component: AdminReportsPage
      },
      {
        path: 'specialisations',
        component: AdminSpecialisationPage
      },
      {
        path: 'contact',
        component: AdminContactUsPage
      }
    ]
  },
  // Add routes
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
