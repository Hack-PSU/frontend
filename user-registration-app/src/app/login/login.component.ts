import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { LoginModel } from '../login-model';

@Component({
  selector: 'app-login',
  // providers: [HttpAdminService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public errors: Error = null;
  public model: LoginModel;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.model = new LoginModel();
  }

  ngOnInit() {

  }


  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        this.onLogin();
      }).catch((error) => {
        this.errors = error;
        console.error(error);
      });
  }

  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((response) => {
        this.onLogin();
      }).catch((error) => {
      this.errors = error;
      console.error(error);
      });
  }

  loginGithub() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(() => {
        this.onLogin();
      }).catch((error) => {
        this.errors = error;
        console.error(error);
      });
  }

  loginEmail() {
    if (this.model.email && this.model.password) {
      this.afAuth.auth.signInWithEmailAndPassword(this.model.email, this.model.password)
        .then(() => {
          this.onLogin();
        }).catch((error) => {
          this.errors = error;
          console.error(error);
        });
    }
  }

  onLogin() {
    this.router.navigate(['/register']);
  }
}
