import { Injectable } from '@angular/core';
import { BCPApiService } from '../../../services/bcp-api.service';
import { HttpClient } from '@angular/common/http';
import { SplunkLoggerService } from '../../../services/splunk-logger.service';
import { RegisterPractitionerDataService } from './register-practitioner-data.service';
import {
  PractitionerValidationPartial,
  ValidatePractitionerRequest,
  FacilityValidationPartial } from '../../core-bcp/models/base-api.model';
import { CommonImage } from 'moh-common-lib';
import { flatMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterPractitionerApiService extends BCPApiService {

  constructor(protected http: HttpClient,
              protected logger: SplunkLoggerService,
              protected dataService: RegisterPractitionerDataService) {
    super(http, logger, dataService);
  }

  // TODO:  If flag can be added to indicate to look for MD, this will need to be
  //        removed and use 'validatePracitioner' which is moved to BCPApiService
  //        from the CreateFacilityApiService
  validateMD(practitioner: PractitionerValidationPartial, applicationUUID) {
    const payload: ValidatePractitionerRequest = {
        practitioner,
        requestUUID: this.generateUUID(),
        applicationUUID
      };
    this.dataService.jsonApplicantValidation.request = payload;

    const url = `${this.baseUrl}/validateMD`;

    return this.post(url, payload);
  }

  // TODO:  If can check whether field exists or not, this will need to be
  //        removed and use 'validateFacility' which is moved to BCPApiService
  //        from the CreateFacilityApiService
  validateFacilityID(facility: FacilityValidationPartial, applicationUUID: string) {
    const payload = {
      facility,
      requestUUID: this.generateUUID(),
      applicationUUID
    };

    this.dataService.jsonFacilityValidation.request = payload;

    const url = `${this.baseUrl}/validateFacilityID`;

    return this.post(url, payload);
  }



  maintainPractitioner(jsonPayLoad, signature: CommonImage, applicationUUID) {
    return this.uploadSignature(signature, applicationUUID)
      .pipe(
        flatMap(attachRes => this.submitMaintPracJson(jsonPayLoad, applicationUUID, signature)),
        catchError(this.handleError.bind(this))
      );
  }

  private submitMaintPracJson(jsonPayLoad: any, applicationUUID: string, signature: CommonImage<BCPDocumentTypes> ) {
    const requestUUID = this.generateUUID();
    const payload = {
      createFacilitySubmission: jsonPayLoad,
      requestUUID,
      applicationUUID,
      attachments: [signature.toJSON()]
    };

    this.dataService.jsonCreateFacility.request = payload;

    const url = `${this.baseUrl}/createFacility`;
    return this.post(url, payload);
  }

}
