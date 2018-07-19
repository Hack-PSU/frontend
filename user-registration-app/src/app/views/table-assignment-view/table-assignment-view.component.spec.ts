import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAssignmentViewComponent } from './table-assignment-view.component';
import { FormsModule } from '@angular/forms';

describe('TableAssignmentViewComponent', () => {
  let component: TableAssignmentViewComponent;
  let fixture: ComponentFixture<TableAssignmentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableAssignmentViewComponent],
      imports: [FormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAssignmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
