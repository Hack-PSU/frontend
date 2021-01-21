import { Component } from '@angular/core'
import { Router } from '@angular/router'
import app from 'firebase/app'
import { AppConstants } from '../../AppConstants'
import { AuthService } from '../../services/AuthService/auth.service'

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
})
export class UserViewComponent {
  private static readonly DEFAULT_PROFILE_URL: string = '../../assets/icons/user.png'

  constructor(public authService: AuthService, private _router: Router) {}

  logout() {
    this.authService
      .signOut()
      .then(() => this._router.navigate([AppConstants.LOGIN_ENDPOINT]))
      .catch(() => this._router.navigate([AppConstants.LOGIN_ENDPOINT]))
  }

  public getUserPhotoUrl(user: app.User | null) {
    if (user.photoURL) {
      return user.photoURL
    }
    return UserViewComponent.DEFAULT_PROFILE_URL
  }
}
