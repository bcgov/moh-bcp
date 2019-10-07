import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateFacilityDataService {
  informationCollectionNoticeConsent: boolean;

  constructor() {
    if (environment.bypassModal) {
      this.informationCollectionNoticeConsent = true;
    }
  }
}
