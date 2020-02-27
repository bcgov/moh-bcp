import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewContainerComponent } from '../../../core-bcp/components/review-container/review-container.component';
import { UpdateFacilityDataService } from '../../services/update-facility-data.service';
import { UPDATE_FACILITY_PAGES } from '../../update-facility-route-constants';

@Component({
  selector: 'bcp-review-form-page',
  templateUrl: './review-form-page.component.html',
  styleUrls: ['./review-form-page.component.scss']
})
export class ReviewFormPageComponent implements OnInit {
  @ViewChild(ReviewContainerComponent, { static: true }) review: ReviewContainerComponent;

  constructor(public dataService: UpdateFacilityDataService) { }

  ngOnInit() {
    this.reviewItems();
  }

  reviewItems() {
    this.review.displayPrintView = this.dataService.isPrintView;
    this.review.redirectPath = UPDATE_FACILITY_PAGES.CANCEL_CHANGE.fullpath;
    this.review.header = UPDATE_FACILITY_PAGES.CANCEL_CHANGE.title;

    const items = [
      [
        { label: 'Sample Form Input', value: null, },
      ],
    ];
    this.review.sectionItems = items;
  }

}
