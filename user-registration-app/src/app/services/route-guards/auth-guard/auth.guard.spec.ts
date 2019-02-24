
import {of as observableOf} from 'rxjs';
import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../../AuthService/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';

describe('AuthGuard', () => {
  let authServiceSpy;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, NgProgress, {
        provide: Router,
        useClass: jasmine.createSpy('navigate'),
      }, {
        provide: AuthService,
        useClass: class {
        },
      }],
    });
    authServiceSpy = TestBed.get(AuthService);
    Object.defineProperty(authServiceSpy, 'currentUser', {
      get: () => {
      },
    });
  });

  it('should allow authenticated user access',
     inject([AuthGuard], (guard: AuthGuard) => {
      // Given: An authenticated user.
       const user = {};
       spyOnProperty(authServiceSpy, 'currentUser', 'get').and.returnValue(observableOf(user));

      // When: Run AuthGuard validation.
       const resultObservable = guard.canActivate(null, { url: '/pin', root: null });

      // Then: Auth guard returns true.
       resultObservable.subscribe(result => expect(result).toBeTruthy());
     }));
});
