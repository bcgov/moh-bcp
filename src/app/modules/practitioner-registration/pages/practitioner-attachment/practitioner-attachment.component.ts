import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContainerService, ErrorMessage, PageStateService } from 'moh-common-lib';
import { parseISO, isBefore, isAfter } from 'date-fns';
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
export class PractitionerAttachmentComponent extends BcpBaseForm implements OnInit, AfterViewInit, DoCheck {

  constructor( protected containerService: ContainerService,
               protected router: Router,
               protected pageStateService: PageStateService,
               private fb: FormBuilder,
               public dataService: RegisterPractitionerDataService ) {
    super(router, containerService, pageStateService);
  }

  pageTitle: string = 'Practitioner Attachment';
  formGroup: FormGroup;
  radioItems: Array<IRadioItems>;
  changeAttachmentHasValue: boolean = false;
  facilityEffectiveDate: Date;
  facilityCancelDate: Date;

  bcpProgramStartDate: Date = parseISO('2020-04-01');

  facilityEffectiveDateErrMsg: ErrorMessage;
  facilityCancelDateErrMsg: ErrorMessage;


  get shouldShowNewSection() {
    return this.dataService.pracAttachmentType === PRACTITIONER_ATTACHMENT.NEW.value;
  }

  get shouldShowCancelSection() {
    return this.dataService.pracAttachmentType === PRACTITIONER_ATTACHMENT.CANCEL.value;
  }

  get shouldShowChangeSection() {
    return this.dataService.pracAttachmentType === PRACTITIONER_ATTACHMENT.CHANGE.value;
  }

  get effectiveDateStartRange(): Date {
    if ( this.dataService.attachmentType === PRAC_ATTACHMENT_TYPE.CANCEL ) {
      return this.bcpProgramStartDate;
    }
    // Cannot have dates prior to the BCP program implementation
    return this.dataService.facEffectiveDate ? this.dataService.facEffectiveDate : this.bcpProgramStartDate;
  }

  get effectiveDateEndRange(): Date {
    if (this.dataService.attachmentType === PRAC_ATTACHMENT_TYPE.CANCEL ) {
      return null;
    }
    if (this.dataService.facCancelDate
      && this.dataService.attachmentCancelDate
      && isBefore(this.dataService.attachmentCancelDate, this.dataService.facCancelDate)) {
      return this.dataService.attachmentCancelDate;
    }
    return this.dataService.facCancelDate;
  }

  get cancelDateStartRange(): Date {
    if (this.dataService.attachmentType === PRAC_ATTACHMENT_TYPE.NEW) {
      return null;
    }

    if (this.dataService.facEffectiveDate
      && this.dataService.attachmentEffectiveDate
      && isAfter(this.dataService.attachmentEffectiveDate, this.dataService.facEffectiveDate)) {
      return this.dataService.attachmentEffectiveDate;
    }
    // Cannot have dates prior to the BCP program implementation
    return this.dataService.facEffectiveDate ? this.dataService.facEffectiveDate : this.bcpProgramStartDate;
  }

  get cancelDateEndRange(): Date {
    if ( this.dataService.attachmentType === PRAC_ATTACHMENT_TYPE.NEW ) {
      return null;
    }

    return this.dataService.facCancelDate;
  }

  private setFacilityEffectiveDateErrMsg(): void {

    if (this.effectiveDateStartRange && this.effectiveDateEndRange) {

      // HARRY: Note this will be an issue if the cancel date is more than 150 years in the future.  If validation needs to
      // different this is a common library change and impacts other applications
      // Also, we might want to make sure that the cancel date is after the start date just a thought
      // If you need to change these error message on the fly so the same call as in the ngInit() in ngDoCheck() It will trigger
      // the date component to load messages
      this.facilityEffectiveDateErrMsg = {
        invalidRange: `This date isn\'t between ${formatDateForDisplay(this.effectiveDateStartRange)} and ${formatDateForDisplay(this.effectiveDateEndRange)}.`
      };

    } else if ( this.effectiveDateStartRange ) {
      this.facilityEffectiveDateErrMsg = {
        invalidRange: `This date isn\'t after ${formatDateForDisplay(this.effectiveDateStartRange)}.`
     };
    } else {
      this.facilityEffectiveDateErrMsg = {
        invalidRange: 'Invalid effective date.'
      };
    }
  }

  setfacilityCancelDateErrMsg(): void {
    console.log( 'setfacilityCancelDateErrMsg: ', this.cancelDateStartRange, this.cancelDateEndRange );
    if (this.cancelDateStartRange && this.cancelDateEndRange) {
      // HARRY: Note this will be an issue if the cancel date is more than 150 years in the future.  If validation needs to
      // different this is a common library change and impacts other applications
      this.facilityCancelDateErrMsg = {
        invalidRange: `This date isn\'t between ${formatDateForDisplay(this.cancelDateStartRange)} and ${formatDateForDisplay(this.cancelDateEndRange)}.`
      };
    } else if (this.cancelDateStartRange && !this.cancelDateEndRange) {
      this.facilityCancelDateErrMsg = {
        invalidRange: `This date isn\'t after ${formatDateForDisplay(this.cancelDateStartRange)}.`
      };
    } else {
      this.facilityCancelDateErrMsg = {
        invalidRange: 'Invalid cancellation date.'
      };
    }
    console.warn('Error Message: ', this.facilityCancelDateErrMsg);
  }

  ngOnInit() {
    super.ngOnInit();


    // TODO: You can remove this - I set values when request is returned on the facility validate page
    if ( this.dataService.jsonFacilityValidation.response
      && this.dataService.jsonFacilityValidation.response.manualReview === false
      && this.dataService.jsonFacilityValidation.response.effectiveDate) {
      this.facilityEffectiveDate = parseISO(this.dataService.jsonFacilityValidation.response.effectiveDate);
    }

    if ( this.dataService.jsonFacilityValidation.response
      && this.dataService.jsonFacilityValidation.response.manualReview === false
      && this.dataService.jsonFacilityValidation.response.cancelDate) {
      this.facilityCancelDate = parseISO(this.dataService.jsonFacilityValidation.response.cancelDate);
    }

    this.setFacilityEffectiveDateErrMsg();
    this.setfacilityCancelDateErrMsg();

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

  ngDoCheck() {
    this.setFacilityEffectiveDateErrMsg();
    this.setfacilityCancelDateErrMsg();
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
}
