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
  selector: 'bcp-facility-admin',
  templateUrl: './facility-admin.component.html',
  styleUrls: ['./facility-admin.component.scss']
})
export class FacilityAdminComponent extends BcpBaseForm implements OnInit, AfterViewInit {

  pageTitle: string = 'Facility Administrator';
  formGroup: FormGroup;
  showValidationError: boolean = false;
  systemDownError: boolean = false;


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
      firstName: [this.dataService.firstName, [Validators.required]],
      lastName: [this.dataService.lastName, [Validators.required]]
    });
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    // Update data service values
    this.formGroup.valueChanges.subscribe( value => {
      this.dataService.firstName = value.firstName;
      this.dataService.lastName = value.lastName;
    });
  }

  continue() {
    this.markAllInputsTouched();

    if (this.formGroup.valid) {
      this.navigate(UPDATE_FACILITY_PAGES.REVIEW.fullpath);
    }
  }
}
