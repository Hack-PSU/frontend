import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/HttpService/HttpService';
import { AppConstants } from '../../AppConstants';
import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService/auth.service';
import { take } from 'rxjs/operators';

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

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.travelForm = {};
  }

  ngOnInit() {
    this.authService.currentUser.pipe(take(1)).subscribe((user) => {
      if (!user) {
        this.router.navigate([AppConstants.LOGIN_ENDPOINT]);
      } else {
        this.user = user;
      }
    });
  }

  onError() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  fileAdded(event) {
    this.travelForm.receipt = event.target.files;
  }

  onSubmit() {
    console.log(this.travelForm);
    this.loading = true;
    switch (this.travelForm.groupMembers) {
      case 4:
        this.travelForm.groupMembers = '4+';
        break;
      default:
        this.travelForm.groupMembers = this.travelForm.groupMembers.toString();
    }
    this.httpService.submitTravelReimbursement(this.travelForm, this.user.uid).subscribe(
      (value) => {
        this.response = value;
        this.loading = false;
      },
      () => {
        this.loading = false;
      },
    );
  }

  show() {
    return new Date().getTime() > new Date('April 8, 2018 08:00:00').getTime();
    // return new Date().getTime() > new Date('October 6, 2018 18:00:00').getTime();
  }
}
