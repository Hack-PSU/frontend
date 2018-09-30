import { Component, OnInit } from '@angular/core';
import { AddressValidator } from 'address-validator';
import { HttpService } from '../../services/HttpService/HttpService';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "../../../environments/environment";
import { ProjectModel } from "../../models/project-model";

declare var $: any;

@Component({
  selector: 'app-table-assignment-view',
  templateUrl: './table-assignment-view.component.html',
  styleUrls: ['./table-assignment-view.component.css'],
  providers: [HttpService],
})
export class TableAssignmentViewComponent implements OnInit {

  public tableForm: any;
  public loading = false;
  public errors = null;
  public response: ProjectModel;
  public categories: any[];
  public numTeamMembers = 0;

  constructor(public router: Router,
              private route: ActivatedRoute,
              private httpService: HttpService,
  ) {
    this.tableForm = {};
    this.response = null;
    this.tableForm.team = [];
    this.tableForm.categories = [0];
  }

  ngOnInit() {
    this.route.data
      .subscribe(({ tableAssignment }) => {
        this.response = tableAssignment;
      });
    this.httpService.getCategories()
      .subscribe((value: any[]) => {
        this.categories = value.filter(e => e.categoryName !== 'HackPSU');
      });
  }

  onError() {
    $('html, body').animate({
      scrollTop: 0,
    }, 1000);
  }

  onSubmit() {
    this.loading = true;
    this.httpService.submitTableAssignment(this.tableForm)
      .subscribe((value: any) => {
        this.response = value.result;
        this.loading = false;
      }, () => {
        this.loading = false;
      })
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
    return Date.now() > environment.hackathonStartTime.getTime();
  }
}
