import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { RegistrationForm } from '../../models/registration-form';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { RegistrationContainerService } from '../../services/registration-container.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bcp-practitioner-assignment',
  templateUrl: './practitioner-assignment.component.html',
  styleUrls: ['./practitioner-assignment.component.scss']
})
export class PractitionerAssignmentComponent extends RegistrationForm implements OnInit {

  constructor( protected registrationContainerService: RegistrationContainerService,
               protected router: Router ) {
    super(registrationContainerService, router);
  }

  ngOnInit() {
    this.registrationContainerService.$submitLabelSubject.next('Continue');
    this.registrationContainerService.$useDefaultColorSubject.next(true);
    super.ngOnInit();
  }

  continue() {
    console.log( 'Continue: Practitioner Assignment');
    this.navigate(PRACTITIONER_REGISTRATION_PAGES.REVIEW.fullpath);
  }
}
