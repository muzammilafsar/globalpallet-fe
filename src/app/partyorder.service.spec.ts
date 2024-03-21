import { TestBed, inject } from '@angular/core/testing';

import { PartyorderService } from './partyorder.service';

describe('PartyorderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartyorderService]
    });
  });

  it('should be created', inject([PartyorderService], (service: PartyorderService) => {
    expect(service).toBeTruthy();
  }));
});
