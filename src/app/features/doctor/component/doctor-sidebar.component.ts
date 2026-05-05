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
    { label: 'Dashboard', icon: 'home_2.svg', link: '/doctor', exact: true },
    { label: 'Patients', icon: 'patient.svg', link: '/doctor/patients', exact: false },
    { label: 'Appointments', icon: 'calender.svg', link: '/doctor/appointments', exact: false },
    { label: 'Reports', icon: 'tick_file.svg', link: '/doctor/reports', exact: false },
  ];
}