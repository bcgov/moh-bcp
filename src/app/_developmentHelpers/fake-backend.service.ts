import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { ReturnCodes, APIBase } from '../modules/core-bcp/models/base-api.model';
import { stringify } from 'querystring';


@Injectable({
  providedIn: 'root'
})
export class FakeBackendService {

  constructor() {}

  validatePractitioner( request: HttpRequest<any> ): any {

    // TODO: Create different return values base on data sent in request
    const obj = {
      returnCode: ReturnCodes.SUCCESS,
      message: 'MATCH'
    };

    return Object.assign(this._baseResponse( request ), obj);
  }

  validateFacility( request: HttpRequest<any> ): any {

    // TODO: Create different return values base on data sent in request
    const obj = {
      returnCode: ReturnCodes.SUCCESS,
      message: 'MATCH',
      effectiveDate: '2020-01-01',
      cancelDate: '2021-01-01',
    };

    return Object.assign(this._baseResponse( request ), obj);
  }

  createFacility( request: HttpRequest<any> ): any {

    // TODO: Create different return values base on data sent in request
    const obj = {
      returnCode: ReturnCodes.SUCCESS,
      referenceNumber: this._generateReferenceNumber(),
      facilityNumber: 'F' + String( Math.round( Math.random() * 999999 ) )
    };

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

}
