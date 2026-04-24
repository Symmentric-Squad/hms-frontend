import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AppUser {
  id: string;
  username: string;
  role: 'ADMIN' | 'DOCTOR' | 'PATIENT' | string;
  // add other fields as needed (email, token, etc.)
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Tracks current user (null when not authenticated)
  private _currentUser$ = new BehaviorSubject<AppUser | null>(null);

  // Expose observable for components that want to react to auth changes
  public currentUser$: Observable<AppUser | null> = this._currentUser$.asObservable();

  constructor() {
    // TODO: initialize from localStorage or a persisted source if needed
  }

  // Call this after a successful login
  setCurrentUser(user: AppUser) {
    this._currentUser$.next(user);
    // Optionally persist token/user to localStorage
  }

  // Clear current user on logout
  clearCurrentUser() {
    this._currentUser$.next(null);
    // remove persisted tokens if stored
  }

  // Returns the current user snapshot
  getCurrentUser(): AppUser | null {
    return this._currentUser$.getValue();
  }

  // Helper: checks whether the current user has the provided role
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    return user.role === role;
  }

}
