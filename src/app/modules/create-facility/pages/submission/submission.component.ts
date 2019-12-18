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
    if (this.dataService.jsonCreateFacility.response &&
        this.dataService.jsonCreateFacility.response.returnCode >= ApiStatusCodes.SUCCESS) {
      this.displayIcon = this.dataService.jsonCreateFacility.response.returnCode;
      this.isUnderReview = (this.displayIcon === ApiStatusCodes.WARNING);
    }
  }

  get confirmationMessage() {
    if (this.displayIcon === ApiStatusCodes.WARNING) {
      return 'Your application has been submitted but you will need to ' +
        'contact HIBC for the Facility Number.';
    }

    return super.getConfirmationMessage();
  }

  get facilityNumberText() {

    if (this.isUnderReview) {
      return 'Contact HIBC';
    }
    // TODO - Is facility # considered PI Data?
    return setNotApplicable(this.dataService.jsonCreateFacility.response.facilityNumber);
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

}
