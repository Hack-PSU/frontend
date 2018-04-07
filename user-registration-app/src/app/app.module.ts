import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserViewComponent } from './user-view/user-view.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { SignupViewComponent } from './signup-view/signup-view.component';
import { ForgotPasswordViewComponent } from './forgot-password-view/forgot-password-view.component';
import { LiveUpdateComponent } from './live-update/live-update.component';
import { LiveViewComponent } from './live-view/live-view.component';
import { ScheduleViewComponent } from './schedule-view/schedule-view.component';
import { TravelReimbursementViewComponent } from './travel-reimbursement-view/travel-reimbursement-view.component';
import { TableAssignmentViewComponent } from './table-assignment-view/table-assignment-view.component';
import { RsvpComponent } from './rsvp/rsvp.component';
import { HttpService } from './HttpService';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserViewComponent,
    RegistrationFormComponent,
    SignupViewComponent,
    ForgotPasswordViewComponent,
    LiveUpdateComponent,
    LiveViewComponent,
    ScheduleViewComponent,
    TravelReimbursementViewComponent,
    TableAssignmentViewComponent,
    RsvpComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MaterializeModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
