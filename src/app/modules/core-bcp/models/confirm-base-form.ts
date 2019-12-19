import { Base, ApiStatusCodes, PageStateService } from 'moh-common-lib';
import { OnInit } from '@angular/core';
import { BaseDataService } from '../../../services/base-data.service';
import { formatDateForDisplay } from './helperFunc';

export class ConfirmBaseForm extends Base implements OnInit {

  // default icon - if return code < 0 then its an error
  displayIcon: ApiStatusCodes = ApiStatusCodes.SUCCESS;

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

  get signature() {
    return this.dataService.signature ? this.dataService.signature.fileContent : null;
  }

}
