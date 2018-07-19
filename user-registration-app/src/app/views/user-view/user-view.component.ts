import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../../AppConstants';
import { AuthService } from '../../services/AuthService/auth.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
})
export class UserViewComponent {

  constructor(public authService: AuthService, private _router: Router) {
  }


  logout() {
    this.authService.signOut()
      .then(() => this._router.navigate([AppConstants.LOGIN_ENDPOINT]))
      .catch(() => this._router.navigate([AppConstants.LOGIN_ENDPOINT]));
  }

}

