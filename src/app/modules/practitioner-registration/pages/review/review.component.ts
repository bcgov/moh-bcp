import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { RegisterPractitionerDataService } from '../../services/register-practitioner-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ContainerService, PageStateService } from 'moh-common-lib';
import { BcpBaseForm } from '../../../core-bcp/models/bcp-base-form';

@Component({
  selector: 'bcp-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})

export class ReviewComponent extends BcpBaseForm implements OnInit, AfterViewInit {

  constructor(public dataService: RegisterPractitionerDataService,
              protected containerService: ContainerService,
              protected router: Router,
              protected pageStateService: PageStateService,
              private fb: FormBuilder) {
    super(router, containerService, pageStateService);
  }

  pageTitle: string = 'Review Request';

  ngOnInit() {
    this.containerService.setSubmitLabel('Submit');
    this.containerService.setUseDefaultColor(false);
    this.pageStateService.setPageIncomplete();

    // Set isPrintView to false
    this.dataService.isPrintView = false;

    this.formGroup = this.fb.group({
      signature: [this.dataService.signature, [Validators.required]]
    });
  }


  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.formGroup.valueChanges.subscribe( val => {
      // Update data service values
      this.dataService.signature = val.signature;
      this.dataService.dateOfAcceptance = val.signature ? new Date() : null;
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

