import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-doctor-dashboard',
  standalone:false,
  template: `
    <app-sidebar [navItems]="navItems"></app-sidebar>
    <div class="p-4">
      <h1 class="text-2xl font-bold">Doctor Dashboard</h1>
      <p class="text-sm text-gray-600">Placeholder doctor view. Add patient lists and records.</p>
    </div>
  `,
})
export class DoctorDashboardComponent {
  navItems: SideNavItem[] = [
    { label: 'Dashboard', icon: 'home-2-svgrepo-com.svg', link: '/doctor' },
    {label: 'Appointment History', icon: 'review-file-svgrepo-com.svg', link: '/doctor/appointments'},
    { 
      label: 'Patients', 
      icon: 'people-svgrepo-com.svg', 
      isExpanded: false,
      children: [
        { label: 'Add', link: '/doctor/patients/add' },
        { label: 'Manage', link: '/doctor/patients/manage' },
        { label: 'Search', link: '/doctor/patients/search' }
      ]
    }];
}
