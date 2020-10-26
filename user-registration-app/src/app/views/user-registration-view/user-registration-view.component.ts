import { Component, OnInit } from '@angular/core';
import { IRegistrationDb, RegistrationApiResponse } from "../../models/registration";
import { ExtraCreditClass } from "../../models/extra-credit-class";
import { HttpService } from "../../services/HttpService/HttpService";
import { forkJoin } from "rxjs";
import { NgProgress } from "@ngx-progressbar/core";
import { AlertService } from "ngx-alerts";

@Component({
  selector: 'app-user-registration-view',
  templateUrl: './user-registration-view.component.html',
  styleUrls: ['./user-registration-view.component.css']
})
export class UserRegistrationViewComponent implements OnInit {
  registrations: RegistrationApiResponse[];
  classes: ExtraCreditClass[];
  submittedClasses: Map<string, boolean>;
  regPropertyNameResolve: any;
  willUpdateAddressFields: boolean
  updateAddressFields: any

  public keyVals(object: any) {
    return Object.entries(object);
  }

  constructor(private httpService: HttpService, private progressService: NgProgress, private alertsService: AlertService) {
    this.registrations = [];
    this.classes = [];
    this.submittedClasses = new Map();
    this.updateAddressFields = {
      "addressLine1": "",
      "addressLine2": "",
      "city": "",
      "stateProvince": "",
      "zipcode": "",
      "country": ""
    };
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
    }
    console.log(this.regPropertyNameResolve);
  }

  ngOnInit() {
    const ecObservable = this.httpService.getExtraCreditClasses()
      .subscribe(classes => {
        this.classes = classes;
        ecObservable.unsubscribe();
      });
    const regObservable = this.httpService.getUserRegistrations()
      .subscribe(registrations => {
        this.registrations = registrations;
        console.log("aaaaa", registrations)
        regObservable.unsubscribe();
      }, ({ error }) => {
        if (error.status === 404) {
          this.alertsService.info('You have not registered for a hackathon yet. We could not find any data for those queries');
        }
      });
  }

  editAddressToggle() {
    this.willUpdateAddressFields = !this.willUpdateAddressFields;
  }

  getAddress(): string {
    let address = this.registrations[0].address;
    if (address == "") {
      return "No address on file. Please add your address if you would like to receive some swag!";
    } else {
      return address;
    }
    console.log(this.registrations[0].address);
    return this.registrations[0].address;
  }

  validateAddress(): boolean {
    // how to validate address?
    return true;
  }

  attachNewAddress() {
    const addrFields = this.updateAddressFields;
    let newAddress = "";
    
    for (let field in addrFields) {
      if (addrFields[field]) {
        newAddress += `${addrFields[field]}, `;
      }
    }

    if (newAddress.slice(-2) === ", ") {
      newAddress = newAddress.slice(0, -2);
    }

    console.log("newaddress: ", newAddress);
    this.registrations[0].address = newAddress;
    console.log("this.registrations[0].address: ", this.registrations[0].address)
  }

  submitAddress() {
    console.log("zzzzz", this.registrations[0])

    if (!this.validateAddress()) {
      this.alertsService.danger('Please fill all necessary fields')
    }

    this.attachNewAddress()

    console.log("abcabc", this.registrations[0])

    this.progressService.start();
    this.httpService.submitAddress(this.registrations[0])
      .subscribe(() => {
        this.progressService.complete();
        this.alertsService.success('Your address has been updated');
      }, ({ error }) => {
        console.log(error);
        this.alertsService.warning('Something may have gone wrong in that process. Contact a member of staff to check');
      })
  }

  submitClasses() {
    if (Object.values(this.submittedClasses).filter(a => a).length === 0) {
      this.alertsService.danger('Select a class to submit');
      return;
    }
    this.progressService.start();
    forkJoin(
      Object.entries(this.submittedClasses)
        .map(([c, value]: [string, boolean]) => {
          if (value) {
            return this.httpService.registerExtraCreditClass(c);
          }
        })
    ).subscribe(() => {
      this.progressService.complete();
      this.alertsService.success('You are now getting tracked for the selected classes');
    }, ({error}) => {
      if (error.status === 409) {
        this.alertsService.success('You are now getting tracked for the selected classes');
      } else {
        console.log(error);
        this.alertsService.warning('Something may have gone wrong in that process. Contact a member of staff to check');
      }
    });
  }

  parseInt(string: string, radix: number) {
    return parseInt(string, radix);
  }

  businessChallengeRegister() {
    this.progressService.start();
    this.httpService.registerExtraCreditClass(
      this.classes.find((c) => c.class_name === 'Business Challenge').uid.toString(),
    )
      .subscribe(() => {
        this.progressService.complete();
        this.alertsService.success('You are registered for the business challenge');
      }, ({error}) => {
        if (error.status === 409) {
          this.alertsService.success('You are registered for the business challenge');
        } else {
          console.log(error);
          this.alertsService.warning('Something may have gone wrong in that process. Email technology@hackpsu.org or Contact a member of staff to check');
        }
      });
  }

  showClassName(class_name: string): boolean {
    const hiddenClassNames = ['Business Challenge', 'CMPEN 362', 'STAT 463', 'SCM 421\n','EE 300W',
    'CMPSC 131','STAT 463','IST 256','IST 210','STAT 380','CMPSC 311','CMPSC 442'];
    return hiddenClassNames.indexOf(class_name) === -1;
  }
}
