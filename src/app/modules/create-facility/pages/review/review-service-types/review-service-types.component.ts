import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewContainerComponent } from 'src/app/modules/core-bcp/review-container/review-container.component';
import { ROUTES_FACILITY } from '../../../models/routes.constants';
import { RandomObjects, IFacilityInfo } from '../../../models/i-dataform';

@Component({
  selector: 'bcp-review-service-types',
  templateUrl: './review-service-types.component.html',
  styleUrls: ['./review-service-types.component.scss']
})
export class ReviewServiceTypesComponent implements OnInit {

  
  @ViewChild(ReviewContainerComponent, {static: true})
  review: ReviewContainerComponent;

  constructor() { }

  ngOnInit() {
    this.review.showCheckBoxList=true;
    this.reviewItems();  
  }

  reviewItems() {
    
    this.review.redirectPath = ROUTES_FACILITY.FACILITY.fullpath;
    this.review.header = 'Facility Service Types';

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
            { label: '&#9745;', value: "Physician's private office" },
            { label: '&#9745;', value: 'Primary Care Network' },
            { label: '&#9745;', value: 'UPPC' }
        ],
    ];
    this.review.sectionItems = items;
}

}
