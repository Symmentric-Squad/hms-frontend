import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class DoctorGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if user is logged in AND has DOCTOR role
    if (this.authService.isLoggedIn() && this.authService.isDoctor()) {
      return true;
    }
 
    // If not authenticated or wrong role, redirect to login
    this.router.navigate(['/#login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}