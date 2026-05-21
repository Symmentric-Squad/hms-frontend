import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
 

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('AuthGuard - Checking access...');
    console.log('isLoggedIn:', this.authService.isLoggedIn());
 
    if (this.authService.isLoggedIn()) {
      console.log('✓ AuthGuard - Access ALLOWED');
      return true;
    }
 
    console.log('✗ AuthGuard - Access DENIED - Redirecting to /login');
    this.router.navigate(['/#login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}