import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from './AppConstants';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {

  }

  getRegistrationStatus() {
    const API_ENDPOINT = 'register/status';
    return Observable.fromPromise(this.afAuth.auth.currentUser.getIdToken(true))
      .switchMap((idToken: string) => {
        console.log(idToken);
        let headers = new HttpHeaders();
        headers = headers.set('idtoken', idToken);
        return this.http.get(AppConstants.API_BASE_URL.concat(API_ENDPOINT), { headers });
      });
  }

}
