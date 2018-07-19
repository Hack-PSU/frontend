import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AppConstants } from '../../AppConstants';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {

  constructor(public afAuth: AngularFireAuth, private _router: Router) {
  }


  logout() {
    this.afAuth.auth.signOut()
      .then(() => this._router.navigate([AppConstants.LOGIN_ENDPOINT]))
      .catch(() => this._router.navigate([AppConstants.LOGIN_ENDPOINT]));
  }

}

