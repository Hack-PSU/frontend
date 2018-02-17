import { Component, OnInit } from '@angular/core';
import { RegistrationModel } from '../registration-model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { PrevIdx } from '../PrevIdx';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {

  public registrationForm: RegistrationModel;
  public user: firebase.User;
  public prevIdx: PrevIdx;

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.registrationForm = new RegistrationModel();
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
