import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { combineLatest as observableCombineLatest } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Registration } from '../../../models/registration';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { AppConstants } from '../../../AppConstants';
import { AuthService } from '../../AuthService/auth.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpService } from '../../HttpService/HttpService';
import 'rxjs-compat/add/observable/empty';
import 'rxjs-compat/add/observable/of';

@Injectable()
export class RegistrationResolver implements Resolve<Registration> {
  constructor(private authService: AuthService, private progress: NgProgress, private router: Router, private httpService: HttpService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Registration> {
    this.progress.start();
    return this.authService.currentUser
      .pipe(
        mergeMap((user) => {
          if (!user) {
            this.router.navigate([AppConstants.LOGIN_ENDPOINT]);
            return null;
          }
          return observableCombineLatest(this.httpService.getRegistrationStatus(), this.httpService.getCurrentHackathon());
        }),
        map((data) => {
          const [registration, hackathon] = data;
          if (registration.isCurrentRegistration(hackathon.uid) && registration.submitted) {
            this.progress.complete();
            this.router.navigate(['/rsvp']);
            return null;
          }
          return registration;
        }),
        catchError((error) => {
          this.progress.complete();
          // Registration not found.
          return Observable.of(new Registration());
        }),
        take(1),
      );
  }
}
