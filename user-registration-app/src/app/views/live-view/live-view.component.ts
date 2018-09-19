import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { HttpService } from '../../services/HttpService/HttpService';
import { Subscription, TimeInterval } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from "../../../environments/environment";
import { TimerObservable } from "rxjs-compat/observable/TimerObservable";
import { CountdownService } from "../../services/CountdownService/countdown.service";

declare var $: any;

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.css'],
  providers: [CountdownService],
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
export class LiveViewComponent implements OnInit {
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

  constructor(private zone: NgZone, private countdownService: CountdownService) {
    // this.currentTime = new Date().getTime() / 1000;
    // this.startTime = environment.timerStartTime.getTime() / 1000;
    // this.endTime = environment.hackathonEndTime.getTime() / 1000;
  }

  ngOnInit() {
    $(document).ready(() => {
      $('.materialboxed').materialbox();
    });
    this.countdownService.startCountDown()
      .subscribe(({ duration, bannerText }) => {
        this.days = duration.days;
        this.hours = duration.hours;
        this.minutes = duration.minutes;
        this.seconds = duration.seconds;
        this.bannerText = bannerText;
      });
    // if (this.currentTime < this.startTime) {
    //   this.bannerText = 'until HackPSU!';
    //   this.countDown(this.currentTime, this.startTime);
    //   this.isBeforeEvent = true;
    // } else if (this.currentTime < this.endTime) {
    //   this.bannerText = 'remains!';
    //   this.getTimeRemaining(this.currentTime, this.endTime);
    //   this.countDown(this.currentTime, this.endTime);
    //   this.isBeforeEvent = false;
    // } else {
    //   this.bannerText = 'Hacking is over!';
    //   this.days = 0;
    //   this.hours = 0;
    //   this.minutes = 0;
    //   this.seconds = 0;
    // }
  }

  // getTimeRemaining(currentTime, countdownTime) {
  //   let timeTill = countdownTime - currentTime;
  //   this.days = Math.floor(timeTill / 86400);
  //   timeTill = timeTill % 86400;
  //   this.hours = Math.floor(timeTill / 3600);
  //   timeTill = timeTill % 3600;
  //   this.minutes = Math.floor(timeTill / 60);
  //   this.seconds = Math.floor(timeTill % 60);
  // }

  // countDown(currentTime, countdownTime) {
  //   this.zone.runOutsideAngular(() => {
  //     const timer = TimerObservable.create(0, 1000);
  //     this.subscription = timer.subscribe(() => {
  //       this.currentTime += 1;
  //       if ((countdownTime - this.currentTime) <= 0) {
  //         if (this.isBeforeEvent) {
  //           this.zone.run(() => {
  //             this.bannerText = 'remains!';
  //             this.getTimeRemaining(this.currentTime, this.endTime);
  //           });
  //         } else {
  //           this.zone.run(() => {
  //             this.days = 0;
  //             this.hours = 0;
  //             this.minutes = 0;
  //             this.seconds = 0;
  //             this.bannerText = 'Hacking is over!';
  //           })
  //         }
  //       } else {
  //         this.zone.run(() => {
  //           this.getTimeRemaining(this.currentTime, countdownTime);
  //         });
  //       }
  //     });
  //   });
  // }

  // ngOnDestroy() {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }
}
