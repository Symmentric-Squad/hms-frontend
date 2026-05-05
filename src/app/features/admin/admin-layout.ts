import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from './component/admin-sidebar.component';
import { AppUser } from '../../core/services/auth.service';

@Component({
  selector: 'app-doctor-layout',
  standalone: true,
  imports: [RouterModule, AdminSidebarComponent],
  styles:`
  .admin-main { margin-left: 240px; flex: 1; display: flex; flex-direction: column; transition: margin-left 0.3s ease; min-height: 100vh; }
  .admin-main.expanded { margin-left: 64px; }
  .admin-topbar { background: white; padding: 14px 32px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 2px 8px rgba(0,0,0,0.07); position: sticky; top: 0; z-index: 50; }
  .admin-topbar h1 { font-size: 20px; font-weight: 700; color: #1e293b; margin: 0; }
  .topbar-user { display: flex; align-items: center; gap: 10px; }
  .user-badge { background: linear-gradient(90deg, #0d6efd, #0a58ca); color: white; padding: 4px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; }
  .user-name { font-weight: 600; color: #374151; font-size: 14px; text-transform: capitalize; }
  .admin-content { padding: 28px 32px; flex: 1; }
  `,
  template: `
    <div class="relative flex min-h-screen">
      <app-admin-sidebar></app-admin-sidebar>
      <div class="flex-1 pl-15">
        <header class="admin-topbar">
          <div class="topbar-title">
            <h1>Admin Management Panel</h1>
          </div>
          @if(currentUser){
            <div class="topbar-user">
              <span class="user-badge">🛡️ Admin</span>
              <span class="user-name">{{ currentUser.username }}</span>
            </div>
          }
        </header>
        <div class="p-6">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export class AdminLayoutComponent {
  currentUser:AppUser = {
    id:"1",
    username: 'Suresh',
    role: "ADMIN"
  }
}