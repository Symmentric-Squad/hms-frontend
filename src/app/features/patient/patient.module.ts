import { NgModule } from "@angular/core";
import { PatientDashboardComponent } from "./pages/patient-dashboard.component";
import { PatientLayoutComponent } from "./patient-layout";
import { PatientRoutingModule } from "./patient-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
   PatientDashboardComponent,
    PatientLayoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PatientRoutingModule,
  ]
})
export class PatientModule { }
