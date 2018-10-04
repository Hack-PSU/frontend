import { TestBed, inject } from '@angular/core/testing';

import { CountdownService } from './countdown.service';

describe('CountdownService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountdownService]
    });
  });

  it('should be created', inject([CountdownService], (service: CountdownService) => {
    expect(service).toBeTruthy();
  }));
});
