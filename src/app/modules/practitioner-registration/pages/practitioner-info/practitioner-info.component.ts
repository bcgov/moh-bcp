import { Component, OnInit } from '@angular/core';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreatePractitionerDataService } from '../../services/create-practitioner-data.service';
import { CorePractitionerInfoFormItems } from '../../../core-bcp/components/core-practitioner-info/core-practitioner-info.component';
import { ContainerService, PageStateService } from 'moh-common-lib';
import { BcpBaseForm } from '../../../core-bcp/models/bcp-base-form';

@Component({
  selector: 'bcp-practitioner-info',
  templateUrl: './practitioner-info.component.html',
  styleUrls: ['./practitioner-info.component.scss']
})
export class PractitionerInfoComponent extends BcpBaseForm implements OnInit {

  pageTitle: string = 'Practitioner Information';
  formGroup: FormGroup;
  formItems: CorePractitionerInfoFormItems;


  constructor( protected containerService: ContainerService,
               protected router: Router,
               protected pageStateService: PageStateService,
               private fb: FormBuilder,
               public dataService: CreatePractitionerDataService) {
    super(router, containerService, pageStateService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.formGroup = this.fb.group({
      firstName: [this.dataService.pracInfoFirstName, [Validators.required]],
      lastName: [this.dataService.pracInfoLastName, [Validators.required]],
      mspPracNumber: [this.dataService.pracInfoMSPPracNumber, [Validators.required]],
      email: [this.dataService.pracInfoEmail, [Validators.email]],
      phoneNumber: [this.dataService.pracInfoPhoneNumber, [Validators.required]],
      phoneNumberExt: [this.dataService.pracInfoPhoneNumberExt],
      faxNumber: [this.dataService.pracInfoFaxNumber],
    });
  }

  continue() {
    this.markAllInputsTouched();

    console.log('Continue: Practitioner Info');
    console.log("Items", this.formGroup.value);

    if (this.formGroup.valid) {
      this.navigate(PRACTITIONER_REGISTRATION_PAGES.FACILITY_INFO.fullpath);
    }
  }
}
