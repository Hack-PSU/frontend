import {Component, NgZone, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {CountdownService} from '../../services/CountdownService/countdown.service';
import {HttpService} from '../../services/HttpService/HttpService';
import {EventV3Model} from '../../models/event-v3-model';
import {SponsorV3Model} from '../../models/sponsor-v3-model';

declare let $: any;

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.css'],
  providers: [CountdownService, HttpService],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({transform: 'scale(0)', opacity: 0}),
        animate('500ms', style({transform: 'scale(1)', opacity: 1})),
      ]),
      transition(':leave', [
        style({transform: 'scale(1)', opacity: 1}),
        animate('500ms', style({transform: 'scale(0)', opacity: 0})),
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

  activities: EventV3Model[];
  meals: EventV3Model[];
  workshops: EventV3Model[];
  activeWorkshops: EventV3Model[];
  sponsors: SponsorV3Model[];

  bannerText: string;

  particlesOptions = {
    fpsLimit: 24,
    particles: {
      number: {
        value: 100,
      },
      color: {
        value: '#ab6f26',
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000',
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: 'img/github.svg',
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 1,
        random: true,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        animation: {
          enable: false,
          speed: 4,
          minimumValue: 0.3,
          sync: false,
        },
      },
      lineLinked: {
        enable: false,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        straight: false,
        outMode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotate: {
            x: 600,
            y: 600,
          },
        },
      },
    },
    detectRetina: true,
  };

  constructor(
    private zone: NgZone,
    private countdownService: CountdownService,
    private httpService: HttpService,
  ) {
  }

  ngOnInit() {
    this.countdownService.startCountDown().subscribe(({duration, bannerText}) => {
      this.days = duration.days;
      this.hours = duration.hours;
      this.minutes = duration.minutes;
      this.seconds = duration.seconds;
      this.bannerText = bannerText;
    });
    this.httpService.getActiveHackathon().subscribe((hackathon) => {
      this.activities = hackathon.events.filter((e) => e.type === 'activity');
      this.meals = hackathon.events.filter((e) => e.type === 'food');
      this.workshops = hackathon.events.filter((e) => e.type === 'workshop');
      this.sponsors = hackathon.sponsors;
    });
  }
}
