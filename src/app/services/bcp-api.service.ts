import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbstractHttpService } from 'moh-common-lib';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { SplunkLoggerService } from './splunk-logger.service';
import { ValidatePractitionerRequest, PractitionerValidationPartial } from '../modules/create-facility/models/create-facility-api-model';

// TODO: Type Requests
// TODO: Type responses
// TODO: Splunk logging for requests

@Injectable({
  providedIn: 'root'
})
export class BCPApiService extends AbstractHttpService {
  protected _headers: HttpHeaders;
  private token: string;
  public hasToken = false;
  public baseUrl = environment.api.base;

  // Do NOT add data-services here.  It should be passed data as parameters, and not require services.  
  constructor(protected http: HttpClient, private logger: SplunkLoggerService) {
    super(http);
  }

  protected handleError(error: HttpErrorResponse) {
    this.logger.logHttpError(error);

    // TODO: Improve / reduce logging here once done development.
    console.log('BCP API ERRROR', error);
    throw new Error('BCP API Error');

  }

  setToken(token: string) {
    this.token = token;
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
    const url = `${this.baseUrl}/validatePractitioner`;


    return this.post(url, payload);
  }

  validateFacility() {
    // TODO: Log! Both on failure and success.
    // TODO: Get proper values
    const payload = {
      facility: {
        facilityName: "HOGWARasdfTS CLINIC",
        postalCode: "V8Z3E6"
      },
      requestUUID: "000087",
      applicationUUID: "bd11bbc5-f670-f654-9fb7-01a7cba689a8"
    }
    const url = `${this.baseUrl}/validateFacility`;


    return this.post(url, payload);
  }


}


//validate pracName and number
//payload
const payload = {
  firstName: 'Bob',
  lastName: 'Smith',
  number: '12345',
  requestID: '<uuid from front-end for logging>'
}


const successResponse = {
  valid: true,
  requestID: '<same uuid from payload>'
}

const failureResponse = {
  valid: false,
  requestID: '<same uuid from payload>'
}

