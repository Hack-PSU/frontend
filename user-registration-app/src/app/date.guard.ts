import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { RsvpComponent } from './rsvp/rsvp.component';

@Injectable()
export class DateGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return (next.component.constructor.name === 'RsvpComponent') ?
      environment.rsvpStartTime.getTime() <= new Date().getTime() :
      environment.hackathonStartTime.getTime() <= new Date().getTime();
  }
}
