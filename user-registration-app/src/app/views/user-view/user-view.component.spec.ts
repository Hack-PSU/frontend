import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewComponent } from './user-view.component';
import { AuthService } from '../../services/AuthService/auth.service';
import { Router } from '@angular/router';

describe('UserViewComponent', () => {
  let component: UserViewComponent;
  let fixture: ComponentFixture<UserViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserViewComponent],
      providers: [{
        provide: AuthService,
        useClass: class {

        },
      }, {
        provide: Router,
        useClass: class {

        },
      }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
