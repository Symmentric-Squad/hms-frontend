import { NgModule } from "@angular/core";
import { DoctorDashboardComponent } from "./pages/doctor-dashboard.component";
import { DoctorRoutingModule } from "./doctor-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    DoctorDashboardComponent,
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    // SharedModule
  ]
})
export class DoctorModule { }