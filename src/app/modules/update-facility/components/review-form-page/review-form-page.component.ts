import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewContainerComponent } from '../../../core-bcp/components/review-container/review-container.component';
import { RegisterPractitionerDataService } from '../../services/register-practitioner-data.service';
import { UPDATE_FACILITY_PAGES } from '../../update-facility-route-constants';
import { setNotApplicable } from '../../../core-bcp/models/helperFunc';

@Component({
  selector: 'bcp-review-form-page',
  templateUrl: './review-form-page.component.html',
  styleUrls: ['./review-form-page.component.scss']
})
export class ReviewFormPageComponent implements OnInit {
  @ViewChild(ReviewContainerComponent, { static: true }) review: ReviewContainerComponent;

  constructor(public dataService: RegisterPractitionerDataService) { }

  ngOnInit() {
    this.reviewItems();
  }

  reviewItems() {
    this.review.displayPrintView = this.dataService.isPrintView;
    this.review.redirectPath = UPDATE_FACILITY_PAGES.FORM_PAGE.fullpath;
    this.review.header = UPDATE_FACILITY_PAGES.FORM_PAGE.title;

    const phoneNumberEntry = { label: 'Phone number', value: this.dataService.pracInfoPhoneNumber };
    if ( this.dataService.pracInfoPhoneNumberExt ) {
      phoneNumberEntry.value = phoneNumberEntry.value.concat( ' Ext. ' + this.dataService.pracInfoPhoneNumberExt );
    }

    const items = [
      [
        { label: 'First name', value: this.dataService.pracInfoFirstName, },
        { label: 'Last name', value: this.dataService.pracInfoLastName },
        { label: 'Medical Services Plan Practitioner Number', value: this.dataService.pracInfoMSPPracNumber },
        { label: 'Email address (optional)', value: setNotApplicable(this.dataService.pracInfoEmail) },
        phoneNumberEntry,
      ],
    ];
    this.review.sectionItems = items;
  }

}
