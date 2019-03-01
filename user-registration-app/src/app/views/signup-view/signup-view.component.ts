import { Component, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from '../../AppConstants';
import { AuthService, CustomErrorHandlerService } from '../../services/services';
import { BaseComponent } from '../base/base.component';
import {AuthProviders} from "../../services/AuthService/auth.service";

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
  loginGoogle() {
    this.progressBar.start();
    this.loginHandler(this.authService.signInWithProvider(AuthProviders.GOOGLE_PROVIDER));
  }

  loginGithub() {
    this.progressBar.start();
    this.loginHandler(this.authService.signInWithProvider(AuthProviders.GITHUB_PROVIDER));
  }

  signUp() {
    this.progressBar.start();
    if (this.email && this.email !== '' && this.password && this.password !== '') {
      this.authService.createUser(this.email, this.password)
          .then((user) => {
            this.router.navigate([AppConstants.REGISTER_ENDPOINT]);
            this.progressBar.complete();
          }).catch((error) => {
            this.errorHandler.handleError(error);
            this.progressBar.complete();
          });
    } else {
      this.errorHandler.handleError(Error('Enter username and password'));
      this.progressBar.complete();
    }
  }
}
