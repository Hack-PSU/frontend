import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { HttpService } from './HttpService';

@Injectable()
export class RegisterGuard implements CanActivate {
  constructor(private httpService: HttpService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const url: string = state.url;

    return this.checkLogin();
  }

  async checkLogin(): Promise<boolean> {
    const response = await this.httpService.getRegistrationStatus().toPromise();
    if (response['registered'] === true) {
      this.router.navigate(['/register']);
      return true;
    }

    // Navigate to the login page with extras
    this.router.navigate(['/home']);
    return false;
  }
}
