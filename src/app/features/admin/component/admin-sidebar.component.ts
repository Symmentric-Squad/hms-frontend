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
    { label: 'Dashboard', icon: 'home_2.svg', link: '/admin', exact: true },
    { label: 'Patients', icon: 'patient.svg', link: '/admin/patients', exact: false },
    { label: 'Doctors', icon: 'steth.svg', link: '/admin/doctors', exact:false },
    { label: 'Appointments', icon: 'calender.svg', link: '/admin/appointments', exact: false },
    { label: 'Reports', icon: 'tick_file.svg', link: '/admin/reports', exact: false },
    { label: 'Specialisations', icon:"category.svg", link: '/admin/specialisations', exact: true},
    { label: 'Conatact Us', icon:'email.svg', link: '/admin/contact', exact:false}
  ];
}