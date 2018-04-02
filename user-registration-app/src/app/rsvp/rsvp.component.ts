import { Component, OnInit } from '@angular/core';
import { HttpService } from '../HttpService';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AppConstants } from '../AppConstants';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

declare var $: any;


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
  public rsvpData = null;

  constructor(public afAuth: AngularFireAuth, public router: Router, private httpService: HttpService) {
    this.loading = true;
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (!user) {
        this.router.navigate([AppConstants.LOGIN_ENDPOINT]);
      } else {
        this.user = user;
        this.rsvpDataObservable = this.httpService.getRsvpStatus(this.user);
        this.rsvpDataObservable.subscribe((value) => {
          console.log(value);
          this.rsvpData = value; // TODO: debug whether it works for someone who hasnt RSVPed
          this.loading = false;
        },                                (error) => {
          this.errors = error;
        });
      }
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
        this.rsvpDataObservable = this.httpService.getRsvpStatus(this.user);
        this.rsvpDataObservable.subscribe((value) => {
          console.log(value);
          this.rsvpData = value;
        },                                (error) => {
          this.errors = error;
        });
      },         (error) => {
        this.loading = false;
        this.errors = error.message;
      });
  }

  getPin() {
    return parseInt(this.rsvpData.pin, 10).toString(14).padStart(3, '0');
  }
}
