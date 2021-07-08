import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveFaqComponent } from './live-faq.component';

describe('LiveFaqComponent', () => {
  let component: LiveFaqComponent;
  let fixture: ComponentFixture<LiveFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveFaqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
