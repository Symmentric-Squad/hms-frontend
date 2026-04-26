import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: false,
  template: `
    <div class="admin-shell">
      <!-- Sidebar -->
      <aside class="admin-sidebar" [class.collapsed]="sidebarCollapsed">
        <div class="sidebar-brand">
          <span class="brand-icon">🏥</span>
          <span class="brand-text" *ngIf="!sidebarCollapsed">HMS Admin</span>
        </div>

        <nav class="sidebar-nav">
          <a *ngFor="let item of navItems"
             [routerLink]="item.link"
             routerLinkActive="active-link"
             [routerLinkActiveOptions]="{exact: item.exact}"
             class="nav-link"
             [title]="item.label">
            <span class="nav-icon">{{ item.icon }}</span>
            <span class="nav-label" *ngIf="!sidebarCollapsed">{{ item.label }}</span>
          </a>
        </nav>

        <div class="sidebar-footer">
          <button class="logout-btn" (click)="logout()" [title]="'Logout'">
            <span class="nav-icon">🚪</span>
            <span class="nav-label" *ngIf="!sidebarCollapsed">Logout</span>
          </button>
        </div>

        <button class="toggle-btn" (click)="sidebarCollapsed = !sidebarCollapsed">
          {{ sidebarCollapsed ? '▶' : '◀' }}
        </button>
      </aside>

      <!-- Main Content -->
      <div class="admin-main" [class.expanded]="sidebarCollapsed">
        <header class="admin-topbar">
          <div class="topbar-title">
            <h1>Admin Management Panel</h1>
          </div>
          <div class="topbar-user">
            <span class="user-badge">🛡️ Admin</span>
            <span class="user-name">{{ currentUser?.username }}</span>
          </div>
        </header>
        <div class="admin-content">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-shell {
      display: flex;
      min-height: 100vh;
      font-family: 'Segoe UI', sans-serif;
      background: #f0f4f8;
    }

    .admin-sidebar {
      width: 240px;
      min-height: 100vh;
      background: linear-gradient(180deg, #0a1628 0%, #0d2149 100%);
      display: flex;
      flex-direction: column;
      position: fixed;
      left: 0; top: 0; bottom: 0;
      z-index: 100;
      transition: width 0.3s ease;
      box-shadow: 3px 0 20px rgba(0,0,0,0.15);
    }

    .admin-sidebar.collapsed {
      width: 64px;
    }

    .sidebar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 22px 16px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      overflow: hidden;
      white-space: nowrap;
    }

    .brand-icon { font-size: 26px; flex-shrink: 0; }
    .brand-text {
      font-size: 18px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 0.5px;
    }

    .sidebar-nav {
      flex: 1;
      padding: 16px 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 11px 12px;
      border-radius: 10px;
      color: rgba(255,255,255,0.7);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s ease;
      white-space: nowrap;
      overflow: hidden;
    }

    .nav-link:hover {
      background: rgba(13,110,253,0.2);
      color: #ffffff;
    }

    .nav-link.active-link {
      background: linear-gradient(90deg, #0d6efd, #0a58ca);
      color: #ffffff;
      box-shadow: 0 3px 12px rgba(13,110,253,0.35);
    }

    .nav-icon { font-size: 18px; flex-shrink: 0; }
    .nav-label { font-size: 14px; }

    .sidebar-footer {
      padding: 12px 8px;
      border-top: 1px solid rgba(255,255,255,0.08);
    }

    .logout-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 11px 12px;
      background: rgba(234,67,67,0.12);
      border: none;
      border-radius: 10px;
      color: #ff6b6b;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
      overflow: hidden;
    }

    .logout-btn:hover {
      background: rgba(234,67,67,0.25);
    }

    .toggle-btn {
      position: absolute;
      top: 50%;
      right: -12px;
      transform: translateY(-50%);
      width: 24px; height: 24px;
      background: #0d6efd;
      color: white;
      border: none;
      border-radius: 50%;
      font-size: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      transition: background 0.2s;
    }

    .toggle-btn:hover { background: #0a58ca; }

    .admin-main {
      margin-left: 240px;
      flex: 1;
      display: flex;
      flex-direction: column;
      transition: margin-left 0.3s ease;
      min-height: 100vh;
    }

    .admin-main.expanded {
      margin-left: 64px;
    }

    .admin-topbar {
      background: white;
      padding: 14px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 8px rgba(0,0,0,0.07);
      position: sticky; top: 0;
      z-index: 50;
    }

    .admin-topbar h1 {
      font-size: 20px;
      font-weight: 700;
      color: #1e293b;
      margin: 0;
    }

    .topbar-user {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .user-badge {
      background: linear-gradient(90deg, #0d6efd, #0a58ca);
      color: white;
      padding: 4px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
    }

    .user-name {
      font-weight: 600;
      color: #374151;
      font-size: 14px;
      text-transform: capitalize;
    }

    .admin-content {
      padding: 28px 32px;
      flex: 1;
    }
  `]
})
export class AdminLayoutComponent {
  sidebarCollapsed = false;

  navItems = [
    { label: 'Dashboard', icon: '📊', link: '/admin', exact: true },
    { label: 'Manage Doctors', icon: '🩺', link: '/admin/doctors', exact: false },
    { label: 'Manage Patients', icon: '👥', link: '/admin/patients', exact: false },
    { label: 'Appointments', icon: '📅', link: '/admin/appointments', exact: false },
    { label: 'Reports', icon: '📋', link: '/admin/reports', exact: false },
  ];

  get currentUser() {
    return this.auth.getCurrentUser();
  }

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.clearCurrentUser();
    this.router.navigate(['/']);
  }
}
