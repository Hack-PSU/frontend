import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppConstants } from './AppConstants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AngularFireAuth, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.authService.auth.currentUser) {
      this.router.navigate([AppConstants.REGISTER_ENDPOINT]);
      return true;
    }

    // Navigate to the login page with extras
    this.router.navigate([AppConstants.LOGIN_ENDPOINT]);
    return false;
  }
}
