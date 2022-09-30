import { Component, OnInit } from '@angular/core';
import app from 'firebase/app';
import { NgProgress } from 'ngx-progressbar';
import { finalize, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/AuthService/auth.service';
import { RegistrationApiResponse } from '../../models/registration';
import { HttpService } from '../../services/HttpService/HttpService';
import { Hackathon } from '../../models/hackathon';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.css'],
})
export class UserProfileViewComponent implements OnInit {
  private static readonly DEFAULT_PROFILE_URL: string = '../../assets/icons/user.png';
  currentHackathon: Hackathon;
  currentPin: number = null;

  constructor(
    public authService: AuthService,
    public httpService: HttpService,
    public progressService: NgProgress,
    public toastrService: ToastrService,
  ) {}

  ngOnInit() {
    const regObservable = this.httpService.getUserRegistrations().subscribe(
      (registrations: RegistrationApiResponse[]) => {
        registrations.forEach((registration) => {
          if (registration.hackathon.active) {
            this.currentPin = registration.pin;
          }
        });
        regObservable.unsubscribe();
      },
      ({ error }) => {
        if (error && error.status === 404) {
          this.toastrService.info(
            'You have not registered for a hackathon yet. We could not find any data for you',
          );
        } else {
          this.toastrService.error('Something has gone terribly wrong');
        }
      },
    );
    const hackObservable = this.httpService.getHackathons().subscribe(
      (hackathons: Hackathon[]) => {
        hackathons.forEach((hackathon) => {
          if (hackathon.active) {
            this.currentHackathon = hackathon;
            hackObservable.unsubscribe();
          }
        });
      },
      ({ error }) => {
        if (error && error.status === 404) {
          this.toastrService.info('No hackathons retrieved');
        }
      },
    );
  }

  public getUserPhotoUrl(user: app.User | null) {
    return user.photoURL || UserProfileViewComponent.DEFAULT_PROFILE_URL;
  }

  submitNewName(value: string) {
    this.progressService.ref().start();
    const observable = this.authService.currentUser
      .pipe(
        switchMap((user) => user.updateProfile({ displayName: value, photoURL: user.photoURL })),
        finalize(() => {
          this.progressService.ref().complete();
        }),
      )
      .subscribe(
        () => {
          this.toastrService.info('Successfully changed display name');
          observable.unsubscribe();
        },
        (error) => {
          console.error(error);
          this.toastrService.error('Something went wrong. Try again');
          observable.unsubscribe();
        },
      );
  }

  submitNewEmail(value: string) {
    this.progressService.ref().start();
    const observable = this.authService.currentUser
      .pipe(
        switchMap((user) => user.updateEmail(value)),
        finalize(() => this.progressService.ref().complete()),
      )
      .subscribe(
        () => {
          this.toastrService.info('Successfully changed display name');
          observable.unsubscribe();
        },
        (error) => {
          console.error(error);
          this.toastrService.error(error.message);
          observable.unsubscribe();
        },
      );
  }

  submitNewPassword(newPassword: string, confirmedPassword: string) {
    if (newPassword.length === 0 || confirmedPassword.length === 0) {
      this.toastrService.error('Password not entered');
      return;
    }
    if (newPassword !== confirmedPassword) {
      this.toastrService.error('Passwords do not match');
      return;
    }
    this.progressService.ref().start();
    const observable = this.authService.currentUser
      .pipe(
        switchMap((user) => user.updatePassword(newPassword)),
        finalize(() => this.progressService.ref().complete()),
      )
      .subscribe(
        () => {
          this.toastrService.info('Successfully changed display name');
          observable.unsubscribe();
        },
        (error) => {
          console.error(error);
          this.toastrService.error(error.message);
          observable.unsubscribe();
        },
      );
  }
}
