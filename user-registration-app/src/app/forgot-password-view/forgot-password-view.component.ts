import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-view',
  templateUrl: './forgot-password-view.component.html',
  styleUrls: ['./forgot-password-view.component.css'],
})
export class ForgotPasswordViewComponent implements OnInit {

  public email: string;
  private errors: any;
  private result: string;

  constructor(public afAuth: AngularFireAuth, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe((params) => {
        this.email = params['email'] || '';
      });
  }

  forgotPassword() {
    if (this.email && this.email !== '') {
      this.afAuth.auth.sendPasswordResetEmail(this.email)
        .then((complete) => {
          this.result = 'An email was sent to the provided email. Check there to reset your password.';
        }).catch((error) => {
        this.errors = error;
      });
    }
  }
}
