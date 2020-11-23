
import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject ,  Observable } from 'rxjs';

@Injectable()
export class EventsService {

  private broadcastSubject: BehaviorSubject<Event> = new BehaviorSubject<Event>(new Event(''));

  public next(event: Event): void {
    return this.broadcastSubject.next(event);
  }

  public subject(event: Event): Observable<Event> {
    return this.broadcastSubject.asObservable().pipe(filter(e => e.type === event.type));
  }

  constructor() { }

  getEvents() {
    return new Observable(observer => observer.complete());
  }
}
