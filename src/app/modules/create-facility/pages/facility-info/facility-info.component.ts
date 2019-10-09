import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CreateFacilityForm } from '../../models/create-facility-form';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { cCreateFacilityValidators, validMultiFormControl } from '../../models/validators';
import { BRITISH_COLUMBIA, CheckCompleteBaseService } from 'moh-common-lib';
import { CreateFacilityDataService } from '../../services/create-facility-data.service';

@Component({
  selector: 'app-facility-info',
  templateUrl: './facility-info.component.html',
  styleUrls: ['./facility-info.component.scss']
})
export class FacilityInfoComponent extends CreateFacilityForm implements OnInit {

  showMailingAddress: false;
  facilityForm: FormGroup;
  mailingForm: FormGroup;

  validFormControl: (fg: FormGroup, name: string) => boolean;
  json: (formValues: any) => any;
  radioBtnLabels = [
    { label: 'No', value: false },
    { label: 'Yes', value: true },
  ];

  availableServiceTypes = [
    { label: `Physician's private office`, value: '1', optional:false, selected: false },
    { label: 'Population Based Funding (PBF)', value: '2', optional:false, selected: false },
    { label: 'Primary Care Network', value: '3', optional:false, selected: false },
    { label: 'UPPC', value: '4', optional:false, selected: false },
    { label: 'Walk in clinic', value: '5', optional:false, selected: false },
  ];

  buildServiceTypes() {
    const arr = this.availableServiceTypes.map(serviceType => {
      return this.fb.control(serviceType.selected);
    });
    return this.fb.array(arr,Validators.required);
  }

  get getServiceTypes(): FormArray {
    return this.facilityForm.get('services') as FormArray;
  }


  constructor(
    protected router: Router,
    private pageCheckService: CheckCompleteBaseService,    
    public dataService: CreateFacilityDataService,
    private fb: FormBuilder,
  ) {
    super(router);
    this.validFormControl = validMultiFormControl;
  }

  ngOnInit() {
    this.facilityForm = this.createForm();
    this.buildServiceTypes();
    this.mailingForm = this.createAddressForm();
  }

  private createForm() {
    const form = this.fb.group({
      facilityName: [
        null,
        cCreateFacilityValidators.facilityDetail.facilityName,
      ],
      address: [null, cCreateFacilityValidators.address.streetAddress],
      city: [null, cCreateFacilityValidators.address.city],
      province: [BRITISH_COLUMBIA],
      postalCode: [null, cCreateFacilityValidators.address.postalCode],
      phoneNumber: [null, cCreateFacilityValidators.facilityDetail.phoneNumber],
      faxNumber: [null, cCreateFacilityValidators.facilityDetail.faxNumber],
      isSameMailingAddress: [null],
      isQualifyForBCP: [null, cCreateFacilityValidators.facilityDetail.isQualifyForBCP],
      services: this.buildServiceTypes()
    });
    return form;
  }

  private createAddressForm() {
    const form = this.fb.group({

      mailing_address: [null, cCreateFacilityValidators.address.streetAddress],
      mailing_city: [null, cCreateFacilityValidators.address.city],
      mailing_province: [null, cCreateFacilityValidators.address.province],
      mailing_postalCode: [null, cCreateFacilityValidators.address.postalCode],
    });
    return form;
  }

  toggleMailingAddress(formGroup, status) {
    this.facilityForm.patchValue({ isSameMailingAddress: status });
    this.showMailingAddress = status;
  }

  continue() {
    this.navigate('register-facility/review');
  }
 
}
