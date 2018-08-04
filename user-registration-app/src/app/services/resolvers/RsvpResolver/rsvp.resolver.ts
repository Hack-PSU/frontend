import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Rsvp } from '../../../models/rsvp';
import { AppConstants } from '../../../AppConstants';
import { finalize, map, mergeMap, take } from 'rxjs/operators';
import { AuthService } from '../../AuthService/auth.service';
import { NgProgress } from '@ngx-progressbar/core';
import { HttpService } from '../../HttpService/HttpService';
import { Injectable } from '@angular/core';

@Injectable()
export class RsvpResolver implements Resolve<Rsvp> {
  constructor(private authService: AuthService,
              private progress: NgProgress,
              private httpService: HttpService,
              private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Rsvp> {
    this.progress.start();
    return this.authService.currentUser.pipe(
      mergeMap((user) => {
        if (!user) {
          this.router.navigate([AppConstants.LOGIN_ENDPOINT]);
        } else {
          return this.httpService.getRsvpStatus();
        }
      }),
      map(Rsvp.parseJSON),
      map((rsvp: Rsvp) => {
        if (!rsvp) {
          this.router.navigate([AppConstants.REGISTER_ENDPOINT]);
          return null;
        }
        return rsvp;
      }),
      take(1),
      finalize(() => {
        this.progress.complete();
      }));
  }
}
