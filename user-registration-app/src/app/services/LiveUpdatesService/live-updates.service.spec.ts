import { TestBed, inject } from '@angular/core/testing';

import { LiveUpdatesService } from './live-updates.service';

describe('LiveUpdatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiveUpdatesService],
    });
  });

  it('should be created', inject([LiveUpdatesService], (service: LiveUpdatesService) => {
    expect(service).toBeTruthy();
  }));
});
