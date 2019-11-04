import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CreateFacilityForm } from '../../models/create-facility-form';
import { Router } from '@angular/router';
import { CreateFacilityDataService } from '../../services/create-facility-data.service';
import { ValidatorFn, AbstractControl, NgControl } from '@angular/forms';
import { CheckCompleteBaseService } from 'moh-common-lib';
import { CREATE_FACILITY_PAGES } from '../../create-facility-route-constants';
import { BCPApiService } from '../../../../services/bcp-api.service';
import { ValidationResponse, ReturnCodes } from '../../models/create-facility-api-model';

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
    private apiService: BCPApiService) {
    super(router);
  }

  ngOnInit() {
    this.pageCheckService.setPageIncomplete();
  }

  showEmailMismatchError(): boolean {
    // Haven't initialized yet
    if (!this.form.controls.emailConfirm || !this.form.controls.email) {
      return null;
    }

    // Both inputs must be touched before we will show the error.
    if (!this.form.controls.emailConfirm.touched || !this.form.controls.email.touched) {
      return false;
    }

    return this.dataService.emailAddress !== this.dataService.confirmEmailAddress;
  }

  canContinue() {
    return this.form.valid && !this.showEmailMismatchError();
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

        if (res.returnCode === ReturnCodes.SUCCESS){
          this.handleValidation(true);
          this.navigate(CREATE_FACILITY_PAGES.FACILITY_INFO.fullPath);
        } else if (res.returnCode === ReturnCodes.FAILURE){
          this.handleValidation(false);
        }
      }, error => {
        console.log('ARC apiService onerror', error);
        this.handleError();
      });

    }

  }

  showEmailError(controlKey: 'email' | 'emailConfirm', errorName: 'required' | 'invalidEmail') {
    const control: AbstractControl = this.form.controls[controlKey];
    if (control &&
      control.touched &&
      control.errors &&
      control.errors[errorName]) {
      return true;
    }
    return false;
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

    if (isValid){
      this.pageCheckService.setPageComplete();
    }
    else {
      this.pageCheckService.setPageIncomplete();
    }

  }

}

