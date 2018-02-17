import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { RegistrationFormComponent } from './app/registration-form/registration-form.component';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

declare var $: any;

$(document).ready(() => {
  // $('.registration-form').onepage_scroll({
  //   sectionContainer: '.card',
  //   easing: 'ease',                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
  //   animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
  //   keyboard: true,                  // You can activate the keyboard controls
  //   pagination: false,
  //   updateURL: false,
  //   loop: false,
  //   afterMove: RegistrationFormComponent.afterMove,
  //   responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
  //   // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
  //   // the browser's width is less than 600, the fallback will kick in.
  //   direction: 'vertical',
  // });
  //
  // $('#prev-link').click(() => {
  //   $('.registration-form').moveUp();
  // });
  // $('#next-link').click(() => {
  //   $('.registration-form').moveDown();
  // });
});
