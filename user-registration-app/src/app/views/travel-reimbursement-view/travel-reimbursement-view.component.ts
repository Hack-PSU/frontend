import { Component, OnInit } from '@angular/core';
import { AddressValidator } from 'address-validator';
import { HttpService } from '../../services/HttpService/HttpService';
import { AppConstants } from '../../AppConstants';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-travel-reimbursement-view',
  templateUrl: './travel-reimbursement-view.component.html',
  styleUrls: ['./travel-reimbursement-view.component.css'],
  providers: [HttpService],
})
export class TravelReimbursementViewComponent implements OnInit {

  public travelForm: any;
  public user: any;
  public loading = false;
  public errors = null;
  public response = null;

  constructor(private httpService: HttpService, private afAuth: AngularFireAuth, private router: Router) {
    this.travelForm = {};
  }

  ngOnInit() {
    this.loading = true;
    this.afAuth.auth.onAuthStateChanged((user) => {
      this.loading = false;
      if (!user) {
        this.router.navigate([AppConstants.LOGIN_ENDPOINT]);
      } else {
        this.user = user;
      }
    });
  }

  onError() {
    $('html, body').animate({
      scrollTop: 0,
    },                      1000);
  }

  fileAdded(event) {
    this.travelForm.receipt = event.target.files;
  }

  onSubmit() {
    console.log(this.travelForm);
    this.loading = true;
    this.httpService.submitTravelReimbursement(this.travelForm, this.user.uid)
      .subscribe((value: any) => {
        this.response = value.result;
        this.loading = false;
      },         (error: Error) => {
        this.errors = error;
        this.loading = false;
      });
  }

  show() {
    return new Date().getTime() > new Date('April 8, 2018 08:00:00').getTime();
  }

}
