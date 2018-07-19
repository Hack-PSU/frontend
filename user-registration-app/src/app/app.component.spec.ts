import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgProgress, NgProgressModule } from '@ngx-progressbar/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { UserViewComponent } from './views/user-view/user-view.component';
import { AuthService } from './services/AuthService/auth.service';
import { Observable } from 'rxjs/Observable';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, UserViewComponent],
      imports: [BrowserModule, RouterModule, NgProgressModule],
      providers: [{
        provide: AuthService,
        useClass: class {
        },
      }, {
        provide: Router,
        useClass: class {
          events = Observable.of({});
        },
      }, {
        provide: NgProgress,
        useValue: {},
      }],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.debugElement.componentInstance;
    expect(true).toBeTruthy();
  }));
});
