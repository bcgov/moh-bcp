import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { cCreateFacilityValidators, validMultiFormControl } from '../../models/validators';
import { Address, getProvinceDescription, ErrorMessage, ContainerService } from 'moh-common-lib';
import { CreateFacilityDataService } from '../../services/create-facility-data.service';
import { CREATE_FACILITY_PAGES } from '../../create-facility-route-constants';
import { stripPostalCodeSpaces } from '../../../core-bcp/models/helperFunc';
import { SplunkLoggerService } from '../../../../services/splunk-logger.service';
import { startOfToday, addYears, compareAsc } from 'date-fns';
import { PageStateService } from 'moh-common-lib';
import { BcpBaseForm } from '../../../core-bcp/models/bcp-base-form';
import { ValidationResponse, ReturnCodes } from '../../../core-bcp/models/base-api.model';
import { CreateFacilityApiService } from '../../services/create-facility-api.service';
import { IRadioItems } from 'moh-common-lib/lib/components/radio/radio.component';

@Component({
  selector: 'app-facility-info',
  templateUrl: './facility-info.component.html',
  styleUrls: ['./facility-info.component.scss']
})
export class FacilityInfoComponent extends BcpBaseForm implements OnInit {

  systemDownError = false;

  // Error Messages
  qualifyBcpError: ErrorMessage = {
    required: 'Please indicate if your business qualifies for the Business Cost Premium'
  };

  sameMailAddrError: ErrorMessage = {
    required: 'Please indicate if the mailing address is the same as the physical address'
  };


  // Facility Effective Date can be on or after January 1, 1966
  effectStartRange: Date = new Date( 1966, 0, 1 );
  isEffectiveDateWarning: boolean = false;
  isQualifyForBCPOptions: Array<IRadioItems> = [
    {
      label: 'The applicant requests that the Business Cost Premium be applied to Eligible Fees paid to Eligible Physicians attached to this facility.',
      value: true
    },
    {
      label: 'The applicant requests that the Business Cost Premium not be applied to the facility referenced in this form.',
      value: false
    }
  ];

  // After this date a warning is displayed
  private _effectiveDateThreshold = addYears( startOfToday(), 1 );

  constructor(
    protected router: Router,
    protected pageStateService: PageStateService,
    public dataService: CreateFacilityDataService,
    private fb: FormBuilder,
    private api: CreateFacilityApiService,
    private cdr: ChangeDetectorRef,
    private splunkLoggerService: SplunkLoggerService,
    protected containerService: ContainerService) {
    super(router, containerService, pageStateService);
    this.validFormControl = validMultiFormControl;
  }

  showMailingAddress: boolean = false;
  facilityForm: FormGroup;
  mailingForm: FormGroup;

  validFormControl: (fg: FormGroup, name: string) => boolean;

  // physicalAddress: any = null;
  // mailingAddress: any = null;

  get pageTitle() {
    return CREATE_FACILITY_PAGES.FACILITY_INFO.title;
  }

  ngOnInit() {
    super.ngOnInit();
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
        console.log('%c ADDRESS (phys) changed: %o', 'color:blue', value);
       // if (!value) {
       //   this.physicalAddress = null;
       // }
        this.dataService.facInfoPhysicalAddress = value;
      }
    );

    form.get('mailingAddress').valueChanges.subscribe(
      value => {
        console.log('%c ADDRESS (mail) changed: %o', 'color:red', value);
       /* if (!value) {
          this.mailingAddress = null;
        }*/
        this.dataService.facInfoMailAddress = value;
      }
    );

    form.get('effectiveDate').valueChanges.subscribe(
      value => {
        if (value) {
          this.isEffectiveDateWarning = compareAsc( value, this._effectiveDateThreshold ) > 0 ? true : false;
        }
      }
    );

    this.showMailingAddress = this.dataService.facInfoIsSameMailingAddress ? !this.dataService.facInfoIsSameMailingAddress : false;
   // this.physicalAddress = { addressLine1: this.dataService.facInfoPhysicalAddress };
   // this.mailingAddress = { addressLine1: this.dataService.facInfoMailAddress };
    return form;
  }

  //#region Mailing Address update data service effective date
  updateMailingValidity(isRequired: boolean | null): void {
    const address = this.facilityForm.get('mailingAddress');
    const city = this.facilityForm.get('mailingCity');
    const postalCode = this.facilityForm.get('mailingPostalCode');
    if (!isRequired) {

      address.setValidators(cCreateFacilityValidators.address.streetAddress);
      city.setValidators(cCreateFacilityValidators.address.city);
      postalCode.setValidators(cCreateFacilityValidators.address.postalCode);
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
    this.dataService.facInfoPhysicalAddress = fd.address; // this.physicalAddress ? this.physicalAddress.addressLine1 : fd.address;
    this.dataService.facInfoCity = fd.city;
    this.dataService.facInfoPostalCode = fd.postalCode;
    this.dataService.facInfoFaxNumber = fd.faxNumber;
    this.dataService.facInfoIsSameMailingAddress = fd.isSameMailingAddress;
    this.dataService.facInfoIsQualifyForBCP = fd.isQualifyForBCP;
    this.dataService.facInfoEffectiveDate = fd.effectiveDate;

    this.dataService.facInfoMailAddress = fd.mailingAddress; // this.mailingAddress ? this.mailingAddress.addressLine1 : fd.mailingAddress;
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
      this.pageStateService.setPageComplete();
      this.containerService.setIsLoading();

      this.api.validateFacility({
        facilityName: this.dataService.facInfoFacilityName,
        number: null,
        // API expects postalCode without any spaces in it
        postalCode: stripPostalCodeSpaces(this.dataService.facInfoPostalCode)
      }, this.dataService.applicationUUID)
        .subscribe((res: ValidationResponse) => {
          this.dataService.jsonFacilityValidation.response = res;

          this.splunkLoggerService.log(
              this.dataService.getSubmissionLogObject<ValidationResponse>(
                'Validate Facility',
                this.dataService.jsonFacilityValidation.response
              )
          );

          if (res.returnCode === ReturnCodes.SUCCESS) {
            this.handleAPIValidation(true);
            this.dataService.validateFacilityMessage = res.message;
          } else {
            if (Number(res.returnCode) <= Number(ReturnCodes.SYSTEM_ERROR)) {
              // Set to near match so that document is sent to MAXIMAGE
              this.dataService.validateFacilityMessage = 'UNKNOWN';
            } else {
              this.dataService.validateFacilityMessage = res.message;
            }
            // we treat near match or exact match the same
            this.handleAPIValidation(false);
          }

          this.navigate(CREATE_FACILITY_PAGES.REVIEW.fullpath);

        }, error => {
          console.log('apiService onerror', error);
          this.handleError();
        });
    }
  }

  /* NOTE: Removed until GeoCoder component is fixed
  physicalAddressSelected(address: Address) {
    console.log('%c ADDRESS (physicalAddr): %o', 'color:red', address);
    this.facilityForm.patchValue({
      address: address.addressLine1,
      city: address.city
    });

    this.dataService.facInfoPhysicalAddress = address.addressLine1;
    this.dataService.facInfoCity = address.city;

    // this.physicalAddress = address;
  }
  */
  /* NOTE: Removed until GeoCoder component is fixed
  mailingAddressSelected(address: Address) {
    // console.log('%c ADDRESS: %o', 'color:red', address);
    this.facilityForm.patchValue({
      mailingAddress: address.addressLine1,
      mailingCity: address.city
    });
    this.dataService.facInfoMailAddress = address.addressLine1;
    this.dataService.facInfoMailCity = address.city;
   // this.mailingAddress = address;
  }
  */

  private handleError(): void {
    this.systemDownError = true;
    this.containerService.setIsLoading(false);
    this.cdr.detectChanges();
  }

  handleAPIValidation(isValid: boolean) {
    this.systemDownError = false;
    this.containerService.setIsLoading(false);
    this.dataService.apiDuplicateWarning = !isValid;
    this.cdr.detectChanges();
  }

  // Read-only fields
  get facInfoProvince() {
    return getProvinceDescription(this.dataService.facInfoProvince);
  }

  get facInfoMailProvince() {
    return getProvinceDescription(this.dataService.facInfoMailProvince);
  }
}
