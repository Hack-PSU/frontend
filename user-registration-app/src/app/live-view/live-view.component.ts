import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
/*import { RegistrationModel } from '../registration-model';*/
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { animate, style, transition, trigger } from '@angular/animations';
/*import { AsYouType } from 'libphonenumber-js';*/

import * as data from '../../assets/schools.json';
import * as majors from '../../assets/majors.json';
import { HttpService } from '../HttpService';
import { Observable } from 'rxjs/Observable';
import { AppConstants } from '../AppConstants';

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.css'],
  providers: [HttpService],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'scale(0)', opacity: 0 }),
          animate('500ms', style({ transform: 'scale(1)', opacity: 1 })),
        ]),
        transition(':leave', [
          style({ transform: 'scale(1)', opacity: 1 }),
          animate('500ms', style({ transform: 'scale(0)', opacity: 0 })),
        ]),
      ],
    ),
  ],
})
export class LiveViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
