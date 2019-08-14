import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/HttpService/HttpService';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/AuthService/auth.service';
import { NgProgress } from '@ngx-progressbar/core';
import { Rsvp } from '../../models/rsvp';
import { AppConstants } from '../../AppConstants';
import { finalize } from 'rxjs/operators';
import { Registration } from "../../models/registration";

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
  public registrationData: Registration;

  constructor(public authService: AuthService,
              public router: Router,
              private httpService: HttpService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { registration: Registration }) => {
      const { registration } = data;
      this.registrationData = registration;
    });
    $(document).ready(() => {
      $('ul.tabs').tabs();
    });
  }

  // rsvp(status: boolean) {
  //   this.progress.start();
  //   this.httpService.submitRSVP(this.user, status)
  //     .pipe(finalize(() => this.progress.complete()))
  //     .subscribe(() => {
  //       this.rsvpDataObservable = this.httpService.getRsvpStatus();
  //       this.rsvpDataObservable.subscribe((value) => {
  //         this.rsvpData = value;
  //       },                                (error) => {
  //         this.errors = error;
  //       });
  //     },         (error) => {
  //       this.errors = error.message;
  //     });
  // }

  // getPin() {
  //   return parseInt(this.registrationData.pin, 10).toString(14).padStart(3, '0');
  // }

  rsvpReady() {
    return new Date().getTime() >= environment.rsvpStartTime.getTime();
  }
}
