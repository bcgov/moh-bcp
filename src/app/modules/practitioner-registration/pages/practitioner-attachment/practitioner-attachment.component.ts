import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContainerService, ErrorMessage, PageStateService, LabelReplacementTag } from 'moh-common-lib';
import { isBefore, isAfter, addDays } from 'date-fns';
import { BcpBaseForm } from '../../../core-bcp/models/bcp-base-form';
import { PRACTITIONER_ATTACHMENT, PRAC_ATTACHMENT_TYPE } from '../../models/practitioner-attachment';
import { IRadioItems } from 'moh-common-lib/lib/components/radio/radio.component';
import { RegisterPractitionerDataService } from '../../services/register-practitioner-data.service';
import { formatDateForDisplay } from '../../../core-bcp/models/helperFunc';

@Component({
  selector: 'bcp-practitioner-attachment',
  templateUrl: './practitioner-attachment.component.html',
  styleUrls: ['./practitioner-attachment.component.scss']
})
export class PractitionerAttachmentComponent extends BcpBaseForm implements OnInit, AfterViewInit {

  constructor( protected containerService: ContainerService,
               protected router: Router,
               protected pageStateService: PageStateService,
               private fb: FormBuilder,
               public dataService: RegisterPractitionerDataService ) {
    super(router, containerService, pageStateService);
  }

  pageTitle: string = 'Practitioner Attachment';

  // Radio buttons
  radioItems: Array<IRadioItems> = [
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
  changeAttachmentHasValue: boolean = false;

  facilityEffectiveDateErrMsg: ErrorMessage;
  facilityCancelDateErrMsg: ErrorMessage;


  // Forms for different attachment types
  newAttachmentForm: FormGroup;
  cancelAttachmentForm: FormGroup;
  changeAttachmentForm: FormGroup;

  get shouldShowNewSection() {
    return this.dataService.pracAttachmentType === PRAC_ATTACHMENT_TYPE.NEW;
  }

  get shouldShowCancelSection() {
    return this.dataService.pracAttachmentType === PRAC_ATTACHMENT_TYPE.CANCEL;
  }

  get shouldShowChangeSection() {
    return this.dataService.pracAttachmentType === PRAC_ATTACHMENT_TYPE.CHANGE;
  }

  // Dates set by the facility information component
  get effectiveDateStartRange(): Date {

    return this.dataService.facEffectiveDate;
  }

  get effectiveDateEndRange(): Date {

    if ( this.dataService.attachmentCancelDate ) {

      // Cancel date entered by user is after cancel date on record, return date on record, otherwise value entered
      return isAfter( this.dataService.attachmentCancelDate, this.dataService.facCancelDate ) ?
        this.dataService.facCancelDate : this.dataService.attachmentCancelDate;
    }

    return this.dataService.facCancelDate;
  }

  get cancelDateStartRange(): Date {
    if ( this.dataService.attachmentEffectiveDate ) {
      return isBefore( this.dataService.attachmentEffectiveDate, this.dataService.facEffectiveDate ) ?
      this.dataService.facEffectiveDate : this.dataService.attachmentEffectiveDate;
    }

    return this.dataService.facEffectiveDate;
  }

  get cancelDateEndRange(): Date {

    return this.dataService.facCancelDate;
  }

  private setFacilityEffectiveDateErrMsg(): void {

    if ( this.effectiveDateStartRange && this.effectiveDateEndRange ) {
      this.facilityEffectiveDateErrMsg = {
        invalidRange: `${LabelReplacementTag} must be between ${formatDateForDisplay(this.effectiveDateStartRange)} and ${formatDateForDisplay(this.effectiveDateEndRange)}.`
      };
    } else if ( this.effectiveDateStartRange && this.dataService.attachmentCancelDate ){
      this.facilityEffectiveDateErrMsg = {
        invalidRange: `${LabelReplacementTag} must be before the cancellation date.`
      };
    } else {
      this.facilityEffectiveDateErrMsg = {
        invalidRange: `${LabelReplacementTag} must be after ${formatDateForDisplay(this.effectiveDateStartRange)}.`
      };
    }
  }

  setfacilityCancelDateErrMsg(): void {
    if ( this.effectiveDateStartRange && this.effectiveDateEndRange ) {
      this.facilityCancelDateErrMsg = {
        invalidRange: `${LabelReplacementTag} must be between ${formatDateForDisplay(this.cancelDateStartRange)} and ${formatDateForDisplay(this.cancelDateEndRange)}.`
      };
    } else if ( this.effectiveDateStartRange && this.dataService.attachmentEffectiveDate ) {
      this.facilityCancelDateErrMsg = {
        invalidRange: `${LabelReplacementTag} must be after the effective date.`
      };
    } else {
      this.facilityCancelDateErrMsg = {
        invalidRange: `${LabelReplacementTag} must be after ${formatDateForDisplay(this.cancelDateStartRange)}.`
      };
    }
  }

  ngOnInit() {
    super.ngOnInit();

    console.log( 'init' );

    this.formGroup = this.fb.group({
      attachmentType: [this.dataService.pracAttachmentType, Validators.required]
    });

    this.newAttachmentForm = this.fb.group({
      newAttachmentType: [this.dataService.pracNewAttachmentType, Validators.required],
      attachmentEffectiveDate: [this.dataService.attachmentEffectiveDate, Validators.required],
      attachmentCancelDate: [this.dataService.attachmentCancelDate]
    });

    this.cancelAttachmentForm = this.fb.group ({
      attachmentCancelDate: [this.dataService.attachmentCancelDate, Validators.required]
    });

    this.changeAttachmentForm = this.fb.group({
      attachmentEffectiveDate: [this.dataService.attachmentEffectiveDate],
      attachmentCancelDate: [this.dataService.attachmentCancelDate],
    });

    this.setFacilityEffectiveDateErrMsg();
    this.setfacilityCancelDateErrMsg();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    // Listens for the attachment type, initializes dates to null.
    this.formGroup.valueChanges.subscribe( value => {
      this.dataService.pracAttachmentType = value.attachmentType;
    });

    this.newAttachmentForm.valueChanges.subscribe( value => {

      this.setFacilityEffectiveDateErrMsg();
      this.dataService.attachmentEffectiveDate = value.attachmentEffectiveDate;

      // new temporary attachment
      if ( value.newAttachmentType === true ) {
        this.setfacilityCancelDateErrMsg();
        this.dataService.attachmentCancelDate = value.attachmentCancelDate;
      }
    });

    // Catch change on this field as it willl determine which dates are required.
    this.newAttachmentForm.controls.newAttachmentType.valueChanges.subscribe ( value => {
      this.setfacilityCancelDateErrMsg();
      this._updateNewAttachmentType( value );
    });

    this.cancelAttachmentForm.valueChanges.subscribe( value => {
      this.setfacilityCancelDateErrMsg();
      this.dataService.attachmentCancelDate = value.attachmentCancelDate;
    });

    this.changeAttachmentForm.valueChanges.subscribe( value => {
      this.setFacilityEffectiveDateErrMsg();
      this.dataService.attachmentEffectiveDate = value.attachmentEffectiveDate;
      this.setfacilityCancelDateErrMsg();
      this.dataService.attachmentCancelDate = value.attachmentCancelDate;
    });
  }

  continue() {
    const forms = [ this.formGroup ];

    if ( this.dataService.pracAttachmentType ===  PRAC_ATTACHMENT_TYPE.NEW ) {
      forms.push( this.newAttachmentForm);
    } else if (this.dataService.pracAttachmentType ===  PRAC_ATTACHMENT_TYPE.CANCEL ) {
      forms.push( this.cancelAttachmentForm );
    } else if (this.dataService.pracAttachmentType ===  PRAC_ATTACHMENT_TYPE.CHANGE ) {
      this.changeAttachmentHasValue =
        !!(this.dataService.attachmentEffectiveDate || this.dataService.attachmentCancelDate);
      console.log( 'continue: ', this.changeAttachmentHasValue );

      if ( !this.changeAttachmentHasValue ) {
        return;
      }

      forms.push( this.changeAttachmentForm );
    }

    this.markAllInputsTouched(forms);

    console.log( 'forms: ', forms );

    if ( forms.every( (x) => x.valid === true ) ) {
      this.navigate(PRACTITIONER_REGISTRATION_PAGES.REVIEW.fullpath);
    }
  }

  // Update validator on cancel date field based on new attachment type
  private _updateNewAttachmentType( tempAttachment: boolean | null ) {
    console.log( 'Update New Attachment Type: ', tempAttachment );

    if (tempAttachment !== null && tempAttachment !== undefined ) {
      if ( tempAttachment === true ) {

        console.log( 'set validator' );
        this.newAttachmentForm.controls.attachmentCancelDate.setValidators( Validators.required );
        this.newAttachmentForm.controls.attachmentCancelDate.reset();

      } else {
        console.log( 'clear validator' );
        this.newAttachmentForm.controls.attachmentCancelDate.clearValidators();
        this.newAttachmentForm.controls.attachmentCancelDate.patchValue(null);
      }

      this.dataService.pracNewAttachmentType = tempAttachment;
      this.newAttachmentForm.controls.attachmentCancelDate.updateValueAndValidity();
      this.newAttachmentForm.updateValueAndValidity({ onlySelf: false });
    }
  }
}
