import { Component, AfterViewInit, OnInit } from '@angular/core';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { RegistrationForm } from '../../models/registration-form';
import { RegistrationContainerService } from '../../services/registration-container.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreatePractitionerDataService } from '../../services/create-practitioner-data.service';

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
               private fb: FormBuilder,
               public dataService: CreatePractitionerDataService) {
    super(registrationContainerService, router);
  }

  ngOnInit() {
    this.registrationContainerService.$submitLabelSubject.next('Continue');
    this.registrationContainerService.$useDefaultColorSubject.next(true);
    super.ngOnInit();

    this.pracGroup = this.fb.group({
      pracInfoFirstName: [this.dataService.pracInfoFirstName, [Validators.required]],
      pracInfoLastName: [this.dataService.pracInfoLastName, [Validators.required]],
      pracInfoMSPPracNumber: [this.dataService.pracInfoMSPPracNumber, [Validators.required]],
      pracInfoEmail: [this.dataService.pracInfoEmail, [Validators.email]],
      pracInfoPhoneNumber: [this.dataService.pracInfoPhoneNumber, [Validators.required]],
      pracInfoPhoneNumberExt: [this.dataService.pracInfoPhoneNumberExt, [Validators.required]],
      pracInfoFaxNumber: [this.dataService.pracInfoFaxNumber],
    });
  }

  continue() {
    console.log( 'Continue: Practitioner Info');
    this.navigate(PRACTITIONER_REGISTRATION_PAGES.FACILITY_INFO.fullpath);
  }
}
