import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordViewComponent } from './forgot-password-view.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

describe('ForgotPasswordViewComponent', () => {
  let component: ForgotPasswordViewComponent;
  let fixture: ComponentFixture<ForgotPasswordViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordViewComponent],
      imports: [FormsModule],
      providers: [{
        provide: AngularFireAuth,
        useClass: class {},
      }, {
        provide: ActivatedRoute,
        useValue: {},
      }],
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
