import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CreateFacilityForm } from '../../models/create-facility-form';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { cCreateFacilityValidators, validMultiFormControl } from '../../models/validators';
import { CheckCompleteBaseService, Address, getProvinceDescription, ErrorMessage } from 'moh-common-lib';
import { CreateFacilityDataService } from '../../services/create-facility-data.service';
import { BCPApiService } from '../../../../services/bcp-api.service';
import { ValidationResponse, ReturnCodes } from '../../models/create-facility-api-model';
import { CREATE_FACILITY_PAGES } from '../../create-facility-route-constants';

@Component({
  selector: 'app-facility-info',
  templateUrl: './facility-info.component.html',
  styleUrls: ['./facility-info.component.scss']
})
export class FacilityInfoComponent extends CreateFacilityForm implements OnInit {

  // Error Messages
  qualifyBcpError: ErrorMessage = {
    required: 'Please indicate if your business qualifies for the Business Cost Premium'
  };

  sameMailAddrError: ErrorMessage = {
    required: 'Please indicate if the mailing address is the same as the physical address'
  };


  // Facility Effective Date can be on or after January 1, 1966
  effectStartRange: Date = new Date( 1966, 0, 1 );

  constructor(
    protected router: Router,
    private pageCheckService: CheckCompleteBaseService,
    public dataService: CreateFacilityDataService,
    private fb: FormBuilder,
    private api: BCPApiService,
    private cdr: ChangeDetectorRef,
  ) {
    super(router);
    this.validFormControl = validMultiFormControl;
  }

  showMailingAddress: boolean = false;
  facilityForm: FormGroup;
  mailingForm: FormGroup;

  validFormControl: (fg: FormGroup, name: string) => boolean;

  physicalAddress: any = null;
  mailingAddress: any = null;

  ngOnInit() {
    this.facilityForm = this.initialize();
    this.updateMailingValidity(this.dataService.facInfoIsSameMailingAddress);
  }

  private initialize() {
    const form = this.fb.group({
      facilityName: [this.dataService.facInfoFacilityName, cCreateFacilityValidators.facilityDetail.facilityName],

      // Facility address
      address: [this.dataService.facInfoPhysicalAddress, cCreateFacilityValidators.address.streetAddress],
      city: [this.dataService.facInfoCity, cCreateFacilityValidators.address.city],
      postalCode: [this.dataService.facInfoPostalCode, cCreateFacilityValidators.address.postalCode],

      faxNumber: [this.dataService.facInfoFaxNumber], // optional field
      isSameMailingAddress: [this.dataService.facInfoIsSameMailingAddress, cCreateFacilityValidators.facilityDetail.isSameMailingAddress],
      isQualifyForBCP: [this.dataService.facInfoIsQualifyForBCP, cCreateFacilityValidators.facilityDetail.isQualifyForBCP],

      effectiveDate: [this.dataService.facInfoEffectiveDate, cCreateFacilityValidators.facilityDetail.effectiveDate],

      // Mailing address - populated only if mailing address is different from physical
      mailingAddress: [this.dataService.facInfoMailAddress, cCreateFacilityValidators.address.streetAddress],
      mailingCity: [this.dataService.facInfoMailCity, cCreateFacilityValidators.address.city],
      mailingPostalCode: [this.dataService.facInfoMailPostalCode, cCreateFacilityValidators.address.postalCode],
    });

    form.get('isSameMailingAddress').valueChanges.subscribe(
      value => this.updateMailingValidity(value)
    );

    form.get('address').valueChanges.subscribe(
      value => {
        console.log('%c ADDRESS changed: %o', 'color:red', value);
        if (!value) {
          this.physicalAddress = null;
          this.dataService.facInfoPhysicalAddress = null;
        }
      }
    );

    form.get('mailingAddress').valueChanges.subscribe(
      value => {
        console.log('%c ADDRESS changed: %o', 'color:red', value);
        if (!value) {
          this.mailingAddress = null;
          this.dataService.facInfoMailAddress = null;
        }
      }
    );

    this.showMailingAddress = this.dataService.facInfoIsSameMailingAddress ? !this.dataService.facInfoIsSameMailingAddress : false;
    this.physicalAddress = { addressLine1: this.dataService.facInfoPhysicalAddress };
    this.mailingAddress = { addressLine1: this.dataService.facInfoMailAddress };
    return form;
  }

  //#region Mailing Address update data service effective date
  updateMailingValidity(isRequired: boolean | null): void {
    const address = this.facilityForm.get('mailingAddress');
    const city = this.facilityForm.get('mailingCity');
    const postalCode = this.facilityForm.get('mailingPostalCode');
    if (!isRequired) {
      address.setValidators(Validators.required);
      city.setValidators(Validators.required);
      postalCode.setValidators(Validators.required);
    } else {
      address.clearValidators();
      city.clearValidators();
      postalCode.clearValidators();

      address.patchValue(null);
      city.patchValue(null);
      postalCode.patchValue(null);
    }

    address.updateValueAndValidity();
    city.updateValueAndValidity();
    postalCode.updateValueAndValidity();

    this.showMailingAddress = !(isRequired === null) ? !isRequired : false;
    this.facilityForm.updateValueAndValidity({ onlySelf: false });
  }

  updateDataService() {
    // As per direction  to use dataservice for state ref:bcp-68 bcp-69 comments

    const fd = this.facilityForm.value;
    this.dataService.facInfoFacilityName = fd.facilityName;
    this.dataService.facInfoPhysicalAddress = this.physicalAddress ? this.physicalAddress.addressLine1 : fd.address;
    this.dataService.facInfoCity = fd.city;
    this.dataService.facInfoPostalCode = fd.postalCode;
    this.dataService.facInfoFaxNumber = fd.faxNumber;
    this.dataService.facInfoIsSameMailingAddress = fd.isSameMailingAddress;
    this.dataService.facInfoIsQualifyForBCP = fd.isQualifyForBCP;
    this.dataService.facInfoEffectiveDate = fd.effectiveDate;

    this.dataService.facInfoMailAddress = this.mailingAddress ? this.mailingAddress.addressLine1 : fd.mailingAddress;
    this.dataService.facInfoMailCity = fd.mailingCity;
    this.dataService.facInfoMailPostalCode = fd.mailingPostalCode;
  }

  //#region

  continue() {
    this.updateDataService();


    // todo: fix common-components issues - Not issues as the abstract form is using Template Forms not Reactive
    // note in common-library that this need to be addressed.
    this.facilityForm.markAllAsTouched();
    // this.markAllInputsTouched();
    if (this.facilityForm.valid) {
      this.loading = true;

      this.api.validateFacility({
        facilityName: this.dataService.facInfoFacilityName,
        // API expects postalCode without any spaces in it
        postalCode: this.dataService.facInfoPostalCode.replace(' ', '')
      }, this.dataService.applicationUUID)
        .subscribe((res: ValidationResponse) => {
          this.dataService.jsonFacilityValidation.response = res;

          if (res.returnCode === ReturnCodes.SUCCESS) {
            this.handleAPIValidation(true);
          } else if (res.returnCode === ReturnCodes.WARNING || res.returnCode === ReturnCodes.FAILURE) {
            // we treat near match or exact match the same
            this.handleAPIValidation(false);
          }
          this.dataService.validateFacilityMessage = res.message;
          this.navigate(CREATE_FACILITY_PAGES.REVIEW.fullpath);
          // TODO: Handle failure case, e.g. no backend, failed request, etc.
        });
    }
  }
  physicalAddressSelected(address: Address) {
    console.log(address);
    this.facilityForm.patchValue({
      address: address.addressLine1,
      city: address.city
    });

    this.dataService.facInfoPhysicalAddress = address.addressLine1;
    this.dataService.facInfoCity = address.city;
    this.physicalAddress = address;
  }
  mailingAddressSelected(address: Address) {
    // console.log('%c ADDRESS: %o', 'color:red', address);
    this.facilityForm.patchValue({
      mailingAddress: address.addressLine1,
      mailingCity: address.city
    });
    this.dataService.facInfoMailAddress = address.addressLine1;
    this.dataService.facInfoMailCity = address.city;
    this.mailingAddress = address;
  }


  handleAPIValidation(isValid: boolean) {
    this.loading = false;
    this.cdr.detectChanges();
    this.dataService.apiDuplicateWarning = !isValid;
    if (isValid) {
      this.pageCheckService.setPageComplete();
    } else {
      this.pageCheckService.setPageIncomplete();
    }

  }

  // Read-only fields
  get facInfoProvince() {
    return getProvinceDescription(this.dataService.facInfoProvince);
  }

  get facInfoMailProvince() {
    return getProvinceDescription(this.dataService.facInfoMailProvince);
  }
}
