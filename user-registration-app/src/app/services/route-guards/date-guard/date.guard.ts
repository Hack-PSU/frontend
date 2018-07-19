import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AppConstants } from '../../../AppConstants';

@Injectable()
export class DateGuard implements CanActivate {
  static validateDate(date = new Date()) {
    return environment.hackathonStartTime.getTime() <= date.getTime();
  }

  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!DateGuard.validateDate(new Date())) {
      this.router.navigate([AppConstants.REGISTER_ENDPOINT]);
      return false;
    }
    return true;
  }
}
