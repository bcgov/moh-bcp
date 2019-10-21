import { Component, OnInit, ViewChild } from '@angular/core';
import { ROUTES_FACILITY } from '../../../models/routes.constants';
import { ReviewContainerComponent } from 'src/app/modules/core-bcp/review-container/review-container.component';
import { RandomObjects, IFacilityInfo } from '../../../models/i-dataform';

@Component({
  selector: 'bcp-review-facility-mailing-info',
  templateUrl: './review-facility-mailing-info.component.html',
  styleUrls: ['./review-facility-mailing-info.component.scss']
})
export class ReviewFacilityMailingInfoComponent implements OnInit {

  @ViewChild(ReviewContainerComponent, {static: true})
  review: ReviewContainerComponent;

  constructor() { }

  ngOnInit() {
    this.reviewItems();
  }

  reviewItems() {
    
    this.review.redirectPath = ROUTES_FACILITY.FACILITY.fullpath;
    this.review.header = 'Facility Mailing Address';

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
                label: 'Mailing address',
                value: infoObject.mailingForm.mailing_address,
            },
            { label: 'Mailing city', value: infoObject.mailingForm.mailing_city },            
            { label: 'Mailing province', value: infoObject.mailingForm.mailing_province },
            { label: 'Mailing postal code', value: infoObject.mailingForm.mailing_postalCode }
        ],
    ];
    this.review.sectionItems = items;
}

}
