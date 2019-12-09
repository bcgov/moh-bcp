import { Component, OnInit } from '@angular/core';
import { RegistrationForm } from '../../models/registration-form';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { RegistrationContainerService } from '../../services/registration-container.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CreatePractitionerDataService } from '../../services/create-practitioner-data.service';

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
export class PractitionerAssignmentComponent extends RegistrationForm implements OnInit {

  pageTitle: string = 'Practitioner Assignment';
  formGroup: FormGroup;
  radioItems: Array<RadioItem>;
  sameMailAddrError: boolean = false;

  constructor( protected registrationContainerService: RegistrationContainerService,
               protected router: Router,
               private fb: FormBuilder,
               public dataService: CreatePractitionerDataService ) {
    super(registrationContainerService, router);
  }

  ngOnInit() {
    this.registrationContainerService.$submitLabelSubject.next('Continue');
    this.registrationContainerService.$useDefaultColorSubject.next(true);
    super.ngOnInit();

    this.formGroup = this.fb.group({
      attachmentType: [this.dataService.pracAttachmentType],
      effectiveDate: [this.dataService.pracAttachmentEffectiveDate],
      expirationDate: [this.dataService.pracAttachmentExpirationDate]
    });

    this.radioItems = [
      {
        label: 'New assignment',
        value: 'new',
        showEffectiveDate: true,
        showExpirationDate: false,
        effectiveDateLabel: 'What is the effective date for the new assignment?',
        expirationDateLabel: null,
      },
      {
        label: 'Cancel the assignment',
        value: 'cancel',
        showEffectiveDate: true,
        showExpirationDate: false,
        effectiveDateLabel: 'What date should the assignment be removed?',
        expirationDateLabel: null,
      },
      {
        label: 'Change the assignment date',
        value: 'change-date',
        showEffectiveDate: true,
        showExpirationDate: false,
        effectiveDateLabel: 'What is the new effective date for the assignment?',
        expirationDateLabel: null,
      },
      {
        label: 'Change the cancellation date',
        value: 'change-cancel-date',
        showEffectiveDate: true,
        showExpirationDate: false,
        effectiveDateLabel: 'When should the practitioner assignment to the facility be removed?',
        expirationDateLabel: null,
      },
      {
        label: 'Locum assignment',
        value: 'locum',
        showEffectiveDate: true,
        showExpirationDate: true,
        effectiveDateLabel: 'What is the effective date for the locum?',
        expirationDateLabel: 'What is the cancellation date for the locum?',
      },
    ];
  }

  continue() {
    console.log( 'Continue: Practitioner Assignment');
    this.navigate(PRACTITIONER_REGISTRATION_PAGES.REVIEW.fullpath);
  }

  changeAttachmentType(value) {
    this.dataService.pracAttachmentType = value;
  }
}
