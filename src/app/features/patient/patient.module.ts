import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardCard } from '../../shared/components/dashboard-card/dashboard-card.component';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { ModalFormComponent } from '../../shared/components/dialog-form/dialog-form.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { TitleCasePipe } from '../../shared/pipe/custom-title-case.pipe';
import { PatientSidebarComponent } from './component/patient-sidebar.component';
import { PaitentLayoutComponent } from './patient.layout';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientDashboardPage } from './pages/dashboard/dashboard.component';
import { PatientAppointmentsPage } from './pages/appointment/appointment.component';
import { PatientReportsPage } from './pages/report/report.component';

@NgModule({
  declarations: [
    PatientDashboardPage,
    PatientAppointmentsPage,
    PatientReportsPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ModalFormComponent,
    DashboardCard,
    DataTableComponent,
    SidebarComponent,
    PatientRoutingModule,
    PatientSidebarComponent,
    PaitentLayoutComponent,
  ],
  providers: [TitleCasePipe]
})
export class PatientModule {}
