import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RegistrationModel } from '../registration-model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  private static regFormComp: RegistrationFormComponent;

  public registrationForm: RegistrationModel;
  public user: firebase.User;

  public currentIdx: number;

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
}
