import { TestBed, inject } from '@angular/core/testing';

import { BddAdminService } from './bdd-admin.service';

describe('BddAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BddAdminService]
    });
  });

  it('should be created', inject([BddAdminService], (service: BddAdminService) => {
    expect(service).toBeTruthy();
  }));
});
