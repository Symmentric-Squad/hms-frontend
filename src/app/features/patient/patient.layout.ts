import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DoctorSidebarComponent } from './component/patient-sidebar.component';
import { TopPanelComponent } from '../../shared/components/top-panel/top-panel.component';

@Component({
  selector: 'app-doctor-layout',
  standalone: true,
  imports: [RouterModule, DoctorSidebarComponent,TopPanelComponent],
  template: `
    <div class="relative flex min-h-screen">
      <app-patient-sidebar></app-patient-sidebar>
      <div class="flex-1 pl-15">
        <app-top-panel></app-top-panel>
        <div class="p-6">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export class PaitentLayoutComponent {}