import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from '../../AppConstants';
import { AuthService, CustomErrorHandlerService } from '../../services/services';
import { BaseComponent } from '../base/base.component';
import { AuthProviders } from '../../services/AuthService/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup-view',
  templateUrl: './signup-view.component.html',
  styleUrls: ['./signup-view.component.css'],
})
export class SignupViewComponent extends BaseComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(authService: AuthService,
              router: Router,
              errorHandler: CustomErrorHandlerService,
              private readonly toastrService: ToastrService,
              activatedRoute: ActivatedRoute,
              progressBar: NgProgress) {
    super(authService, progressBar, errorHandler, activatedRoute, router);
  }

  ngOnInit() {
  }

  private loginHandler(loginPromise: Promise<any>) {
    loginPromise
      .then(() => {
        this.onLogin();
      })
      .catch((error) => {
        console.error(error);
        this.errorHandler.handleError(error);
        this.progressBar.ref().complete();
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
  loginGoogle() {
    this.progressBar.ref().start();
    this.loginHandler(this.authService.signInWithProvider(AuthProviders.GOOGLE_PROVIDER));
  }

  loginGithub() {
    this.progressBar.ref().start();
    this.loginHandler(this.authService.signInWithProvider(AuthProviders.GITHUB_PROVIDER));
  }

  loginApple() {
    this.progressBar.ref().start();
    this.loginHandler(this.authService.signInWithProvider(AuthProviders.APPLE_PROVIDER));
  }

  signUp() {
    this.progressBar.ref().start();
    if (this.email && this.email !== '' && this.password && this.password !== '') {
      this.authService.createUser(this.email, this.password)
          .then((user) => {
            this.router.navigate([AppConstants.REGISTER_ENDPOINT]);
            this.progressBar.ref().complete();
          }).catch((error) => {
            this.errorHandler.handleError(error);
            this.progressBar.ref().complete();
          });
    } else {
      this.errorHandler.handleError(Error('Enter username and password'));
      this.progressBar.ref().complete();
    }
  }
  onEmailEntered(email: string) {
    if (/@psu.edu$/.test(email)) {
      this.toastrService.warning('Our login system is not affiliated with Penn State. ' +
        'Please make sure the password you choose is not your WebAccess password');
    }
  }
}
