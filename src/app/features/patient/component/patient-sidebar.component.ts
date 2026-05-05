import { Component } from "@angular/core";
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";

@Component({
    selector: 'app-patient-sidebar',
    imports: [SidebarComponent],
    template: `
    <app-sidebar [navItems]="navItems"></app-sidebar>
    `
})
export class DoctorSidebarComponent {
    navItems = [
    { label: 'Dashboard', icon: '📊', link: '/patient', exact: true },
    { label: 'Appointments', icon: '📅', link: '/patient/appointments', exact: false },
    { label: 'Reports', icon: '📋', link: '/patient/reports', exact: false },
  ];
}