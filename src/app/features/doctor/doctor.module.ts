import { NgModule } from "@angular/core";
import { DoctorRoutingModule } from "./doctor-routing.module";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { DoctorSidebarComponent } from "./component/doctor-sidebar.component";
import { DoctorAppointmentsPage } from "./pages/appointment/appointment.component";
import { DoctorLayoutComponent } from './doctor-layout';
import { DoctorDashboardPage } from "./pages/dashboard/dashboard.component";
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { DataTableComponent } from "../../shared/components/data-table/data-table.component";
import { DoctorReportsPage } from "./pages/report/report.component";
import { DoctorPatientsPage } from "./pages/patient/patient.component";
import { ModalFormComponent } from "../../shared/components/dialog-form/dialog-form.component";
import { DashboardCard } from "../../shared/components/dashboard-card/dashboard-card.component";
import { PatientDetails } from "./pages/patient-details/patient-details.component";

@NgModule({
  declarations: [
    DoctorDashboardPage,
    DoctorAppointmentsPage,
    DoctorPatientsPage,
    DoctorReportsPage,
    PatientDetails
  ],
  imports: [
    ModalFormComponent,
    DoctorSidebarComponent,
    CommonModule,
    DoctorRoutingModule,
    SidebarComponent,
    DoctorLayoutComponent,
    ɵInternalFormsSharedModule,
    DataTableComponent,
    FormsModule,
    DashboardCard
]
})
export class DoctorModule {}