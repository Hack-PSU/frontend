import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterializeModule } from 'angular2-materialize';
import { NgProgress, NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { AlertModule, AlertService } from 'ngx-alerts';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import {
  ForgotPasswordViewComponent,
  LiveUpdateComponent,
  LiveViewComponent,
  LoginComponent,
  RegistrationFormComponent,
  RsvpComponent,
  ScheduleViewComponent,
  SignupViewComponent,
  TableAssignmentViewComponent,
  TravelReimbursementViewComponent,
  UserViewComponent,
} from './views/views';
import { AuthService, CustomErrorHandlerService, HttpService } from './services/services';
import { AuthGuard, DateGuard } from './services/route-guards/guards';

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
    AngularFireDatabaseModule,
    MaterializeModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    NgProgressRouterModule,
    NgxPaginationModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000 }),
  ],
  providers: [
    HttpClient,
    HttpService,
    AuthService,
    AngularFireDatabase,
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
