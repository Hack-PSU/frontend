import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AppConstants } from './AppConstants';
declare var $: any;


@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
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
      },         speed);
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

  constructor(public afAuth: AngularFireAuth, public router: Router) {}

  logout() {
    this.afAuth.auth.signOut()
      .then(() => this.router.navigate([AppConstants.LOGIN_ENDPOINT]))
      .catch(() => this.router.navigate([AppConstants.LOGIN_ENDPOINT]));
  }

}
