import { Component, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from '../../AppConstants';
import { AuthService, CustomErrorHandlerService } from '../../services/services';
import { BaseComponent } from '../base/base.component';

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
    super(authService, router, errorHandler, activatedRoute, progressBar);
  }

  ngOnInit() {
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
