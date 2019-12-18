import { Component, OnInit } from '@angular/core';
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
export class FacilityInfoComponent extends BcpBaseForm implements OnInit {

  pageTitle: string = 'Facility Information';
  formGroup: FormGroup;

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
    });
  }

  continue() {
    this.markAllInputsTouched();

    console.log( 'Continue: Facility Info');
    console.log('Items', this.formGroup.value);
    if (this.formGroup.valid) {

      this.containerService.setIsLoading();

      this.apiService.validateFacilityID({
        number: this.dataService.pracFacilityNumber,
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
            this.navigate(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_ASSIGN.fullpath);
          }

        }, error => {
          console.log('ARC apiService onerror', error);
          this.containerService.setIsLoading(false);
        });
    }
  }
}
