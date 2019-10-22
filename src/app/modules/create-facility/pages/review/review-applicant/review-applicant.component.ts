import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewContainerComponent } from 'src/app/modules/core-bcp/review-container/review-container.component';
import { ROUTES_FACILITY } from '../../../models/routes.constants';
import { RandomObjects, IApplicant,  } from '../../../models/i-dataform';
import { CreateFacilityDataService } from '../../../services/create-facility-data.service';

@Component({
  selector: 'bcp-review-applicant',
  templateUrl: './review-applicant.component.html',
  styleUrls: ['./review-applicant.component.scss']
})
export class ReviewApplicantComponent implements OnInit {

  @ViewChild(ReviewContainerComponent, {static: true})
  review: ReviewContainerComponent;

  constructor(public dataService: CreateFacilityDataService,) { }

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
                value: this.dataService.facAdminFirstName,
            },
            { label: 'Facility administrator last name', value: this.dataService.facAdminLastName },
            { label: 'Medical Services Plan practitioner number', value: this.dataService.pracNumber },
            { label: 'Email address', value: this.dataService.emailAddress },
            { label: 'Phone number', value: this.dataService.facAdminPhoneNumber + ' Ext. ' + this.dataService.facAdminExtension }
        ],
    ];
    this.review.sectionItems = items;
}

}
