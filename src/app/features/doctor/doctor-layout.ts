import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DoctorSidebarComponent } from './component/doctor-sidebar.component';

@Component({
  selector: 'app-doctor-layout',
  standalone: true,
  imports: [RouterModule, DoctorSidebarComponent],
  template: `
    <div class="relative flex min-h-screen">
      <app-doctor-sidebar></app-doctor-sidebar>
      <div class="flex-1 pl-20 p-6">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class DoctorLayoutComponent {}