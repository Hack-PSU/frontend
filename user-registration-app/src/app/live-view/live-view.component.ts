import { Component, OnInit} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { HttpService } from '../HttpService';

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
export class LiveViewComponent implements OnInit {
  currentTime: number;
  startTime: number;
  endTime: number;
  isBeforeEvent: boolean;

  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  bannerText: string;

  constructor() {
    this.currentTime = new Date().getTime() / 1000;
    this.startTime = new Date('April 7, 2018 14:00:00').getTime() / 1000;
    this.endTime =   new Date('April 8, 2018 14:00:00').getTime() / 1000;
  }

  ngOnInit() {
    $(document).ready(() => {
      $('.materialboxed').materialbox();
    });
    if (this.currentTime < this.startTime) {
      this.bannerText = 'until HackPSU!';
      this.getTimeRemaining(this.currentTime, this.startTime);
      this.isBeforeEvent = true;
    } else if (this.currentTime < this.endTime) {
      this.bannerText = 'remains!';
      this.getTimeRemaining(this.currentTime, this.endTime);
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
    this.countDown(currentTime, countdownTime);
  }
  countDown(currentTime, countdownTime) {
    setTimeout(() => {
      currentTime += 1;
      if ((countdownTime - currentTime) <= 0) {
        if (this.isBeforeEvent) {
          this.bannerText = 'remains!';
          this.getTimeRemaining(currentTime, this.endTime);
        } else {
          this.days = 0;
          this.hours = 0;
          this.minutes = 0;
          this.seconds = 0;
          this.bannerText = 'Hacking is over!';
        }
      } else {
        this.getTimeRemaining(currentTime, countdownTime);
      }
    },         1000);
  }

}

//const second = 1000,
      //minute = second * 60,
      //hour = minute * 60,

//let countDown = new Date('Apr 08, 2018 12:00:00').getTime(),
    //x = setInterval(function() {

      //let now = new Date().getTime(),
          //distance = countDown - now;

        //document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
        //document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
        //document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

    //}, second)
