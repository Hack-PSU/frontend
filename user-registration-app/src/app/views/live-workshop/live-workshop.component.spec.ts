import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveWorkshopComponent } from './live-workshop.component';

describe('LiveWorkshopComponent', () => {
  let component: LiveWorkshopComponent;
  let fixture: ComponentFixture<LiveWorkshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LiveWorkshopComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
