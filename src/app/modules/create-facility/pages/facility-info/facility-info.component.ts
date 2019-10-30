import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CreateFacilityForm } from '../../models/create-facility-form';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { cCreateFacilityValidators, validMultiFormControl } from '../../models/validators';
import { BRITISH_COLUMBIA, CheckCompleteBaseService, Address } from 'moh-common-lib';
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
    this.updateMailingValidity(this.dataService.facInfoIsSameMailingAddress);
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

      // Phone number and extensions has been removed
      // phoneNumber: [this.dataService.facInfoPhoneNumber, cCreateFacilityValidators.facilityDetail.phoneNumber],
      // phoneExtension: [this.dataService.facInfoPhoneExtension],

      faxNumber: [this.dataService.facInfoFaxNumber, cCreateFacilityValidators.facilityDetail.faxNumber],
      isSameMailingAddress: [this.dataService.facInfoIsSameMailingAddress, cCreateFacilityValidators.facilityDetail.isSameMailingAddress],
      isQualifyForBCP: [this.dataService.facInfoIsQualifyForBCP, cCreateFacilityValidators.facilityDetail.isQualifyForBCP],

      // effectiveDate: [this.getEffectiveDateInCommonDateFormat, cCreateFacilityValidators.facilityDetail.effectiveDate],
      // common-date gives error if we provide date in simpledate format for initialization, changinging to null
      // effectiveDate: [null, cCreateFacilityValidators.facilityDetail.effectiveDate],
      effectiveDate: [this.dataService.facInfoEffectiveDate, cCreateFacilityValidators.facilityDetail.effectiveDate],
      // effectiveDate: [new Date()],



      mailingAddress: [this.dataService.facInfoMailAddress, cCreateFacilityValidators.address.streetAddress],
      mailingCity: [this.dataService.facInfoMailCity, cCreateFacilityValidators.address.city],
      mailingProvince: [BRITISH_COLUMBIA],
      mailingPostalCode: [this.dataService.facInfoMailPostalCode, cCreateFacilityValidators.address.postalCode],

    });

    form.get('isSameMailingAddress').valueChanges.subscribe(
      value => this.updateMailingValidity(value)
    );

    this.showMailingAddress = !this.dataService.facInfoIsSameMailingAddress;
    return form;
  }

  //#region Mailing Address update data service effective date
  // following code intentionally kept simple for maintenance

  // public get getEffectiveDateInCommonDateFormat(): SimpleDate {

  //   // issue with common-date. It does not set the common-date at all, in simpledate or initialization
  //   // ref: bcp-16 #comment-24615
  //   // https://github.com/bcgov/moh-common-styles/blob/master/projects/common/lib/models/simple-date.interface.ts
  //   // https://github.com/bcgov/moh-common-styles/blob/master/projects/common/lib/components/date/date.component.ts

  //   // tbr
  //   const date = this.dataService.facInfoEffectiveDate? this.dataService.facInfoEffectiveDate : new Date();

  //   const commonDateFormat = {
  //     day: date.getDay(),
  //     month: date.getMonth(),
  //     year: date.getFullYear(),
  //   }
  //   return commonDateFormat;
  // }

  updateMailingValidity(isRequired: boolean): void {
    const address = this.facilityForm.get('mailingAddress');
    const city = this.facilityForm.get('mailingCity');
    const province = this.facilityForm.get('mailingProvince');
    const postalCode = this.facilityForm.get('mailingPostalCode');
    if (!isRequired) {
      address.setValidators(Validators.required);
      city.setValidators(Validators.required);
      province.setValidators(Validators.required);
      postalCode.setValidators(Validators.required);
    } else {
      address.clearValidators();
      city.clearValidators();
      province.clearValidators();
      postalCode.clearValidators();

      address.patchValue(null);
      city.patchValue(null);
      postalCode.patchValue(null);
    }

    address.updateValueAndValidity();
    city.updateValueAndValidity();
    province.updateValueAndValidity();
    postalCode.updateValueAndValidity();

    this.showMailingAddress = !isRequired;
    this.facilityForm.patchValue({
      mailingAddress: null,
      mailingCity: null,
      mailingPostalCode: null
    });

    this.facilityForm.updateValueAndValidity({ onlySelf: false });
  }

  updateDataService() {
    // As per direction  to use dataservice for state ref:bcp-68 bcp-69 comments

    const fd = this.facilityForm.value;
    this.dataService.facInfoFacilityName = fd.facilityName;
    this.dataService.facInfoPhysicalAddress = fd.address;
    this.dataService.facInfoCity = fd.city;
    this.dataService.facInfoProvince = fd.province;
    this.dataService.facInfoPostalCode = fd.postalCode;
    this.dataService.facInfoFaxNumber = fd.faxNumber;
    this.dataService.facInfoIsSameMailingAddress = fd.isSameMailingAddress;
    this.dataService.facInfoIsQualifyForBCP = fd.isQualifyForBCP;
    this.dataService.facInfoEffectiveDate = fd.effectiveDate;

    this.dataService.facInfoMailAddress = fd.mailingAddress;
    this.dataService.facInfoMailCity = fd.mailingCity;
    this.dataService.facInfoMailProvince = fd.mailingProvince;
    this.dataService.facInfoMailPostalCode = fd.mailingPostalCode;
  }

  //#region

  continue() {
    this.updateDataService();


    // todo: fix common-components issues
    this.facilityForm.markAllAsTouched();
    // this.markAllInputsTouched();
    if (this.facilityForm.valid) {
      this.navigate('register-facility/review');
    }
  }

  physicalAddressSelected(address: Address){    
    console.log(address);
    this.facilityForm.patchValue({
      address: address.addressLine1,
      city: address.city
    });

    this.dataService.facInfoPhysicalAddress = address.addressLine1;
    this.dataService.facInfoCity = address.city;
  }
  mailingAddressSelected(address: Address){    
    console.log(address);
    this.facilityForm.patchValue({
      mailingAddress: address.addressLine1,
      mailingCity: address.city
    });
    this.dataService.facInfoMailAddress = address.addressLine1;
    this.dataService.facInfoMailCity = address.city;
  }
}
