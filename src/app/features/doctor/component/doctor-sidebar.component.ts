import { Component } from "@angular/core";
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";

@Component({
    selector: 'app-doctor-sidebar',
    imports: [SidebarComponent],
    template: `
    <app-sidebar [navItems]="navItems"></app-sidebar>
    `
})
export class DoctorSidebarComponent {
    navItems = [
    { label: 'Dashboard', icon: '📊', link: '/doctor', exact: true },
    { label: 'Patients', icon: '👥', link: '/doctor/patients', exact: false },
    { label: 'Appointments', icon: '📅', link: '/doctor/appointments', exact: false },
    { label: 'Reports', icon: '📋', link: '/doctor/reports', exact: false },
  ];
}