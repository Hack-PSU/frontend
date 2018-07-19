import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelReimbursementViewComponent } from './travel-reimbursement-view.component';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/HttpService/HttpService';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/AuthService/auth.service';
import { Router } from '@angular/router';

describe('TravelReimbursementViewComponent', () => {
  let component: TravelReimbursementViewComponent;
  let fixture: ComponentFixture<TravelReimbursementViewComponent>;
  const dummyClass =  {
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TravelReimbursementViewComponent],
      imports: [FormsModule, HttpClientModule],
      providers: [{
        provide: HttpService,
        useValue: dummyClass,
      }, {
        provide: AuthService,
        useValue: dummyClass,
      }, {
        provide: Router,
        useValue: dummyClass,
      }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelReimbursementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
