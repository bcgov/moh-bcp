import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateFacilityForm } from '../../models/create-facility-form';
import { CheckCompleteBaseService } from 'moh-common-lib';
import { CREATE_FACILITY_PAGES } from '../../create-facility-route-constants';
import { CreateFacilityDataService } from '../../services/create-facility-data.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent extends CreateFacilityForm implements OnInit {

  confirmed : boolean = false;
  showDuplicateWarning = true;
  constructor(protected router: Router, 
              private pageCheckService: CheckCompleteBaseService,
              private dataService: CreateFacilityDataService) {
    super(router);
   }

  ngOnInit() {
    this.pageCheckService.setPageIncomplete();
    this.showDuplicateWarning = this.dataService.apiDuplicateWarning;
  }


  toggleValidation(data) {
    console.log(data as boolean);
    
    this.confirmed = data as boolean;
  }

  canContinue(){
    // TODO : Write! By Defualt this just returns this.form.valid, But if we do
    // not want to setup a form, we must modify this to just ensure the
    // "Authorization of Submission" checkbox is written.
    return this.confirmed;
  }

  continue() {
    if (this.canContinue()) {
      this.pageCheckService.setPageComplete();
      this.navigate(CREATE_FACILITY_PAGES.SUBMISSION.fullPath);
      // TODO: - API Request / Submission
    }
  }

}
