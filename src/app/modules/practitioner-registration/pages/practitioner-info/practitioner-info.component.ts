import { Component, AfterViewInit, OnInit } from '@angular/core';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { RegistrationForm } from '../../models/registration-form';
import { RegistrationContainerService } from '../../services/registration-container.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bcp-practitioner-info',
  templateUrl: './practitioner-info.component.html',
  styleUrls: ['./practitioner-info.component.scss']
})
export class PractitionerInfoComponent extends RegistrationForm implements OnInit{

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
    console.log( 'Continue: Practitioner Info');
    this.navigate(PRACTITIONER_REGISTRATION_PAGES.FACILITY_INFO.fullpath);
  }
}
