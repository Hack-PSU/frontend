import { Component, OnInit } from '@angular/core';
import { AddressValidator } from 'address-validator';
import { HttpService } from '../HttpService';
import { AppConstants } from '../AppConstants';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-table-assignment-view',
  templateUrl: './table-assignment-view.component.html',
  styleUrls: ['./table-assignment-view.component.css']
//  providers: [HttpService],
})
export class TableAssignmentViewComponent implements OnInit {

  public tableForm: any;
  public user: any;
  public loading = false;
  public errors = null;
  public response = null;

  constructor(private httpService: HttpService, private afAuth: AngularFireAuth, private router: Router) {
    this.tableForm = {};
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

  onSubmit() {
    console.log(this.tableForm);
    this.loading = true;
    this.httpService.submitTableAssignmentUI(this.tableForm, this.user.uid)
      .subscribe((value: any) => {
        this.response = value.result;
        this.loading = false;
      },         (error: Error) => {
        this.errors = error;
        this.loading = false;
      });
  }

}
