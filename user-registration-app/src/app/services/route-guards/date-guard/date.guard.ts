import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AppConstants } from '../../../AppConstants';
import { ToastrService } from 'ngx-toastr';

/**
 * Validates whether it is past the day of the hackathon
 */
@Injectable()
export class DateGuard implements CanActivate {
  static validateDate(date = new Date()) {
    return environment.hackathonStartTime.getTime() <= date.getTime();
  }

  constructor(private router: Router, private toastrService: ToastrService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!DateGuard.validateDate(new Date())) {
      this.toastrService.error(`You may only visit this page on or after ${environment.hackathonStartTime.toDateString()}`);
      this.router.navigate([AppConstants.LIVE_ENDPOINT]);
      return false;
    }
    return true;
  }
}
