import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateFacilityDataService {
  // Home
  informationCollectionNoticeConsent: boolean;
  // Facility Administrator
  facAdminFirstName: string;
  facAdminLastName: string;
  pracNumber = '';
  emailAddress: string;
  confirmEmailAddress: string;
  facAdminPhoneNumber: string;
  facAdminExtension: string;

  constructor() {
    if (environment.bypassModal) {
      this.informationCollectionNoticeConsent = true;
    }
  }
}
