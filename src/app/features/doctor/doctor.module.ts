import { NgModule } from "@angular/core";
import { DoctorDashboardComponent } from "./pages/doctor-dashboard.component";
import { DoctorRoutingModule } from "./doctor-routing.module";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { DoctorSidebarComponent } from "./component/doctor-sidebar.component";
import { AppointmentHistory } from "./pages/appointment-history/appointment-history";
import { DoctorLayoutComponent } from './doctor-layout';

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
    DoctorLayoutComponent
  ]
})
export class DoctorModule {}