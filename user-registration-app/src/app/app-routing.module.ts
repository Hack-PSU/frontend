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
import { AuthGuard, DateGuard } from './services/route-guards/guards';
import { RegistrationResolver } from './services/resolvers/RegistrationResolver/registration.resolver';
import { RsvpResolver } from './services/resolvers/RsvpResolver/rsvp.resolver';
import { RegistrationGuard } from './services/route-guards/registration-guard/registration-guard.guard';
import { TableAssignmentResolver } from "./services/resolvers/TableAssignmentResolver/table-assignment.resolver";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
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
  },
  {
    path: 'forgot',
    component: ForgotPasswordViewComponent
  },
  {
    path: 'live',
    component: LiveViewComponent,
    canActivate: [DateGuard],
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
    path: 'rsvp',
    component: RsvpComponent,
    canActivate: [AuthGuard, RegistrationGuard],
    resolve: { registration: RsvpResolver },
  },
  { path: '**',
    redirectTo: DateGuard.validateDate(new Date()) ? AppConstants.LIVE_ENDPOINT : AppConstants.REGISTER_ENDPOINT,
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
