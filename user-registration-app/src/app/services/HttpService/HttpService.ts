import { from as observableFrom, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../../AppConstants';
import { Registration, RegistrationApiResponse } from '../../models/registration';
import { AuthService } from '../AuthService/auth.service';
import { Hackathon } from '../../models/hackathon';
import { NgProgress } from 'ngx-progressbar';
import { CustomErrorHandlerService } from '../CustomErrorHandler/custom-error-handler.service';
import { Rsvp } from '../../models/rsvp';
import { BaseHttpService } from '../BaseHttpService/BaseHttpService';
import { EventModel } from '../../models/event-model';
import { ProjectModel } from '../../models/project-model';
import { ExtraCreditClass } from '../../models/extra-credit-class';
import { UserExtraCreditApiResponse } from '../../models/user-extra-credit';
import { SponsorModel } from '../../models/sponsor';
import { RegistrationApiResponseV3, RegistrationV3 } from '../../models-v3/registration-v3';
import { HackathonV3 } from '../../models-v3/hackathon-v3';

@Injectable()
export class HttpService extends BaseHttpService {
  constructor(
    http: HttpClient,
    authService: AuthService,
    errorHandler: CustomErrorHandlerService,
    ngProgress: NgProgress,
  ) {
    super(http, authService, errorHandler, ngProgress);
  }

  // getUpdatesReference(): Observable<string> {
  //   const API_ENDPOINT = 'live/updates/reference';
  //   return this.get(API_ENDPOINT).pipe(map((object: any) => object.reference));
  // }

  // Gets the currently active registration
  getRegistrationStatus(): Observable<RegistrationApiResponse> {
    const API_ENDPOINT = 'users/register';
    return this.get(API_ENDPOINT, true, true, true).pipe(
      map((registrations: any[]) => registrations.find((registration) => registration.active)),
      map(RegistrationApiResponse.parseJSON),
    );
  }

  getRegistrationStatusV3(): Observable<RegistrationApiResponseV3> {
    const API_ENDPOINT = '/users/info/me';
    return this.getV3(API_ENDPOINT, true, true).pipe(map(RegistrationApiResponseV3.parseJSON));
  }

  getCurrentHackathon(): Observable<Hackathon> {
    const API_ENDPOINT = 'users/hackathon/active';
    return this.get(API_ENDPOINT).pipe(map(Hackathon.parseJSON));
  }

  getCurrentHackathonV3(): Observable<HackathonV3> {
    const API_ENDPOINT = '/hackathons/active/static';
    return this.getV3(API_ENDPOINT, false, false).pipe(map(HackathonV3.parseJSON));
  }

  submitUserV3(submitData: Registration, uid: string): Observable<Object> {
    const API_ENDPOINT = '/users';
    
    // Hackfix to retrofit this frontend to fit V3's API.
    // V3 needs to be refactored to avoid this separate user/registration route weirdness.
    const userV3: FormData = new FormData();
    userV3.append('id', uid);
    userV3.append('firstName', submitData.firstName);
    userV3.append('lastName', submitData.lastName);
    userV3.append('gender', submitData.gender);
    userV3.append('shirtSize', submitData.shirtSize);
    userV3.append('university', submitData.university);
    userV3.append('email', submitData.email);
    userV3.append('major', submitData.major);
    userV3.append('phone', submitData.phone);
    userV3.append('country', submitData.country)
    if (submitData.dietaryRestriction) {
      userV3.append('dietaryRestriction', submitData.dietaryRestriction);
    }
    if (submitData.allergies) {
      userV3.append('allergies', submitData.allergies);
    }
    if (submitData.ethnicity) {
      userV3.append('race', submitData.ethnicity);
    }
    if (submitData.resume) {
      if (submitData.hasExistingResume()) {
        userV3.append('resume', submitData.resume.href);
      } else {
        userV3.append('resume', submitData.resume, submitData.resume.name);
      }
    }

    return this.postV3(API_ENDPOINT, userV3);
  }

  submitRegistrationV3(submitData: Registration, uid: string) {
    const API_ENDPOINT = `/users/${uid}/register`
    let registrationV3 = {
      eighteenBeforeEvent: submitData.eighteenBeforeEvent,
      shareAddressSponsors: submitData.shareAddressSponsors,
      travelReimbursement: submitData.travelReimbursement,
      shareAddressMlh: submitData.shareAddressMlh,
      educationalInstitutionType: submitData.educationalInstitutionType,
      academicYear: submitData.academicYear,
      codingExperience: submitData.codingExperience,
      expectations: submitData.expectations,
      driving: submitData.driving,
      firstHackathon: submitData.firstHackathon,
      mlhCoc: submitData.mlhcoc,
      mlhDcp: submitData.mlhdcp,
      project: submitData.projectDesc,
      referral: submitData.referral,
      shareEmailMlh: submitData.shareEmailMlh,
      time: Date.now(),
      veteran: submitData.veteran,
    }

    return this.postV3(API_ENDPOINT, registrationV3);
  }

  submitRegistration(submitData: Registration, uid: string) {
    const API_ENDPOINT = `users/${uid}/register`;
    const formObject: FormData = new FormData();
    // formObject.append('uid', uid);
    for (const key in submitData) {
      if (
        Object.prototype.hasOwnProperty.call(submitData, key) && submitData[key] && key !== 'resume') {
        formObject.append(key, submitData[key]);
      }
    }
    if (submitData.resume) {
      if (submitData.hasExistingResume()) {
        formObject.append('resume', submitData.resume.href);
      } else {
        formObject.append('resume', submitData.resume, submitData.resume.name);
      }
    }
    return this.postV3(API_ENDPOINT, formObject);
  }

  submitRSVP(currentUser: any, status: boolean) {
    const API_ENDPOINT = 'users/rsvp';
    return observableFrom(currentUser.getIdToken(true)).pipe(
      switchMap((idToken: string) => {
        let headers = new HttpHeaders();
        headers = headers.set('idtoken', idToken);
        return this.http.post<Registration>(
          AppConstants.API_BASE_URL.concat(API_ENDPOINT),
          { status },
          { headers, reportProgress: true },
        );
      }),
    );
  }

  submitAddress(updatedRegistration: Object) {
    const API_ENDPOINT = 'admin/register/update';
    return this.post(API_ENDPOINT, { registration: updatedRegistration }, true);
  }

  getCategories() {
    const API_ENDPOINT = 'users/event/categories';
    return this.get(API_ENDPOINT);
  }

  submitTravelReimbursement(travelForm: any, uid) {
    const API_ENDPOINT = 'users/travelReimbursement';
    const formObject: FormData = new FormData();
    formObject.append('uid', uid);
    for (const key in travelForm) {
      if (
        Object.prototype.hasOwnProperty.call(travelForm, key) &&
        travelForm[key] !== null &&
        key !== 'receipt'
      ) {
        formObject.append(key, travelForm[key]);
      }
    }
    if (travelForm.receipt) {
      Array.from(travelForm.receipt).forEach((r: any) => formObject.append('receipt', r, r.name));
    }
    return this.post(API_ENDPOINT, formObject);
  }

  getRsvpStatus(): Observable<Rsvp> {
    const API_ENDPOINT = 'users/rsvp';
    return this.get(API_ENDPOINT).pipe(map(Rsvp.parseJSON));
  }

  getEvents() {
    const API_ENDPOINT = 'live/events';
    return this.get(API_ENDPOINT, false, false, true).pipe(map(EventModel.parseFromJSONArray));
  }

  getProjectDetails() {
    const API_ENDPOINT = 'users/project';
    return this.get(API_ENDPOINT, false, true).pipe(map(ProjectModel.parseFromJSON));
  }

  getExtraCreditClasses() {
    const API_ENDPOINT = 'users/extra-credit';
    const params = 'byhackathon=true'
    return this.get(API_ENDPOINT + '?' + params, false, true, true).pipe(
      map((classes: any[]) => classes.map((c) => ExtraCreditClass.parseJSON(c))),
    );
  }

  getExtraCreditClassesForUser(uid: string) {
    const API_ENDPOINT = 'users/extra-credit/assignment?type=user';
    return this.get(API_ENDPOINT, true, true, true, uid).pipe(
      map((classes: any[]) => classes.map((c) => UserExtraCreditApiResponse.parseJSON(c))),
    );
  }

  registerExtraCreditClass(c: string) {
    const API_ENDPOINT = 'users/extra-credit';
    return this.post(API_ENDPOINT, { classUid: c }, true);
  }

  removeExtraCreditClasses(uid: string) {
    const API_ENDPOINT = 'users/extra-credit/delete-user';
    return this.post(API_ENDPOINT, { userUid: uid }, true);
  }

  // Gets all the registrations associated with the user
  getUserRegistrations() {
    const API_ENDPOINT = 'users/register';
    return this.get<RegistrationApiResponse[]>(API_ENDPOINT, false, true, true).pipe(
      map((regs) => regs.map(RegistrationApiResponse.parseJSON)),
    );
  }

  getHackathons() {
    const API_ENDPOINT = 'admin/hackathon';
    return this.get<Hackathon[]>(API_ENDPOINT, false, true, true).pipe(
      map((hackathons) => hackathons.map((h) => Hackathon.parseJSON(h))),
    );
  }

  getSponsors() {
    const API_ENDPOINT = 'sponsorship/all';
    return this.get(API_ENDPOINT, false, false, true).pipe(map(SponsorModel.parseFromJSONArray));
  }
}
