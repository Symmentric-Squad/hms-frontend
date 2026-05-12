import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PatientRoutingModule } from "./patient-routing.module";
import { RouterModule } from "@angular/router";
import { PatientDashboardPage } from "./pages/dashboard/dashboard.component";
import { PatientAppointmentsPage } from "./pages/appointment/appointment.component";
import { PatientReportsPage } from "./pages/report/report.component";
import { DataTableComponent } from "../../shared/components/data-table/data-table.component";
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { FormsModule } from "@angular/forms";
import { DashboardCard } from "../../shared/components/dashboard-card/dashboard-card.component";
import { ModalFormComponent } from "../../shared/components/dialog-form/dialog-form.component";
import { TitleCasePipe } from "../../shared/pipe/custom-title-case.pipe";

@NgModule({
  declarations: [
    PatientDashboardPage,
    PatientAppointmentsPage,
    PatientReportsPage
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    RouterModule,
    DataTableComponent,
    SidebarComponent,
    FormsModule,
    DashboardCard,
    ModalFormComponent
    // SharedModule
  ],
  providers:[
    TitleCasePipe
  ]
})
export class PatientModule { }