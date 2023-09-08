import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/HttpService/HttpService';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/AuthService/auth.service';
import { RegistrationApiResponseV3 } from '../../models-v3/registration-v3';

declare let $: any;

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css'],
})
export class RsvpComponent implements OnInit {
  public loading = false;
  public user: User;
  public errors = null;
  public rsvpDataObservable: Observable<any>;
  public registrationData: RegistrationApiResponseV3;

  constructor(
    public authService: AuthService,
    public router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { registration: RegistrationApiResponseV3 }) => {
      const { registration } = data;
      this.registrationData = registration;
    });
    $(document).ready(() => {
      $('ul.tabs').tabs();
    });
  }

  rsvpReady() {
    return new Date().getTime() >= environment.rsvpStartTime.getTime();
  }
}
