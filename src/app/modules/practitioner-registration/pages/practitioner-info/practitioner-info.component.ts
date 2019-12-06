import { Component, AfterViewInit, OnInit } from '@angular/core';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { RegistrationForm } from '../../models/registration-form';
import { RegistrationContainerService } from '../../services/registration-container.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreatePractitionerDataService } from '../../services/create-practitioner-data.service';
import { CorePractitionerInfoFormItems } from '../../../core-bcp/components/core-practitioner-info/core-practitioner-info.component';

@Component({
  selector: 'bcp-practitioner-info',
  templateUrl: './practitioner-info.component.html',
  styleUrls: ['./practitioner-info.component.scss']
})
export class PractitionerInfoComponent extends RegistrationForm implements OnInit{

  pageTitle: string = 'Practitioner Information';
  formGroup: FormGroup;
  formItems: CorePractitionerInfoFormItems;


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

    this.formItems = {
      firstName: this.dataService.pracInfoFirstName,
      lastName: this.dataService.pracInfoLastName,
      mspPracNumber: this.dataService.pracInfoMSPPracNumber,
      email: this.dataService.pracInfoEmail,
      phoneNumber: this.dataService.pracInfoPhoneNumber,
      phoneNumberExt: this.dataService.pracInfoPhoneNumberExt,
      faxNumber: this.dataService.pracInfoFaxNumber
    }

    this.formGroup = this.fb.group({
      pracInfo: [this.formItems] 
    });

  }

  continue() {
    console.log('Continue: Practitioner Info');
    console.log("Items", this.formGroup.value);
    //this.navigate(PRACTITIONER_REGISTRATION_PAGES.FACILITY_INFO.fullpath);
  }
}
