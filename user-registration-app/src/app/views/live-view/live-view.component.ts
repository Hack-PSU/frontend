import { Component, NgZone, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { CountdownService } from '../../services/CountdownService/countdown.service';
import { HttpService } from '../../services/HttpService/HttpService';
import { EventModel } from '../../models/event-model';

declare let $: any;

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
      this.workshops.forEach(workshop => {
        
      })
    });
  }

  particlesOptions = {
    fpsLimit: 24,
    particles: {
      number: {
        value: 160,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: '#ffffff',
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
    interactivity: {
      detectsOn: 'window',
      events: {
        onHover: {
          enable: true,
          mode: 'bubble',
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          lineLinked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 150,
          size: 0,
          duration: 2,
          opacity: 0,
          speed: 3,
        },
        push: {
          quanitity: 4,
        },
        remove: {
          quanitity: 2,
        },
      },
    },
    detectRetina: true,
  };
}
