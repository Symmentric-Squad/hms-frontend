import { NgModule } from "@angular/core";
import { DoctorRoutingModule } from "./doctor-routing.module";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { DoctorSidebarComponent } from "./component/doctor-sidebar.component";
import { AppointmentHistory } from "./pages/appointment-history/appointment-history.component";
import { DoctorLayoutComponent } from './doctor-layout';
import { DoctorDashboardComponent } from "./pages/dashboard/dashboard.component";
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { DataTableComponent } from "../../shared/components/data-table/data-table.component";

@NgModule({
  declarations: [
    DoctorDashboardComponent,
    AppointmentHistory
  ],
  imports: [
    DoctorSidebarComponent,
    CommonModule,
    DoctorRoutingModule,
    SidebarComponent,
    DoctorLayoutComponent,
    ɵInternalFormsSharedModule,
    DataTableComponent,
    FormsModule
]
})
export class DoctorModule {}