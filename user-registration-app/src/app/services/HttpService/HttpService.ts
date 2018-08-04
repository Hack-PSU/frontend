import { from as observableFrom, Observable } from 'rxjs';
import { switchMap, map, retry, tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../../AppConstants';
import { Registration } from '../../models/registration';
import { AuthService } from '../AuthService/auth.service';
import { Hackathon } from '../../models/hackathon';
import { NgProgress } from '@ngx-progressbar/core';
import { CustomErrorHandlerService } from '../CustomErrorHandler/custom-error-handler.service';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient,
              private authService: AuthService,
              private errorHandler: CustomErrorHandlerService,
              public ngProgress: NgProgress,
  ) {
  }

  private get(API_ENDPOINT: string) {
    return this.authService.idToken.pipe(
      switchMap((idToken: string) => {
        let headers = new HttpHeaders();
        headers = headers.set('idtoken', idToken);
        return this.http.get(AppConstants.API_BASE_URL.concat(API_ENDPOINT), { headers })
          .pipe(
            retry(3),
          );
      }),
      catchError(err => this.errorHandler.parseCustomServerErrorToString(err)),
    );
  }

  private post(API_ENDPOINT: string, formObject: FormData) {
    return this.authService.idToken.pipe(
      switchMap((idToken: string) => {
        let headers = new HttpHeaders();
        headers = headers.set('idtoken', idToken);
        return this.http.post(AppConstants.API_BASE_URL.concat(API_ENDPOINT),
                              formObject,
                              { headers, reportProgress: true });
      }),
      catchError(err => this.errorHandler.parseCustomServerErrorToString(err)),
    );
  }

  getRegistrationStatus(): Observable<Registration> {
    const API_ENDPOINT = 'users/registration';
    return this.get(API_ENDPOINT)
      .pipe(
        map(Registration.parseJSON),
      );
  }

  getCurrentHackathon(): Observable<Hackathon> {
    const API_ENDPOINT = 'users/hackathon/active';
    return this.get(API_ENDPOINT)
      .pipe(
        map(Hackathon.parseJSON),
      );
  }

  getTableAssignment() {
    const API_ENDPOINT = 'users/project';
    return this.get(API_ENDPOINT);
  }

  submitRegistration(submitData: Registration, uid: string) {
    const API_ENDPOINT = 'register';
    const formObject: FormData = new FormData();
    formObject.append('uid', uid);
    for (const key in submitData) {
      if (submitData.hasOwnProperty(key) && submitData[key] !== null && key !== 'resume') {
        formObject.append(key, submitData[key]);
      }
    }
    if (submitData.resume) {
      if (submitData.hasExistingResume()) {
        formObject.append('resume', submitData.resume.href);
      } else {
        formObject.append('resume', submitData.resume, submitData.resume.name);
      }
    }
    return this.post(API_ENDPOINT, formObject);
  }

  submitRSVP(currentUser: any, status: boolean) {
    const API_ENDPOINT = 'users/rsvp';
    return observableFrom(currentUser.getIdToken(true)).pipe(
      switchMap((idToken: string) => {
        let headers = new HttpHeaders();
        headers = headers.set('idtoken', idToken);
        return this.http.post<Registration>(AppConstants.API_BASE_URL.concat(API_ENDPOINT),
                                            { status },
                                            { headers, reportProgress: true });
      }));
  }

  getCategories() {
    const API_ENDPOINT = 'users/event_categories';
    return this.get(API_ENDPOINT);
  }

  submitTravelReimbursement(travelForm: any, uid) {
    const API_ENDPOINT = 'users/travelReimbursement';
    const formObject: FormData = new FormData();
    formObject.append('uid', uid);
    for (const key in travelForm) {
      if (travelForm.hasOwnProperty(key) && travelForm[key] !== null && key !== 'receipt') {
        formObject.append(key, travelForm[key]);
      }
    }
    if (travelForm.receipt) {
      Array.from(travelForm.receipt).forEach((r: any) => formObject.append('receipt', r, r.name));
    }
    return this.post(API_ENDPOINT, formObject);
  }

  submitTableAssignment(tableForm: any, uid) {
    const API_ENDPOINT = 'users/project';
    const formObject: FormData = new FormData();
    formObject.append('uid', uid);
    for (const key in tableForm) {
      if (tableForm.hasOwnProperty(key) && tableForm[key] !== null) {
        formObject.append(key, tableForm[key]);
      }
    }
    return this.post(API_ENDPOINT, formObject);
  }

  getRsvpStatus() {
    const API_ENDPOINT = 'users/rsvp';
    return this.get(API_ENDPOINT);
  }
}
