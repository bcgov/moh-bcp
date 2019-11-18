import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AbstractHttpService } from 'moh-common-lib';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { SplunkLoggerService } from './splunk-logger.service';
import { ValidatePractitionerRequest, PractitionerValidationPartial, FacilityValidationPartial } from '../modules/create-facility/models/create-facility-api-model';
import { CreateFacilityDataService } from '../modules/create-facility/services/create-facility-data.service';

// TODO: Type Requests
// TODO: Type responses
// TODO: Splunk logging for requests

@Injectable({
  providedIn: 'root'
})
export class BCPApiService extends AbstractHttpService {

  protected _headers: HttpHeaders;

  hasToken = false;
  baseUrl = environment.api.base;

  // Do NOT add data-services here.  It should be passed data as parameters, and not require services.
  constructor(protected http: HttpClient,
              private logger: SplunkLoggerService,
              private dataService: CreateFacilityDataService) {
    super(http);
  }

  protected handleError(error: HttpErrorResponse) {
    this.logger.logHttpError(error);

    // TODO: Improve / reduce logging here once done development.
    console.log('BCP API ERRROR', error);
    throw new Error('BCP API Error');
  }

  setToken(token: string) {

    this._headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Response-Type': 'application/json',
      'X-Authorization': 'Bearer ' + token
    });
    this.hasToken = true;
  }

  validatePractitioner(practitioner: PractitionerValidationPartial, applicationUUID) {
    // TODO: Log! Both on failure and success.
    // TODO: Get proper values
    const payload: ValidatePractitionerRequest = {
      practitioner,
      requestUUID: this.generateUUID(),
      applicationUUID
    };
    this.dataService.jsonApplicantValidation.request = payload;

    const url = `${this.baseUrl}/validatePractitioner`;


    return this.post(url, payload);
  }

  validateFacility(facility: FacilityValidationPartial, applicationUUID: string) {
    // TODO: Log! Both on failure and success.
    // TODO: Get proper values
    const payload = {
      facility,
      requestUUID: this.generateUUID(),
      applicationUUID
    };

    this.dataService.jsonFacilityValidation.request = payload;

    const url = `${this.baseUrl}/validateFacility`;


    return this.post(url, payload);
  }


  createFacility(jsonPayLoad: any) {
    const requestUUID = this.generateUUID();
    const payload = {
      createFacilitySubmission: jsonPayLoad,
      requestUUID,
      applicationUUID: requestUUID
    };

    this.dataService.jsonCreateFacility.request = payload;

    const url = `${this.baseUrl}/createFacility`;
    return this.post(url, payload);
  }

}


// validate pracName and number
// payload
/*
const payload = {
  firstName: 'Bob',
  lastName: 'Smith',
  number: '12345',
  requestID: '<uuid from front-end for logging>'
};


const successResponse = {
  valid: true,
  requestID: '<same uuid from payload>'
};

const failureResponse = {
  valid: false,
  requestID: '<same uuid from payload>'
};
*/

