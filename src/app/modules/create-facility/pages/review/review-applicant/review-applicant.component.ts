import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewContainerComponent } from 'src/app/modules/core-bcp/review-container/review-container.component';
import { ROUTES_FACILITY } from '../../../models/routes.constants';
import { RandomObjects, IApplicant,  } from '../../../models/i-dataform';

@Component({
  selector: 'bcp-review-applicant',
  templateUrl: './review-applicant.component.html',
  styleUrls: ['./review-applicant.component.scss']
})
export class ReviewApplicantComponent implements OnInit {

  @ViewChild(ReviewContainerComponent, {static: true})
  review: ReviewContainerComponent;

  constructor() { }

  ngOnInit() {
    this.reviewItems();
  }

  reviewItems() {
    
    this.review.redirectPath = ROUTES_FACILITY.APPLICANT.fullpath;
    this.review.header = ROUTES_FACILITY.APPLICANT.title;

    const form =RandomObjects.getApplicant(''); // this.updateStateService.forms.organizationForm;
    console.log(form);
    if (!form) return;
    // const infoObject: interfaceObjects.IOrganizationEdit = interfaceObjects.getIOrganizationEdit(
    //     form.value
    // );
    const infoObject:IApplicant = form;
    if (!infoObject) return;

    const items = [
        [
            {
                label: 'Facility administrator first name',
                value: infoObject.firstName,
            },
            { label: 'Facility administrator last name', value: infoObject.lastName },
            { label: 'Medical Services Plan practitioner number', value: infoObject.mspPractisionerNumber },
            { label: 'Email address', value: infoObject.email },
            { label: 'Phone number', value: infoObject.mobile + ' Ext.' + infoObject.extension }
        ],
    ];
    this.review.sectionItems = items;
}

}
