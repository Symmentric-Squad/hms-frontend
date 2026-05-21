import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalFormComponent } from '../../shared/components/dialog-form/dialog-form.component';
import { DashboardCard } from '../../shared/components/dashboard-card/dashboard-card.component';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminSidebarComponent } from './component/admin-sidebar.component';
import { AdminLayoutComponent } from './admin-layout';
import { AdminPatientsPage } from './pages/patient/patient.component';
import { AdminAppointmentsPage } from './pages/appointment/appointment.component';
import { AdminContactUsPage } from './pages/contact-us/contact-us.component';
import { AdminDashboardPage } from './pages/dashboard/dashboard.component';
import { AdminDoctorsPage } from './pages/doctor/doctor.component';
import { AdminSpecialisationPage } from './pages/doc-spec/doc-spec.component';
import { AdminReportsPage } from './pages/report/report.component';
import { PatientDetails } from './pages/patient-details/patient-details.component';
import { TitleCasePipe } from '../../shared/pipe/custom-title-case.pipe';

@NgModule({
  declarations: [
    AdminPatientsPage,
    AdminAppointmentsPage,
    AdminContactUsPage,
    AdminDashboardPage,
    AdminDoctorsPage,
    AdminSpecialisationPage,
    AdminReportsPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AdminRoutingModule,
    AdminSidebarComponent,
    AdminLayoutComponent,
    ModalFormComponent,
    DashboardCard,
    DataTableComponent,
    SidebarComponent,
    PatientDetails,
  ],
  providers: [TitleCasePipe]
})
export class AdminModule {}
