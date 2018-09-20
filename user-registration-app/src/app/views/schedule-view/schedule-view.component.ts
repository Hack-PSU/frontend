import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/EventService/events.service';
import { CustomErrorHandlerService, HttpService } from "../../services/services";
import { EventModel } from "../../models/event-model";

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

  constructor(private httpService: HttpService, private errorHandler: CustomErrorHandlerService) {
    this.activities = [];
    this.meals = [];
    this.workshops = [];
  }

  ngOnInit() {
    this.httpService.getEvents()
      .subscribe((events: EventModel[]) => {
        events
          .filter(activity => parseInt(activity.event_end_time, 10) >= Date.now())
          .forEach((event) => {
            switch (event.event_type) {
              case 'activity':
                this.activities.push(event);
                break;
              case 'food':
                this.meals.push(event);
                break;
              case 'workshop':
                this.workshops.push(event);
                break;
              default:
                break;
            }
          });
      }, (error) => {
        this.errorHandler.handleHttpError(error);
      });
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
