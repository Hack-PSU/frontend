import { Component, OnInit } from '@angular/core';
import { AddressValidator } from 'address-validator';
import { HttpService } from '../../services/HttpService/HttpService';
import { AppConstants } from '../../AppConstants';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-table-assignment-view',
  templateUrl: './table-assignment-view.component.html',
  styleUrls: ['./table-assignment-view.component.css'],
  providers: [HttpService],
})
export class TableAssignmentViewComponent implements OnInit {

  public tableForm: any;
  public user: any;
  public loading = false;
  public errors = null;
  public response = {};
  public categories: any[];
  public numTeamMembers = 0;

  constructor(private httpService: HttpService, private afAuth: AngularFireAuth, private router: Router) {
    this.tableForm = {};
    this.tableForm.team = new Array(4);
    this.tableForm.categories = ['HackPSU'];
  }

  ngOnInit() {
    this.loading = true;
    this.afAuth.auth.onAuthStateChanged((user) => {
      this.loading = false;
      if (!user) {
        this.router.navigate([AppConstants.LOGIN_ENDPOINT]);
      } else {
        this.user = user;
        this.httpService.getTableAssignment()
          .subscribe((value) => {
            this.response = value;
          },         error => this.errors = error);
        this.httpService.getCategories()
          .subscribe((value: any[]) => {
            console.log(value);
            this.categories = value.filter(e => e.categoryName !== 'HackPSU');
          },         (error) => {
            this.errors = error;
          });
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
    this.httpService.submitTableAssignment(this.tableForm, this.user.uid)
      .subscribe((value: any) => {
        this.response = value.result;
        this.loading = false;
      },         (error: Error) => {
        this.errors = error;
        this.loading = false;
      });
  }

  categoryToggled(categoryName, checked) {
    if (checked) {
      this.tableForm.categories.push(categoryName);
    } else {
      this.tableForm.categories = this.tableForm.categories.filter(e => e !== categoryName);
    }
  }

  addTeamMember() {
    if (this.numTeamMembers < 4) {
      this.numTeamMembers += 1;
      this.tableForm.team.push('');
    }
  }

  removeTeamMember() {
    if (this.numTeamMembers > 0) {
      this.numTeamMembers -= 1;
      this.tableForm.team.pop();
    }
  }

  update(value, index) {
    this.tableForm.team[index] = value;
  }

  numberReturn(length) {
    return new Array(length);
  }

  show() {
    return new Date().getTime() > new Date('April 8, 2018 18:00:00').getTime();
  }
}
