import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-view',
  templateUrl: './signup-view.component.html',
  styleUrls: ['./signup-view.component.css'],
})
export class SignupViewComponent implements OnInit {

  public email: string;
  public password: string;
  public errors: any;
  public loading: boolean;
  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.loading = false;
    this.errors = null;
  }

  ngOnInit() {
  }

  signUp() {
    this.loading = true;
    if (this.email && this.email !== '' && this.password && this.password !== '') {
      this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.router.navigate(['/register']);
        }).catch((error) => {
          this.errors = error;
        this.loading = false;
      });
    } else {
      this.errors = new Error('Enter username and password');
      this.loading = false;
    }
  }
}
