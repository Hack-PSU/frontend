import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../../HttpService/HttpService';
import { Registration } from '../../../models/registration';
import { AppConstants } from '../../../AppConstants';
import { NgProgress } from '@ngx-progressbar/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationGuard implements CanActivate {

  constructor(private httpService: HttpService, private router: Router, private ngProgress: NgProgress) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.httpService.getRegistrationStatus()
      .pipe(
        map<Registration, boolean>((registration) => {
          if (!registration) {
            this.router.navigate([AppConstants.REGISTER_ENDPOINT])
              .then(() => {
                this.ngProgress.complete();
              });
            return false;
          }
          return true;
        }),
      );
  }
}
