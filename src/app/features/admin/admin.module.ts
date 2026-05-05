import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin-routing.module";
import { CommonModule } from "@angular/common";
import { DashboardCard } from "../../shared/components/dashboard-card/dashboard-card.component";
import { AdminDashboardPage } from "./pages/dashboard/dashboard.component";
import { DataTableComponent } from "../../shared/components/data-table/data-table.component";
import { AdminPatientsPage } from "./pages/patient/patient.component";
import { AdminAppointmentsPage } from "./pages/appointment/appointment.component";
import { AdminReportsPage } from "./pages/report/report.component";
import { AdminDoctorsPage } from "./pages/doctor/doctor.component";

@NgModule({
  declarations: [
    AdminDashboardPage,
    AdminPatientsPage,
    AdminAppointmentsPage,
    AdminReportsPage,
    AdminDoctorsPage
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DashboardCard,
    DataTableComponent
  ]
})
export class AdminModule { }