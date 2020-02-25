import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UPDATE_FACILITY_PAGES } from '../../update-facility-route-constants';
import { ApiStatusCodes, PageStateService } from 'moh-common-lib';
import { UpdateFacilityDataService } from '../../services/update-facility-data.service';
import { ConfirmBaseForm } from '../../../core-bcp/models/confirm-base-form';
import { PrivacyStmt } from '../../../core-bcp/components/core-consent-modal/core-consent-modal.component';
import { HeaderService } from '../../../../services/header.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'bcp-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss'],
  encapsulation: ViewEncapsulation.None, // for print css
})
export class SubmissionComponent extends ConfirmBaseForm implements OnInit {

  readonly privacyStatement = PrivacyStmt;
  readonly hibcLink: string = environment.links.hibc;

  constructor(protected dataService: UpdateFacilityDataService,
              protected pageStateService: PageStateService,
              protected headerService: HeaderService) {
    super(dataService, pageStateService, headerService);
  }

  ngOnInit() {
    super.ngOnInit();

    // Set icon to be displayed
    if (this.dataService.jsonMaintPractitioner.response) {

      if ( this.dataService.jsonMaintPractitioner.response.returnCode === ApiStatusCodes.SUCCESS ) {

        // Assumed all is good - processed automatically or has multiple BCP effective periods (manual review)
        this.displayIcon = ApiStatusCodes.SUCCESS;
      } else {

        if ( this.dataService.jsonMaintPractitioner.response.referenceNumber ) {
          // Assumed something went wrong with automated processing but is in MAXHUB
          this.displayIcon = ApiStatusCodes.SUCCESS;
        }
      }
    }
  }

  get confirmationMessage() {
    let confirmMessage = 'Your application has been submitted';
    if (this.displayIcon === ApiStatusCodes.WARNING) {
      confirmMessage = 'YELLOW 1 Message';
    } else if (this.displayIcon === ApiStatusCodes.ERROR) {
      confirmMessage = 'Sorry, there was an error processing your application. ' +
        'Please try again. If you continue to receive this error please contact HIBC.';
    }

    return confirmMessage;
  }

  // Title for route
  get pageTitle() {
    return UPDATE_FACILITY_PAGES.SUBMISSION.title;
  }

  get referenceNumber() {
    return this.dataService.jsonMaintPractitioner.response.referenceNumber;
  }

  get declarationText() {
    return this.dataService.declarationText;
  }

}
