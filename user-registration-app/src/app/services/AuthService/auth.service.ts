import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {}

  get idToken(): Observable<String> {
    return this.afAuth.idToken;
  }

  get currentUser() {
    return this.afAuth.user;
  }

  get authState() {
    return this.afAuth.authState;
  }

  signIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signInWithProvider(provider: AuthProviders): Promise<any> {
    let authProvider: firebase.auth.AuthProvider = null;
    switch (provider) {
      case AuthProviders.GOOGLE_PROVIDER:
        authProvider = new firebase.auth.GoogleAuthProvider();
        break;
      case AuthProviders.FACEBOOK_PROVIDER:
        authProvider = new firebase.auth.FacebookAuthProvider();
        break;
      case AuthProviders.GITHUB_PROVIDER:
        authProvider = new firebase.auth.GithubAuthProvider();
        break;
    }
    return this.afAuth.auth.signInWithPopup(authProvider);
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }
}

export enum AuthProviders {
  GOOGLE_PROVIDER,
  GITHUB_PROVIDER,
  FACEBOOK_PROVIDER,
}
