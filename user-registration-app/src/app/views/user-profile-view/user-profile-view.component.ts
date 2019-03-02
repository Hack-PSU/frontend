import { Component, OnInit } from '@angular/core';
import { User } from "firebase";
import { AuthService } from "../../services/AuthService/auth.service";
import { transition, trigger, useAnimation } from "@angular/animations";
import { fadeInDown, fadeOutUp } from "ng-animate";
import { NgProgress } from "@ngx-progressbar/core";
import { finalize, switchMap } from "rxjs/operators";
import { AlertService } from "ngx-alerts";

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.css'],
  animations: [
    trigger(
      'fadeIn', [
        transition(
          ':enter',
          useAnimation(fadeInDown, { params: { timing: 0.25 } })
        ),
        transition(
          ':leave',
          useAnimation(fadeOutUp, { params: { timing: 0.25 } })
        )
      ],
    )
  ],
})
export class UserProfileViewComponent implements OnInit {
  private static readonly DEFAULT_PROFILE_URL: string = '../../assets/icons/user.png';
  private emailEditToggled: boolean;
  private passwordEditToggled: boolean;
  private nameEditToggled: boolean;

  constructor(public authService: AuthService, private progressService: NgProgress, private alertsService: AlertService) {
  }

  ngOnInit() {
    this.emailEditToggled = false;
    this.passwordEditToggled = false;
    this.nameEditToggled = false;
  }

  public getUserPhotoUrl(user: User | null) {
    if (!user.photoURL) {
      return UserProfileViewComponent.DEFAULT_PROFILE_URL;
    }
    return user.photoURL;
  }

  editEmail() {
    this.emailEditToggled = true;
  }

  editPassword() {
    this.passwordEditToggled = true;
  }

  editName() {
    this.nameEditToggled = true;
  }

  submitNewName(value: string) {
    this.progressService.start();
    const observable = this.authService.currentUser
      .pipe(
        switchMap((user) => {
          return user.updateProfile({ displayName: value, photoURL: user.photoURL });
        }),
        finalize(() => {
          this.progressService.complete();
          this.nameEditToggled = false;
        }),
      ).subscribe(() => {
        this.alertsService.info('Successfully changed display name');
        observable.unsubscribe();
      }, (error) => {
        console.error(error);
        this.alertsService.danger('Something went wrong. Try again');
        observable.unsubscribe();
        return undefined;
      });
  }

  submitNewEmail(value: string) {
    this.progressService.start();
    const observable = this.authService.currentUser
      .pipe(
        switchMap((user) => {
          return user.updateEmail(value);
        }),
        finalize(() => {
          this.progressService.complete();
          this.nameEditToggled = false;
        }),
      ).subscribe(() => {
        this.alertsService.info('Successfully changed display name');
        observable.unsubscribe();
      }, (error) => {
        console.error(error);
        this.alertsService.danger(error.message);
        observable.unsubscribe();
        return undefined;
      });
  }

  submitNewPassword(value1: string, value2: string) {
    if (value1.length === 0 || value2.length === 0) {
      this.alertsService.danger('Password not entered');
      return;
    }
    if (value1 !== value2) {
      this.alertsService.danger('Passwords do not match');
      return;
    }
    this.progressService.start();
    const observable = this.authService.currentUser
      .pipe(
        switchMap((user) => {
          return user.updatePassword(value1);
        }),
        finalize(() => {
          this.progressService.complete();
          this.nameEditToggled = false;
        }),
      ).subscribe(() => {
        this.alertsService.info('Successfully changed display name');
        observable.unsubscribe();
      }, (error) => {
        console.error(error);
        this.alertsService.danger(error.message);
        observable.unsubscribe();
        return undefined;
      });
  }
}
