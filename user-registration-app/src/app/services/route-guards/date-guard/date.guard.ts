import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { RsvpComponent } from '../../../rsvp/rsvp.component';
import { AppConstants } from '../../../AppConstants';

@Injectable()
export class DateGuard implements CanActivate {
  private static readonly RSVP_COMPONENT_NAME = 'RsvpComponent';

  static validateDate(componentName: string) {
    return (componentName === this.RSVP_COMPONENT_NAME) ?
      environment.rsvpStartTime.getTime() <= new Date().getTime() :
      environment.hackathonStartTime.getTime() <= new Date().getTime();
  }

  constructor(private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!DateGuard.validateDate(next.component.constructor.name)) {
      this.router.navigate([AppConstants.REGISTER_ENDPOINT]);
      return false;
    }
    return true;
  }
}
