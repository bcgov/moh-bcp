import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { RegistrationForm } from '../../models/registration-form';
import { ContainerService } from 'moh-common-lib';

@Component({
  selector: 'bcp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends RegistrationForm implements OnInit {

  constructor( protected containerService: ContainerService,
               protected router: Router ) {
    super(containerService, router);
  }

  ngOnInit() {
    this.containerService.setSubmitLabel();
    this.containerService.setUseDefaultColor();
  }

  continue() {
    console.log( 'Continue');
    this.navigate(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_INFO.fullpath);
  }
}
