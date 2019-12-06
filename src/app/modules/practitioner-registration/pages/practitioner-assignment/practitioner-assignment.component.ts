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
  showPrimaryDate: boolean;
  showSecondaryDate: boolean;
  primaryDateLabel: string;
  secondaryDateLabel: string;
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
      primaryDate: [this.dataService.pracAttachmentPrimaryDate],
      secondaryDate: [this.dataService.pracAttachmentSecondaryDate]
    });

    this.radioItems = [
      {
        label: 'New assignment',
        value: 'new',
        showPrimaryDate: true,
        showSecondaryDate: false,
        primaryDateLabel: 'What is the effective date for the new assignment?',
        secondaryDateLabel: null,
      },
      {
        label: 'Cancel the assignment',
        value: 'cancel',
        showPrimaryDate: true,
        showSecondaryDate: false,
        primaryDateLabel: 'What date should the assignment be removed?',
        secondaryDateLabel: null,
      },
      {
        label: 'Change the assignment date',
        value: 'change-date',
        showPrimaryDate: true,
        showSecondaryDate: false,
        primaryDateLabel: 'What is the new effective date for the assignment?',
        secondaryDateLabel: null,
      },
      {
        label: 'Change the cancellation date',
        value: 'change-cancel-date',
        showPrimaryDate: true,
        showSecondaryDate: false,
        primaryDateLabel: 'When should the practitioner assignment to the facility be removed?',
        secondaryDateLabel: null,
      },
      {
        label: 'Locum assignment',
        value: 'locum',
        showPrimaryDate: true,
        showSecondaryDate: true,
        primaryDateLabel: 'What is the effective date for the locum?',
        secondaryDateLabel: 'What is the cancellation date for the locum?',
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
