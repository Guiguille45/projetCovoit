import { TestBed, inject } from '@angular/core/testing';

import { BddUserService } from './bdd-user.service';

describe('BddUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BddUserService]
    });
  });

  it('should be created', inject([BddUserService], (service: BddUserService) => {
    expect(service).toBeTruthy();
  }));
});
