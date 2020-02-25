import { TestBed } from '@angular/core/testing';

import { UpdateFacilityApiService } from './update-facility-api.service';

describe('UpdateFacilityApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateFacilityApiService = TestBed.get(UpdateFacilityApiService);
    expect(service).toBeTruthy();
  });
});
