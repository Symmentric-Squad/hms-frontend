import { Component } from "@angular/core";
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";

@Component({
    selector: 'app-doctor-sidebar',
    // standalone: false,
    imports: [SidebarComponent],
    template: `
    <aside class="absolute left-0 top-0 h-full z-50">
        <app-sidebar [navItems]="navItems"></app-sidebar>
    </aside>
    `
})
export class DoctorSidebarComponent {
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