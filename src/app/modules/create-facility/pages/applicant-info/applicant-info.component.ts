import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CreateFacilityForm } from '../../models/create-facility-form';
import { Router } from '@angular/router';
import { CreateFacilityDataService } from '../../services/create-facility-data.service';
import { CheckCompleteBaseService, CommonLogEvents } from 'moh-common-lib';
import { CREATE_FACILITY_PAGES } from '../../create-facility-route-constants';
import { BCPApiService } from '../../../../services/bcp-api.service';
import { ValidationResponse, ReturnCodes } from '../../models/create-facility-api-model';
import { SplunkLoggerService } from '../../../../services/splunk-logger.service';

@Component({
  selector: 'app-applicant-info',
  templateUrl: './applicant-info.component.html',
  styleUrls: ['./applicant-info.component.scss']
})
export class ApplicantInfoComponent extends CreateFacilityForm implements OnInit {
  public loading = false;
  public systemDownError = false;
  public showValidationError = false;
  public validationErrorMessage = 'This field does not match our records';

  constructor(
    protected router: Router,
    public dataService: CreateFacilityDataService,
    private cdr: ChangeDetectorRef,
    private pageCheckService: CheckCompleteBaseService,
    private apiService: BCPApiService,
    private splunkLoggerService: SplunkLoggerService) {
    super(router);
  }

  ngOnInit() {
    this.pageCheckService.setPageIncomplete();
  }

  get pageTitle() {
    return CREATE_FACILITY_PAGES.FACILITY_ADMIN.title;
  }

  continue() {
    this.markAllInputsTouched();


    if (this.canContinue()) {
      this.loading = true;

      this.apiService.validatePractitioner({
        firstName: this.dataService.facAdminFirstName,
        lastName: this.dataService.facAdminLastName,
        number: this.dataService.pracNumber,
      }, this.dataService.applicationUUID).subscribe((res: ValidationResponse) => {
        console.log('apiService response', res);

        this.dataService.jsonApplicantValidation.response = res;

        this.splunkLoggerService.log(
          this.dataService.getSubmissionLogObject<ValidationResponse>(
            'Validate Pracitioner',
            this.dataService.jsonApplicantValidation.response
          )
        );


        if (res.returnCode === ReturnCodes.SUCCESS) {
          this.handleValidation(true);
          this.navigate(CREATE_FACILITY_PAGES.FACILITY_INFO.fullpath);
        } else if (res.returnCode === ReturnCodes.FAILURE) {
          this.handleValidation(false);
        } else {
          // fall-through case, likely an error
          this.handleValidation(false);
        }
      }, error => {
        console.log('ARC apiService onerror', error);
        this.handleError();
      });

    }

  }

  private handleError(): void {
    this.systemDownError = true;
    this.loading = false;
    this.cdr.detectChanges();
  }

  private handleValidation(isValid: boolean): void {
    this.showValidationError = !isValid;
    this.loading = false;
    this.systemDownError = false;
    this.cdr.detectChanges();

    if (isValid) {
      this.pageCheckService.setPageComplete();
    } else {
      this.pageCheckService.setPageIncomplete();
    }

  }

}

