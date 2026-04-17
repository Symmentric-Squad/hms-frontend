import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard.component';
import { AdminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
  },
  // Add routes
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
