import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RegistrationModel } from '../registration-model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'scale(0)', opacity: 0}),
          animate('500ms', style({transform: 'scale(1)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'scale(1)', opacity: 1}),
          animate('500ms', style({transform: 'scale(0)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class RegistrationFormComponent implements OnInit {
  private static regFormComp: RegistrationFormComponent;

  public registrationForm: RegistrationModel;
  public user: firebase.User;
  public currentIdx: number;
  public valid: boolean;

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

  constructor(public afAuth: AngularFireAuth, public router: Router, public ref: ChangeDetectorRef) {
    this.registrationForm = new RegistrationModel();
    this.currentIdx = 1;
    RegistrationFormComponent.regFormComp = this;
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

  isEighteen(b: boolean) {
    this.registrationForm.eighteenBeforeEvent = b;
  }
}
