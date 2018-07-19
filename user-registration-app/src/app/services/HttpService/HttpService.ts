import { from as observableFrom, Observable } from 'rxjs';
import { switchMap, map, retry, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../../AppConstants';
import { Registration } from '../../models/registration';
import { AuthService } from '../AuthService/auth.service';
import { Hackathon } from '../../models/hackathon';
import { NgProgress } from '@ngx-progressbar/core';


@Injectable()
export class HttpService {
  constructor(private http: HttpClient, private authService: AuthService, public ngProgress: NgProgress) {
  }

  private makeGetRequest(API_ENDPOINT: string) {
    return this.authService.idToken.pipe(
      switchMap((idToken: string) => {
        let headers = new HttpHeaders();
        headers = headers.set('idtoken', idToken);
        return this.http.get(AppConstants.API_BASE_URL.concat(API_ENDPOINT), { headers })
          .pipe(
            retry(3),
          );
      }));
  }

  private makePostRequest(API_ENDPOINT: string, formObject: FormData) {
    return this.authService.idToken.pipe(
      switchMap((idToken: string) => {
        let headers = new HttpHeaders();
        headers = headers.set('idtoken', idToken);
        return this.http.post(AppConstants.API_BASE_URL.concat(API_ENDPOINT),
          formObject,
          { headers, reportProgress: true });
      }));
  }

  getRegistrationStatus(): Observable<Registration> {
    const API_ENDPOINT = 'users/registration';
    return this.makeGetRequest(API_ENDPOINT)
      .pipe(
        map(value => Registration.parseJSON(value)),
        tap(console.log),
      );
  }

  getCurrentHackathon(): Observable<Hackathon> {
    const API_ENDPOINT = 'users/hackathon/active';
    return this.makeGetRequest(API_ENDPOINT)
      .pipe(
        map(value => Hackathon.parseJSON(value)),
        tap(console.log),
      );
  }

  getTableAssignment() {
    const API_ENDPOINT = 'users/project';
    return this.makeGetRequest(API_ENDPOINT);
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
    return this.makePostRequest(API_ENDPOINT, formObject);
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

  getCategories(currentUser: any) {
    const API_ENDPOINT = 'users/event_categories';
    return this.makeGetRequest(API_ENDPOINT);
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
    return this.makePostRequest(API_ENDPOINT, formObject);
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
    return this.makePostRequest(API_ENDPOINT, formObject);
  }

  getRsvpStatus() {
    const API_ENDPOINT = 'users/rsvp';
    return this.makeGetRequest(API_ENDPOINT);
  }
}
