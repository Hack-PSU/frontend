import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewlivefaqComponent } from './newlivefaq.component';

describe('NewlivefaqComponent', () => {
  let component: NewlivefaqComponent;
  let fixture: ComponentFixture<NewlivefaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewlivefaqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewlivefaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
