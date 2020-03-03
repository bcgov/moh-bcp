import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewContainerComponent } from '../../../core-bcp/components/review-container/review-container.component';
import { UpdateFacilityDataService } from '../../services/update-facility-data.service';
import { UPDATE_FACILITY_PAGES } from '../../update-facility-route-constants';

@Component({
  selector: 'bcp-review-facility-admin',
  templateUrl: './review-facility-admin.component.html',
  styleUrls: ['./review-facility-admin.component.scss']
})
export class ReviewFacilityAdminComponent implements OnInit {
  @ViewChild(ReviewContainerComponent, { static: true }) review: ReviewContainerComponent;

  constructor(public dataService: UpdateFacilityDataService) { }

  ngOnInit() {
    this.reviewItems();
  }

  reviewItems() {
    this.review.displayPrintView = this.dataService.isPrintView;
    this.review.redirectPath = UPDATE_FACILITY_PAGES.FACILITY_ADMIN.fullpath;
    this.review.header = UPDATE_FACILITY_PAGES.FACILITY_ADMIN.title;

    const items = [
      [
        { label: 'Administrator First Name', value: this.dataService.firstName, },
        { label: 'Administrator Last Name', value: this.dataService.lastName, },
      ],
    ];
    this.review.sectionItems = items;
  }

}
