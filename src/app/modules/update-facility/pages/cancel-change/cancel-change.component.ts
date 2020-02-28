import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UPDATE_FACILITY_PAGES } from '../../update-facility-route-constants';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateFacilityDataService } from '../../services/update-facility-data.service';
import { ContainerService, PageStateService } from 'moh-common-lib';
import { BcpBaseForm } from '../../../core-bcp/models/bcp-base-form';
import { UpdateFacilityApiService } from '../../services/update-facility-api.service';
import { ValidationResponse, ReturnCodes } from '../../../core-bcp/models/base-api.model';
import { SplunkLoggerService } from '../../../../services/splunk-logger.service';


@Component({
  selector: 'bcp-cancel-change',
  templateUrl: './cancel-change.component.html',
  styleUrls: ['./cancel-change.component.scss']
})
export class CancelChangeComponent extends BcpBaseForm implements OnInit, AfterViewInit {

  pageTitle: string = 'Cancel / Change';
  formGroup: FormGroup;
  changeFacilityAddressFG: FormGroup;
  changeMailingAddressFG: FormGroup;

  constructor( protected containerService: ContainerService,
               protected router: Router,
               protected pageStateService: PageStateService,
               private fb: FormBuilder,
               public dataService: UpdateFacilityDataService,
               private splunkLoggerService: SplunkLoggerService,
               private apiService: UpdateFacilityApiService ) {
    super(router, containerService, pageStateService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.formGroup = this.fb.group({
      checkChangeFacilityAddress: [this.dataService.checkChangeFacilityAddress, []],
      checkChangeMailingAddress: [this.dataService.checkChangeMailingAddress, []],
    });

    this.changeFacilityAddressFG = this.fb.group({
      changeFacilityAddressPreviousAddress: [this.dataService.changeFacilityAddressPreviousAddress, []],
      changeFacilityAddressPreviousCity: [this.dataService.changeFacilityAddressPreviousCity, []],
      changeFacilityAddressPreviousPostalCode: [this.dataService.changeFacilityAddressPreviousPostalCode, []],
      changeFacilityAddressPreviousFax: [this.dataService.changeFacilityAddressPreviousFax, []],
      changeFacilityAddressNewAddress: [this.dataService.changeFacilityAddressNewAddress, [Validators.required]],
      changeFacilityAddressNewCity: [this.dataService.changeFacilityAddressNewCity, [Validators.required]],
      changeFacilityAddressNewPostalCode: [this.dataService.changeFacilityAddressNewPostalCode, [Validators.required]],
      changeFacilityAddressNewFax: [this.dataService.changeFacilityAddressNewFax, []],
      changeFacilityAddressEffectiveDate: [this.dataService.changeFacilityAddressEffectiveDate, [Validators.required]],
    });
    this.changeMailingAddressFG = this.fb.group({
      changeMailingAddressPreviousAddress: [this.dataService.changeMailingAddressPreviousAddress, []],
      changeMailingAddressPreviousCity: [this.dataService.changeMailingAddressPreviousCity, []],
      changeMailingAddressPreviousPostalCode: [this.dataService.changeMailingAddressPreviousPostalCode, []],
      changeMailingAddressNewAddress: [this.dataService.changeMailingAddressNewAddress, [Validators.required]],
      changeMailingAddressNewCity: [this.dataService.changeMailingAddressNewCity, [Validators.required]],
      changeMailingAddressNewPostalCode: [this.dataService.changeMailingAddressNewPostalCode, [Validators.required]],
      changeMailingAddressEffectiveDate: [this.dataService.changeMailingAddressEffectiveDate, [Validators.required]],
    });
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    // Update data service values
    this.formGroup.valueChanges.subscribe( value => {
      this.dataService.checkChangeFacilityAddress = value.checkChangeFacilityAddress;
      this.dataService.checkChangeMailingAddress = value.checkChangeMailingAddress;
    });
    this.changeFacilityAddressFG.valueChanges.subscribe( value => {
      this.dataService.changeFacilityAddressPreviousAddress = value.changeFacilityAddressPreviousAddress;
      this.dataService.changeFacilityAddressPreviousCity = value.changeFacilityAddressPreviousCity;
      this.dataService.changeFacilityAddressPreviousPostalCode = value.changeFacilityAddressPreviousPostalCode;
      this.dataService.changeFacilityAddressPreviousFax = value.changeFacilityAddressPreviousFax;
      this.dataService.changeFacilityAddressNewAddress = value.changeFacilityAddressNewAddress;
      this.dataService.changeFacilityAddressNewCity = value.changeFacilityAddressNewCity;
      this.dataService.changeFacilityAddressNewPostalCode = value.changeFacilityAddressNewPostalCode;
      this.dataService.changeFacilityAddressNewFax = value.changeFacilityAddressNewFax;
      this.dataService.changeFacilityAddressEffectiveDate = value.changeFacilityAddressEffectiveDate;
    });
    this.changeMailingAddressFG.valueChanges.subscribe( value => {
      this.dataService.changeMailingAddressPreviousAddress = value.changeMailingAddressPreviousAddress;
      this.dataService.changeMailingAddressPreviousCity = value.changeMailingAddressPreviousCity;
      this.dataService.changeMailingAddressPreviousPostalCode = value.changeMailingAddressPreviousPostalCode;
      this.dataService.changeMailingAddressNewAddress = value.changeMailingAddressNewAddress;
      this.dataService.changeMailingAddressNewCity = value.changeMailingAddressNewCity;
      this.dataService.changeMailingAddressNewPostalCode = value.changeMailingAddressNewPostalCode;
      this.dataService.changeMailingAddressEffectiveDate = value.changeMailingAddressEffectiveDate;
    });
  }

  continue() {
    const forms = [];

    if (this.dataService.checkChangeFacilityAddress) {
      forms.push(this.changeFacilityAddressFG);
    }
    if (this.dataService.checkChangeMailingAddress) {
      forms.push(this.changeMailingAddressFG);
    }
    this.markAllInputsTouched(forms);

    if (forms.every( (x) => x.valid === true )) {
      this.navigate(UPDATE_FACILITY_PAGES.REVIEW.fullpath);
    }
  }

  changeFacilityAddressPreviousAddressSelected(address: any) {
    if (!address.addressLine1 && !address.city) {
      return;
    }
    this.changeFacilityAddressFG.patchValue({
      changeFacilityAddressPreviousAddress: address.addressLine1,
      changeFacilityAddressPreviousCity: address.city
    });
    this.dataService.changeFacilityAddressPreviousAddress = address.addressLine1;
    this.dataService.changeFacilityAddressPreviousCity = address.city;
  }

  changeFacilityAddressNewAddressSelected(address: any) {
    if (!address.addressLine1 && !address.city) {
      return;
    }
    this.changeFacilityAddressFG.patchValue({
      changeFacilityAddressNewAddress: address.addressLine1,
      changeFacilityAddressNewCity: address.city
    });
    this.dataService.changeFacilityAddressNewAddress = address.addressLine1;
    this.dataService.changeFacilityAddressNewCity = address.city;
  }

  changeMailingAddressPreviousAddressSelected(address: any) {
    if (!address.addressLine1 && !address.city) {
      return;
    }
    this.changeMailingAddressFG.patchValue({
      changeMailingAddressPreviousAddress: address.addressLine1,
      changeMailingAddressPreviousCity: address.city
    });
    this.dataService.changeMailingAddressPreviousAddress = address.addressLine1;
    this.dataService.changeMailingAddressPreviousCity = address.city;
  }

  changeMailingAddressNewAddressSelected(address: any) {
    if (!address.addressLine1 && !address.city) {
      return;
    }
    this.changeMailingAddressFG.patchValue({
      changeMailingAddressNewAddress: address.addressLine1,
      changeMailingAddressNewCity: address.city
    });
    this.dataService.changeMailingAddressNewAddress = address.addressLine1;
    this.dataService.changeMailingAddressNewCity = address.city;
  }
}
