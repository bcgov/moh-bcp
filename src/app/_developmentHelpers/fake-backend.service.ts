import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { ReturnCodes, APIBase, PractitionerValidationPartial, FacilityValidationPartial } from '../modules/core-bcp/models/base-api.model';
import { CreateResponse } from '../modules/create-facility/models/create-facility-api-model';
import { message } from '../../version.GENERATED';


interface PractitionerData extends PractitionerValidationPartial {
  returnCode: string;
  message: string;
}

interface FacilityData extends FacilityValidationPartial {
  returnCode: string;
  message: string;
}

interface CreateFacilityResp {
  number: string;
  postalCode: string;
  returnCode: ReturnCodes;
  message?: string;
  reqReferenceNo?: boolean;
  reqFaciltyNo?: boolean;
}

enum MESSAGES {
  MATCH = 'EXACT MATCH',
  NEAR_MATCH = 'NEAR MATCH',
  NO_MATCH = 'NOT MATCHED'
}

@Injectable({
  providedIn: 'root'
})
export class FakeBackendService {

  private _practitionerData: PractitionerData[] = [
    {firstName: 'Test', lastName: 'PrivatePractice', number: '99901',
     returnCode: ReturnCodes.SUCCESS, message: MESSAGES.MATCH, doctor: true},
    {firstName: 'Test', lastName: 'PrivatePractice', number: '99902',
    returnCode: ReturnCodes.FAILURE, message: MESSAGES.NO_MATCH, doctor: false},
    {firstName: 'John', lastName: 'Doe', number: '12345',
    returnCode: ReturnCodes.SUCCESS, message: MESSAGES.MATCH, doctor: true},
  ];

  private _facilityData: FacilityData[] = [
    {facilityName: 'RiverDale House', postalCode: 'v9v9v9', returnCode: ReturnCodes.SUCCESS, message: MESSAGES.NO_MATCH ,
    number: null},
    {facilityName: 'River Clinic', postalCode: 'v1v1v1', returnCode: ReturnCodes.WARNING, message: MESSAGES.NEAR_MATCH,
    number: null },
    {facilityName: 'RiverDale Clinic', postalCode: 'v3v3v3', returnCode: ReturnCodes.WARNING, message: MESSAGES.MATCH,
    number: null},
    {facilityName: null, postalCode: 'v9v9v9', returnCode: ReturnCodes.SUCCESS, message: MESSAGES.MATCH, number: '12345',
    effectiveDate: '2020-01-01', cancelDate: '2021-01-01'},
    {facilityName: null, postalCode: 'v1v1v1', returnCode: ReturnCodes.WARNING, message: MESSAGES.NEAR_MATCH, number: null,
    effectiveDate: '2020-01-01', cancelDate: '2021-01-01' },
    {facilityName: null, postalCode: 'v3v3v3', returnCode: ReturnCodes.WARNING, message: MESSAGES.MATCH, number: null,
    effectiveDate: '2020-01-01', cancelDate: '2021-01-01'},
  ];

  private _createFacilityResp: CreateFacilityResp[] = [
    {number: '99901', postalCode: 'v9v9v9', returnCode: ReturnCodes.SUCCESS},
    {number: '99901', postalCode: 'v1v1v1', returnCode: ReturnCodes.WARNING},
    {number: '99901', postalCode: 'v3v3v3', returnCode: ReturnCodes.FAILURE},
    {number: '99901', postalCode: 'v4t4t4', returnCode: ReturnCodes.FAILURE, message: 'postal code error' },
  ];

  constructor() {}

  validatePractitioner( request: HttpRequest<any> ): any {
    const obj = {
      returnCode: this._generateRandomNumber(),
      message: 'Some error occurred'
    };

    const data = this._practitionerData.find( x =>
      request.body.practitioner.number === x.number &&
      request.body.practitioner.firstName.toUpperCase() === x.firstName.toUpperCase() &&
      request.body.practitioner.lastName.toUpperCase() === x.lastName.toUpperCase()
      );

    if ( data ) {
      // update object
      obj.returnCode = data.returnCode;
      obj.message = data.message;
    }

    return Object.assign(this._baseResponse( request ), obj);
  }

  validateFacility( request: HttpRequest<any> ): any {

    const obj: any = {
      returnCode: this._generateRandomNumber(),
      message: 'Some error occurred'
    };

    const data = this._facilityData.find( x =>
      x.postalCode.toUpperCase() === request.body.facility.postalCode.toUpperCase()
      && ( (request.body.facility.facilityName
          && x.facilityName
          && x.facilityName.toUpperCase() === request.body.facility.number.toUpperCase())
        || (request.body.facility.facilityNumber
          && x.number
          && x.number.toUpperCase() === request.body.facility.number.toUpperCase() ) )
      );

    if ( data ) {
      // update object
      obj.returnCode = data.returnCode;
      obj.message = data.message;
      obj.effectiveDate = data.effectiveDate;
      obj.cancelDate = data.cancelDate;
    }


    // TODO: Create different return values base on data sent in request
   /* const obj = {
      returnCode: ReturnCodes.SUCCESS,
      message: 'MATCH',
      effectiveDate: '2020-01-01',
      cancelDate: '2021-01-01',
    };*/

    return Object.assign(this._baseResponse( request ), obj);
  }

  createFacility( request: HttpRequest<any> ): any {

    const data = this._createFacilityResp.find( x =>
      x.postalCode.toUpperCase() === request.body.createFacilitySubmission.facility.postalCode.toUpperCase() &&
      x.number === request.body.createFacilitySubmission.administrator.pracNumber
      );

    const obj: {
        returnCode: string;
        referenceNumber?: string;
        facilityNumber?: string;
        message?: string;
      } = { returnCode: data ? data.returnCode : this._generateRandomNumber() };

    if ( data ) {

      obj.referenceNumber = this._generateReferenceNumber();

      if ( request.body.createFacilitySubmission.validateFacilityMessage === MESSAGES.NO_MATCH ) {
        obj.facilityNumber = 'F' + String( Math.round( Math.random() * 999999 ));
      }

      if ( data.message ) {
        obj.message = data.message;
      }

    }  else {
      obj.message = 'some error';
      if ( Number( obj.returnCode ) % 2) {
        obj.referenceNumber = this._generateReferenceNumber();
      }
    }
    console.log( 'obj: ', obj );

    return Object.assign(this._baseResponse( request ), obj);
  }

  maintainPractitioner( request: HttpRequest<any> ): any {
    const obj = {
      returnCode: ReturnCodes.SUCCESS,
      referenceNumber: this._generateReferenceNumber(),
      facilityNumber: 'F' + String( Math.round( Math.random() * 999999 ) )
    };

    return Object.assign(this._baseResponse( request ), obj);
  }

  bcpAttachment( request: HttpRequest<any> ): any {

    // Information is in the URL
    const start =  request.url.indexOf( 'bcpAttachment' );
    const end = request.url.indexOf('?');
    const items = request.url.substring( start, end ).split('/');

    return JSON.stringify( {
      documentuuid: items[1],
      attachmentuuid: items[3],
      returnCode: 200
    });
  }

  private _baseResponse( request: HttpRequest<any> ): APIBase {
    return {
      requestUUID: request.body.requestUUID,
      applicationUUID: request.body.applicationUUID,
    };
  }

  private _generateReferenceNumber(): string {
    return 'BCP' + String( Math.round( Math.random() * 99999999 ) );
  }

  private _generateRandomNumber(): string {
    return String(Math.round( -(Math.random() * 999)  + 1));
  }

}
