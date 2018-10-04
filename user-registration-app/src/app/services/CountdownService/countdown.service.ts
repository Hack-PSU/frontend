import { Injectable, NgZone } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Duration } from "../../models/duration";
import { Observable, Subscriber } from "rxjs";
import { TimerObservable } from "rxjs-compat/observable/TimerObservable";
import "rxjs-compat/add/operator/map";

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  private readonly startTime: Date;
  private readonly endTime: Date;

  constructor(private zone: NgZone) {
    this.startTime = environment.timerStartTime;
    this.endTime = environment.hackathonEndTime;
  }

  public startCountDown(): Observable<{ duration: Duration, bannerText: string }> {
    return Observable.create((observer) => {
      let currentTime = new Date();
      let bannerText = '';
      let duration = new Duration(new Date(), new Date());
      observer.next({ duration, bannerText });
      this.zone.runOutsideAngular(() => {
        const timer = TimerObservable.create(0, 1000)
          .subscribe(() => {
            currentTime = new Date();
            if (currentTime < this.startTime) {
              bannerText = 'until HackPSU!';
              duration = new Duration(currentTime, this.startTime);
              this.zone.run(() => {
                observer.next({ duration, bannerText });
              })
              // this.isBeforeEvent = true;
            } else if (currentTime < this.endTime) {
              bannerText = 'remains!';
              duration = new Duration(currentTime, this.endTime);
              this.zone.run(() => {
                observer.next({ duration, bannerText });
              })
              // this.isBeforeEvent = false;
            } else {
              bannerText = 'Hacking is over!';
              duration = new Duration(currentTime, currentTime);
              this.zone.run(() => {
                observer.next({ duration, bannerText });
              });
              timer.unsubscribe();
            }
          });
      })
    });
  }
}
