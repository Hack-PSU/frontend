import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserXhr, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterializeModule } from 'angular2-materialize';
import { NgProgress, NgProgressBrowserXhr, NgProgressModule } from 'ngx-progressbar';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { UserViewComponent } from './views/user-view/user-view.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { RegistrationFormComponent } from './views/registration-form/registration-form.component';
import { SignupViewComponent } from './views/signup-view/signup-view.component';
import { ForgotPasswordViewComponent } from './views/forgot-password-view/forgot-password-view.component';
// import { LiveUpdateComponent } from './live-update/live-update.component';
import { LiveViewComponent } from './views/live-view/live-view.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
// import { ScheduleViewComponent } from './schedule-view/schedule-view.component';
import { TravelReimbursementViewComponent } from './views/travel-reimbursement-view/travel-reimbursement-view.component';
import { TableAssignmentViewComponent } from './views/table-assignment-view/table-assignment-view.component';
import { RsvpComponent } from './rsvp/rsvp.component';
import { HttpService } from './services/HttpService/HttpService';
import { AuthService } from './services/AuthService/auth.service';
import { AuthGuard } from './services/route-guards/auth-guard/auth.guard';
import { DateGuard } from './services/route-guards/date-guard/date.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserViewComponent,
    RegistrationFormComponent,
    SignupViewComponent,
    ForgotPasswordViewComponent,
    // LiveUpdateComponent,
    LiveViewComponent,
    // ScheduleViewComponent,
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
    NgProgressModule,
    PdfViewerModule,
  ],
  providers: [
    HttpService,
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr },
    AuthService,
    AuthGuard,
    NgProgress,
    DateGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
