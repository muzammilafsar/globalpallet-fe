import { TestBed, inject } from '@angular/core/testing';

import { CustomerContactService } from './customer-contact.service';

describe('CustomerContactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerContactService]
    });
  });

  it('should be created', inject([CustomerContactService], (service: CustomerContactService) => {
    expect(service).toBeTruthy();
  }));
});
