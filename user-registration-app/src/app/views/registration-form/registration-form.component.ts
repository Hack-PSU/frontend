import { mergeMap, take } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { AsYouType } from 'libphonenumber-js';
import { ToastrService } from 'ngx-toastr';
import * as Ajv from 'ajv';
import { default as schools } from '../../../assets/schools.json';
import { default as majors } from '../../../assets/majors.json';
import { default as referrals } from '../../../assets/referrals.json';
import { Registration } from '../../models/registration';
import * as registeredUserSchema from './registeredUserSchema.json';
import { AuthService, HttpService } from '../../services/services';
import { AppConstants } from '../../AppConstants';

const ajv = new Ajv({ allErrors: true });
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
  public univAutoCompleteInit = this.makeAutoCompleteSettings('university', schools);
  public majorAutoCompleteInit = this.makeAutoCompleteSettings('major', majors);
  public referralAutoCompleteInit = this.makeAutoCompleteSettings('referral', referrals);
  public registrationForm: Registration;
  public prettifiedPhone: string;
  public loading: boolean;
  public diet_restr: boolean;
  public otherDietRestr: boolean;
  @ViewChild('registrationModel') form: any;
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
      case '.academicYear':
        return 'Please tell us what year you are in college.';
      case '.major':
        return 'Please provide your major.';
      case '.eighteenBeforeEvent':
        return 'Please certify that you\'re eighteen before the day of the event.';
      case '.university':
        return 'Please tell us where you\'re attending school. Use the fancy dropdown!';
      case '.mlhcoc':
        return 'You gotta agree to the Code of Conduct. We can\'t all be hooligans y\'know';
      case '.mlhdcp':
        return 'You gotta agree to the MLH terms. It\'s legal stuff ya know.';
      default:
        return 'Are you sure you\'ve filled out all the required fields?';
    }
  }

  private consolidateEthnicities(): string {
    const possibleEthnicities = Object.keys(this.registrationForm.ethnicities);
    const selectedEthnicities = possibleEthnicities.filter(ethnicity => this.registrationForm.ethnicities[ethnicity]);
    return selectedEthnicities.join(', ');
  }

  private consolidateAddress() {
    return Object.values(this.registrationForm.addressFields).filter(field => field).join(', ');
  }

  private validate() {
    const result = this.validator(this.registrationForm);
    if (!result) {
      this.validator.errors.map(
        error => this.toastrService.warning(RegistrationFormComponent.getFormattedErrorText(error)),
      )
    }
    return result;
  }

  constructor(public router: Router,
              private route: ActivatedRoute,
              private httpService: HttpService,
              private toastrService: ToastrService,
              private authService: AuthService) {
    this.registrationForm = new Registration();
    RegistrationFormComponent.regFormComp = this;
    this.prettifiedPhone = '';
    this.asYouType = new AsYouType('US');
    this.validator = ajv.compile(registeredUserSchema.default);
  }

  ngOnInit() {
    this.route.data.subscribe(({ registration }) => {
      this.registrationForm = new Registration();

      // Data to keep
      this.registrationForm.firstName = registration.firstName;
      this.registrationForm.lastName = registration.lastName;
      this.registrationForm.ethnicity = registration.ethnicity;
      this.registrationForm.gender = registration.gender;
      this.registrationForm.allergies = registration.allergies;
      this.registrationForm.major = registration.major;
      this.registrationForm.university = registration.university;
      this.registrationForm.veteran = registration.veteran;
      this.registrationForm.shirtSize = registration.shirtSize;

      // Turn on prefilled ethnicity checkboxes
      if (this.registrationForm.ethnicity) {
        this.registrationForm.ethnicity.split(',').forEach((ethnicity) => {
          this.registrationForm.ethnicities[ethnicity.trim()] = true;
        });
      }

      setTimeout(() => {
        this.progress.ref().complete();
        Materialize.updateTextFields();
      },         750);
    });
  }

  makeAutoCompleteSettings(field: string, data: any) {
    return {
      data,
      limit: 5,
      onAutocomplete(val: any) {
        RegistrationFormComponent.getInstance().registrationForm[field] = val;
      },
      minLength: 1,
    };
  }

  parsePhone(val: string) {
    this.asYouType.reset();
    this.prettifiedPhone = this.asYouType.input(val);
    this.registrationForm.phone = this.asYouType.getNationalNumber();
  }

  submit() {
    this.registrationForm.ethnicity = this.consolidateEthnicities();
    this.registrationForm.address = this.consolidateAddress();
    this.progress.ref().start();
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
          .then(() => this.progress.ref().complete());
      });
  }

  fileAdded(event: any) {
    this.registrationForm.resume = event.target.files[0];
  }

  error() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
