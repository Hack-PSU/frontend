import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

export enum AuthProviders {
  GOOGLE_PROVIDER,
  GITHUB_PROVIDER,
  APPLE_PROVIDER,
}

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
      case AuthProviders.GITHUB_PROVIDER:
        authProvider = new firebase.auth.GithubAuthProvider();
        break;
      case AuthProviders.APPLE_PROVIDER:
        const provider = new firebase.auth.OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');
        authProvider = provider;
        break;
    }
    return this.afAuth.auth.signInWithPopup(authProvider);
  }

  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  createUser(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
}
