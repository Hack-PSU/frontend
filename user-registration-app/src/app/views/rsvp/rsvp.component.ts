import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/HttpService/HttpService';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AppConstants } from '../../AppConstants';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/AuthService/auth.service';
import { mergeMap, take } from 'rxjs/operators';
import { NgProgress } from '@ngx-progressbar/core';

declare var $: any;

class RsvpData {
  pin: string;
  rsvp_time: string;
  idRSVP: string;
  user_id: string;
  rsvp_status: boolean;

  constructor() {
    this.pin = null;
    this.rsvp_status = false;
    this.idRSVP = null;
    this.user_id = null;
    this.rsvp_time = null;
  }
}


@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css'],
})
export class RsvpComponent implements OnInit {

  public loading = false;
  public user: firebase.User;
  public errors = null;
  public rsvpDataObservable: Observable<any>;
  public rsvpData: RsvpData;

  constructor(public authService: AuthService,
              public router: Router,
              private httpService: HttpService,
              private progress: NgProgress) {
    this.rsvpData = new RsvpData();
    this.loading = true;
    this.authService.currentUser.pipe(
      take(1),
      mergeMap((user) => {
        if (!user) {
          this.router.navigate([AppConstants.LOGIN_ENDPOINT]);
        } else {
          this.user = user;
          this.progress.start();
          return this.httpService.getRsvpStatus();
        }
      }))
      .subscribe((value) => {
        this.rsvpData = Object.assign(this.rsvpData, value);
        console.log(this.rsvpData);
        this.loading = false;
      }, (error) => {
        this.errors = error;
      });
  }

  ngOnInit() {
    $(document).ready(() => {
      $('ul.tabs').tabs();
    });
  }

  rsvp(status: boolean) {
    this.loading = true;
    this.httpService.submitRSVP(this.user, status)
      .subscribe((data) => {
        this.loading = false;
        this.rsvpDataObservable = this.httpService.getRsvpStatus();
        this.rsvpDataObservable.subscribe((value) => {
          console.log(value);
          this.rsvpData = value;
        }, (error) => {
          this.errors = error;
        });
      }, (error) => {
        this.loading = false;
        this.errors = error.message;
      });
  }

  getPin() {
    return parseInt(this.rsvpData.pin, 10).toString(14).padStart(3, '0');
  }

  rsvpReady() {
    return new Date().getTime() >= environment.rsvpStartTime.getTime();
  }
}
