import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AppConstants } from '../../../AppConstants';

@Injectable()
export class DateGuard implements CanActivate {
  static validateDate() {
    return environment.hackathonStartTime.getTime() <= new Date().getTime();
  }

  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!DateGuard.validateDate()) {
      this.router.navigate([AppConstants.REGISTER_ENDPOINT]);
      return false;
    }
    return true;
  }
}
