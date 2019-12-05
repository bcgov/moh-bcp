import { Component, OnInit } from '@angular/core';
import { RegistrationForm } from '../../models/registration-form';
import { RegistrationContainerService } from '../../services/registration-container.service';
import { Router } from '@angular/router';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { CreatePractitionerDataService } from '../../services/create-practitioner-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractForm } from 'moh-common-lib';

@Component({
  selector: 'bcp-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})

export class ReviewComponent extends RegistrationForm implements OnInit {

  constructor(public dataService: CreatePractitionerDataService,
    protected registrationContainerService: RegistrationContainerService,
    protected router: Router,
    private fb: FormBuilder) {
    super(registrationContainerService, router);
  }

  pageTitle: string = "Review Request";
  confirmed: boolean = false;
  displayError: boolean = false;
  reviewForm: FormGroup;

  ngOnInit() {
    this.registrationContainerService.$submitLabelSubject.next('Submit');
    this.registrationContainerService.$useDefaultColorSubject.next(false);
    super.ngOnInit();

    this.reviewForm = this.fb.group({
      isAccepted: [this.dataService.isAccepted, [Validators.required]],
      signature: [this.dataService.signature, [Validators.required]]
    });
  }

  continue() {
    console.log( 'Continue: Review - needs to be call to backend');
    this.navigate(PRACTITIONER_REGISTRATION_PAGES.SUBMISSION.fullpath);
  }

  toggleValidation(isChecked: boolean) {
    console.log(isChecked);

    this.confirmed = isChecked;
    this.displayError = !this.confirmed;

    if ( this.confirmed ) {
      this.dataService.dateOfAcceptance = (new Date());
    }
  }
}

