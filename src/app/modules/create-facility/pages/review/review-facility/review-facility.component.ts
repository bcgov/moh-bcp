import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewContainerComponent } from 'src/app/modules/core-bcp/components/review-container/review-container.component';
import { ROUTES_FACILITY } from '../../../models/routes.constants';
import { CreateFacilityDataService } from '../../../services/create-facility-data.service';
import { getProvinceDescription } from 'moh-common-lib';
import { setNotApplicable } from '../../../../core-bcp/models/helperFunc';

@Component({
  selector: 'bcp-review-facility',
  templateUrl: './review-facility.component.html',
  styleUrls: ['./review-facility.component.scss']
})
export class ReviewFacilityComponent implements OnInit {
  @ViewChild(ReviewContainerComponent, { static: true })
  review: ReviewContainerComponent;

  constructor(public dataService: CreateFacilityDataService) { }

  ngOnInit() {
    this.reviewItems();
  }

  reviewItems() {

    console.log( 'this.dataService.facInfoProvince: ', this.dataService.facInfoProvince );

    this.review.redirectPath = ROUTES_FACILITY.FACILITY.fullpath;
    this.review.header = ROUTES_FACILITY.FACILITY.title;

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = this.dataService.facInfoEffectiveDate ?
      this.dataService.facInfoEffectiveDate.toLocaleString('en', options) : 'invalid Date from Common-Date';

    const items = [
      [
        {
          label: 'Facility Name',
          value: this.dataService.facInfoFacilityName,
        },
        { label: 'Physical address', value: this.dataService.facInfoPhysicalAddress },
        { label: 'City', value: this.dataService.facInfoCity },
        { label: 'Province', value: getProvinceDescription(this.dataService.facInfoProvince) },
        { label: 'Postal code', value: this.dataService.facInfoPostalCode },
        // { label: 'Phone number', value: this.dataService.facInfoPhoneNumber },
        { label: 'Fax number', value: setNotApplicable( this.dataService.facInfoFaxNumber ) },
        { label: 'Effective date', value: dateString }
      ],
    ];
    this.review.sectionItems = items;
  }

}
