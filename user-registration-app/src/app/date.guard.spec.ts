import { TestBed, async, inject } from '@angular/core/testing';

import { DateGuard } from './date.guard';

describe('DateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateGuard]
    });
  });

  it('should ...', inject([DateGuard], (guard: DateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
