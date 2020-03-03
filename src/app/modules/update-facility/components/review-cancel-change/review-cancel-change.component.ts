import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewContainerComponent } from '../../../core-bcp/components/review-container/review-container.component';
import { UpdateFacilityDataService } from '../../services/update-facility-data.service';
import { UPDATE_FACILITY_PAGES } from '../../update-facility-route-constants';

@Component({
  selector: 'bcp-review-cancel-change',
  templateUrl: './review-cancel-change.component.html',
  styleUrls: ['./review-cancel-change.component.scss']
})
export class ReviewCancelChangeComponent implements OnInit {
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
