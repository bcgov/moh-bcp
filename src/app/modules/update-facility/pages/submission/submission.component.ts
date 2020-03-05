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
  readonly hibcLink = environment.links.hibc;

  constructor(protected dataService: UpdateFacilityDataService,
              protected pageStateService: PageStateService,
              protected headerService: HeaderService) {
    super(dataService, pageStateService, headerService);
  }

  ngOnInit() {
    super.ngOnInit();

    // TODO: Set icon to be displayed
    this.displayIcon = ApiStatusCodes.SUCCESS;
  }

  get confirmationMessage() {
    let confirmMessage = 'Your application has been submitted and will be processed within 5-10 business days. Health Insurance BC may contact you if there are questions about your application.';
    if (this.displayIcon === ApiStatusCodes.WARNING) {
      // TODO: Set warning message.
    } else if (this.displayIcon === ApiStatusCodes.ERROR) {
      confirmMessage = 'There was an error processing your application. Please try again. If you continue to receive this message, contact HIBC at (604) 456-6950 (lower mainland) or 1-866-456-6950 (elsewhere in BC).';
    }
    return confirmMessage;
  }

  // Title for route
  get pageTitle() {
    return UPDATE_FACILITY_PAGES.SUBMISSION.title;
  }

  get referenceNumber() {
    // TODO: Return reference number recieved from API response.
    return '';
  }

  get declarationText() {
    return this.dataService.declarationText;
  }

  printPage() {
    window.print();
  }

}
