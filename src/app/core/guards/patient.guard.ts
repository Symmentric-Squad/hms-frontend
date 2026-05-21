import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class PatientGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if user is logged in AND has USER role
    console.log(this.authService.isLoggedIn());
    console.log(this.authService.isUser());
    if (this.authService.isLoggedIn() && this.authService.isUser()) {
      return true;
    }
 
    // If not authenticated or wrong role, redirect to login
    this.router.navigate(['/#login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}