import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConstants } from '../../../AppConstants';
import { finalize, map, mergeMap, take } from 'rxjs/operators';
import { AuthService } from '../../AuthService/auth.service';
import { NgProgress } from 'ngx-progressbar';
import { HttpService } from '../../HttpService/HttpService';
import { Injectable } from '@angular/core';
import { ProjectModel } from "../../../models/project-model";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class TableAssignmentResolver implements Resolve<ProjectModel> {
  constructor(private authService: AuthService,
              private progress: NgProgress,
              private httpService: HttpService,
              private router: Router,
              private toastrService: ToastrService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProjectModel> {
    this.toastrService.error('Table assignment is broken. Please use Devpost instead');
    this.router.navigate([AppConstants.LIVE_ENDPOINT]);
    return null;
    // return this.authService.currentUser.pipe(
    //   mergeMap((user) => {
    //     if (!user) {
    //       this.router.navigate([AppConstants.LOGIN_ENDPOINT]);
    //     } else {
    //       return this.httpService.getProjectDetails();
    //     }
    //   }),
    //   take(1),
    //   finalize(() => {
    //     this.progress.complete();
    //   }));
  }
}
