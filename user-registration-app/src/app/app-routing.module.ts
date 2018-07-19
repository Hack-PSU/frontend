import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegistrationFormComponent } from './views/registration-form/registration-form.component';
import { AuthGuard } from './services/route-guards/auth-guard/auth.guard';
import { AngularFireAuth } from 'angularfire2/auth';
import { SignupViewComponent } from './views/signup-view/signup-view.component';
import { ForgotPasswordViewComponent } from './views/forgot-password-view/forgot-password-view.component';
import { AppConstants } from './AppConstants';
import { LiveViewComponent } from './views/live-view/live-view.component';
import { TravelReimbursementViewComponent } from './views/travel-reimbursement-view/travel-reimbursement-view.component';
import { TableAssignmentViewComponent } from './views/table-assignment-view/table-assignment-view.component';
import { RsvpComponent } from './views/rsvp/rsvp.component';
import { DateGuard } from './services/route-guards/date-guard/date.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationFormComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupViewComponent },
  { path: 'forgot', component: ForgotPasswordViewComponent },
  { path: 'live', component: LiveViewComponent, canActivate: [AuthGuard, DateGuard] },
  { path: 'travel', component: TravelReimbursementViewComponent, canActivate: [AuthGuard, DateGuard] },
  { path: 'table', component: TableAssignmentViewComponent, canActivate: [AuthGuard, DateGuard] },
  { path: 'rsvp', component: RsvpComponent, canActivate: [AuthGuard, DateGuard] },
  { path: '**', redirectTo: AppConstants.REGISTER_ENDPOINT },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' }), RouterModule],
  exports: [RouterModule],
  declarations: [],
  providers: [
    AngularFireAuth,
  ],
})

export class AppRoutingModule {
}
