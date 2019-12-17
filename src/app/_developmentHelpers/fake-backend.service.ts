import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { ReturnCodes, APIBase } from '../modules/core-bcp/models/base-api.model';


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

  validateFacility(request: HttpRequest<any> ): any {

    // TODO: Create different return values base on data sent in request
    const obj = {
      returnCode: ReturnCodes.SUCCESS,
      message: 'MATCH'
    };

    return Object.assign(this._baseResponse( request ), obj);
  }

  createFacility(request: HttpRequest<any> ): any {
    const referenceNo = 'BCP' + String( Math.round( Math.random() * 99999999 ) );

    // TODO: Create different return values base on data sent in request
    const obj = {
      returnCode: ReturnCodes.SUCCESS,
      referenceNumber: referenceNo,
      facilityNumber: 'F' + String( Math.round( Math.random() * 999999 ) )
    };

    return Object.assign(this._baseResponse( request ), obj);
  }


  private _baseResponse( request: HttpRequest<any> ): APIBase {
    return {
      requestUUID: request.body.requestUUID,
      applicationUUID: request.body.applicationUUID,
    };
  }

}
