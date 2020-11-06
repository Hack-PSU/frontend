import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/EventService/events.service';
import { CustomErrorHandlerService, HttpService } from "../../services/services";
import { EventModel } from "../../models/event-model";

@Component({
  selector: "app-schedule-view",
  templateUrl: "./schedule-view.component.html",
  styleUrls: ["./schedule-view.component.css"],
  providers: [EventsService],
})
export class ScheduleViewComponent implements OnInit {
  private static days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  public activities: EventModel[];
  public activitiesViewNum = 5;
  public meals: EventModel[];
  public mealsViewNum = 5;
  public workshops: EventModel[];
  public workshopsViewNum = 5;

  constructor(
    private httpService: HttpService,
    private errorHandler: CustomErrorHandlerService
  ) {
    this.activities = [];
    this.meals = [];
    this.workshops = [];
  }

  ngOnInit() {
    this.httpService.getEvents().subscribe(
      (events: EventModel[]) => {
        events
          .filter(
            (activity) => parseInt(activity.event_end_time, 10) >= Date.now()
          )
          .forEach((event) => {
            switch (event.event_type) {
              case "activity":
                this.activities = this.activities.concat(event);
                break;
              case "food":
                this.meals = this.meals.concat(event);
                break;
              case "workshop":
                this.workshops = this.workshops.concat(event);
                break;
              default:
                break;
            }
          });
      },
      (error) => {
        this.errorHandler.handleHttpError(error);
      }
    );
  }

  getStartTime(event: EventModel) {
    return new Date(parseInt(event.event_start_time, 10))
      .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      .replace(/^0(?:0:0?)?/, "");
  }

  showMore(type: string) {
    switch (type) {
      case "activities":
        return (this.activitiesViewNum = ScheduleViewComponent.increment(
          this.activitiesViewNum,
          this.activities.length
        ));
      case "meals":
        return (this.mealsViewNum = ScheduleViewComponent.increment(
          this.mealsViewNum,
          this.meals.length
        ));
      case "workshops":
        return (this.workshopsViewNum = ScheduleViewComponent.increment(
          this.workshopsViewNum,
          this.workshops.length
        ));
    }
  }

  private static increment(viewNum: number, arrLength: number) {
    const INCREMENTOR = 5;
    if (viewNum + INCREMENTOR > arrLength) {
      return arrLength;
    }
    return viewNum + INCREMENTOR;
  }

  getEndTime(event: EventModel) {
    return new Date(parseInt(event.event_end_time, 10))
      .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      .replace(/^0(?:0:0?)?/, "");
  }

  getEventDay(event: EventModel) {
    return ScheduleViewComponent.days[
      new Date(parseInt(event.event_start_time, 10)).getDay()
    ];
  }

  openZoomLink(link: string) {
    window.open(link, "_blank");
  }

  // Stole shamelessly from: https://stackoverflow.com/a/43467144
  isLink(linkString: string): boolean {
    let url;

    try {
      url = new URL(linkString);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }
}
