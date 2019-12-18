import { TestBed } from '@angular/core/testing';

import { RegisterPractitionerApiService } from './register-practitioner-api.service';

describe('RegisterPractitionerApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterPractitionerApiService = TestBed.get(RegisterPractitionerApiService);
    expect(service).toBeTruthy();
  });
});
