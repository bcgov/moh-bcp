import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewContainerComponent } from '../../../core-bcp/components/review-container/review-container.component';
import { UpdateFacilityDataService } from '../../services/update-facility-data.service';
import { UPDATE_FACILITY_PAGES } from '../../update-facility-route-constants';
import { setNotApplicable, convertToYesNo, convertToJSONDate, formatDateForDisplay } from '../../../core-bcp/models/helperFunc';

@Component({
  selector: 'bcp-review-bcp',
  templateUrl: './review-bcp.component.html',
  styleUrls: ['./review-bcp.component.scss']
})
export class ReviewBCPComponent implements OnInit {
  @ViewChild(ReviewContainerComponent, { static: true }) review: ReviewContainerComponent;

  constructor(public dataService: UpdateFacilityDataService) { }

  ngOnInit() {
    this.reviewItems();
  }

  reviewItems() {
    this.review.displayPrintView = this.dataService.isPrintView;
    this.review.redirectPath = UPDATE_FACILITY_PAGES.CANCEL_CHANGE.fullpath;
    this.review.header = 'Business Cost Premium';

    const items = [
      [
        { label: 'The applicant requests that the Business Cost Premium be applied to Eligible Fees paid to Eligible Physicians attached to this facility.', value: convertToYesNo(this.dataService.checkChangeAppliesFees), },
        { label: 'Effective date', value: setNotApplicable(formatDateForDisplay(this.dataService.changeAppliesFeesEffectiveDate)), },

        { label: 'Cancel BCP', value: convertToYesNo(this.dataService.checkCancelBCP), },
        { label: 'Effective cancel date', value: setNotApplicable(formatDateForDisplay(this.dataService.cancelBCPEffectiveDate)), },

        { label: 'Change BCP effective date', value: convertToYesNo(this.dataService.checkChangeBCPEffectiveDate), },
        {
          label: 'New BCP effective date',
          value: setNotApplicable(formatDateForDisplay(this.dataService.changeBCPEffectiveDateEffectiveDate)),
        },

        { label: 'Change BCP cancellation date', value: convertToYesNo(this.dataService.checkChangeBCPCancelDate), },
        { label: 'New BCP cancel date', value: setNotApplicable(formatDateForDisplay(this.dataService.changeBCPCancelDateCancelDate)), },
      ],
    ];
    this.review.sectionItems = items;
  }

}
