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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationFormComponent },
  { path: 'signup', component: SignupViewComponent },
  { path: 'forgot', component: ForgotPasswordViewComponent },
  { path: 'live', component: LiveViewComponent },
  { path: '**', redirectTo: AppConstants.REGISTER_ENDPOINT },
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
