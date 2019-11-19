import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CreateFacilityForm } from '../../models/create-facility-form';
import { Router } from '@angular/router';
import { ApiStatusCodes } from 'moh-common-lib';
import { CreateFacilityDataService } from '../../services/create-facility-data.service';
import { formatDateForDisplay } from '../../../core-bcp/models/helperFunc';


// TODO: Class should extend Base not CreateFaciityForm - this is a confirmation page
// should probably be renamed to confirmation
@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss'],
  encapsulation: ViewEncapsulation.None, // for print css
})
export class SubmissionComponent extends CreateFacilityForm implements OnInit {

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
    }
  }

  get confirmationMessage() {
    return this.displayIcon === ApiStatusCodes.SUCCESS ?
      'Your application has been submitted' : 'Your application failed to be submitted';
  }

  continue() {
    console.log('TODO');
  }

  get facilityNumberText() {
    if (this.isUnderReview) {
      return 'Under Review';
    }
    // todo - if response, show that.
    return 'N/A';
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

}
