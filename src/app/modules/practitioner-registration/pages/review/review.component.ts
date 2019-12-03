import { Component, OnInit } from '@angular/core';
import { RegistrationForm } from '../../models/registration-form';
import { RegistrationContainerService } from '../../services/registration-container.service';
import { Router } from '@angular/router';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';

@Component({
  selector: 'bcp-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent extends RegistrationForm implements OnInit {

  constructor( protected registrationContainerService: RegistrationContainerService,
               protected router: Router ) {
    super(registrationContainerService, router);
  }

  ngOnInit() {
    this.registrationContainerService.$submitLabelSubject.next('Submit');
    this.registrationContainerService.$useDefaultColorSubject.next(false);
    super.ngOnInit();
  }

  continue() {
    console.log( 'Continue: Review - needs to be call to backend');
    this.navigate(PRACTITIONER_REGISTRATION_PAGES.SUBMISSION.fullpath);
  }
}

