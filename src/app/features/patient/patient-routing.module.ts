import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDashboardComponent } from './pages/patient-dashboard.component';
import { PatientGuard } from '../../core/guards/patient.guard';

const routes: Routes = [
  {
    path: '',
    component: PatientDashboardComponent,
    canActivate: [PatientGuard]
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class PatientRoutingModule {}
