
import { take, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { AppConstants } from '../../AppConstants';
import { HttpService } from '../HttpService/HttpService';
import { AngularFireDatabase } from 'angularfire2/database';
import { UpdateModel } from '../../models/UpdateModel';

@Injectable()
export class LiveUpdatesService {

  constructor(private angularfireDB: AngularFireDatabase, private httpService: HttpService) { }

  getUpdates() {
    this.httpService
    return this.httpService.getUpdatesReference()
      .pipe(
        take(1),
        switchMap((url) => {
          const URI = new URL(url);
          return this.angularfireDB.list<UpdateModel>(URI.pathname).valueChanges();
        })
      );
  }
}
