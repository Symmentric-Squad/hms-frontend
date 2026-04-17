import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone:false,
  template: `
    <div class="p-4">
      <h1 class="text-2xl font-bold">Admin Dashboard</h1>
      <p class="text-sm text-gray-600">Placeholder admin view. Add widgets and management pages.</p>
    </div>
  `,
})
export class AdminDashboardComponent {
}
