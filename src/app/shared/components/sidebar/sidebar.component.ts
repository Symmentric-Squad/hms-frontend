import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AppUser } from '../../models/app-user';
import { TitleCasePipe } from '../../pipe/custom-title-case.pipe';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, TitleCasePipe],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isSidebarCollapsed = true;

  constructor (private auth: AuthService, private router: Router) {}

  @Input() navItems: SideNavItem[] = [];

  currentUser: AppUser = {
      id: 'd1',
      username: 'doctor',
      role: 'DOCTOR'
    };
    
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  togglelogout(){
    console.log("LOGOUT")
  }

  logout() {
    this.auth.clearCurrentUser();
    this.router.navigate(['/'], { replaceUrl: true });
  }

}