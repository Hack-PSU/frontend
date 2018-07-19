import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveUpdateComponent } from './live-update.component';
import { AngularFireAuth } from 'angularfire2/auth';

describe('LiveUpdateComponent', () => {
  let component: LiveUpdateComponent;
  let fixture: ComponentFixture<LiveUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LiveUpdateComponent],
      providers: [AngularFireAuth],
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
