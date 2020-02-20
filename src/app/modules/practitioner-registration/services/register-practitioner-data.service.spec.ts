import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import * as helperFunc from '../../core-bcp/models/helperFunc';

import { RegisterPractitionerDataService } from './register-practitioner-data.service';

describe('CreatePractitionerDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterPractitionerDataService = TestBed.get(RegisterPractitionerDataService);
    expect(service).toBeTruthy();
  });

  it('should use dummy data when specified', () => {
    const useDummyDataDefault = environment.useDummyData;
    environment.useDummyData = true;
    const service: RegisterPractitionerDataService = TestBed.get(RegisterPractitionerDataService);
    expect(service.pracInfoFirstName).toEqual('John');
    environment.useDummyData = useDummyDataDefault;
  });

  it('should use useMockBackendData when specified', () => {
    const useMockBackendDataDefault = environment.useMockBackendData;
    environment.useMockBackendData = true;
    const service: RegisterPractitionerDataService = TestBed.get(RegisterPractitionerDataService);
    expect(service.pracInfoFirstName).toEqual('test');
    environment.useMockBackendData = useMockBackendDataDefault;
  });

  it('should get declaration text for API', () => {
    const service: RegisterPractitionerDataService = TestBed.get(RegisterPractitionerDataService);
    const text = service.declarationTextForAPI;
    expect(text).toEqual(jasmine.any(String));
  });

  it('should get Json data', () => {
    const service: RegisterPractitionerDataService = TestBed.get(RegisterPractitionerDataService);
    const text = service.getJSONPayload();
    expect(text).toEqual(jasmine.any(Object));
  });
});
