import { mergeMap, take } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { animate, style, transition, trigger } from '@angular/animations';
import { AsYouType } from 'libphonenumber-js';
import { AlertService } from 'ngx-alerts';
import * as Ajv from 'ajv';
import { default as data } from '../../../assets/schools.json';
import { default as majors } from '../../../assets/majors.json';
import { Registration } from '../../models/registration';
import * as registeredUserSchema from './registeredUserSchema.json';
import { AuthService, HttpService } from '../../services/services';
import { AppConstants } from "../../AppConstants";

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
  public univAutoCompInit = {
    data,
    limit: 5, // The max amount of results that can be shown at once. Default: Infinity.
      onAutocomplete(val) {
        this.registrationForm.university = val;
      },
    minLength: 1,
  };
  public majAutoCompInit = {
    data: majors,
    limit: 5, // The max amount of results that can be shown at once. Default: Infinity.
    onAutocomplete(val) {
      this.registrationForm.major = val;
    },
    minLength: 1,
  };
  public referralAutoCompleteInit = {
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
    limit: 5, // The max amount of results that can be shown at once. Default: Infinity.
      onAutocomplete(val) {
        this.registrationForm.referral = val;
      },
    minLength: 1,
  };

  public registrationForm: Registration;
  public user: firebase.User;
  public prettifiedPhone: string;
  public loading: boolean;
  public diet_restr: boolean;
  public otherDietRestr: boolean;
  public phoneNoUse;
  @ViewChild('registrationModel') form;
  private readonly validator: Ajv.ValidateFunction;

  static getInstance() {
    return RegistrationFormComponent.regFormComp;
  }

  static getFormattedErrorText(error: Ajv.ErrorObject) {
    switch (error.dataPath) {
      case '.firstName':
        return 'Please enter your first name. How will we address you otherwise?';
      case '.lastName':
        return 'Please enter your last name.';
      case '.phone':
        return 'MLH requires us to provide your phone number.';
      case '.gender':
        return 'Please tell us your gender. We think we\'ve covered all the options';
      case '.shirtSize':
        return 'Please provide a shirt size. Wouldn\'t wanna miss out on that :)';
      case '.travelReimbursement':
        return 'Are you travelling from far away? You may be eligible for reimbursement!';
      case '.firstHackathon':
        return 'Is this your first hackathon? Do let us know!';
      case '.email':
        return 'Please provide your email! We send very important details there closer to the event.';
      case '.academicYear':
        return 'Please tell us what year you are in college.';
      case '.major':
        return 'Please provide your major.';
      case '.eighteenBeforeEvent':
        return 'Please certify that you\'re eighteen before the day of the event.';
      case '.university':
        return 'Please tell us where you\'re attending school. Use the fancy dropdown!';
      case '.mlhcoc':
      case '.mlhdcp':
        return 'You gotta agree to the MLH terms. It\'s legal stuff ya know.';
      default:
        return 'Are you sure you\'ve filled out all the required fields?';
    }
  }

  sanitizeUrl(resume_link: any) {
    if (!(resume_link instanceof URL)) {
      throw new Error('Must be a URL');
    }
    return resume_link.href;
  }

  private validate() {
    const result = this.validator(this.registrationForm);
    if (!result) {
      this.validator.errors
        .map(error => this.showError(
          RegistrationFormComponent.getFormattedErrorText(error),
          2),
        );
    }
    return result;
  }

  constructor(public router: Router,
              private route: ActivatedRoute,
              private httpService: HttpService,
              private alertsService: AlertService,
              private authService: AuthService) {
    console.log(data);
    this.registrationForm = new Registration();
    RegistrationFormComponent.regFormComp = this;
    this.prettifiedPhone = '';
    this.asYouType = new AsYouType('US');
    this.validator = ajv.compile(registeredUserSchema);
  }

  ngOnInit() {
    this.route.data.subscribe(({ registration }) => {
      this.registrationForm = registration;
      this.registrationForm.firstHackathon = false;
      this.registrationForm.eighteenBeforeEvent = null;
      this.registrationForm.mlhcoc = null;
      this.registrationForm.mlhdcp = null;
      this.parsePhone(this.registrationForm.phone);
      this.phoneNoUse = this.prettifiedPhone;
      this.diet_restr = this.registrationForm.dietaryRestriction !== null;
      setTimeout(() => {
        this.progress.complete();
        Materialize.updateTextFields();
      },         750);
    });
  }

  parsePhone(val: any) {
    this.asYouType.reset();
    this.prettifiedPhone = this.asYouType.input(val);
    this.registrationForm.phone = this.asYouType.getNationalNumber();
  }

  submit() {
    this.progress.start();
    this.authService.currentUser
      .pipe(
        mergeMap((user) => {
          this.registrationForm.email = user.email;
          return this.httpService.submitRegistration(this.registrationForm, user.uid);
        }),
        take(1),
      )
      .subscribe(() => {
        this.router.navigate([AppConstants.PIN_ENDPOINT])
          .then(() => this.progress.complete());
      });
  }

  private showError(message: string, level: number) {
    switch (level) {
      case 0:
        this.alertsService.success(message);
        break;
      case 1:
        this.alertsService.info(message);
        break;
      case 2:
        this.alertsService.warning(message);
        break;
      case 3:
        this.alertsService.danger(message);
        break;
      default:
        this.alertsService.warning(message);
    }
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
