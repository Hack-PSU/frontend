import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { AuthService } from '../../services/AuthService/auth.service';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeInDown, fadeOutUp } from 'ng-animate';
import { NgProgress } from '@ngx-progressbar/core';
import { finalize, switchMap } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';
import { RegistrationApiResponse } from '../../models/registration';
import { HttpService } from '../../services/HttpService/HttpService';
import { Hackathon } from '../../models/hackathon';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.css'],
  animations: [
    trigger(
      'fadeIn', [
        transition(
          ':enter',
          useAnimation(fadeInDown, { params: { timing: 0.25 } }),
        ),
        transition(
          ':leave',
          useAnimation(fadeOutUp, { params: { timing: 0.25 } }),
        ),
      ],
    ),
  ],
})
export class UserProfileViewComponent implements OnInit {
  private static readonly DEFAULT_PROFILE_URL: string = '../../assets/icons/user.png';
  private emailEditToggled: boolean;
  private passwordEditToggled: boolean;
  private nameEditToggled: boolean;
  public currentPin: string;
  registrations: RegistrationApiResponse[];
  currentHackathon: Hackathon;

  constructor(
    public authService: AuthService,
    private httpService: HttpService,
    private progressService: NgProgress,
    private alertsService: AlertService,
  ) { }

  ngOnInit() {
    this.emailEditToggled = false;
    this.passwordEditToggled = false;
    this.nameEditToggled = false;
    const regObservable = this.httpService.getUserRegistrations()
    .subscribe(
      (registrations) => {
        this.registrations = registrations;
        regObservable.unsubscribe();
        this.getCurrentPin();
      },
      ({ error }) => {
        if (error.status === 404) {
          this.alertsService.info('You have not registered for a hackathon yet. We could not find any data for those queries');
        }
      });
    const hackObservable = this.httpService.getHackathons()
      .subscribe(
        (hackathons) => {
          hackathons.forEach((hackathon: Hackathon) => {
            if (hackathon.active) {
              this.currentHackathon = hackathon;
              hackObservable.unsubscribe();
            }
          });
        },
        ({ error }) => {
          if (error.status === 404) {
            this.alertsService.info('No hackathons retrieved');
          }
        })
    this.currentPin = 'No active pin! Don\'t forget to register!';
    this.getCurrentPin();
  };

  getCurrentPin() {
    this.registrations.forEach((registration) => {
      if (registration.hackathon.active) {
        this.currentPin = registration.pin.toString();
      }
    })
  }

  public getUserPhotoUrl(user: User | null) {
    if (user.photoURL) {
      return user.photoURL;
    }
    return UserProfileViewComponent.DEFAULT_PROFILE_URL;
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
      ).subscribe(
        () => {
          this.alertsService.info('Successfully changed display name');
          observable.unsubscribe();
        },
        (error) => {
          console.error(error);
          this.alertsService.danger('Something went wrong. Try again');
          observable.unsubscribe();
        },
      );
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
      ).subscribe(
        () => {
          this.alertsService.info('Successfully changed display name');
          observable.unsubscribe();
        },
        (error) => {
          console.error(error);
          this.alertsService.danger(error.message);
          observable.unsubscribe();
        },
      );
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
      ).subscribe(
        () => {
          this.alertsService.info('Successfully changed display name');
          observable.unsubscribe();
        },
        (error) => {
          console.error(error);
          this.alertsService.danger(error.message);
          observable.unsubscribe();
        },
      );
  }
}
