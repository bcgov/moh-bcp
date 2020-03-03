import { Injectable } from '@angular/core';
import { BCPApiService } from '../../../services/bcp-api.service';
import { HttpClient } from '@angular/common/http';
import { SplunkLoggerService } from '../../../services/splunk-logger.service';
import { UpdateFacilityDataService } from './update-facility-data.service';
import { CommonImage } from 'moh-common-lib';
import { flatMap, catchError } from 'rxjs/operators';
import { BCPDocumentTypes } from '../../core-bcp/models/documentTypes';

@Injectable({
  providedIn: 'root'
})
export class UpdateFacilityApiService extends BCPApiService {

  constructor(protected http: HttpClient,
              protected logger: SplunkLoggerService,
              protected dataService: UpdateFacilityDataService) {
    super(http, logger, dataService);
  }


}
