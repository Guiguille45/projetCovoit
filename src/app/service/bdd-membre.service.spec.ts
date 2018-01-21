import { TestBed, inject } from '@angular/core/testing';

import { BddMembreService } from './bdd-membre.service';

describe('BddMembreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BddMembreService]
    });
  });

  it('should be created', inject([BddMembreService], (service: BddMembreService) => {
    expect(service).toBeTruthy();
  }));
});
