import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { AuthGuard } from './AuthGuard';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterGuard } from './RegisterGuard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule],
  exports: [RouterModule],
  declarations: [],
  providers: [
    AuthGuard,
    RegisterGuard,
    AngularFireAuth,
  ],
})

export class AppRoutingModule {
}
