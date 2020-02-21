import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RegisterPractitionerApiService } from './register-practitioner-api.service';

class RegisterPractitionerApiServiceTest extends RegisterPractitionerApiService {
  submitMaintPracJsonTest(jsonPayLoad: any, applicationUUID: string, signature: any) {
    this.post = jasmine.createSpy();
    this.submitMaintPracJson(jsonPayLoad, applicationUUID, signature);
    expect(this.post).toHaveBeenCalled();
  }
  maintainPractitionerTest(jsonPayLoad, signature, applicationUUID) {
    this.uploadSignature = jasmine.createSpy().and.returnValue(of('test'));
    this.maintainPractitioner(jsonPayLoad, signature, applicationUUID);
    expect(this.uploadSignature).toHaveBeenCalledWith(signature, applicationUUID);
  }
}

describe('RegisterPractitionerApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ RegisterPractitionerApiServiceTest ]
  }));

  it('should be created', () => {
    const service: RegisterPractitionerApiService = TestBed.get(RegisterPractitionerApiService);
    expect(service).toBeTruthy();
  });

  it('should submit maintain practitioner JSON', () => {
    const service: RegisterPractitionerApiServiceTest = TestBed.get(RegisterPractitionerApiServiceTest);
    const mockSignature = jasmine.createSpyObj('signature', ['toJSON']);
    service.submitMaintPracJsonTest({}, '', mockSignature as any);
    expect(mockSignature.toJSON).toHaveBeenCalled();
  });

  it('should upload signature', () => {
    const service: RegisterPractitionerApiServiceTest = TestBed.get(RegisterPractitionerApiServiceTest);
    service.maintainPractitionerTest({}, {}, '');
  });
});
