import { Injectable } from '@angular/core';
import { BCPApiService } from '../../../services/bcp-api.service';
import { HttpClient } from '@angular/common/http';
import { SplunkLoggerService } from '../../../services/splunk-logger.service';
import { RegisterPractitionerDataService } from './register-practitioner-data.service';
import {
  PractitionerValidationPartial,
  ValidatePractitionerRequest,
  FacilityValidationPartial } from '../../core-bcp/models/base-api.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterPractitionerApiService extends BCPApiService {

  constructor(protected http: HttpClient,
              protected logger: SplunkLoggerService,
              protected dataService: RegisterPractitionerDataService) {
    super(http, logger, dataService);
  }

  /** TODO: Find out what function will be called */
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

  /** TODO: Find out what function will be called */
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

}
