import { Component, OnInit } from '@angular/core';
import { Registration, RegistrationApiResponse } from '../../models/registration';
import { ExtraCreditClass } from '../../models/extra-credit-class';
import { HttpService } from '../../services/HttpService/HttpService';
import { NgProgress } from 'ngx-progressbar';
import { ToastrService } from 'ngx-toastr';

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
  willUpdateAddressFields: boolean;
  updatedAddressFields: any;
  shareAddressMlh: boolean;
  shareAddressSponsors: boolean;

  public keyVals(object: any) {
    return Object.entries(object);
  }

  constructor(
    private httpService: HttpService,
    private progressService: NgProgress,
    private toastrService: ToastrService
  ) {
    this.activeRegistration = null;
    this.classes = [];
    this.submittedClasses = new Map();
    this.updatedAddressFields = {
      addressLine1: '',
      addressLine2: '',
      city: '',
      stateProvince: '',
      zipcode: '',
      country: '',
    };
    this.shareAddressMlh = false;
    this.shareAddressSponsors = false;
    this.willUpdateAddressFields = false;
    this.regPropertyNameResolve = {
      academic_year: 'Academic Year',
      address: 'Address',
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
    this.loadAvailableExtraCreditClasses();
    this.loadSubmittedExtraCreditClasses();
    // The error for registrations gets handled in user-profile-view
  }

  loadAvailableExtraCreditClasses() {
    this.httpService.getExtraCreditClasses().subscribe((classes) => {
      this.classes = classes;
    });
  }

  loadActiveRegistration() {
    this.httpService
      .getUserRegistrations()
      .subscribe((registrations: RegistrationApiResponse[]) => {
        if (registrations) {
          this.activeRegistration = registrations.filter(
            (registration) => registration.hackathon.active
          )[0];
        }
      });
  }

  loadSubmittedExtraCreditClasses() {
    this.httpService.getRegistrationStatus().subscribe((registration) => {
      this.httpService.getExtraCreditClassesForUser(registration.uid).subscribe((classes) => {
        classes.forEach((c) => (this.submittedClasses[c.class_uid] = true));
      });
    });
  }

  editAddressToggle() {
    this.willUpdateAddressFields = !this.willUpdateAddressFields;
  }

  getAddress(): string {
    if (this.activeRegistration && this.activeRegistration.address) {
      return this.activeRegistration.address;
    }
    return 'No address on file. Please add your address if you would like to receive some swag!';
  }

  private consolidateAddress() {
    return Object.values(this.updatedAddressFields)
      .filter((field) => field)
      .join(', ');
  }

  submitAddress() {
    this.progressService.ref().start();
    const reg = Registration.parseFromApiResponse(this.activeRegistration);
    reg.address = this.consolidateAddress();
    reg.shareAddressMlh = this.shareAddressMlh;
    reg.shareAddressSponsors = this.shareAddressSponsors;

    this.httpService.submitAddress(reg).subscribe(
      () => {
        this.progressService.ref().complete();
        this.toastrService.success(
          'Your address has been updated. Please navigate away from the page to refresh this view.'
        );
      },
      ({ error }) => {
        this.toastrService.warning(
          'Something may have gone wrong in that process. Contact a member of staff to check'
        );
      }
    );
  }

  async submitClasses() {
    this.progressService.ref().start();
    this.httpService.removeExtraCreditClasses(this.activeRegistration.uid).subscribe(() => {
      Object.entries(this.submittedClasses).forEach(([classUid, value]: [string, boolean]) => {
        if (value) {
          this.httpService.registerExtraCreditClass(classUid).subscribe(
            () => {
              this.progressService.ref().complete();
              this.toastrService.success(
                `You are now getting tracked for ${this.getClassName(parseInt(classUid))}`
              );
            },
            ({ error }) => {
              this.toastrService.warning(
                'Something may have gone wrong in that process. Contact a member of staff to check'
              );
            }
          );
        }
      });
    });
  }

  parseInt(string: string, radix: number) {
    return parseInt(string, radix);
  }

  businessChallengeRegister() {
    this.progressService.ref().start();
    this.httpService
      .registerExtraCreditClass(
        this.classes.find((c) => c.class_name === 'Business Challenge').uid.toString()
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
              'Something may have gone wrong in that process. Email technology@hackpsu.org or contact a member of staff to check'
            );
          }
        }
      );
  }

  showClassName(class_name: string): boolean {
    // We don't remove classes from the DB, we just filter them here.
    const shownClassNames = [
      // 'CYBER 100',
      // 'SRA 111',
      // 'IST 220',
      // 'SRA 231',
      // 'SRA 111 (World Campus)',
      // 'CMPSC 445',
      // 'IST 110',
      // 'MATH 455',
      // 'CMPSC 455',
      // 'CMPET 401',
      // 'CMPSC 436',
      // 'ACCTG 403',
      // 'ACCTG 483',
    ];
    return shownClassNames.includes(class_name);
  }

  getClassName(classUid: number): string {
    return this.classes.filter((ecClass) => ecClass.uid == classUid)[0].class_name;
  }
}
