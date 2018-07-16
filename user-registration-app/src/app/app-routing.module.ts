import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { AuthGuard } from './auth.guard';
import { AngularFireAuth } from 'angularfire2/auth';
import { SignupViewComponent } from './signup-view/signup-view.component';
import { ForgotPasswordViewComponent } from './forgot-password-view/forgot-password-view.component';
import { AppConstants } from './AppConstants';
import { LiveViewComponent } from './live-view/live-view.component';
import { TravelReimbursementViewComponent } from './travel-reimbursement-view/travel-reimbursement-view.component';
import { TableAssignmentViewComponent } from './table-assignment-view/table-assignment-view.component';
import { RsvpComponent } from './rsvp/rsvp.component';
import { DateGuard } from './date.guard';

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
  imports: [RouterModule.forRoot(routes), RouterModule],
  exports: [RouterModule],
  declarations: [],
  providers: [
    AngularFireAuth,
  ],
})

export class AppRoutingModule {
}
