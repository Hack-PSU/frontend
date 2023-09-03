import { of as observableOf, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { Registration } from '../../../models/registration';
import { AppConstants } from '../../../AppConstants';
import { AuthService } from '../../AuthService/auth.service';
import { HttpService } from '../../HttpService/HttpService';
import { RegistrationV3 } from '../../../models-v3/registration-v3';

@Injectable()
/**
 * This class checks the registration status of the user using getRegistrationStatus. If the user is not registered,
 * registration-resolver redirects the user to registration page. If the registration can check the user ID and the
 * their registration is submitted, then routes the user to RSVP page.
 */
export class RegistrationResolver implements Resolve<RegistrationV3> {
  constructor(
    private authService: AuthService,
    private progress: NgProgress,
    private router: Router,
    private httpService: HttpService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RegistrationV3> {
    this.progress.ref().start();
    return this.authService.currentUser.pipe(
      switchMap((user) => {
        if (!user) {
          this.router.navigate([AppConstants.LOGIN_ENDPOINT]);
          return null;
        }
        return this.httpService.getRegistrationStatusV3();
      }),
      map((registration) => {
        if (registration.isCurrentRegistration()) {
          this.progress.ref().complete();
          this.router.navigate([AppConstants.PIN_ENDPOINT]);
          return null;
        }
        return RegistrationV3.parseFromApiResponse(registration);
      }),
      catchError((error) => {
        this.progress.ref().complete();
        console.log(error);
        // Registration not found.
        return observableOf(new RegistrationV3());
      }),
      take(1),
    );
  }
}
