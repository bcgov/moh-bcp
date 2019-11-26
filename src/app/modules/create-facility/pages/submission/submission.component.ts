import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { CreateFacilityForm } from '../../models/create-facility-form';
import { Router } from '@angular/router';
import { ApiStatusCodes } from 'moh-common-lib';
import { CreateFacilityDataService } from '../../services/create-facility-data.service';
import { formatDateForDisplay, setNotApplicable } from '../../../core-bcp/models/helperFunc';
import { CREATE_FACILITY_PAGES } from '../../create-facility-route-constants';


// TODO: Class should extend Base not CreateFaciityForm - this is a confirmation page
// should probably be renamed to confirmation
@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss'],
  encapsulation: ViewEncapsulation.None, // for print css
})
export class SubmissionComponent extends CreateFacilityForm implements OnInit {

  @Input() printMode: boolean = false;

  // default icon - if return code < 0 then its an error
  displayIcon: ApiStatusCodes = ApiStatusCodes.ERROR;

  /** An application is still a "success" even if it's under review */
  isUnderReview: boolean = false;

  constructor(protected router: Router,
              public dataService: CreateFacilityDataService) {
    super(router);
  }

  ngOnInit() {

    // Set icon to be displayed
    if (this.dataService.jsonCreateFacility.response &&
        this.dataService.jsonCreateFacility.response.returnCode >= ApiStatusCodes.SUCCESS) {
      this.displayIcon = this.dataService.jsonCreateFacility.response.returnCode;
      this.isUnderReview = (this.displayIcon === ApiStatusCodes.WARNING);
    }

    // Set isPrintView to true
    this.dataService.isPrintView = true;
  }

  get confirmationMessage() {
    let confirmMessage = 'Your application has been submitted';
    if (this.displayIcon === ApiStatusCodes.WARNING) {
      confirmMessage = 'Your application has been submitted but you will need to ' +
        'contact HIBC for the Facility Number.';
    } else if (this.displayIcon === ApiStatusCodes.ERROR) {
      confirmMessage = 'Sorry, there was an error processing your application. ' +
        'Please try again. If you continue to receive this error please contact HIBC.';
    }

    return confirmMessage;
  }

  get isError() {
    return this.displayIcon === ApiStatusCodes.ERROR;
  }

  // TODO: Remove not a form.
  continue() {
    console.log('TODO');
  }

  get facilityNumberText() {

    if (this.isUnderReview) {
      return 'Contact HIBC';
    }
    // TODO - Is facility # considered PI Data?
    return setNotApplicable(this.dataService.jsonCreateFacility.response.facilityNumber);
  }

  print(event: Event) {
    window.print();
    event.stopPropagation();
    return false;
  }

  // Format dates for displaying
  get submissionDate() {
    return formatDateForDisplay(this.dataService.dateOfSubmission);
  }

  get facInfoEffectiveDate() {
    return formatDateForDisplay(this.dataService.facInfoEffectiveDate);
  }

  get dateOfDeclaration() {
    return formatDateForDisplay(this.dataService.dateOfDeclaration);
  }

  // Title for route
  get pageTitle() {
    return CREATE_FACILITY_PAGES.SUBMISSION.title;
  }

}
