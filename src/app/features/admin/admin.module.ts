import { NgModule } from "@angular/core";
import { AdminDashboardComponent } from "./pages/admin-dashboard.component";
import { AdminLayoutComponent } from "./admin-layout.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminLayoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
