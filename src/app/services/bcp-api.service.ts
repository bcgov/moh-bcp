import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AbstractHttpService, CommonImage } from 'moh-common-lib';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { SplunkLoggerService } from './splunk-logger.service';
import { ValidatePractitionerRequest, PractitionerValidationPartial, FacilityValidationPartial } from '../modules/create-facility/models/create-facility-api-model';
import { CreateFacilityDataService } from '../modules/create-facility/services/create-facility-data.service';
import { flatMap, catchError } from 'rxjs/operators';
import { BCPDocumentTypes } from '../modules/core-bcp/models/documentTypes';

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
    jsonPayLoad.attachments = signature.toJSON();
    const payload = {
      createFacilitySubmission: jsonPayLoad,
      requestUUID,
      applicationUUID,
      // attachments: signature.toJSON()
    };

    this.dataService.jsonCreateFacility.request = payload;

    const url = `${this.baseUrl}/createFacility`;
    return this.post(url, payload);
  }

  private uploadSignature(attachment: CommonImage<BCPDocumentTypes>, applicationUUID) {
    let url = `${environment.api.attachment}/${applicationUUID}/attachments/${attachment.uuid}`;

    url += `?attachmentdocumenttype=SIGNATURE&programArea=CLAIMS&contentType=1`;

    return this.uploadAttachment(url, attachment);
  }

}
