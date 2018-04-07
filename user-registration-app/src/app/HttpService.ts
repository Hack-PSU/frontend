import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from './AppConstants';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { RegistrationModel } from './registration-model';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {

  }

  getRegistrationStatus(currentUser) {
    const API_ENDPOINT = 'users/registration';
    return Observable.fromPromise(currentUser.getIdToken(true))
      .switchMap((idToken: string) => {
        let headers = new HttpHeaders();
        headers = headers.set('idtoken', idToken);
        return this.http.get<RegistrationModel>(AppConstants.API_BASE_URL.concat(API_ENDPOINT), { headers });
      });
  }

  getTableAssignment(currentUser) {
    const API_ENDPOINT = 'users/project';
    return Observable.fromPromise(currentUser.getIdToken(true))
      .switchMap((idToken: string) => {
        let headers = new HttpHeaders();
        headers = headers.set('idtoken', idToken);
        return this.http.get(AppConstants.API_BASE_URL.concat(API_ENDPOINT), { headers });
      });
  }

  submitRegistration(submitData: RegistrationModel, uid: string) {
    const API_ENDPOINT = 'register';
    const formObject: FormData = new FormData();
    formObject.append('uid', uid);
    for (const key in submitData) {
      if (submitData.hasOwnProperty(key) && submitData[key] !== null && key !== 'resume') {
        formObject.append(key, submitData[key]);
      }
    }
    if (submitData.resume) {
      formObject.append('resume', submitData.resume, submitData.resume.name);
    }
    return Observable.fromPromise(this.afAuth.auth.currentUser.getIdToken(true))
      .switchMap((idToken: string) => {
        let headers = new HttpHeaders();
        headers = headers.set('idtoken', idToken);
        return this.http.post(AppConstants.API_BASE_URL.concat(API_ENDPOINT),
                              formObject,
                              { headers, reportProgress: true });
      });
  }

  submitRSVP(currentUser: any, status: boolean) {
    const API_ENDPOINT = 'users/rsvp';
    return Observable.fromPromise(currentUser.getIdToken(true))
      .switchMap((idToken: string) => {
        let headers = new HttpHeaders();
        headers = headers.set('idtoken', idToken);
        return this.http.post<RegistrationModel>(AppConstants.API_BASE_URL.concat(API_ENDPOINT),
                                                 { status },
                                                 { headers, reportProgress: true });
      });
  }

  getCategories(currentUser: any) {
    const API_ENDPOINT = 'users/event_categories';
    return Observable.fromPromise(currentUser.getIdToken(true))
      .switchMap((idToken: string) => {
        let headers = new HttpHeaders();
        headers = headers.set('idtoken', idToken);
        return this.http.get(AppConstants.API_BASE_URL.concat(API_ENDPOINT), { headers });
      });
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
    return Observable.fromPromise(this.afAuth.auth.currentUser.getIdToken(true))
      .switchMap((idToken: string) => {
        let headers = new HttpHeaders();
        headers = headers.set('idtoken', idToken);
        return this.http.post(AppConstants.API_BASE_URL.concat(API_ENDPOINT),
                              formObject,
                              { headers, reportProgress: true });
      });
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
    return Observable.fromPromise(this.afAuth.auth.currentUser.getIdToken(true))
      .switchMap((idToken: string) => {
        let headers = new HttpHeaders();
        headers = headers.set('idtoken', idToken);
        return this.http.post(AppConstants.API_BASE_URL.concat(API_ENDPOINT),
                              formObject,
                              { headers, reportProgress: true });
      });
  }

  getRsvpStatus(currentUser: any) {
    const API_ENDPOINT = 'users/rsvp';
    return Observable.fromPromise(currentUser.getIdToken(true))
      .switchMap((idToken: string) => {
        let headers = new HttpHeaders();
        headers = headers.set('idtoken', idToken);
        return this.http.get(AppConstants.API_BASE_URL.concat(API_ENDPOINT), { headers });
      });
  }
}
