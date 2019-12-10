import { Component, OnInit } from '@angular/core';
import { RegistrationForm } from '../../models/registration-form';
import { RegistrationContainerService } from '../../services/registration-container.service';
import { Router } from '@angular/router';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreatePractitionerDataService } from '../../services/create-practitioner-data.service';
import { getProvinceDescription } from 'moh-common-lib';


@Component({
  selector: 'bcp-facility-info',
  templateUrl: './facility-info.component.html',
  styleUrls: ['./facility-info.component.scss']
})
export class FacilityInfoComponent extends RegistrationForm implements OnInit {

  pageTitle: string = 'Facility Information';
  formGroup: FormGroup;

  constructor( protected registrationContainerService: RegistrationContainerService,
               protected router: Router,
               private fb: FormBuilder,
               private dataService: CreatePractitionerDataService ) {
    super(registrationContainerService, router);
  }

  ngOnInit() {
    this.registrationContainerService.$submitLabelSubject.next('Continue');
    this.registrationContainerService.$useDefaultColorSubject.next(true);
    super.ngOnInit();

    this.formGroup = this.fb.group({
      name: [this.dataService.pracFacilityName, [Validators.required]],
      mspNumber: [this.dataService.pracFacilityNumber, [Validators.required]],
      address: [this.dataService.pracFacilityAddress, [Validators.required]],
      city: [this.dataService.pracFacilityCity, [Validators.required]],
      province: [getProvinceDescription(this.dataService.pracFacilityProvince)],
      postalCode: [this.dataService.pracFacilityPostalCode, [Validators.required]],
    });
  }

  continue() {
    this.markAllInputsTouched();

    console.log( 'Continue: Facility Info');
    console.log("Items", this.formGroup.value);
    if (this.formGroup.valid) {
      this.navigate(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_ASSIGN.fullpath);
    }
  }
}
