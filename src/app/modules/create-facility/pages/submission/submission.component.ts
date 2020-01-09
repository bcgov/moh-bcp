import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CreateFacilityDataService } from '../../services/create-facility-data.service';
import { formatDateForDisplay, setNotApplicable } from '../../../core-bcp/models/helperFunc';
import { CREATE_FACILITY_PAGES } from '../../create-facility-route-constants';
import { ApiStatusCodes, PageStateService } from 'moh-common-lib';
import { ConfirmBaseForm } from '../../../core-bcp/models/confirm-base-form';


// TODO: Class should extend Base not CreateFaciityForm - this is a confirmation page
// should probably be renamed to confirmation
@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss'],
  encapsulation: ViewEncapsulation.None, // for print css
})
export class SubmissionComponent extends ConfirmBaseForm implements OnInit {

  /** An application is still a "success" even if it's under review */
  isUnderReview: boolean = false;

  constructor(protected dataService: CreateFacilityDataService,
              protected pageStateService: PageStateService) {
    super(dataService, pageStateService);
  }

  ngOnInit() {
    super.ngOnInit();

    // Set icon to be displayed
    if (this.dataService.jsonCreateFacility.response) {

      if ( this.response.referenceNumber && this.response.facilityNumber ) {
        this.displayIcon = this.displayIcon = ApiStatusCodes.SUCCESS;
      } else if ( this.response.referenceNumber ) {
        // ideally return code should change on server side, as this is same as a "MATCH" request
        this.isUnderReview = true;
        this.displayIcon = ApiStatusCodes.WARNING;
      } else {
        // No reference number - Error
        this.displayIcon = ApiStatusCodes.ERROR;
      }
    }
  }

  get confirmationMessage() {

    if (this.displayIcon === ApiStatusCodes.WARNING) {
      return 'Your application has been submitted but there may be a Facility Number assigned to that ' +
             'facility already, contact HIBC at (604) 456-6950 (lower mainland) or 1-866-456-6950 (elsewhere in B.C.).';
    }


    return super.getConfirmationMessage();
  }

  get response() {
    return this.dataService.jsonCreateFacility.response;
  }

  get facilityNumberText() {

    return this.dataService.jsonCreateFacility.response.facilityNumber ?
          this.dataService.jsonCreateFacility.response.facilityNumber : 'Contact HIBC';
  }

  get referenceNumber() {
    return this.dataService.jsonCreateFacility.response.referenceNumber ?
      this.dataService.jsonCreateFacility.response.referenceNumber : null;
  }

  get facInfoEffectiveDate() {
    return formatDateForDisplay(this.dataService.facInfoEffectiveDate);
  }

  // Title for route
  get pageTitle() {
    return CREATE_FACILITY_PAGES.SUBMISSION.title;
  }

  get declarationText() {
    return this.dataService.declarationText;
  }

}
