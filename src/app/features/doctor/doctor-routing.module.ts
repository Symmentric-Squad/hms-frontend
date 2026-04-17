import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from './pages/doctor-dashboard.component';
import { DoctorGuard } from '../../core/guards/doctor.guard';

const routes: Routes = [
  { path: '', component: DoctorDashboardComponent, canActivate: [DoctorGuard] },
  // Add doctor-specific child routes (records, prescriptions)
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class DoctorRoutingModule {}
