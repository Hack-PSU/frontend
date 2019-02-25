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

  public keyVals(object: any) {
    return Object.entries(object);
  }

  constructor(private httpService: HttpService, private progressService: NgProgress, private alertsService: AlertService) {
    this.registrations = [];
    this.classes = [];
    this.submittedClasses = new Map();
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
    }, () => {
      this.progressService.complete();
      this.alertsService.warning('Something may have gone wrong in that process. Contact a member of staff to check');
    });
  }
}
