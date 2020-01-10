import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterPractitionerDataService } from '../../services/register-practitioner-data.service';
import { getProvinceDescription, ContainerService, PageStateService } from 'moh-common-lib';
import { BcpBaseForm } from '../../../core-bcp/models/bcp-base-form';
import { SplunkLoggerService } from '../../../../services/splunk-logger.service';
import { RegisterPractitionerApiService } from '../../services/register-practitioner-api.service';
import { stripPostalCodeSpaces } from '../../../core-bcp/models/helperFunc';
import { ValidationResponse, ReturnCodes } from '../../../core-bcp/models/base-api.model';


@Component({
  selector: 'bcp-facility-info',
  templateUrl: './facility-info.component.html',
  styleUrls: ['./facility-info.component.scss']
})
export class FacilityInfoComponent extends BcpBaseForm implements OnInit, AfterViewInit {

  pageTitle: string = 'Facility Information';
  formGroup: FormGroup;
  showValidationError: boolean = false;
  systemDownError: boolean = false;

  constructor( protected containerService: ContainerService,
               protected router: Router,
               protected pageStateService: PageStateService,
               private fb: FormBuilder,
               private dataService: RegisterPractitionerDataService,
               private splunkLoggerService: SplunkLoggerService,
               private apiService: RegisterPractitionerApiService  ) {
    super(router, containerService, pageStateService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.formGroup = this.fb.group({
      name: [this.dataService.pracFacilityName, [Validators.required]],
      mspNumber: [this.dataService.pracFacilityNumber, [Validators.required]],
      address: [this.dataService.pracFacilityAddress, [Validators.required]],
      city: [this.dataService.pracFacilityCity, [Validators.required]],
      province: [getProvinceDescription(this.dataService.pracFacilityProvince)],
      postalCode: [this.dataService.pracFacilityPostalCode, [Validators.required]],
      faxNumber: [this.dataService.pracFacilityFaxNumber],
    });
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.formGroup.valueChanges.subscribe( value => {
      // Update data service values
      this.dataService.pracFacilityName = value.name;
      this.dataService.pracFacilityNumber = value.mspNumber;
      this.dataService.pracFacilityAddress = value.address;
      this.dataService.pracFacilityCity = value.city;
      this.dataService.pracFacilityProvince = value.province;
      this.dataService.pracFacilityPostalCode = value.postalCode;
      this.dataService.pracFacilityFaxNumber = value.faxNumber;
    });
  }

  continue() {
    this.markAllInputsTouched();

    console.log( 'Continue: Facility Info');
    console.log('Items', this.formGroup.value);
    if (this.formGroup.valid) {

      this.containerService.setIsLoading();

      this.apiService.validateFacility({
        facilityName: null,
        facilityNumber: this.dataService.pracFacilityNumber,
        // API expects postalCode without any spaces in it
        postalCode: stripPostalCodeSpaces(this.dataService.pracFacilityPostalCode)
      }, this.dataService.applicationUUID)
        .subscribe((res: ValidationResponse) => {
          this.dataService.jsonFacilityValidation.response = res;

          this.splunkLoggerService.log(
            this.dataService.getSubmissionLogObject<ValidationResponse>(
              'Validate Facility ID',
              this.dataService.jsonFacilityValidation.response
            )
          );

          this.containerService.setIsLoading(false);

          if (res.returnCode === ReturnCodes.SUCCESS) {
            this.handleValidation(true);
            this.navigate(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_ASSIGN.fullpath);
          } else if (res.returnCode === ReturnCodes.FAILURE) {
            this.handleValidation(false);
          } else {
            // fall-through case, likely an error
            this.handleError();
          }

        }, error => {
          console.log('ARC apiService onerror', error);
          this.handleError();
        });
    }
  }

  private handleError(): void {
    this.systemDownError = true;
    this.containerService.setIsLoading(false);
  }

  private handleValidation(isValid: boolean): void {
    this.showValidationError = !isValid;
    this.systemDownError = false;
    this.containerService.setIsLoading(false);
  }
}
