import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterializeModule } from 'angular2-materialize';
import { NgProgress, NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import {
  ForgotPasswordViewComponent,
  LiveViewComponent,
  LiveWorkshopComponent,
  LoginComponent,
  RegistrationFormComponent,
  RsvpComponent,
  ScheduleViewComponent,
  SignupViewComponent,
  TableAssignmentViewComponent,
  TravelReimbursementViewComponent,
  UserProfileViewComponent,
  UserRegistrationViewComponent,
  UserViewComponent,
} from './views/views';
import { AuthService, CustomErrorHandlerService, HttpService } from './services/services';
import { AuthGuard, DateGuard, LiveWebsiteDateGuard } from './services/route-guards/guards';
import { TruncatePipe } from './services/pipes/truncate.pipe';

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
    LiveWorkshopComponent,
    TruncatePipe,
    ScheduleViewComponent,
    UserProfileViewComponent,
    UserRegistrationViewComponent,
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
    NgProgressModule,
    NgProgressHttpModule,
    NgProgressRouterModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    HttpClient,
    HttpService,
    AuthService,
    AngularFireDatabase,
    AuthGuard,
    DateGuard,
    LiveWebsiteDateGuard,
    ToastrService,
    CustomErrorHandlerService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
