import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { formatDateForDisplay } from '../../../core-bcp/models/helperFunc';
import { ApiStatusCodes, Base, PageStateService } from 'moh-common-lib';
import { RegisterPractitionerDataService } from '../../services/register-practitioner-data.service';

@Component({
  selector: 'bcp-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss'],
  encapsulation: ViewEncapsulation.None, // for print css
})
export class SubmissionComponent extends Base implements OnInit {

  // default icon - if return code < 0 then its an error
  displayIcon: ApiStatusCodes = ApiStatusCodes.ERROR;

  /** An application is still a "success" even if it's under review */
  isUnderReview: boolean = false;

  constructor(public dataService: RegisterPractitionerDataService,
              private pageStateService: PageStateService) {
    super();
  }

  ngOnInit() {

    this.pageStateService.clearCompletePages();

    // Set icon to be displayed
  /*  if (this.dataService.jsonCreateFacility.response &&
        this.dataService.jsonCreateFacility.response.returnCode >= ApiStatusCodes.SUCCESS) {
      this.displayIcon = this.dataService.jsonCreateFacility.response.returnCode;
    }*/

    // Set isPrintView to true
    this.dataService.isPrintView = true;
  }

  get confirmationMessage() {
    let confirmMessage = 'Your application has been submitted';
    if (this.displayIcon === ApiStatusCodes.WARNING) {
      confirmMessage = 'IS THERE A WARNING MESSAGE???';
    } else if (this.displayIcon === ApiStatusCodes.ERROR) {
      confirmMessage = 'Sorry, there was an error processing your application. ' +
        'Please try again. If you continue to receive this error please contact HIBC.';
    }

    return confirmMessage;
  }

  get isError() {
    return this.displayIcon === ApiStatusCodes.ERROR;
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

  get dateOfAcceptance() {
    return formatDateForDisplay(this.dataService.dateOfAcceptance);
  }

  // Title for route
  get pageTitle() {
    return PRACTITIONER_REGISTRATION_PAGES.SUBMISSION.title;
  }

  get referenceNumber() {
    return 'NEED TO DO';
  }

}
