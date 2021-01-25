import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    authService: AuthService,
    router: Router,
    errorHandler: CustomErrorHandlerService,
    activatedRoute: ActivatedRoute,
    progressBar: NgProgress,
    private toastrService: ToastrService
  ) {
    super(authService, progressBar, errorHandler, activatedRoute, router);
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.email = params['email'] || '';
    });
  }

  forgotPassword() {
    if (this.email && this.email !== '') {
      this.authService.afAuth
        .sendPasswordResetEmail(this.email)
        .then((complete) => {
          this.toastrService.success(
            'An email was sent to the provided email. Check there to reset your password.'
          );
          this.router.navigate([AppConstants.LOGIN_ENDPOINT]);
        })
        .catch((error) => {
          this.errorHandler.handleError(error);
        });
    }
  }
}
