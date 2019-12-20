import { Injectable } from '@angular/core';
import { BCPApiService } from '../../../services/bcp-api.service';
import { SplunkLoggerService } from '../../../services/splunk-logger.service';
import { CreateFacilityDataService } from './create-facility-data.service';
import { CommonImage } from 'moh-common-lib';
import { flatMap, catchError } from 'rxjs/operators';
import { BCPDocumentTypes } from '../../core-bcp/models/documentTypes';
import {
  PractitionerValidationPartial,
  ValidatePractitionerRequest,
  FacilityValidationPartial } from '../../core-bcp/models/base-api.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateFacilityApiService extends BCPApiService {

  constructor(protected http: HttpClient,
              protected logger: SplunkLoggerService,
              protected dataService: CreateFacilityDataService) {
    super(http, logger, dataService);
  }

  // TODO:  If flag can be added to indicate to look for MD, this will need to be
  //        moved to the BCPApiService
  validatePractitioner(practitioner: PractitionerValidationPartial, applicationUUID) {
    const payload: ValidatePractitionerRequest = {
      practitioner,
      requestUUID: this.generateUUID(),
      applicationUUID
    };
    this.dataService.jsonApplicantValidation.request = payload;

    const url = `${this.baseUrl}/validatePractitioner`;

    return this.post(url, payload);
  }

  // TODO:  If can check whether field exists or not, this will need to be
  //        moved to the BCPApiService
  validateFacility(facility: FacilityValidationPartial, applicationUUID: string) {
    const payload = {
      facility,
      requestUUID: this.generateUUID(),
      applicationUUID
    };

    this.dataService.jsonFacilityValidation.request = payload;

    const url = `${this.baseUrl}/validateFacility`;

    return this.post(url, payload);
  }

  /**
   * Creates a facility, uploading attachments and then JSON
   * @param jsonPayLoad Payload to submit
   * @param signature Consent signature
   * @param applicationUUID Shared UUID to use across requests.
   */
  createFacility(jsonPayLoad, signature: CommonImage, applicationUUID) {
    return this.uploadSignature(signature, applicationUUID)
      .pipe(
        flatMap(attachRes => this.submitFacilityJson(jsonPayLoad, applicationUUID, signature)),
        catchError(this.handleError.bind(this))
      );
  }

  private submitFacilityJson(jsonPayLoad: any, applicationUUID: string, signature: CommonImage<BCPDocumentTypes> ) {
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
