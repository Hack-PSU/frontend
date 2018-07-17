import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordViewComponent } from './forgot-password-view.component';

describe('ForgotPasswordViewComponent', () => {
  let component: ForgotPasswordViewComponent;
  let fixture: ComponentFixture<ForgotPasswordViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
