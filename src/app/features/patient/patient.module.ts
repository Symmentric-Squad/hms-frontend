import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PatientDashboardComponent } from "./pages/patient-dashboard.component";
import { PatientRoutingModule } from "./patient-routing.module";

@NgModule({
  declarations: [
    PatientDashboardComponent,
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    // SharedModule
  ]
})
export class PatientModule { }