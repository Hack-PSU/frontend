import { take, switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpService } from '../HttpService/HttpService';
import { AngularFireDatabase } from '@angular/fire/database';
import { UpdateModel } from '../../models/update-model';

@Injectable()
export class LiveUpdatesService {

  constructor(private angularfireDB: AngularFireDatabase, private httpService: HttpService) {
  }

  getUpdates() {
    return this.httpService.getUpdatesReference()
      .pipe(
        take(1),
        switchMap((url) => {
          const URI = new URL(url);
          return this.angularfireDB.object(URI.pathname).valueChanges();
        }),
        map((updates) => {
          return Object.entries(updates)
            .map(([key, update]) => {
              return new UpdateModel(key, update.update_text, update.update_image, update.update_title, update.update_time);
            });
        }),
      );
  }
}
