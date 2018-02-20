import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RegistrationModel } from '../registration-model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { animate, style, transition, trigger } from '@angular/animations';
import { AsYouType } from 'libphonenumber-js';

import * as data from '../../assets/schools.json';
import * as majors from '../../assets/majors.json';
import { HttpService } from '../HttpService';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
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
    { majors },
    { limit: 5 }, // The max amount of results that can be shown at once. Default: Infinity.
    {
      onAutocomplete(val) {
        this.registrationForm.major = val;
      },
    },
    { minLength: 1 },
  ];

  public registrationForm: RegistrationModel;
  public user: firebase.User;
  public currentIdx: number;
  public valid: boolean;
  public prettifiedPhone: string;
  public loading: boolean;

  public universityList: any;

  static afterMove(index) {
    RegistrationFormComponent.regFormComp.currentIdx = index;
    RegistrationFormComponent.regFormComp.ref.detectChanges();
  }

  static subIdx() {
    RegistrationFormComponent.regFormComp.currentIdx -= 1;
    RegistrationFormComponent.regFormComp.ref.detectChanges();
  }

  static addIdx() {
    RegistrationFormComponent.regFormComp.currentIdx += 1;
    RegistrationFormComponent.regFormComp.ref.detectChanges();
  }

  static getInstance() {
    return RegistrationFormComponent.regFormComp;
  }

  constructor(public afAuth: AngularFireAuth, public router: Router, public ref: ChangeDetectorRef, private httpService: HttpService) {
    this.registrationForm = new RegistrationModel();
    this.currentIdx = 1;
    RegistrationFormComponent.regFormComp = this;
    this.prettifiedPhone = '';
    this.asYouType = new AsYouType('US');
  }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.user = user;
        this.registrationForm.firstName = user.displayName.split(' ')[0];
        this.registrationForm.lastName = user.displayName.split(' ')[1];
        this.registrationForm.email = user.email;
      }
    },                                  (error) => {
      console.error(error);
      this.afAuth.auth.signOut();
      this.router.navigate(['/login']);
    });
  }

  parsePhone(val: any) {
    this.asYouType.reset();
    this.prettifiedPhone = this.asYouType.input(val);
    this.registrationForm.phone = this.asYouType.getNationalNumber();
  }

  mlhAgreement(b: boolean) {
    this.registrationForm.mlhdcp = this.registrationForm.mlhcoc;
  }

  onSubmit() {
    console.log(this.registrationForm);
    this.loading = true;
    this.httpService.submitRegistration(this.registrationForm, this.afAuth.auth.currentUser.uid)
      .subscribe((data) => {
        console.log(data);
        this.loading = false;
      },         (error) => {
        console.error(error);
      });
  }

  fileAdded(event) {
    console.log(event);
    this.registrationForm.resume = event.target.files[0];
  }
}
