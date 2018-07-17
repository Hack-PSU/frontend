import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AppConstants } from '../../../AppConstants';
import { AuthService } from '../../AuthService/auth.service';
import { NgProgress } from 'ngx-progressbar';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private ngProgress: NgProgress) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url): boolean {
    if (!this.authService.currentUser) {
      const navExtras = {
        queryParams: {
          redirectUrl: url,
        },
      };
      // Navigate to the login page with extras
      this.router.navigate([AppConstants.LOGIN_ENDPOINT], navExtras)
        .then(() => {
          this.ngProgress.done();
        });
      return false;
    }
    return true;
  }
}
