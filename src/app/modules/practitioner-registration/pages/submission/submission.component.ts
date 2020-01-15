import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { formatDateForDisplay } from '../../../core-bcp/models/helperFunc';
import { ApiStatusCodes, Base, PageStateService } from 'moh-common-lib';
import { RegisterPractitionerDataService } from '../../services/register-practitioner-data.service';
import { ConfirmBaseForm } from '../../../core-bcp/models/confirm-base-form';
import { PrivacyStmt } from '../../../core-bcp/components/core-consent-modal/core-consent-modal.component';

@Component({
  selector: 'bcp-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss'],
  encapsulation: ViewEncapsulation.None, // for print css
})
export class SubmissionComponent extends ConfirmBaseForm implements OnInit {

  readonly privacyStatement = PrivacyStmt;

  constructor(protected dataService: RegisterPractitionerDataService,
              protected pageStateService: PageStateService) {
    super(dataService, pageStateService);
  }

  ngOnInit() {
    super.ngOnInit();

    // Set icon to be displayed
    if (this.dataService.jsonMaintPractitioner.response &&
        this.dataService.jsonMaintPractitioner.response.returnCode >= ApiStatusCodes.SUCCESS) {
      this.displayIcon = this.dataService.jsonMaintPractitioner.response.returnCode;
    }
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

  // Title for route
  get pageTitle() {
    return PRACTITIONER_REGISTRATION_PAGES.SUBMISSION.title;
  }

  get referenceNumber() {
    return this.dataService.jsonMaintPractitioner.response.referenceNumber;
  }

  get declarationText() {
    return this.dataService.declarationText;
  }

}
