import { TestBed, inject } from '@angular/core/testing';
import * as sinon from 'sinon';

import { DateGuard } from './date.guard';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

describe('DateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateGuard, {
        provide: Router, useClass: class {
          navigate = jasmine.createSpy('navigate');
        },
      },
      ],
    });
  });

  it('should return true for a date after the event.', inject([DateGuard, Router], (guard: DateGuard) => {
    // Given: Date after event date
    const clock = sinon.useFakeTimers(environment.hackathonStartTime.getTime() + 1);

    // When: Validate date.
    const result = guard.canActivate(null, null);

    // Then: Expect result to be true.
    expect(result).toBeTruthy();

    // Finally: Restore the clock.
    clock.restore();
  }));
});
