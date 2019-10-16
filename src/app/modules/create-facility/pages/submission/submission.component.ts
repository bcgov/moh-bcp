import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CreateFacilityForm } from '../../models/create-facility-form';
import { Router } from '@angular/router';
import { ApiStatusCodes } from 'moh-common-lib';
import { CreateFacilityDataService } from '../../services/create-facility-data.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss'],
  encapsulation: ViewEncapsulation.None, // for print css
})
export class SubmissionComponent extends CreateFacilityForm implements OnInit {

  constructor(protected router: Router, protected dataService: CreateFacilityDataService) {
    super(router);
  }

  templateStatus: ApiStatusCodes

  /** An application is still a "success" even if it's under review */
  isUnderReview: boolean = false;

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

  print(event: Event){
    window.print();
    event.stopPropagation();
    return false;
  }

}
