import { Component, AfterViewInit, OnInit } from '@angular/core';
import { RegistrationContainerService } from '../../services/registration-container.service';
import { Router } from '@angular/router';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { RegistrationForm } from '../../models/registration-form';

@Component({
  selector: 'bcp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends RegistrationForm implements OnInit {

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
    console.log( 'Continue');
    this.navigate(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_INFO.fullpath);
  }
}
