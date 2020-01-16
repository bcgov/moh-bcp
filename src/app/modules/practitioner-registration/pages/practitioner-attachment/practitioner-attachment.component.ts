import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContainerService, ErrorMessage, PageStateService } from 'moh-common-lib';
import { BcpBaseForm } from '../../../core-bcp/models/bcp-base-form';
import { PRACTITIONER_ATTACHMENT, PRAC_ATTACHMENT_TYPE } from '../../models/practitioner-attachment';
import { IRadioItems } from 'moh-common-lib/lib/components/radio/radio.component';
import { RegisterPractitionerDataService } from '../../services/register-practitioner-data.service';
import { formatDateForDisplay } from '../../../core-bcp/models/helperFunc';

interface BaseFormGroup {
  attachmentType: any;
  attachmentEffectiveDate?: any;
  attachmentCancelDate?: any;
}

interface NewFormGroup extends BaseFormGroup {
  newAttachmentType: any;
}

interface ChangeFormGroup extends BaseFormGroup {
  changeAttachmentHasAtLeastOneDate: any;
}

@Component({
  selector: 'bcp-practitioner-attachment',
  templateUrl: './practitioner-attachment.component.html',
  styleUrls: ['./practitioner-attachment.component.scss']
})
export class PractitionerAttachmentComponent extends BcpBaseForm implements OnInit, AfterViewInit {

  pageTitle: string = 'Practitioner Attachment';
  formGroup: FormGroup;
  radioItems: Array<IRadioItems>;
  changeAttachmentHasValue: boolean = false;
  facilityEffectiveDate: Date;
  facilityCancelDate: Date;
  facilityDateErrMsg: ErrorMessage;

  constructor( protected containerService: ContainerService,
               protected router: Router,
               protected pageStateService: PageStateService,
               private fb: FormBuilder,
               public dataService: RegisterPractitionerDataService ) {
    super(router, containerService, pageStateService);
  }

  ngOnInit() {
    super.ngOnInit();

    /* NOTE: No dates are returned for a manual review
    this.facilityEffectiveDate = new Date(
      this.dataService.jsonFacilityValidation.response
        ? this.dataService.jsonFacilityValidation.response.effectiveDate
        : null
    );
    this.facilityCancelDate = new Date(
      this.dataService.jsonFacilityValidation.response
        ? this.dataService.jsonFacilityValidation.response.cancelDate
        : null
    );
    this.facilityEffectiveDate.setTime( this.facilityEffectiveDate.getTime() + this.facilityEffectiveDate.getTimezoneOffset() * 60 * 1000 );
    this.facilityCancelDate.setTime( this.facilityCancelDate.getTime() + this.facilityCancelDate.getTimezoneOffset() * 60 * 1000 );
  */
    this.facilityDateErrMsg = {
      invalidRange: `This date isn\'t between ${formatDateForDisplay(this.facilityEffectiveDate)} and ${formatDateForDisplay(this.facilityCancelDate)}.`,
    };

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

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.listenForChanges();
  }

  listenForChanges() {
    if (!this.formGroup) {
      return;
    }
    this.formGroup.valueChanges.subscribe( value => {
      // Update data service values
      switch (value.attachmentType) {
        case PRACTITIONER_ATTACHMENT.NEW.value:
          if (value.newAttachmentType) {
            this.dataService.attachmentType = PRAC_ATTACHMENT_TYPE.TEMP;
          } else {
            this.dataService.attachmentType = PRAC_ATTACHMENT_TYPE.NEW;
          }
          this.dataService.attachmentEffectiveDate = value.attachmentEffectiveDate;
          this.dataService.attachmentCancelDate = value.attachmentCancelDate;
          break;
        case PRACTITIONER_ATTACHMENT.CANCEL.value:
          this.dataService.attachmentType = PRAC_ATTACHMENT_TYPE.CANCEL;
          this.dataService.attachmentEffectiveDate = null;
          this.dataService.attachmentCancelDate = value.attachmentCancelDate;
          break;
        case PRACTITIONER_ATTACHMENT.CHANGE.value:
          this.dataService.attachmentType = PRAC_ATTACHMENT_TYPE.CHANGE;
          this.dataService.attachmentEffectiveDate = value.attachmentEffectiveDate;
          this.dataService.attachmentCancelDate = value.attachmentCancelDate;
          break;
      }
      this.dataService.pracNewAttachmentType = value.newAttachmentType;
    });
  }

  initValidators() {
    switch (this.dataService.pracAttachmentType) {
      case PRACTITIONER_ATTACHMENT.NEW.value:
        this.formGroup = this.getFormGroupForNew();
        break;

      case PRACTITIONER_ATTACHMENT.CANCEL.value:
        this.formGroup = this.getFormGroupForCancel();
        break;

      case PRACTITIONER_ATTACHMENT.CHANGE.value:
        this.formGroup = this.getFormGroupForChange();
        break;

      default:
        this.formGroup = this.fb.group(this.getBaseFormGroup());
        break;
    }
  }

  private getBaseFormGroup(): BaseFormGroup {
    return {
      attachmentType: [this.dataService.pracAttachmentType, Validators.required]
    };
  }

  private getFormGroupForNew(): FormGroup {
    const formGroupObj: NewFormGroup = {
      ...this.getBaseFormGroup(),
      newAttachmentType: [this.dataService.pracNewAttachmentType, Validators.required]
    };

    if (this.dataService.pracNewAttachmentType === true || this.dataService.pracNewAttachmentType === false) {
      formGroupObj.attachmentEffectiveDate = [this.dataService.attachmentEffectiveDate, Validators.required];
    }
    if (this.dataService.pracNewAttachmentType === true) {
      formGroupObj.attachmentCancelDate = [this.dataService.attachmentCancelDate, Validators.required];
    }
    return this.fb.group(formGroupObj);
  }

  private getFormGroupForCancel(): FormGroup {
    const formGroupObj: BaseFormGroup = {
      ...this.getBaseFormGroup(),
      attachmentCancelDate: [this.dataService.attachmentCancelDate, Validators.required]
    };
    return this.fb.group(formGroupObj);
  }

  private getFormGroupForChange(): FormGroup {
    const formGroupObj: ChangeFormGroup = {
      ...this.getBaseFormGroup(),
      attachmentEffectiveDate: [this.dataService.attachmentEffectiveDate],
      attachmentCancelDate: [this.dataService.attachmentCancelDate],
      changeAttachmentHasAtLeastOneDate: [this.changeAttachmentHasValue, Validators.requiredTrue],
    };
    const formGroup: FormGroup = this.fb.group(formGroupObj);

    formGroup.valueChanges.subscribe((value) => {
      if (!value.changeAttachmentHasAtLeastOneDate && (value.attachmentEffectiveDate || value.attachmentCancelDate)) {
        formGroup.patchValue({
          changeAttachmentHasAtLeastOneDate: true
        });
      } else if (value.changeAttachmentHasAtLeastOneDate && !value.attachmentEffectiveDate && !value.attachmentCancelDate) {
        formGroup.patchValue({
          changeAttachmentHasAtLeastOneDate: false
        });
      }
    });
    return formGroup;
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
    this.listenForChanges();
  }

  changeNewAttachmentType(value: boolean) {
    this.dataService.pracNewAttachmentType = value;
    this.initValidators();
    this.listenForChanges();
  }

  get shouldShowNewSection() {
    return this.dataService.pracAttachmentType === PRACTITIONER_ATTACHMENT.NEW.value;
  }

  get shouldShowCancelSection() {
    return this.dataService.pracAttachmentType === PRACTITIONER_ATTACHMENT.CANCEL.value;
  }

  get shouldShowChangeSection() {
    return this.dataService.pracAttachmentType === PRACTITIONER_ATTACHMENT.CHANGE.value;
  }
}
