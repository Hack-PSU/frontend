import { Component, OnInit } from '@angular/core';
import { AddressValidator } from 'address-validator';
declare var $: any;

@Component({
  selector: 'app-travel-reimbursement-view',
  templateUrl: './travel-reimbursement-view.component.html',
  styleUrls: ['./travel-reimbursement-view.component.css']
})
export class TravelReimbursementViewComponent implements OnInit {

  public travelForm: any;

  public loading = false;

  constructor() {
    this.travelForm = {};
  }

  ngOnInit() {
  }

  onError() {
    $('html, body').animate({
      scrollTop: 0,
    },                      1000);
  }

  fileAdded(event) {

  }

}
