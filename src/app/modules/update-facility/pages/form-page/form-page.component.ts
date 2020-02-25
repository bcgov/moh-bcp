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
  selector: 'bcp-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent extends BcpBaseForm implements OnInit, AfterViewInit {

  pageTitle: string = 'Practitioner Information';
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
      sampleFormInput: [this.dataService.sampleFormInput, [Validators.required]],
      sampleTextarea: [this.dataService.sampleTextarea, [Validators.required]]
    });
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    // Update data service values
    this.formGroup.valueChanges.subscribe( value => {
      this.dataService.sampleFormInput = value.sampleFormInput;
      this.dataService.sampleTextarea = value.sampleTextarea;
    });
  }

  continue() {
    this.markAllInputsTouched();

    if (this.formGroup.valid) {

      this.containerService.setIsLoading();

      this.apiService.validatePractitioner({
        firstName: null,
        lastName: null,
        number: null,
        doctor: true
      }, this.dataService.applicationUUID).subscribe((res: ValidationResponse) => {
        // console.log('apiService response', res);

        this.dataService.jsonApplicantValidation.response = res;

        this.splunkLoggerService.log(
          this.dataService.getSubmissionLogObject<ValidationResponse>(
            'Validate practitioner',
            this.dataService.jsonApplicantValidation.response
          )
        );
        // console.log( 'res: ', res );

        if (res.returnCode === ReturnCodes.SUCCESS) {
          this.handleValidation(true);
          this.navigate(UPDATE_FACILITY_PAGES.REVIEW.fullpath);
        } else if (res.returnCode === ReturnCodes.FAILURE) {
          this.handleValidation(false);
        } else { // Negative response codes
          // fall-through case, likely an error
          this.handleError();
        }
      }, error => {
        // console.log('apiService onerror', error);
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
