import { Component, OnInit } from '@angular/core';
import { RegistrationForm } from '../../models/registration-form';
import { RegistrationContainerService } from '../../services/registration-container.service';
import { Router } from '@angular/router';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CreatePractitionerDataService } from '../../services/create-practitioner-data.service';
import { getProvinceDescription } from 'moh-common-lib';
import { CoreFacilityInfoFormItems } from '../../../core-bcp/components/core-facility-info/core-facility-info.component';

@Component({
  selector: 'bcp-facility-info',
  templateUrl: './facility-info.component.html',
  styleUrls: ['./facility-info.component.scss']
})
export class FacilityInfoComponent extends RegistrationForm implements OnInit {

  pageTitle: string = 'Facility Information';
  formGroup: FormGroup;
  formItems: CoreFacilityInfoFormItems;

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

    this.formItems = {
      name: this.dataService.pracFacilityName,
      mspNumber: this.dataService.pracFacilityNumber,
      address: this.dataService.pracFacilityAddress,
      city: this.dataService.pracFacilityCity,
      province: getProvinceDescription(this.dataService.pracFacilityProvince),
      postalCode: this.dataService.pracFacilityPostalCode,
    }

    this.formGroup = this.fb.group({
      facInfo: [this.formItems] 
    });
  }

  continue() {
    console.log( 'Continue: Facility Info');
    console.log("Items", this.formGroup.value);
    this.navigate(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_ASSIGN.fullpath);
  }
}
