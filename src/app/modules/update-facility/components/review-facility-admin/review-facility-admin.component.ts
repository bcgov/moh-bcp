import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewContainerComponent } from '../../../core-bcp/components/review-container/review-container.component';
import { UpdateFacilityDataService } from '../../services/update-facility-data.service';
import { UPDATE_FACILITY_PAGES } from '../../update-facility-route-constants';
import { setNotApplicable } from '../../../core-bcp/models/helperFunc';

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

    const phoneNumberEntry = {
      label: 'Contact phone number',
      value: this.dataService.phone
    };
    if (this.dataService.phoneExt) {
      phoneNumberEntry.value = phoneNumberEntry.value.concat(' Ext. ' + this.dataService.phoneExt);
    }

    const items = [
      [
        { label: 'Administrator First Name', value: this.dataService.firstName, },
        { label: 'Administrator Last Name', value: this.dataService.lastName, },
        { label: 'Contact email', value: this.dataService.email, },
        phoneNumberEntry,
        { label: 'Facility name', value: this.dataService.facilityName, },
        { label: 'Facility MSP Number', value: this.dataService.facilityMSPNumber, },
        { label: 'Facility fax number', value: setNotApplicable(this.dataService.facilityFax), },
      ],
    ];
    this.review.sectionItems = items;
  }

}
