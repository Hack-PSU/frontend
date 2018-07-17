import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupViewComponent } from './signup-view.component';

describe('SignupViewComponent', () => {
  let component: SignupViewComponent;
  let fixture: ComponentFixture<SignupViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
