import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterializeModule } from 'angular2-materialize';
import { NgProgress, NgProgressModule } from '@ngx-progressbar/core';
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
import { RsvpComponent } from './views/rsvp/rsvp.component';
import { HttpService } from './services/HttpService/HttpService';
import { AuthService } from './services/AuthService/auth.service';
import { AuthGuard } from './services/route-guards/auth-guard/auth.guard';
import { DateGuard } from './services/route-guards/date-guard/date.guard';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { LiveUpdateComponent } from './views/live-update/live-update.component';
import { ScheduleViewComponent } from './views/schedule-view/schedule-view.component';
import { AlertModule, AlertService } from 'ngx-alerts';
import { CustomErrorHandlerService } from './services/CustomErrorHandler/custom-error-handler.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserViewComponent,
    RegistrationFormComponent,
    SignupViewComponent,
    ForgotPasswordViewComponent,
    LiveViewComponent,
    TravelReimbursementViewComponent,
    TableAssignmentViewComponent,
    RsvpComponent,
    LiveUpdateComponent,
    ScheduleViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MaterializeModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    NgProgressRouterModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000 }),
    PdfViewerModule,
  ],
  providers: [
    HttpClient,
    HttpService,
    AuthService,
    AuthGuard,
    NgProgress,
    DateGuard,
    AlertService,
    CustomErrorHandlerService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
