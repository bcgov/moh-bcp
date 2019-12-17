import { TestBed } from '@angular/core/testing';

import { CreateFacilityApiService } from './create-facility-api.service';

describe('CreateFacilityApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateFacilityApiService = TestBed.get(CreateFacilityApiService);
    expect(service).toBeTruthy();
  });
});
