import { TestBed } from '@angular/core/testing';
import { RegistrationDataService } from './registration-data.service';


describe('RegistrationDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrationDataService = TestBed.get(RegistrationDataService);
    expect(service).toBeTruthy();
  });
});
