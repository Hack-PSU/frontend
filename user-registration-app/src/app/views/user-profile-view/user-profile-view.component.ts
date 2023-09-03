import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { NgProgress } from 'ngx-progressbar';
import { finalize, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/AuthService/auth.service';
import { RegistrationApiResponse } from '../../models/registration';
import { HttpService } from '../../services/HttpService/HttpService';
import { Hackathon } from '../../models/hackathon';
import { RegistrationApiResponseV3 } from '../../models-v3/registration-v3';
import { HackathonV3 } from '../../models-v3/hackathon-v3';

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
    this.currentPin = 123; // Legacy support. Should be removed as soon as it is verifiably no longer used.

    const reg = this.httpService.getRegistrationStatusV3().subscribe((user: RegistrationApiResponseV3) => {
      if (!user.registration) {
        this.toastrService.info('You have not registered for a hackathon yet. We could not find any data for you.');
      }
      reg.unsubscribe();
    });
    
    const hack = this.httpService.getCurrentHackathonV3().subscribe((hackathon: HackathonV3) => {
      this.currentHackathon = new Hackathon(
        hackathon.uid,
        hackathon.name,
        1,
        1,
        0,
        hackathon.active,
      );
      
      // Hacky way to avoid potential weirdness when converting out of 'Date' type into milliseconds and back.
      this.currentHackathon.startTime = hackathon.startTime;
      this.currentHackathon.endTime = hackathon.endTime;
      hack.unsubscribe();
    });
  }

  public getUserPhotoUrl(user: User | null) {
    return user.photoURL || UserProfileViewComponent.DEFAULT_PROFILE_URL;
  }

  submitNewName(value: string) {
    this.progressService.ref().start();
    const observable = this.authService.currentUser.pipe(
      switchMap((user) => user.updateProfile({ displayName: value, photoURL: user.photoURL })),
      finalize(() => {
        this.progressService.ref().complete();
      }),
    ).subscribe(
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
    const observable = this.authService.currentUser.pipe(
      switchMap((user) => user.updateEmail(value)),
      finalize(() => this.progressService.ref().complete()),
    ).subscribe(
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
    const observable = this.authService.currentUser.pipe(
      switchMap((user) => user.updatePassword(newPassword)),
      finalize(() => this.progressService.ref().complete()),
    ).subscribe(
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
