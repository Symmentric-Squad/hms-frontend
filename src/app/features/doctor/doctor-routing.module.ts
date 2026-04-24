import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from './pages/doctor-dashboard.component';
import { DoctorGuard } from '../../core/guards/doctor.guard';
import { AppointmentHistory } from './pages/appointment-history/appointment-history';
import { DoctorLayoutComponent } from './doctor-layout';

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
      // {
      //   path: 'patients',
      //   canActivate: [DoctorGuard],
      //   children: [
      //     {
      //       path: 'add',
      //       loadComponent: () => import('./pages/doctor-patient-add.component')
      //       .then(m => m.DoctorPatientAddComponent)
      //     },
      //     {
      //       path: 'manage',
      //       loadComponent: () => import('./pages/doctor-patient-manage.component')
      //       .then(m => m.DoctorPatientManageComponent)
      //     },
      //     {
      //       path: 'search',
      //       loadComponent: () => import('./pages/doctor-patient-search.component')
      //       .then(m => m.DoctorPatientSearchComponent)
      //     }
      //   ]
      // },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class DoctorRoutingModule {}
