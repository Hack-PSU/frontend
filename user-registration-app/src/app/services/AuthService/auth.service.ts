import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Observable } from 'rxjs'
import app from 'firebase/app'

export enum AuthProviders {
  GOOGLE_PROVIDER,
  GITHUB_PROVIDER,
  APPLE_PROVIDER,
}

@Injectable()
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  get idToken(): Observable<string> {
    return this.afAuth.idToken
  }

  get currentUser() {
    return this.afAuth.user
  }

  get authState() {
    return this.afAuth.authState
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  signInWithProvider(provider: AuthProviders): Promise<any> {
    let authProvider: app.auth.AuthProvider = null
    switch (provider) {
      case AuthProviders.GOOGLE_PROVIDER:
        authProvider = new app.auth.GoogleAuthProvider()
        break
      case AuthProviders.GITHUB_PROVIDER:
        authProvider = new app.auth.GithubAuthProvider()
        break
      case AuthProviders.APPLE_PROVIDER:
        {
          const oAuthProvider = new app.auth.OAuthProvider('apple.com')
          oAuthProvider.addScope('email')
          oAuthProvider.addScope('name')
          authProvider = oAuthProvider
        }
        break
    }
    return this.afAuth.signInWithPopup(authProvider)
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut()
  }

  createUser(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
  }
}
