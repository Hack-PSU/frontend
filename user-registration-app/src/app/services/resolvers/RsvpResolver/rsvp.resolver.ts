import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConstants } from '../../../AppConstants';
import { finalize, map, mergeMap, take } from 'rxjs/operators';
import { AuthService } from '../../AuthService/auth.service';
import { NgProgress } from 'ngx-progressbar';
import { HttpService } from '../../HttpService/HttpService';
import { Injectable } from '@angular/core';
import { RegistrationApiResponse } from '../../../models/registration';

@Injectable()
export class RsvpResolver implements Resolve<RegistrationApiResponse> {
  constructor(
    private authService: AuthService,
    private progress: NgProgress,
    private httpService: HttpService,
    private router: Router,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<RegistrationApiResponse> {
    this.progress.ref().start();
    return this.authService.currentUser.pipe(
      mergeMap((user) => {
        if (!user) {
          this.router.navigate([AppConstants.LOGIN_ENDPOINT]);
        } else {
          return this.httpService.getRegistrationStatus();
        }
      }),
      map((registration) => {
        if (!registration || !registration.submitted) {
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
