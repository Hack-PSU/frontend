import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../../models/login';
import { AppConstants } from '../../AppConstants';
import { AuthService, AuthProviders } from '../../services/AuthService/auth.service';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-login',
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  public errors: Error = null;
  public model: Login;

  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private progressBar: NgProgress) {
    this.model = new Login();
    this.authService.authState
      .subscribe((user) => {
        if (user) {
          this.onLogin();
        }
      });
  }

  login() {
    this.loginHandler(this.authService.signInWithProvider(AuthProviders.GOOGLE_PROVIDER));
  }

  loginFacebook() {
    this.loginHandler(this.authService.signInWithProvider(AuthProviders.FACEBOOK_PROVIDER));
  }

  loginGithub() {
    this.loginHandler(this.authService.signInWithProvider(AuthProviders.GITHUB_PROVIDER));
  }

  loginEmail() {
    this.progressBar.start();
    if (this.model.email && this.model.password) {
      this.loginHandler(this.authService.signIn(this.model.email, this.model.password));
    }
  }

  private loginHandler(loginPromise: Promise<any>) {
    loginPromise
      .then(() => {
        this.onLogin();
      })
      .catch((error) => {
        this.errors = error;
        console.error(error);
      });
  }

  onLogin() {
    this.progressBar.complete();
    this.activatedRoute.queryParams
      .subscribe((params) => {
        if (!params.redirectUrl) {
          this.router.navigate([AppConstants.REGISTER_ENDPOINT]);
        } else {
          this.router.navigate([params['redirectUrl']]);
        }
      });
  }
}
