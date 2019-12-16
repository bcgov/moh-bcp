import { Component, OnInit } from '@angular/core';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreatePractitionerDataService } from '../../services/create-practitioner-data.service';
import { ContainerService, PageStateService } from 'moh-common-lib';
import { BcpBaseForm } from '../../../core-bcp/models/bcp-base-form';
import { PRACTITIONER_ATTACHMENT } from '../../models/practitioner-attachment';

interface RadioItem {
  label: string;
  value: string;
}

@Component({
  selector: 'bcp-practitioner-attachment',
  templateUrl: './practitioner-attachment.component.html',
  styleUrls: ['./practitioner-attachment.component.scss']
})
export class PractitionerAssignmentComponent extends BcpBaseForm implements OnInit {

  pageTitle: string = 'Practitioner Attachment';
  formGroup: FormGroup;
  radioItems: Array<RadioItem>;
  sameMailAddrError: boolean = false;

  constructor( protected containerService: ContainerService,
               protected router: Router,
               protected pageStateService: PageStateService,
               private fb: FormBuilder,
               public dataService: CreatePractitionerDataService ) {
    super(router, containerService, pageStateService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.radioItems = [
      {
        label: PRACTITIONER_ATTACHMENT.NEW.label,
        value: PRACTITIONER_ATTACHMENT.NEW.value,
      },
      {
        label: PRACTITIONER_ATTACHMENT.CANCEL.label,
        value: PRACTITIONER_ATTACHMENT.CANCEL.value,
      },
      {
        label: PRACTITIONER_ATTACHMENT.CHANGE.label,
        value: PRACTITIONER_ATTACHMENT.CHANGE.value,
      },
    ];

    this.initValidators();
  }

  initValidators() {
    const formGroupObj: any = {
      attachmentType: [this.dataService.pracAttachmentType, [Validators.required]]
    };

    if (this.dataService.pracAttachmentType == PRACTITIONER_ATTACHMENT.NEW.value) {
      formGroupObj.newAttachmentType = [this.dataService.pracNewAttachmentType, Validators.required];

      if (this.dataService.pracNewAttachmentType === true || this.dataService.pracNewAttachmentType === false) {
        formGroupObj.newAttachmentEffectiveDate = [this.dataService.pracNewAttachmentEffectiveDate, Validators.required];
      }
      if (this.dataService.pracNewAttachmentType === true) {
        formGroupObj.newAttachmentCancelDate = [this.dataService.pracNewAttachmentCancelDate, Validators.required];
      }
    }

    if (this.dataService.pracAttachmentType == PRACTITIONER_ATTACHMENT.CANCEL.value) {
      formGroupObj.cancelAttachmentDate = [this.dataService.pracCancelAttachmentDate, Validators.required];
    }

    if (this.dataService.pracAttachmentType == PRACTITIONER_ATTACHMENT.CHANGE.value) {
      formGroupObj.changeAttachmentEffectiveDate = [this.dataService.pracChangeAttachmentEffectiveDate];
      formGroupObj.changeAttachmentCancelDate = [this.dataService.pracChangeAttachmentCancelDate];
    }

    this.formGroup = this.fb.group(formGroupObj);
  }

  continue() {
    this.markAllInputsTouched();
    
    console.log( 'Continue: Practitioner Assignment', this.formGroup);
    if (this.formGroup.valid) {
      this.navigate(PRACTITIONER_REGISTRATION_PAGES.REVIEW.fullpath);
    }
  }

  changeAttachmentType(value) {
    this.dataService.pracAttachmentType = value;
    this.initValidators();
  }

  changeNewAttachmentType(value: boolean) {
    this.dataService.pracNewAttachmentType = value;
    this.initValidators();
  }

  get shouldShowNewSection() {
    return this.dataService.pracAttachmentType === PRACTITIONER_ATTACHMENT.NEW.value;
  }

  get shouldShowCancelSection() {
    return this.dataService.pracAttachmentType === PRACTITIONER_ATTACHMENT.CANCEL.value;
  }

  get shouldShowChangeSection() {
    return this.dataService.pracAttachmentType === PRACTITIONER_ATTACHMENT.CHANGE.value
  }
}
