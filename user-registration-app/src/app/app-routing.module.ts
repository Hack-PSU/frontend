import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppConstants } from './AppConstants';
import {
  ForgotPasswordViewComponent,
  LiveViewComponent,
  LoginComponent,
  RegistrationFormComponent,
  RsvpComponent,
  SignupViewComponent,
  TableAssignmentViewComponent,
  TravelReimbursementViewComponent,
} from './views/views';
import { AuthGuard, DateGuard, LiveWebsiteDateGuard } from './services/route-guards/guards';
import { RegistrationResolver } from './services/resolvers/RegistrationResolver/registration.resolver';
import { RsvpResolver } from './services/resolvers/RsvpResolver/rsvp.resolver';
import { RegistrationGuard } from './services/route-guards/registration-guard/registration-guard.guard';
import { TableAssignmentResolver } from "./services/resolvers/TableAssignmentResolver/table-assignment.resolver";
import { environment } from "../environments/environment";
import { UserProfileViewComponent } from "./views/user-profile-view/user-profile-view.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'LoginPage' },
  },
  {
    path: 'register',
    component: RegistrationFormComponent,
    canActivate: [AuthGuard],
    resolve: { registration: RegistrationResolver },
  },
  {
    path: 'signup',
    component: SignupViewComponent,
    data: { animation: 'SignupPage' },
  },
  {
    path: 'forgot',
    component: ForgotPasswordViewComponent
  },
  {
    path: 'live',
    component: LiveViewComponent,
    canActivate: [LiveWebsiteDateGuard],
  },
  {
    path: 'travel',
    component: TravelReimbursementViewComponent,
    canActivate: [AuthGuard, DateGuard, RegistrationGuard],
  },
  {
    path: 'table',
    component: TableAssignmentViewComponent,
    canActivate: [AuthGuard, DateGuard, RegistrationGuard],
    resolve: { tableAssignment: TableAssignmentResolver },
  },
  {
    path: 'pin',
    component: RsvpComponent,
    canActivate: [AuthGuard, RegistrationGuard],
    resolve: { registration: RsvpResolver },
  },
  {
    path: 'profile',
    component: UserProfileViewComponent,
    canActivate: [AuthGuard],
  },
  { path: '**',
    redirectTo: LiveWebsiteDateGuard.validateDate() ? AppConstants.LIVE_ENDPOINT : AppConstants.REGISTER_ENDPOINT,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' }), RouterModule],
  exports: [RouterModule],
  declarations: [],
  providers: [
    AngularFireAuth,
    RegistrationResolver,
    TableAssignmentResolver,
    RsvpResolver,
  ],
})

export class AppRoutingModule {
}
