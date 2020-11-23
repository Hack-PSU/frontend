import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';
import { AppConstants } from '../../AppConstants';
import { Login } from '../../models/login';
import { AuthProviders, AuthService } from '../../services/AuthService/auth.service';
import { CustomErrorHandlerService } from '../../services/services';
import { BaseComponent } from '../base/base.component';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-login',
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends BaseComponent {
  public model: Login;

  constructor(authService: AuthService,
              router: Router,
              errorHandler: CustomErrorHandlerService,
              private readonly alertsService: AlertService,
              activatedRoute: ActivatedRoute,
              progressBar: NgProgress) {
    super(authService, progressBar, errorHandler, activatedRoute, router);
    this.model = new Login();
    this.authService.authState
      .subscribe((user) => {
        if (user) {
          this.onLogin();
        }
      });
  }

  loginGoogle() {
    this.progressBar.start();
    this.loginHandler(this.authService.signInWithProvider(AuthProviders.GOOGLE_PROVIDER));
  }

  loginGithub() {
    this.progressBar.start();
    this.loginHandler(this.authService.signInWithProvider(AuthProviders.GITHUB_PROVIDER));
  }

  loginApple() {
    this.progressBar.start();
    this.loginHandler(this.authService.signInWithProvider(AuthProviders.APPLE_PROVIDER));
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
        console.error(error);
        this.errorHandler.handleError(error);
        this.progressBar.complete();
      });
  }

  onLogin() {
    this.readRouteAndNavigate((params) => {
      if (!params.redirectUrl) {
        this.router.navigate([AppConstants.REGISTER_ENDPOINT]);
      } else {
        this.router.navigate([params['redirectUrl']]);
      }
    });
  }

  onEmailEntered(email: string) {
    if (/@psu.edu$/.test(email)) {
      this.alertsService.warning('Our login system is not affiliated with Penn State. ' +
        'Please make sure the password you choose is not your WebAccess password');
    }
  }
}
