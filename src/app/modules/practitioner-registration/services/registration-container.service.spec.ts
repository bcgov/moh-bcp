import { TestBed } from '@angular/core/testing';

import { RegistrationContainerService } from './registration-container.service';

describe('RegistrationContainerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrationContainerService = TestBed.get(RegistrationContainerService);
    expect(service).toBeTruthy();
  });
});
