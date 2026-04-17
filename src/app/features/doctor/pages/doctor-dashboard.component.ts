import { Component } from '@angular/core';

@Component({
  selector: 'app-doctor-dashboard',
  standalone:false,
  template: `
    <div class="p-4">
      <h1 class="text-2xl font-bold">Doctor Dashboard</h1>
      <p class="text-sm text-gray-600">Placeholder doctor view. Add patient lists and records.</p>
    </div>
  `,
})
export class DoctorDashboardComponent {}
