import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AppConstants } from './AppConstants';
import { NgProgress } from 'ngx-progressbar';
import { AuthService } from './services/AuthService/auth.service';

declare var $: any;


@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    NgProgress,
    AuthService,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AngularFireAuthModule, OnInit {

  static scrollToID(id, speed) {
    const elem = $(id);
    if (elem) {
      const targetOffset = elem.offset().top;
      $('html,body').animate({ scrollTop: targetOffset }, speed);
      setTimeout(() => {
      }, speed);
    }
  }

  ngOnInit(): void {
    $(document).ready(() => {
      $('.button-collapse').sideNav();
      $('.dropdown-button').dropdown();
      $('nav').find('.scroller').click((e) => {
        e.preventDefault();
        AppComponent.scrollToID($(e.target).attr('href'), 500);
      });
      console.log($('#mobile-demo').find('.scroller'));
      $('#mobile-demo').find('.scroller').click((e) => {
        e.preventDefault();
        AppComponent.scrollToID($(e.target).attr('href'), 500);
      });
    });
  }

  constructor(public authService: AuthService, public router: Router, private progressBar: NgProgress) {
    this.router.events
      .subscribe((event) => {
        switch (event.constructor.name) {
          case 'NavigationStart':
            this.progressBar.start();
            break;
          case 'NavigationEnd':
          case 'NavigationCancel':
          case 'NavigationError':
            this.progressBar.done();
            break;
          default:
            break;
        }
      });
  }

  logout() {
    this.authService.signOut()
      .then(() => this.router.navigate([AppConstants.LOGIN_ENDPOINT]))
      .catch(() => this.router.navigate([AppConstants.LOGIN_ENDPOINT]));
  }

}
