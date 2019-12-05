import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { RegistrationForm } from '../../models/registration-form';
import { RegistrationContainerService } from '../../services/registration-container.service';
import { Router } from '@angular/router';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { CreatePractitionerDataService } from '../../services/create-practitioner-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorMessage } from 'moh-common-lib';

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

  pageTitle: string = 'Review Request';

  ngOnInit() {
    this.registrationContainerService.$submitLabelSubject.next('Submit');
    this.registrationContainerService.$useDefaultColorSubject.next(false);
    super.ngOnInit();

    this.formGroup = this.fb.group({
      signature: [this.dataService.signature, [Validators.required]]
    });
  }

  continue() {
    if ( !this.canContinue() ) {

      console.log( 'invalid' );
      this.markAllInputsTouched();
      return;
    }
    console.log( 'Continue: Review - needs to be call to backend');
    this.navigate(PRACTITIONER_REGISTRATION_PAGES.SUBMISSION.fullpath);
  }
}

