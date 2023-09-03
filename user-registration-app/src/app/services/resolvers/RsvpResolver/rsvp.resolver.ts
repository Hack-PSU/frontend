import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConstants } from '../../../AppConstants';
import { finalize, map, mergeMap, take } from 'rxjs/operators';
import { AuthService } from '../../AuthService/auth.service';
import { NgProgress } from 'ngx-progressbar';
import { HttpService } from '../../HttpService/HttpService';
import { Injectable } from '@angular/core';
import { RegistrationApiResponse } from '../../../models/registration';
import { RegistrationApiResponseV3 } from '../../../models-v3/registration-v3';

@Injectable()
export class RsvpResolver implements Resolve<RegistrationApiResponseV3> {
  constructor(
    private authService: AuthService,
    private progress: NgProgress,
    private httpService: HttpService,
    private router: Router,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RegistrationApiResponseV3> {
    this.progress.ref().start();
    return this.authService.currentUser.pipe(
      mergeMap((user) => {
        if (!user) {
          this.router.navigate([AppConstants.LOGIN_ENDPOINT]);
        } else {
          return this.httpService.getRegistrationStatusV3();
        }
      }),
      map((registration) => {
        if (!registration.registration) {
          this.router.navigate([AppConstants.REGISTER_ENDPOINT]);
          return null;
        }
        return registration;
      }),
      take(1),
      finalize(() => {
        this.progress.ref().complete();
      }),
    );
  }
}
