import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CreateFacilityForm } from '../../models/create-facility-form';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { cCreateFacilityValidators, validMultiFormControl } from '../../models/validators';
import { BRITISH_COLUMBIA, CheckCompleteBaseService } from 'moh-common-lib';
import { CreateFacilityDataService } from '../../services/create-facility-data.service';
import { environment } from 'src/environments/environment';
import { RandomObjects } from '../../models/i-dataform';

@Component({
  selector: 'app-facility-info',
  templateUrl: './facility-info.component.html',
  styleUrls: ['./facility-info.component.scss']
})
export class FacilityInfoComponent extends CreateFacilityForm implements OnInit {

  showMailingAddress: boolean = false;
  facilityForm: FormGroup;
  mailingForm: FormGroup;

  validFormControl: (fg: FormGroup, name: string) => boolean;
  json: (formValues: any) => any;
  radioBtnLabels = [
    { label: 'No', value: false },
    { label: 'Yes', value: true },
  ];


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
      phoneExtension: [null],
      faxNumber: [null, cCreateFacilityValidators.facilityDetail.faxNumber],
      isSameMailingAddress: [null, cCreateFacilityValidators.facilityDetail.isSameMailingAddress],
      isQualifyForBCP: [null, cCreateFacilityValidators.facilityDetail.isQualifyForBCP],
      effectiveDate: [null, Validators.required]
    });
    return form;
  }

  private createAddressForm() {
    const form = this.fb.group({
      mailing_address: [null, cCreateFacilityValidators.address.streetAddress],
      mailing_city: [null, cCreateFacilityValidators.address.city],
      mailing_province: [BRITISH_COLUMBIA],
      mailing_postalCode: [null, cCreateFacilityValidators.address.postalCode],
    });
    return form;
  }

  toggleMailingAddress(formGroup, status) {
    console.log(status);
    this.showMailingAddress = status ? false : true;
    this.facilityForm.patchValue({ isSameMailingAddress: status });

  }

  continue() {    
    this.facilityForm.markAllAsTouched();
    this.markAllInputsTouched();

    // this.markAllInputsTouched();
    //this.navigate('register-facility/review');
  }

  patchValue(formGroup) {
    if (!environment.useDummyData) return;
    formGroup.patchValue(RandomObjects.getFacilityInfo('test'));
}

}
