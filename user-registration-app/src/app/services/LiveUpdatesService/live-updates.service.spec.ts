import { TestBed, inject } from '@angular/core/testing';

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
