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
        console.log(idToken);
        let headers = new HttpHeaders();
        headers = headers.set('idtoken', idToken);
        return this.http.get<RegistrationModel>(AppConstants.API_BASE_URL.concat(API_ENDPOINT), { headers });
      });
  }

  submitRegistration(submitData: RegistrationModel, uid: string) {
    const API_ENDPOINT = 'register';
    const formObject: FormData = new FormData();
    formObject.append('uid', uid);
    for (const key in submitData) {
      if (submitData.hasOwnProperty(key) && submitData[key] !== null && key !== 'resume') {
        console.log(key);
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

}
