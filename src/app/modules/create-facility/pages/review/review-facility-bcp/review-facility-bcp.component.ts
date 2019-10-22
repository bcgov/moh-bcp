import { Component, OnInit, ViewChild } from '@angular/core';
import { ROUTES_FACILITY } from '../../../models/routes.constants';
import { ReviewContainerComponent } from 'src/app/modules/core-bcp/review-container/review-container.component';
import { RandomObjects, IFacilityInfo } from '../../../models/i-dataform';

@Component({
  selector: 'bcp-review-facility-bcp',
  templateUrl: './review-facility-bcp.component.html',
  styleUrls: ['./review-facility-bcp.component.scss']
})
export class ReviewFacilityBcpComponent implements OnInit {

  @ViewChild(ReviewContainerComponent, {static: true})
  review: ReviewContainerComponent;

  constructor() { }

  ngOnInit() {
    this.reviewItems();
  }

  reviewItems() {
    
    this.review.redirectPath = ROUTES_FACILITY.FACILITY.fullpath;
    this.review.header = 'Business Cost Premium';

    const form =RandomObjects.getFacilityInfo('');
    console.log(form);
    if (!form) return;
    
    const infoObject:IFacilityInfo = form;
    if (!infoObject) return;

    const items = [
        [
            {
                label: 'Does your business qualify for Business Cost Premium?',
                value: infoObject.isQualifyForBCP === true? 'Yes': 'No',
            }
        ],
    ];
    this.review.sectionItems = items;
  }

}
