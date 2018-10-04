import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../AuthService/auth.service';
import { CustomErrorHandlerService } from '../CustomErrorHandler/custom-error-handler.service';
import { NgProgress } from '@ngx-progressbar/core';
import { catchError, retry, switchMap } from 'rxjs/operators';
import { AppConstants } from '../../AppConstants';

export class BaseHttpService {
  private readonly CACHE_SIZE = 3;
  protected memCache: Map<string, Observable<any>>;

  constructor(protected http: HttpClient,
              protected authService: AuthService,
              protected errorHandler: CustomErrorHandlerService,
              public ngProgress: NgProgress) {
    this.memCache = new Map<string, Observable<any>>();
  }

  protected get<T>(API_ENDPOINT: string, ignoreCache?: boolean, useAuth = true) {
    if (!this.memCache.has(API_ENDPOINT)) {
      this.memCache.set(API_ENDPOINT, useAuth ? this.authService.idToken.pipe(
        switchMap((idToken: string) => {
          let headers = new HttpHeaders();
          headers = headers.set('idtoken', idToken);
          return this.http.get(AppConstants.API_BASE_URL.concat(API_ENDPOINT), { headers })
            .shareReplay(this.CACHE_SIZE, 10 * 1000)
            .pipe(
              retry(3),
            );
        }),
        catchError(err => this.errorHandler.handleHttpError(err)),
      )
      : this.http.get(AppConstants.API_BASE_URL.concat(API_ENDPOINT))
          .shareReplay(this.CACHE_SIZE, 10 * 1000)
          .pipe(
            retry(3),
            catchError(err => this.errorHandler.handleHttpError(err)),
          )
      );
    }
    return this.memCache.get(API_ENDPOINT);
  }

  protected post(API_ENDPOINT: string, formObject: FormData) {
    this.memCache.set(API_ENDPOINT, null);
    return this.authService.idToken.pipe(
      switchMap((idToken: string) => {
        let headers = new HttpHeaders();
        headers = headers.set('idtoken', idToken);
        return this.http.post(AppConstants.API_BASE_URL.concat(API_ENDPOINT),
                              formObject,
                              { headers, reportProgress: true });
      }),
      catchError(err => this.errorHandler.handleHttpError(err)),
    );
  }
}
