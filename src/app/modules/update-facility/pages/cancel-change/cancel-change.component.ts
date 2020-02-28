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
    });

    this.changeFacilityAddressFG = this.fb.group({
      changeFacilityAddressPreviousAddress: [this.dataService.changeFacilityAddressPreviousAddress, []],
      changeFacilityAddressPreviousCity: [this.dataService.changeFacilityAddressPreviousCity, []],
      changeFacilityAddressPreviousPostalCode: [this.dataService.changeFacilityAddressPreviousPostalCode, []],
      changeFacilityAddressPreviousFax: [this.dataService.changeFacilityAddressPreviousFax, []],
    });
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    // Update data service values
    this.formGroup.valueChanges.subscribe( value => {
      this.dataService.checkChangeFacilityAddress = value.checkChangeFacilityAddress;
    });
  }

  continue() {
    this.markAllInputsTouched();

    if (this.formGroup.valid) {
      this.navigate(UPDATE_FACILITY_PAGES.REVIEW.fullpath);
    }
  }

  selectChangeFacilityAddress(checked: boolean) {
    console.log('Checked: ', checked);

  }
}
