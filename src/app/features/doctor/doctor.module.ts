import { NgModule } from "@angular/core";
import { DoctorDashboardComponent } from "./pages/doctor-dashboard.component";
import { DoctorRoutingModule } from "./doctor-routing.module";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";

@NgModule({
  declarations: [
    DoctorDashboardComponent,
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SidebarComponent
]
})
export class DoctorModule { }