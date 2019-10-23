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
    this.facilityForm = this.initialize();
    this.mailingForm = this.initializeAddressForm();
  }

  private initialize() {
    const form = this.fb.group({
      facilityName: [
        this.dataService.facInfoFacilityName,
        cCreateFacilityValidators.facilityDetail.facilityName,
      ],
      address: [this.dataService.facInfoPhysicalAddress, cCreateFacilityValidators.address.streetAddress],
      city: [this.dataService.facInfoCity, cCreateFacilityValidators.address.city],
      province: [BRITISH_COLUMBIA],
      postalCode: [this.dataService.facInfoPostalCode, cCreateFacilityValidators.address.postalCode],
      phoneNumber: [this.dataService.facInfoPhoneNumber, cCreateFacilityValidators.facilityDetail.phoneNumber],
      phoneExtension: [this.dataService.facInfoPhoneExtension],
      faxNumber: [this.dataService.facInfoFaxNumber, cCreateFacilityValidators.facilityDetail.faxNumber],
      isSameMailingAddress: [this.dataService.facInfoIsSameMailingAddress, cCreateFacilityValidators.facilityDetail.isSameMailingAddress],
      isQualifyForBCP: [this.dataService.facInfoIsQualifyForBCP, cCreateFacilityValidators.facilityDetail.isQualifyForBCP],
      effectiveDate: [null, Validators.required]
    });
    return form;
  }

  private initializeAddressForm() {
    const form = this.fb.group({
      mailing_address: [this.dataService.facInfoMailAddress, cCreateFacilityValidators.address.streetAddress],
      mailing_city: [this.dataService.facInfoMailCity, cCreateFacilityValidators.address.city],
      mailing_province: [BRITISH_COLUMBIA],
      mailing_postalCode: [this.dataService.facInfoMailPostalCode, cCreateFacilityValidators.address.postalCode],
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
