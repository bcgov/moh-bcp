import { Component, OnInit } from '@angular/core';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreatePractitionerDataService } from '../../services/create-practitioner-data.service';
import { ContainerService, PageStateService } from 'moh-common-lib';
import { BcpBaseForm } from '../../../core-bcp/models/bcp-base-form';
import { PRACTITIONER_ASSIGNMENT } from '../../models/practitioner-assignment';

interface RadioItem {
  label: string;
  value: string;
  showEffectiveDate: boolean;
  showExpirationDate: boolean;
  effectiveDateLabel: string;
  expirationDateLabel: string;
}

@Component({
  selector: 'bcp-practitioner-assignment',
  templateUrl: './practitioner-assignment.component.html',
  styleUrls: ['./practitioner-assignment.component.scss']
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
        label: PRACTITIONER_ASSIGNMENT.NEW.label,
        value: PRACTITIONER_ASSIGNMENT.NEW.value,
        showEffectiveDate: true,
        showExpirationDate: false,
        effectiveDateLabel: 'What is the effective date for the new assignment?',
        expirationDateLabel: null,
      },
      {
        label: PRACTITIONER_ASSIGNMENT.CANCEL.label,
        value: PRACTITIONER_ASSIGNMENT.CANCEL.value,
        showEffectiveDate: true,
        showExpirationDate: false,
        effectiveDateLabel: 'What date should the assignment be removed?',
        expirationDateLabel: null,
      },
      {
        label: PRACTITIONER_ASSIGNMENT.CHANGE_DATE.label,
        value: PRACTITIONER_ASSIGNMENT.CHANGE_DATE.value,
        showEffectiveDate: true,
        showExpirationDate: false,
        effectiveDateLabel: 'What is the new effective date for the assignment?',
        expirationDateLabel: null,
      },
    ];

    this.initValidators();
    this.formGroup.get('attachmentType').valueChanges.subscribe(
      value => {
        this.initValidators();
      }
    );
    // this.formGroup.get('newAttachmentType').valueChanges.subscribe(
    //   value => {
    //     this.initValidators();
    //   }
    // );
  }

  initValidators() {
    const formGroupObj: any = {
      attachmentType: [this.dataService.pracAttachmentType, [Validators.required]],
      test: [this.dataService.pracCancelAttachmentDate, [Validators.required]],
    };
    this.formGroup = this.fb.group(formGroupObj);

    const attachmentType = this.formGroup.get('attachmentType');

    switch(attachmentType.value) {

      case PRACTITIONER_ASSIGNMENT.NEW.value:
        formGroupObj.newAttachmentType = [this.dataService.pracNewAttachmentType, Validators.required];
        const newAttachmentType = this.formGroup.get('newAttachmentType');
        
        if (newAttachmentType && newAttachmentType.value === true) {
          //if (this.formGroup.get('newAttachmentEffectiveDate') && this.formGroup.get('newAttachmentCancelDate')) {
            
            formGroupObj.newAttachmentEffectiveDate = [this.dataService.pracNewAttachmentEffectiveDate, Validators.required];
            formGroupObj.newAttachmentCancelDate = [this.dataService.pracNewAttachmentCancelDate, Validators.required];
          //}
        } else if (newAttachmentType && newAttachmentType.value === false) {
          formGroupObj.newAttachmentEffectiveDate = [this.dataService.pracNewAttachmentEffectiveDate, Validators.required];
        }
        this.formGroup = this.fb.group(formGroupObj);
        break;

      case PRACTITIONER_ASSIGNMENT.CANCEL.value:
        formGroupObj.cancelAttachmentDate = [this.dataService.pracCancelAttachmentDate, Validators.required];
        this.formGroup = this.fb.group(formGroupObj);
        break;
    };
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
    /*
    const groupItems = {
      attachmentType: [this.dataService.pracAttachmentType, [Validators.required]],
      newAttachmentType: [this.dataService.pracNewAttachmentType, [Validators.required]],
      effectiveDate: [this.dataService.pracAttachmentEffectiveDate, [Validators.required]],
      expirationDate: [this.dataService.pracAttachmentExpirationDate, value === 'locum' ? [Validators.required] : null]
    };
    this.formGroup = this.fb.group(groupItems);
    */
  }

  changeNewAttachmentType(value: string) {
    this.dataService.pracNewAttachmentType = value;
  }

  get shouldShowNewSection() {
    return this.dataService.pracAttachmentType === "new"
  }
}
