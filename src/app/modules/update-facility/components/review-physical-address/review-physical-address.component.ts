import { Component, OnInit, ViewChild } from '@angular/core';
import { SubheadingReviewContainerComponent } from '../subheading-review-container/subheading-review-container.component';
import { UpdateFacilityDataService } from '../../services/update-facility-data.service';
import { UPDATE_FACILITY_PAGES } from '../../update-facility-route-constants';

@Component({
  selector: 'bcp-review-physical-address',
  templateUrl: './review-physical-address.component.html',
  styleUrls: ['./review-physical-address.component.scss']
})
export class ReviewPhysicalAddressComponent implements OnInit {
  @ViewChild(SubheadingReviewContainerComponent, { static: true }) review: SubheadingReviewContainerComponent;

  constructor(public dataService: UpdateFacilityDataService) { }

  ngOnInit() {
    this.reviewItems();
  }

  reviewItems() {
    this.review.displayPrintView = this.dataService.isPrintView;
    this.review.redirectPath = UPDATE_FACILITY_PAGES.CANCEL_CHANGE.fullpath;
    this.review.header = 'Change Facility Physical Address';

    const items = [
      [
        { label: 'label', value: 'value', },
      ],
    ];
    this.review.sectionItems = items;
  }

}
