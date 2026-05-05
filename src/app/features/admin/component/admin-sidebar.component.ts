import { Component } from "@angular/core";
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";

@Component({
    selector: 'app-admin-sidebar',
    imports: [SidebarComponent],
    template: `
    <app-sidebar [navItems]="navItems"></app-sidebar>
    `
})
export class AdminSidebarComponent {
    navItems = [
    { label: 'Dashboard', icon: '📊', link: '/admin', exact: true },
    { label: 'Patients', icon: '👥', link: '/admin/patients', exact: false },
    { label: 'Doctors', icon: '🩺', link: '/admin/doctors', exact:false },
    { label: 'Appointments', icon: '📅', link: '/admin/appointments', exact: false },
    { label: 'Reports', icon: '📋', link: '/admin/reports', exact: false },
  ];
}