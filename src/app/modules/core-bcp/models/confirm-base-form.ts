import { Base, ApiStatusCodes, PageStateService } from 'moh-common-lib';
import { OnInit } from '@angular/core';
import { BaseDataService } from '../../../services/base-data.service';
import { formatDateForDisplay } from './helperFunc';

export class ConfirmBaseForm extends Base implements OnInit {

  // default icon - if return code < 0 then its an error
  displayIcon: ApiStatusCodes = ApiStatusCodes.ERROR;

  constructor( protected dataService: BaseDataService,
               protected pageStateService: PageStateService ) {
    super();
  }

  ngOnInit() {

    this.pageStateService.clearCompletePages();

    // Set isPrintView to true
    this.dataService.isPrintView = true;
  }

  getConfirmationMessage() {
    let confirmMessage = 'Your application has been submitted';

    if (this.displayIcon === ApiStatusCodes.ERROR) {
      confirmMessage = 'There was an error processing your application. Please try again. ' +
                       'If you continue to receive this message, contact HIBC at (604) 456-6950 (lower mainland) or 1-866-456-6950 (elsewhere in BC).';
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

  get signature() {
    return this.dataService.signature ? this.dataService.signature.fileContent : null;
  }

}
