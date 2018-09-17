
import { take, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { AppConstants } from '../../AppConstants';
import { HttpService } from '../HttpService/HttpService';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class LiveUpdatesService {
  private url = `${AppConstants.API_BASE_URL}/live/updates/reference`;
  private socket;

  constructor(private angularfireDB: AngularFireDatabase, private httpService: HttpService) { }

  getUpdates() {
    this.httpService
    return this.httpService.getLiveUpdateDatabaseReference()
      .pipe(
        take(1),
        switchMap((url) => {
          const URI = new URL(url.reference);
          return this.angularfireDB.list(URI.pathname).valueChanges();
        })
      );
  }
}
