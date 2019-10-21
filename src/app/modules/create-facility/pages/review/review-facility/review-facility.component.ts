import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewContainerComponent } from 'src/app/modules/core-bcp/review-container/review-container.component';
import { ROUTES_FACILITY } from '../../../models/routes.constants';
import { RandomObjects, IFacilityInfo } from '../../../models/i-dataform';

@Component({
  selector: 'bcp-review-facility',
  templateUrl: './review-facility.component.html',
  styleUrls: ['./review-facility.component.scss']
})
export class ReviewFacilityComponent implements OnInit {
  @ViewChild(ReviewContainerComponent, {static: true})
  review: ReviewContainerComponent;

  constructor() { }

  ngOnInit() {
    this.reviewItems();
  }

  reviewItems() {
    
    this.review.redirectPath = ROUTES_FACILITY.FACILITY.fullpath;
    this.review.header = ROUTES_FACILITY.FACILITY.title;

    const form =RandomObjects.getFacilityInfo(''); // this.updateStateService.forms.organizationForm;
    console.log(form);
    if (!form) return;
    // const infoObject: interfaceObjects.IOrganizationEdit = interfaceObjects.getIOrganizationEdit(
    //     form.value
    // );
    const infoObject:IFacilityInfo = form;
    if (!infoObject) return;

    const items = [
        [
            {
                label: 'Facility Name',
                value: infoObject.facilityName,
            },
            { label: 'Physical address', value: infoObject.physicalAddress },
            { label: 'City', value: infoObject.city },
            { label: 'Province', value: infoObject.province },
            { label: 'Postal code', value: infoObject.postalCode },
            { label: 'Phone number', value: infoObject.phoneNumber },
            { label: 'Fax number', value: infoObject.faxNumber },
            { label: 'Effective date', value: infoObject.effectiveDate },
        ],
    ];
    this.review.sectionItems = items;
}

}
