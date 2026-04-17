import { NgModule } from "@angular/core";
import { AdminDashboardComponent } from "./pages/admin-dashboard.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AdminDashboardComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    // SharedModule
  ]
})
export class AdminModule { }