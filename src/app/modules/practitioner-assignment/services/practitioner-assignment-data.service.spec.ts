import { TestBed } from '@angular/core/testing';

import { PractitionerAssignmentDataService } from './practitioner-assignment-data.service';

describe('PractitionerAssignmentDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PractitionerAssignmentDataService = TestBed.get(PractitionerAssignmentDataService);
    expect(service).toBeTruthy();
  });
});
