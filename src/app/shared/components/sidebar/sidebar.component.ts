import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isSidebarCollapsed = false;

    @Input() navItems: SideNavItem[] = [];

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleDropdown(item: SideNavItem) {
    if (this.isSidebarCollapsed) {
      this.isSidebarCollapsed = false; // Auto-expand sidebar if a dropdown is clicked
    }
    item.isExpanded = !item.isExpanded;
  }
}