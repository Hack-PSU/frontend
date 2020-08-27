import {of as observableOf,  Observable ,  forkJoin } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Registration, RegistrationApiResponse } from '../../../models/registration';
import { catchError, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { AppConstants } from '../../../AppConstants';
import { AuthService } from '../../AuthService/auth.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpService } from '../../HttpService/HttpService';
import { User } from "firebase";

@Injectable()
/**
 * This class checks the registration status of the user using getRegistrationStatus. If the user is not registered,
 * registration-resolver redirects the user to registration page. If the registration can check the user ID and the
 * their registration is submitted, then routes the user to RSVP page.
 */
export class RegistrationResolver implements Resolve<Registration> {
  constructor(private authService: AuthService, private progress: NgProgress, private router: Router, private httpService: HttpService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Registration> {
    this.progress.start();
    return this.authService.currentUser
      .pipe(
        switchMap((user) => {
          if (!user) {
            this.router.navigate([AppConstants.LOGIN_ENDPOINT]);
            return null;
          }
          return this.httpService.getRegistrationStatus();
        }),
        map((registration) => {
          console.log("yayayaya",registration);
          if (registration.isCurrentRegistration() && registration.submitted) {
            this.progress.complete();
            this.router.navigate([AppConstants.PIN_ENDPOINT]);
            return null;
          }
          return Registration.parseFromApiResponse(registration);
        }),
        catchError((error) => {
          this.progress.complete();
          console.log(error);
          // Registration not found.
          return observableOf(new Registration());
        }),
        take(1),
      );
  }
}
