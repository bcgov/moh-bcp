import { Component, AfterViewInit, OnInit } from '@angular/core';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { RegistrationForm } from '../../models/registration-form';
import { RegistrationContainerService } from '../../services/registration-container.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'bcp-practitioner-info',
  templateUrl: './practitioner-info.component.html',
  styleUrls: ['./practitioner-info.component.scss']
})
export class PractitionerInfoComponent extends RegistrationForm implements OnInit{

  pageTitle: string = 'Practitioner Information';
  pracGroup: FormGroup;


  constructor( protected registrationContainerService: RegistrationContainerService,
               protected router: Router,
               private fb: FormBuilder) {
    super(registrationContainerService, router);
  }

  pracInfoFirstName: string = 'First Name';
  pracInfoLastName: string = 'Last Name';
  pracInfoMSPPracNumber: string = '123';
  pracInfoEmail: string = 'name@example.com';
  pracInfoPhoneNumber: string = '234 567-8901';
  pracInfoPhoneNumberExt: string = '234';
  pracInfoFaxNumber: string = '789 456-1230';

  ngOnInit() {
    this.registrationContainerService.$submitLabelSubject.next('Continue');
    this.registrationContainerService.$useDefaultColorSubject.next(true);
    super.ngOnInit();

    this.pracGroup = this.fb.group({
      pracInfoFirstName: [this.pracInfoFirstName, [Validators.required]],
      pracInfoLastName: [this.pracInfoLastName, [Validators.required]],
      pracInfoMSPPracNumber: [this.pracInfoMSPPracNumber, [Validators.required]],
      pracInfoEmail: [this.pracInfoEmail, [Validators.email]],
      pracInfoPhoneNumber: [this.pracInfoPhoneNumber, [Validators.required]],
      pracInfoPhoneNumberExt: [this.pracInfoPhoneNumberExt, [Validators.required]],
      pracInfoFaxNumber: [this.pracInfoFaxNumber],
    });
  }

  continue() {
    console.log( 'Continue: Practitioner Info');
    this.navigate(PRACTITIONER_REGISTRATION_PAGES.FACILITY_INFO.fullpath);
  }
}
