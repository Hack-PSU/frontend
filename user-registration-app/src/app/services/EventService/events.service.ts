import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { AppConstants } from '../../AppConstants';

@Injectable()
export class EventsService {

  private url = `${AppConstants.SOCKET_BASE_URL}/events`;
  private socket;

  private broadcastSubject: BehaviorSubject<Event> = new BehaviorSubject<Event>(new Event(''));

  public next(event: Event): void {
    return this.broadcastSubject.next(event);
  }

  public subject(event: Event): Observable<Event> {
    return this.broadcastSubject.asObservable().filter(e => e.type === event.type);
  }

  constructor() { }

  getEvents(idtoken: string) {
    return new Observable((observer) => {
      this.socket = io(this.url, {
        path: '/v1/live',
        transportOptions: {
          polling: { extraHeaders: { idtoken } },
        },
      });
      this.socket.on('connect', () => {
        console.log('CONNECTED');
        this.next(new Event('connected'));
      });

      this.socket.on('disconnect', () => {
        console.log('DISCONNECTED');
        this.next(new Event('disconnected'));
      });
      this.socket.on('event', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

}
