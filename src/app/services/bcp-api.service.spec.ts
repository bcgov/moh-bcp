import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BCPApiService } from './bcp-api.service';

fdescribe('BCPApiService', () => {
  let httpClientSpy;
  let loggerSpy;
  let dataServiceSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    loggerSpy = jasmine.createSpyObj('SplunkLoggerService', ['logHttpError']);
    dataServiceSpy = jasmine.createSpyObj('BaseDataService', {
      jsonApplicantValidation: {},
      jsonFacilityValidation: {},
    });
  });

  it('should be created', () => {
    const service: BCPApiService = TestBed.get(BCPApiService);
    expect(service).toBeTruthy();
  });

  it('should log errors', () => {
    class BCPApiServiceTest extends BCPApiService {
      handleErrorTest() {
        const mockError = 'mock-error';
        expect(() => { this.handleError(<any> mockError )}).toThrowError();
        expect(loggerSpy.logHttpError).toHaveBeenCalledWith(mockError);
      }
    }
    const service: BCPApiServiceTest = new BCPApiServiceTest(httpClientSpy, loggerSpy, dataServiceSpy);
    service.handleErrorTest();
  });

  it('should set headers with provided token', () => {
    const mockToken = 'mock-token';

    class BCPApiServiceTest extends BCPApiService {
      setTokenTest(token) {
        this.setToken(token);
        expect(this._headers).toBeTruthy();
        expect(this.hasToken).toEqual(true);
      }
    }
    const service: BCPApiServiceTest = new BCPApiServiceTest(httpClientSpy, loggerSpy, dataServiceSpy);
    service.setTokenTest(mockToken);
  });

  it('should upload signature', () => {
    const mockAttachment = 'mock-attachment';
    const mockApplicationUUID = 'mock-uuid';

    class BCPApiServiceTest extends BCPApiService {
      uploadSignatureTest(attachment, applicationUUID) {
        this.uploadAttachment = jasmine.createSpy();
        this.uploadSignature(<any> attachment, applicationUUID);
        expect(this.uploadAttachment).toHaveBeenCalledWith(jasmine.any(String), <any> mockAttachment);
      }
    }
    const service: BCPApiServiceTest = new BCPApiServiceTest(httpClientSpy, loggerSpy, dataServiceSpy);
    service.uploadSignatureTest(mockAttachment, mockApplicationUUID);
  });

  it('should send practitioner data', () => {
    const mockPractitioner = 'mock-practitioner';
    const mockApplicationUUID = 'mock-uuid';
    const mockRequestUUID = 'mock-request-uuid';

    class BCPApiServiceTest extends BCPApiService {
      validatePractitionerTest(practitioner, applicationUUID) {
        this.generateUUID = jasmine.createSpy().and.returnValue(mockRequestUUID);
        this.post = jasmine.createSpy();
        this.validatePractitioner(<any> practitioner, applicationUUID);
        expect(this.post).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Object));
      }
    }
    const service: BCPApiServiceTest = new BCPApiServiceTest(httpClientSpy, loggerSpy, dataServiceSpy);
    service.validatePractitionerTest(mockPractitioner, mockApplicationUUID);
  });

  it('should send facility data', () => {
    const mockFacility = 'mock-facility';
    const mockApplicationUUID = 'mock-uuid';
    const mockRequestUUID = 'mock-request-uuid';

    class BCPApiServiceTest extends BCPApiService {
      validateFacilityTest(facility, applicationUUID) {
        this.generateUUID = jasmine.createSpy().and.returnValue(mockRequestUUID);
        this.post = jasmine.createSpy();
        this.validateFacility(<any> facility, applicationUUID);
        expect(this.post).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Object));
      }
    }
    const service: BCPApiServiceTest = new BCPApiServiceTest(httpClientSpy, loggerSpy, dataServiceSpy);
    service.validateFacilityTest(mockFacility, mockApplicationUUID);
  });
});
