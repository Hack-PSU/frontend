import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelReimbursementViewComponent } from './travel-reimbursement-view.component';

describe('TravelReimbursementViewComponent', () => {
  let component: TravelReimbursementViewComponent;
  let fixture: ComponentFixture<TravelReimbursementViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelReimbursementViewComponent ]
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
