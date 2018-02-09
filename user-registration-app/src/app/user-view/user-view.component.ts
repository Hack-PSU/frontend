import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {

  constructor(public afAuth: AngularFireAuth) {
  }


  logout() {
    this.afAuth.auth.signOut();
  }

}

