import { Component, OnInit } from '@angular/core';
import { Registration, RegistrationApiResponse } from '../../models/registration';
import { ExtraCreditClass } from '../../models/extra-credit-class';
import { HttpService } from '../../services/HttpService/HttpService';
import { NgProgress } from 'ngx-progressbar';
import { ToastrService } from 'ngx-toastr';
import { RegistrationApiResponseV3 } from '../../models-v3/registration-v3';
import { Hackathon } from '../../models/hackathon';

@Component({
  selector: 'app-user-registration-view',
  templateUrl: './user-registration-view.component.html',
  styleUrls: ['./user-registration-view.component.css'],
})
export class UserRegistrationViewComponent implements OnInit {
  activeRegistration: RegistrationApiResponse;
  classes: ExtraCreditClass[];
  submittedClasses: Map<string, boolean>;
  regPropertyNameResolve: any;

  public keyVals(object: any) {
    return Object.entries(object);
  }

  constructor(
    private httpService: HttpService,
    private progressService: NgProgress,
    private toastrService: ToastrService,
  ) {
    this.activeRegistration = null;
    this.classes = [];
    this.submittedClasses = new Map();
    this.regPropertyNameResolve = {
      academic_year: 'Academic Year',
      country: 'Country',
      allergies: 'Allergies',
      coding_experience: 'Coding experience',
      dietary_restriction: 'Dietary Restrictions',
      eighteenBeforeEvent: 'Eighteen Years old',
      email: 'Email ID',
      expectations: 'Expectations from HackPSU',
      first_hackathon: 'First time attendee',
      firstname: 'First Name',
      gender: 'Gender',
      lastname: 'Last Name',
      major: 'Major',
      name: 'Hackathon Name',
      phone: 'Phone number',
      pin: 'Check-in Pin',
      project: 'Favorite project',
      race: 'Race',
      referral: 'Referral source',
      resume: 'Resume link',
      shirt_size: 'Shirt Size',
      travel_reimbursement: 'Need travel reimbursement?',
      uid: 'Uid',
      university: 'University',
      veteran: 'Veteran status',
    };
  }

  ngOnInit() {
    this.loadActiveRegistration();
    // this.loadAvailableExtraCreditClasses();
    // this.loadSubmittedExtraCreditClasses();
    // The error for registrations gets handled in user-profile-view
  }

  loadAvailableExtraCreditClasses() {
    this.httpService.getExtraCreditClasses().subscribe((classes) => {
      this.classes = classes;
    });
  }

  loadActiveRegistration() {
    this.httpService.getRegistrationStatusV3()
      .subscribe((reg: RegistrationApiResponseV3) => {
        if (!reg.registration) {
          // Error in here? idk how to handle that, though.
        }
        this.activeRegistration = new RegistrationApiResponse();
        this.activeRegistration.academic_year = reg.registration.academicYear;
        this.activeRegistration.active = true;
        this.activeRegistration.allergies = reg.allergies;
        this.activeRegistration.base_pin = "1";
        this.activeRegistration.coding_experience = reg.registration.codingExperience;
        this.activeRegistration.country = reg.country;
        this.activeRegistration.dietary_restriction = reg.dietaryRestriction;
        this.activeRegistration.driving = reg.registration.driving;
        this.activeRegistration.eighteenBeforeEvent = reg.registration.eighteenBeforeEvent;
        this.activeRegistration.email = reg.email;
        // this.activeRegistration.end_time = "Never gets used.";
        this.activeRegistration.expectations = reg.registration.expectations;
        this.activeRegistration.first_hackathon = reg.registration.firstHackathon;
        this.activeRegistration.firstname = reg.firstName;
        this.activeRegistration.gender = reg.gender;
        this.activeRegistration.lastname = reg.lastName;
        this.activeRegistration.major = reg.major;
        this.activeRegistration.mlh_coc = reg.registration.mlhCoc;
        this.activeRegistration.mlh_dcp = reg.registration.mlhDcp;
        this.activeRegistration.mlh_email = reg.registration.shareEmailMlh;
        // this.activeRegistration.name = "Duplicate of Hackathon properties.";
        this.activeRegistration.phone = reg.phone;
        this.activeRegistration.pinAi = 123;
        this.activeRegistration.project = reg.registration.project;
        this.activeRegistration.race = reg.race;
        this.activeRegistration.referral = reg.registration.referral;
        this.activeRegistration.resume = reg.resume;
        this.activeRegistration.share_email_mlh = reg.registration.shareEmailMlh;
        this.activeRegistration.shirt_size = reg.shirtSize;
        // this.activeRegistration.start_time = "Never gets used.";
        this.activeRegistration.submitted = true;
        this.activeRegistration.time = reg.registration.time;
        this.activeRegistration.travel_reimbursement = reg.registration.travelReimbursement;
        this.activeRegistration.uid = reg.uid;
        this.activeRegistration.university = reg.university;
        this.activeRegistration.veteran = reg.registration.veteran;
        // this.activeRegistration.word_pin = "no longer used.";

        this.activeRegistration.hackathon = new Hackathon(
          reg.registration.hackathonId,
          "shouldn't matter?",
          234234,
          234234,
          0,
          true,
        );
      });

    // this.httpService
    //   .getUserRegistrations()
    //   .subscribe((registrations: RegistrationApiResponse[]) => {
    //     if (registrations) {
    //       this.activeRegistration = registrations.filter(
    //         (registration) => registration.hackathon.active,
    //       )[0];
    //     }
    //   });
  }

  loadSubmittedExtraCreditClasses() {
    this.httpService.getRegistrationStatusV3().subscribe((registration) => {
      this.httpService.getExtraCreditClassesForUser(registration.uid).subscribe((classes) => {
        classes.forEach((c) => (this.submittedClasses[c.class_uid] = true));
      });
    });
  }

  async submitClasses() {
    this.progressService.ref().start();
    this.httpService.removeExtraCreditClasses(this.activeRegistration.uid).subscribe(() => {
      Object.entries(this.submittedClasses).forEach(([classUid, value]: [string, boolean]) => {
        if (value) {
          this.httpService.registerExtraCreditClass(classUid).subscribe(
            () => {
              this.progressService.ref().complete();
            },
            ({ error }) => {},
          );
        }
      });
    });
    // Very dirty fix.
    this.toastrService.success('You are now being tracked for these classes.');
  }

  parseInt(string: string, radix: number) {
    return parseInt(string, radix);
  }

  businessChallengeRegister() {
    this.progressService.ref().start();
    this.httpService
      .registerExtraCreditClass(
        this.classes.find((c) => c.class_name === 'Business Challenge').uid.toString(),
      )
      .subscribe(
        () => {
          this.progressService.ref().complete();
          this.toastrService.success('You are registered for the business challenge');
        },
        ({ error }) => {
          if (error.status === 409) {
            this.toastrService.success('You are registered for the business challenge');
          } else {
            this.toastrService.warning(
              'Something may have gone wrong in that process. Email technology@hackpsu.org or contact a member of staff to check',
            );
          }
        },
      );
  }

  getClassName(classUid: number): string {
    return this.classes.filter((ecClass) => ecClass.uid == classUid)[0].class_name;
  }
}
