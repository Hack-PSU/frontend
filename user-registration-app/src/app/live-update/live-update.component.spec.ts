import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveUpdateComponent } from './live-update.component';

describe('LiveUpdateComponent', () => {
  let component: LiveUpdateComponent;
  let fixture: ComponentFixture<LiveUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
