import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventsService } from '../events.service';
import { AppConstants } from '../AppConstants';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

export class EventModel {
  public uid: string;
  public event_title: string;
  public event_type: string;
  public event_start_time: string;
  public event_end_time: string;
  public event_description: string;
  public location_name: string;
}


@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.css'],
  providers: [EventsService],
})
export class ScheduleViewComponent implements OnInit {

  private static days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  public activities: EventModel[];
  public meals: EventModel[];
  public workshops: EventModel[];
  public error: any;
  public progress: any;
  public loading: boolean;
  private idtoken: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private eventsService: EventsService, private _router: Router) {
    this.eventsService.subject(new Event('connected'))
      .subscribe(() => {
        this.activities = [];
        this.meals = [];
        this.workshops = [];
        this.error = null;
        this.progress = null;
      });
    this.eventsService.subject(new Event('disconnected'))
      .subscribe(() => {
        this.activities = [];
        this.meals = [];
        this.workshops = [];
        this.loading = true;
      });
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.idtoken = Observable.fromPromise(user.getIdToken(true));
        this.idtoken.subscribe((value) => {
          this.eventsService.getEvents(value).subscribe((events: EventModel[]) => {
            console.log(events);
            events.forEach((m) => {
              switch (m.event_type) {
                case 'activity':
                  this.activities.unshift(m);
                  break;
                case 'food':
                  this.meals.unshift(m);
                  break;
                case 'workshop':
                  this.workshops.unshift(m);
                  break;
                default:
                  break;
              }
            });

          });
        },                     (error) => {
          this.error = error;
        });
      } else {
        this._router.navigate([AppConstants.LOGIN_ENDPOINT]);
      }
    });
  }

  ngOnInit() {
  }

  getStartTime(event: EventModel) {
    return new Date(parseInt(event.event_start_time, 10))
      .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  getEndTimeMS(event: EventModel) {
    return parseInt(event.event_end_time, 10);
  }

  getCurrentTime() {
    return new Date().getTime();
  }
  getEndTime(event: EventModel) {
    return new Date(parseInt(event.event_end_time, 10))
      .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  getEventDay(event: EventModel) {
    return ScheduleViewComponent.days[new Date(parseInt(event.event_start_time, 10)).getDay()];
  }
}
