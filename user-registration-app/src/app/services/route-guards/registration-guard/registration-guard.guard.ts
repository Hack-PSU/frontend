import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from '../../HttpService/HttpService';
import { RegistrationApiResponse } from '../../../models/registration';
import { RegistrationApiResponseV3 } from '../../../models-v3/registration-v3';
import { AppConstants } from '../../../AppConstants';
import { NgProgress } from 'ngx-progressbar';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class RegistrationGuard implements CanActivate {
  constructor(
    private httpService: HttpService,
    private router: Router,
    private ngProgress: NgProgress,
    private toastrService: ToastrService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Checks users' registration status
    return this.httpService.getRegistrationStatusV3().pipe(
      map<RegistrationApiResponseV3, boolean>((response) => {
        if (!response.isCurrentRegistration()) {
          // Navigates users to registration
          this.router.navigate([AppConstants.REGISTER_ENDPOINT]).then(() => {
            this.ngProgress.ref().complete();
          });
          return false;
        }
        return true;
      }),
      catchError((error) => {
        console.error(error);
        this.toastrService.warning('You must register first');
        this.router.navigate([AppConstants.REGISTER_ENDPOINT]).then(() => {
          this.ngProgress.ref().complete();
        });
        return of(false);
      }),
    );
  }
}
