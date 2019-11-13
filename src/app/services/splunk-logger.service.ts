import { Injectable } from '@angular/core';
import { CommonLogger, CommonLogMessage } from 'moh-common-lib';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class SplunkLoggerService extends CommonLogger {

  constructor(protected http: HttpClient) {
    super(http);
    this.setURL(environment.api.splunk);
    this.programName = 'bcp';
    // generate session per refresh as no state persists.
    this.applicationId = UUID.UUID();
   }

   public log(message: BCPLogMessage) {
    return this._log( message );
   }
}


export interface BCPLogMessage extends CommonLogMessage {
  event: 'navigation' | 'error' | 'submission';
  [key: string]: any;
}
