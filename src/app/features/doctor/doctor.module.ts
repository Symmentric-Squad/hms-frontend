import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { DashboardCard } from "../../shared/components/dashboard-card/dashboard-card.component";
import { DataTableComponent } from "../../shared/components/data-table/data-table.component";
import { ModalFormComponent } from "../../shared/components/dialog-form/dialog-form.component";
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { TitleCasePipe } from "../../shared/pipe/custom-title-case.pipe";
import { DoctorSidebarComponent } from "./component/doctor-sidebar.component";
import { DoctorLayoutComponent } from './doctor-layout';
import { DoctorRoutingModule } from "./doctor-routing.module";
import { DoctorAppointmentsPage } from "./pages/appointment/appointment.component";
import { DoctorDashboardPage } from "./pages/dashboard/dashboard.component";
import { PatientDetails } from "./pages/patient-details/patient-details.component";
import { DoctorPatientsPage } from "./pages/patient/patient.component";
import { DoctorReportsPage } from "./pages/report/report.component";

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
  ],
  providers: [
    TitleCasePipe
  ]
})
export class DoctorModule { }