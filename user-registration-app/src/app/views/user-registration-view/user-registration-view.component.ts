import { Component, OnInit } from '@angular/core';
import { IRegistrationDb } from "../../models/registration";
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
  registrations: IRegistrationDb[];
  classes: ExtraCreditClass[];
  submittedClasses: Map<string, boolean>;
  regPropertyNameResolve: any;

  public keyVals(object: any) {
    return Object.entries(object);
  }

  constructor(private httpService: HttpService, private progressService: NgProgress, private alertsService: AlertService) {
    this.registrations = [];
    this.classes = [];
    this.submittedClasses = new Map();
    this.regPropertyNameResolve = {
      academic_year: 'Academic Year',
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
    // console.log(this.regPropertyNameResolve);
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
        regObservable.unsubscribe();
      }, ({ error }) => {
        if (error.status === 404) {
          this.alertsService.info('You have not registered for a hackathon yet. We could not find any data for those queries');
        }
      });
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
          this.alertsService.warning('Something may have gone wrong in that process. Contact a member of staff to check');
        }
      });
  }
}
