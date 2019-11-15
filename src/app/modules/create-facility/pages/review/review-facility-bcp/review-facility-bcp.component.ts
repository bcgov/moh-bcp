import { Component, OnInit, ViewChild } from '@angular/core';
import { ROUTES_FACILITY } from '../../../models/routes.constants';
import { ReviewContainerComponent } from 'src/app/modules/core-bcp/components/review-container/review-container.component';
import { CreateFacilityDataService } from '../../../services/create-facility-data.service';

@Component({
  selector: 'bcp-review-facility-bcp',
  templateUrl: './review-facility-bcp.component.html',
  styleUrls: ['./review-facility-bcp.component.scss']
})
export class ReviewFacilityBcpComponent implements OnInit {

  @ViewChild(ReviewContainerComponent, {static: true})
  review: ReviewContainerComponent;

  constructor(public dataService: CreateFacilityDataService) { }

  ngOnInit() {
    this.reviewItems();
  }

  reviewItems() {

    this.review.redirectPath = ROUTES_FACILITY.FACILITY.fullpath;
    this.review.header = 'Business Cost Premium';

    const items = [
      [
        {
          label: 'Does your business qualify for Business Cost Premium?',
          value: this.dataService.facInfoIsQualifyForBCP === true ? 'Yes' : 'No',
        }
      ],
    ];
    this.review.sectionItems = items;
  }

}
