import { Component, NgZone, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { CountdownService } from '../../services/CountdownService/countdown.service';
import { HttpService } from '../../services/HttpService/HttpService';
import { EventModel } from '../../models/event-model';

declare let $: any;
declare let particlesJS: any;

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.css'],
  providers: [CountdownService, HttpService],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0)', opacity: 0 }),
        animate('500ms', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1 }),
        animate('500ms', style({ transform: 'scale(0)', opacity: 0 })),
      ]),
    ]),
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

  workshops: EventModel[];

  bannerText: string;

  constructor(
    private zone: NgZone,
    private countdownService: CountdownService,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    particlesJS.load('particles-js', 'assets/particles.json');

    $(document).ready(() => {
      $('.materialboxed').materialbox();
      $('.question').click(function () {
        $(this).siblings().slideToggle('0.3s', 'linear');
        $(this).toggleClass('open');
      });
      $('.icon-rotate').click(function () {
        $(this).toggleClass('right-rotate');
      });
    });
    this.countdownService.startCountDown().subscribe(({ duration, bannerText }) => {
      this.days = duration.days;
      this.hours = duration.hours;
      this.minutes = duration.minutes;
      this.seconds = duration.seconds;
      this.bannerText = bannerText;
    });
    this.httpService.getEvents().subscribe((eventsArr) => {
      this.workshops = eventsArr.filter(event => event.event_type === "workshop");
      console.log(this.workshops);
    });
  }
}
