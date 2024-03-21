import { TestBed, inject } from '@angular/core/testing';

import { LocalityService } from './locality.service';

describe('LocalityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalityService]
    });
  });

  it('should be created', inject([LocalityService], (service: LocalityService) => {
    expect(service).toBeTruthy();
  }));
});
