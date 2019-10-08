import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateFacilityForm } from '../../models/create-facility-form';
import { CheckCompleteBaseService } from 'moh-common-lib';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent extends CreateFacilityForm implements OnInit {

  constructor(protected router: Router, private pageCheckService: CheckCompleteBaseService) {
    super(router);
   }

  ngOnInit() {
    this.pageCheckService.setPageIncomplete();
  }

  continue() {
    if (this.canContinue()) {
      this.pageCheckService.setPageComplete();
      // TODO: - API Request / Submission
    }
  }

}
