import {Component, Input} from '@angular/core';
import {CustomErrorHandlerService, HttpService} from '../../services/services';
import {EventV3Model} from '../../models/event-v3-model';

@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.css'],
})
export class ScheduleViewComponent {
  private static days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  @Input() activities: EventV3Model[];
  @Input() meals: EventV3Model[];
  @Input() workshops: EventV3Model[];

  // public activities: EventModel[];
  public activitiesViewNum = 5;
  // public meals: EventModel[];
  public mealsViewNum = 5;
  // public workshops: EventModel[];
  public workshopsViewNum = 5;

  constructor(private httpService: HttpService, private errorHandler: CustomErrorHandlerService) {
  }

  getStartTime(event: EventV3Model) {
    return new Date(event.startTime)
      .toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})
      .replace(/^0(?:0:0?)?/, '');
  }

  showMore(type: string) {
    switch (type) {
      case 'activities':
        return (this.activitiesViewNum = ScheduleViewComponent.increment(
          this.activitiesViewNum,
          this.activities.length,
        ));
      case 'meals':
        return (this.mealsViewNum = ScheduleViewComponent.increment(
          this.mealsViewNum,
          this.meals.length,
        ));
      case 'workshops':
        return (this.workshopsViewNum = ScheduleViewComponent.increment(
          this.workshopsViewNum,
          this.workshops.length,
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

  getEndTime(event: EventV3Model) {
    return new Date(event.endTime)
      .toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})
      .replace(/^0(?:0:0?)?/, '');
  }

  getEventDay(event: EventV3Model) {
    return ScheduleViewComponent.days[new Date(event.startTime).getDay()];
  }

  openZoomLink(link: string) {
    window.open(link, '_blank');
  }

  // Stole shamelessly from: https://stackoverflow.com/a/43467144
  isLink(linkString: string): boolean {
    let url: URL;

    try {
      url = new URL(linkString);
    } catch (_) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  isZoomLink(linkString: string): boolean {
    return linkString.includes('zoom') && this.isLink(linkString);
  }
}
