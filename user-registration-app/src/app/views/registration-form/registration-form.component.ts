import { Component, OnInit, ViewChild } from '@angular/core';
import { Registration } from '../../models/registration';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { animate, style, transition, trigger } from '@angular/animations';
import { AsYouType } from 'libphonenumber-js';
import * as data from '../../../assets/schools.json';
import * as majors from '../../../assets/majors.json';
import { HttpService } from '../../services/HttpService/HttpService';
import { Observable } from 'rxjs/Rx';
import { AppConstants } from '../../AppConstants';
import { AuthService } from '../../services/AuthService/auth.service';
import * as Ajv from 'ajv';
import * as registeredUserSchema from './registeredUserSchema.json';

const ajv = new Ajv({ allErrors: true });
declare var $: any;
declare var Materialize: any;

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  providers: [HttpService, AuthService],
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
export class RegistrationFormComponent implements OnInit {

  private static regFormComp: RegistrationFormComponent;
  private asYouType: AsYouType;
  public univAutoCompInit = [
    { data },
    { limit: 5 }, // The max amount of results that can be shown at once. Default: Infinity.
    {
      onAutocomplete(val) {
        this.registrationForm.university = val;
      },
    },
    { minLength: 1 },
  ];
  public majAutoCompInit = [
    { data: majors },
    { limit: 5 }, // The max amount of results that can be shown at once. Default: Infinity.
    {
      onAutocomplete(val) {
        this.registrationForm.major = val;
      },
    },
    { minLength: 1 },
  ];
  public referralAutoCompleteInit = [
    {
      data: {
        'Participated previously': null,
        'On-campus flyers': null,
        'Tech workshops': null,
        Facebook: null,
        Instagram: null,
        'Snapchat advertising': null,
        'Banners downtown': null,
        'HUB info booth': null,
        'Email from my college/major': null,
        'Heard from a professor': null,
        'Heard from a friend': null,
        'Branch campus': null,
      },
    },
    { limit: 5 }, // The max amount of results that can be shown at once. Default: Infinity.
    {
      onAutocomplete(val) {
        this.registrationForm.referral = val;
      },
    },
    { minLength: 1 },
  ];

  public registrationForm: Registration;
  public user: firebase.User;
  public currentIdx: number;
  public valid: boolean;
  public prettifiedPhone: string;
  public loading: boolean;
  public diet_restr: boolean;
  public otherDietRestr: boolean;
  public phoneNoUse;
  public errors: string;
  @ViewChild('registrationModel') form;
  private readonly validator: any;

  static getInstance() {
    return RegistrationFormComponent.regFormComp;
  }

  sanitizeUrl(resume_link: any) {
    if (!(resume_link instanceof URL)) {
      throw new Error('Must be a URL');
    }
    return resume_link.href;
  }

  validate() {
    const result = this.validator(this.registrationForm);
    if (!result) {
      this.errors = ajv.errorsText(this.validator.errors).replace(/,/g, '\n');
    }
    return result;
  }

  constructor(public router: Router,
              private httpService: HttpService,
              private authService: AuthService) {
    this.registrationForm = new Registration();
    this.currentIdx = 1;
    RegistrationFormComponent.regFormComp = this;
    this.prettifiedPhone = '';
    this.asYouType = new AsYouType('US');
    this.errors = null;
    this.validator = ajv.compile(registeredUserSchema);
  }

  ngOnInit() {
    this.user = this.authService.currentUser;
    if (!this.user) {
      this.router.navigate([AppConstants.LOGIN_ENDPOINT]);
    } else {
      this.progress.start();
      Observable.combineLatest(this.httpService.getRegistrationStatus(), this.httpService.getCurrentHackathon())
        .subscribe((data) => {
          const [registration, hackathon] = data;
          console.log(data);
          if (registration.isCurrentRegistration(hackathon.uid) && registration.submitted) {
            this.progress.done();
            this.router.navigate(['/rsvp']);
          } else if (!registration.isCurrentRegistration(hackathon.uid)) {
            this.registrationForm = registration;
            this.parsePhone(this.registrationForm.phone);
            setTimeout(() => {
              this.progress.done();
              Materialize.updateTextFields();
            },         500);
          }
        },         (error) => {
          this.progress.done();
          // Registration not found.
          this.registrationForm = new Registration();
        });
    }
  }

  parsePhone(val: any) {
    this.asYouType.reset();
    this.prettifiedPhone = this.asYouType.input(val);
    this.registrationForm.phone = this.asYouType.getNationalNumber();
  }

  submit() {
    this.progress.start();
    this.httpService.submitRegistration(this.registrationForm, this.authService.currentUser.uid)
      .subscribe((data) => {
        this.loading = false;
        this.router.navigate(['/rsvp']);
      },         (error) => {
        console.error(error);
        this.loading = false;
        this.errors = error.message;
      });
  }

  fileAdded(event) {
    this.registrationForm.resume = event.target.files[0];
  }

  error() {
    $('html, body').animate({
      scrollTop: 0,
    },                      1000);
  }

  dietaryRestriction(event) {
    if (event.target.value === 'other') {
      this.registrationForm.dietaryRestriction = '';
      this.otherDietRestr = true;
    } else {
      this.registrationForm.dietaryRestriction = event.target.value;
      this.otherDietRestr = false;
    }
  }

  get progress() {
    return this.httpService.ngProgress;
  }

  validateAndSubmit() {
    if (this.validate() && this.form.valid) {
      this.submit();
    } else {
      this.error();
    }
  }
}
