import { TestBed } from '@angular/core/testing';

import { CreatePractitionerDataService } from './create-practitioner-data.service';

describe('CreatePractitionerDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreatePractitionerDataService = TestBed.get(CreatePractitionerDataService);
    expect(service).toBeTruthy();
  });
});
