import { Component, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { AppConstants } from '../../AppConstants';
import { AuthService } from '../../services/AuthService/auth.service';
import { CustomErrorHandlerService } from '../../services/services';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-forgot-password-view',
  templateUrl: './forgot-password-view.component.html',
  styleUrls: ['./forgot-password-view.component.css'],
})
export class ForgotPasswordViewComponent extends BaseComponent implements OnInit {

  public email: string;
  public result: string;

  constructor(authService: AuthService,
              router: Router,
              errorHandler: CustomErrorHandlerService,
              activatedRoute: ActivatedRoute,
              progressBar: NgProgress,
              private alertsService: AlertService) {
    super(authService, progressBar, errorHandler, activatedRoute, router);
  }

  ngOnInit() {
    this.activatedRoute
      .queryParams
      .subscribe((params) => {
        this.email = params['email'] || '';
      });
  }

  forgotPassword() {
    if (this.email && this.email !== '') {
      this.authService.afAuth.auth.sendPasswordResetEmail(this.email)
        .then((complete) => {
          this.alertsService.success('An email was sent to the provided email. Check there to reset your password.')
          this.router.navigate([AppConstants.LOGIN_ENDPOINT]);
        }).catch((error) => {
          this.errorHandler.handleError(error);
        });
    }
  }
}
