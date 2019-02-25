import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationViewComponent } from './user-registration-view.component';

describe('UserRegistrationViewComponent', () => {
  let component: UserRegistrationViewComponent;
  let fixture: ComponentFixture<UserRegistrationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegistrationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
