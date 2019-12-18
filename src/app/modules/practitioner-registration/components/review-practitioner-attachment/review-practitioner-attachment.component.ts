import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewContainerComponent } from '../../../core-bcp/components/review-container/review-container.component';
import { RegisterPractitionerDataService } from '../../services/register-practitioner-data.service';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';

@Component({
  selector: 'bcp-review-practitioner-attachment',
  templateUrl: './review-practitioner-attachment.component.html',
  styleUrls: ['./review-practitioner-attachment.component.scss']
})
export class ReviewPractitionerAttachmentComponent implements OnInit {
  @ViewChild(ReviewContainerComponent, { static: true }) review: ReviewContainerComponent;

  constructor(public dataService: RegisterPractitionerDataService) { }

  ngOnInit() {
    this.reviewItems();
  }

  reviewItems() {
    // this.review.displayPrintView = this.dataService.isPrintView;
    this.review.redirectPath = PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_ASSIGN.fullpath;
    this.review.header = PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_ASSIGN.title;

    const items = [
      [
        { label: 'What type of attachment(s) are you doing?', value: this.dataService.pracAttachmentType, },
        { label: 'What is the effective date for the attachment?', value: this.dataService.pracAttachmentEffectiveDate },
        { label: 'What is the cancellation date for the attachment?', value: this.dataService.pracAttachmentCancellationDate }
      ],
    ];
    this.review.sectionItems = items;
  }

}
