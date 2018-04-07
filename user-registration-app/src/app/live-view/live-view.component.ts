import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { HttpService } from '../HttpService';
import { Subscription } from 'rxjs/Subscription';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { AppConstants } from '../AppConstants';
import { RegistrationModel } from '../registration-model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.css'],
  providers: [HttpService],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'scale(0)', opacity: 0 }),
          animate('500ms', style({ transform: 'scale(1)', opacity: 1 })),
        ]),
        transition(':leave', [
          style({ transform: 'scale(1)', opacity: 1 }),
          animate('500ms', style({ transform: 'scale(0)', opacity: 0 })),
        ]),
      ],
    ),
  ],
})
export class LiveViewComponent implements OnInit, OnDestroy {
  currentTime: number;
  startTime: number;
  endTime: number;
  isBeforeEvent: boolean;
  subscription: Subscription;

  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  bannerText: string;

  constructor(private zone: NgZone, private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (!user) {
        this.router.navigate([AppConstants.LOGIN_ENDPOINT]);
      }
    },                                  (error) => {
      console.error(error);
      this.afAuth.auth.signOut();
      this.router.navigate([AppConstants.LOGIN_ENDPOINT]);
    });
    this.currentTime = new Date().getTime() / 1000;
    this.startTime = new Date('April 7, 2018 14:00:00').getTime() / 1000;
    this.endTime = new Date('April 8, 2018 14:00:00').getTime() / 1000;
  }

  ngOnInit() {
    $(document).ready(() => {
      $('.materialboxed').materialbox();
    });
    if (this.currentTime < this.startTime) {
      this.bannerText = 'until HackPSU!';
      this.countDown(this.currentTime, this.startTime);
      this.isBeforeEvent = true;
    } else if (this.currentTime < this.endTime) {
      this.bannerText = 'remains!';
      this.getTimeRemaining(this.currentTime, this.endTime);
      this.countDown(this.currentTime, this.endTime);
      this.isBeforeEvent = false;
    } else {
      this.bannerText = 'Hacking is over!';
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
    }
  }

  getTimeRemaining(currentTime, countdownTime) {
    let timeTill = countdownTime - currentTime;
    this.days = Math.floor(timeTill / 86400);
    timeTill = timeTill % 86400;
    this.hours = Math.floor(timeTill / 3600);
    timeTill = timeTill % 3600;
    this.minutes = Math.floor(timeTill / 60);
    this.seconds = Math.floor(timeTill % 60);
  }

  countDown(currentTime, countdownTime) {
    this.zone.runOutsideAngular(() => {
      const timer = TimerObservable.create(0, 1000);
      this.subscription = timer.subscribe(() => {
        this.currentTime += 1;
        if ((countdownTime - this.currentTime) <= 0) {
          if (this.isBeforeEvent) {
            this.zone.run(() => {
              this.bannerText = 'remains!';
              this.getTimeRemaining(this.currentTime, this.endTime);
            });
          } else {
            this.days = 0;
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
            this.bannerText = 'Hacking is over!';
          }
        } else {
          this.zone.run(() => {
            this.getTimeRemaining(this.currentTime, countdownTime);
          });
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
