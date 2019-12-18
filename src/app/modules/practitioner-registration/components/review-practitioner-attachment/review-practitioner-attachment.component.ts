import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewContainerComponent } from 'src/app/modules/core-bcp/components/review-container/review-container.component';
import { CreatePractitionerDataService } from '../../services/create-practitioner-data.service';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { getAttachmentLabelByValue, PRACTITIONER_ATTACHMENT } from '../../models/practitioner-attachment';

interface ReviewItem {
  label: string;
  value: any;
}

@Component({
  selector: 'bcp-review-practitioner-attachment',
  templateUrl: './review-practitioner-attachment.component.html',
  styleUrls: ['./review-practitioner-attachment.component.scss']
})
export class ReviewPractitionerAttachmentComponent implements OnInit {
  @ViewChild(ReviewContainerComponent, { static: true }) review: ReviewContainerComponent;

  constructor(public dataService: CreatePractitionerDataService) { }

  ngOnInit() {
    this.reviewItems();
  }

  reviewItems() {
    // this.review.displayPrintView = this.dataService.isPrintView;
    this.review.redirectPath = PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_ASSIGN.fullpath;
    this.review.header = PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_ASSIGN.title;

    const newAttachmentType: ReviewItem = {
      label: 'Is the attachment a locum or temporary?',
      value: this.dataService.pracNewAttachmentType ? 'Yes' : 'No'
    };
    const newAttachmentEffectiveDate: ReviewItem = {
      label: 'Effective date for new attachment',
      value: this.dataService.pracNewAttachmentEffectiveDate
    };
    const newAttachmentCancelDate: ReviewItem = {
      label: 'Cancellation date for new attachment',
      value: this.dataService.pracNewAttachmentCancelDate
    };
    const cancelDateItem: ReviewItem = {
      label: 'Cancellation date for existing attachment',
      value: this.dataService.pracCancelAttachmentDate,
    };
    const changeEffectiveDateItem: ReviewItem = {
      label: 'New effective date for existing attachment (if applicable)',
      value: this.dataService.pracChangeAttachmentEffectiveDate,
    }
    const changeCancelDateItem: ReviewItem = {
      label: 'New cancellation date for existing attachment (if applicable)',
      value: this.dataService.pracChangeAttachmentCancelDate,
    }
    
    const items = [
      [
        { label: 'Selected change to practitioner attachment', value: getAttachmentLabelByValue(this.dataService.pracAttachmentType), },
      ],
    ];

    if (this.dataService.pracAttachmentType == PRACTITIONER_ATTACHMENT.NEW.value) {
      items[0].push(newAttachmentType);
    }
    if (this.dataService.pracAttachmentType == PRACTITIONER_ATTACHMENT.NEW.value) {
      items[0].push(newAttachmentEffectiveDate);
    }
    if (this.dataService.pracAttachmentType == PRACTITIONER_ATTACHMENT.NEW.value && this.dataService.pracNewAttachmentType) {
      items[0].push(newAttachmentCancelDate);
    }
    if (this.dataService.pracAttachmentType == PRACTITIONER_ATTACHMENT.CANCEL.value) {
      items[0].push(cancelDateItem);
    }
    if (this.dataService.pracAttachmentType == PRACTITIONER_ATTACHMENT.CHANGE.value) {
      items[0].push(changeEffectiveDateItem);
    }
    if (this.dataService.pracAttachmentType == PRACTITIONER_ATTACHMENT.CHANGE.value) {
      items[0].push(changeCancelDateItem);
    }
    this.review.sectionItems = items;
  }

}
