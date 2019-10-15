import { Component, OnInit } from '@angular/core';
import { CreateFacilityForm } from '../../models/create-facility-form';
import { Router } from '@angular/router';
import { ApiStatusCodes } from 'moh-common-lib';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent extends CreateFacilityForm implements OnInit {

  constructor(protected router: Router) {
    super(router);
  }

  templateStatus: ApiStatusCodes

  /** An application is still a "success" even if it's under review */
  isUnderReview: boolean = true;

  ngOnInit() {
  }

  continue(){
    console.log('TODO');
  }

  get facilityNumberText(){
    if (this.isUnderReview) return 'Under Review'
    // todo - if response, show that.
    return 'N/A';
  }

}
