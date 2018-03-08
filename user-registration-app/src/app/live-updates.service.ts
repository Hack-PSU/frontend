import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { AppConstants } from './AppConstants';

@Injectable()
export class LiveUpdatesService {
  private url = AppConstants.API_BASE_URL + '/live/updates';
  private socket;

  constructor() { }

  getUpdates() {
    return new Observable((observer) => {
      this.socket = io(this.url, {
        path: '/v1/live',
      });
      this.socket.on('connection', () => {
        console.log('CONNECTED');
      });
      this.socket.on('update', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

}
