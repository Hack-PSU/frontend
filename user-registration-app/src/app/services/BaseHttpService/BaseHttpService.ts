import { catchError, mergeMap, retryWhen, shareReplay, switchMap, map, tap } from 'rxjs/operators';
import { Observable, throwError, timer } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../AuthService/auth.service';
import { CustomErrorHandlerService } from '../CustomErrorHandler/custom-error-handler.service';
import { NgProgress } from 'ngx-progressbar';
import { AppConstants } from '../../AppConstants';

export class BaseHttpService {
  private readonly CACHE_SIZE = 3;
  protected memCache: Map<string, Observable<any>>;

  private genericRetryStrategy = ({
    maxRetryAttempts = 3,
    scalingDuration = 1000,
    excludedStatusCodes = [],
  }: {
    maxRetryAttempts?: number;
    scalingDuration?: number;
    excludedStatusCodes?: number[];
  } = {}) => (attempts: Observable<any>) => {
    return attempts.pipe(
      mergeMap((error, i) => {
        const retryAttempt = i + 1;
        // if maximum number of retries have been met
        // or response is a status code we don't wish to retry, throw error
        if (
          retryAttempt > maxRetryAttempts ||
          excludedStatusCodes.find((e) => e === error.status)
        ) {
          return throwError(error);
        }
        console.log(`Attempt ${retryAttempt}: retrying in ${retryAttempt * scalingDuration}ms`);
        // retry after 1s, 2s, etc...
        return timer(retryAttempt * scalingDuration);
      })
    );
  };

  constructor(
    protected http: HttpClient,
    protected authService: AuthService,
    protected errorHandler: CustomErrorHandlerService,
    public ngProgress: NgProgress
  ) {
    this.memCache = new Map<string, Observable<any>>();
  }

  protected get<T>(
    API_ENDPOINT: string,
    ignoreCache?: boolean,
    useAuth = true,
    v2: boolean = false,
    uid: string = ''
  ): Observable<T> {
    if (ignoreCache) {
      this.memCache.delete(API_ENDPOINT);
    }
    if (!this.memCache.has(API_ENDPOINT)) {
      // Set the value in the memory cache
      let headers = new HttpHeaders();
      let params = new HttpParams();
      const fullUrl = v2
        ? AppConstants.API_BASE_URL_V2.concat(API_ENDPOINT)
        : AppConstants.API_BASE_URL.concat(API_ENDPOINT);
      if (ignoreCache) {
        params = params.set('ignoreCache', 'true');
      }
      if (uid.length > 0) {
        params = params.set('uid', uid);
      }
      let observable = useAuth
        ? // With authentication
          this.authService.idToken.pipe(
            switchMap((idToken: string) => {
              headers = headers.set('idtoken', idToken);
              return this.getInternal(fullUrl, headers, params);
            })
          )
        : // Without authentication
          this.getInternal(fullUrl, headers, params);
      observable = observable.pipe(
        v2 ? map((apiResponse: any) => apiResponse.body.data) : tap(() => {}),
        catchError((err) => {
          return v2
            ? this.errorHandler.handleV2HttpError(err)
            : this.errorHandler.handleHttpError(err);
        })
      );
      this.memCache.set(API_ENDPOINT, observable);
    }
    return this.memCache.get(API_ENDPOINT);
  }

  private getInternal<T>(
    fullUrl: string,
    headers: HttpHeaders,
    params?: HttpParams
  ): Observable<T> {
    return this.http
      .get(fullUrl, { headers, params })
      .pipe(shareReplay(this.CACHE_SIZE, 10 * 1000))
      .pipe(
        retryWhen(this.genericRetryStrategy({ excludedStatusCodes: [400, 401, 404, 409] }))
      ) as Observable<T>;
  }

  protected post(API_ENDPOINT: string, formObject: FormData | any, v2: boolean = false) {
    this.memCache.set(API_ENDPOINT, null);
    return this.authService.idToken.pipe(
      switchMap((idToken: string) => {
        let headers = new HttpHeaders();
        headers = headers.set('idtoken', idToken);
        return this.http.post(
          v2
            ? AppConstants.API_BASE_URL_V2.concat(API_ENDPOINT)
            : AppConstants.API_BASE_URL.concat(API_ENDPOINT),
          formObject,
          { headers, reportProgress: true }
        );
      }),
      catchError((err) => {
        return v2
          ? this.errorHandler.handleV2HttpError(err)
          : this.errorHandler.handleHttpError(err);
      })
    );
  }
}
