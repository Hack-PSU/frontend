import { Injectable } from '@angular/core'
import { environment } from '../../../../environments/environment'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { AppConstants } from '../../../AppConstants'
import { ToastrService } from 'ngx-toastr'

/**
 * Validates whether it is past the day that the live website should be visible
 */
@Injectable()
export class LiveWebsiteDateGuard implements CanActivate {
  constructor(private router: Router, private toastrService: ToastrService) {}

  static validateDate(date: Date = new Date()): boolean {
    return environment.liveWebsiteGuardTime.getTime() <= date.getTime()
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!LiveWebsiteDateGuard.validateDate(new Date())) {
      this.router.navigate([AppConstants.REGISTER_ENDPOINT])
      return false
    }
    return true
  }
}
