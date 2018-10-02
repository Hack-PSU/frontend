import { TestBed, async, inject } from '@angular/core/testing';

import { RegistrationGuardGuard } from './registration-guard.guard';

describe('RegistrationGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrationGuardGuard]
    });
  });

  it('should ...', inject([RegistrationGuardGuard], (guard: RegistrationGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
