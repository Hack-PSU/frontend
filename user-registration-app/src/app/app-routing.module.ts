import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { AuthGuard } from './AuthGuard';
import { AngularFireAuth } from 'angularfire2/auth';
import { SignupViewComponent } from './signup-view/signup-view.component';
import { ForgotPasswordViewComponent } from './forgot-password-view/forgot-password-view.component';
import { AppConstants } from './AppConstants';
import { LiveUpdateComponent } from './live-update/live-update.component';
import { LiveViewComponent } from './live-view/live-view.component';
import { TravelReimbursementViewComponent } from './travel-reimbursement-view/travel-reimbursement-view.component';
import { TableAssignmentViewComponent } from './table-assignment-view/table-assignment-view.component';
import { RsvpComponent } from './rsvp/rsvp.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationFormComponent },
  { path: 'signup', component: SignupViewComponent },
  { path: 'forgot', component: ForgotPasswordViewComponent },
  { path: 'live', component: LiveViewComponent },
  { path: 'travel', component: TravelReimbursementViewComponent },
  { path: 'table', component: TableAssignmentViewComponent },
  { path: 'rsvp', component: RsvpComponent },
  { path: '**', redirectTo: AppConstants.LIVE_ENDPOINT },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule],
  exports: [RouterModule],
  declarations: [],
  providers: [
    AuthGuard,
    AngularFireAuth,
  ],
})

export class AppRoutingModule {
}
