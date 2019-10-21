import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CreateFacilityForm } from '../../models/create-facility-form';
import { Router } from '@angular/router';
import { CreateFacilityDataService } from '../../services/create-facility-data.service';
import { ValidatorFn, AbstractControl, NgControl } from '@angular/forms';
import { CheckCompleteBaseService } from 'moh-common-lib';
import { CREATE_FACILITY_PAGES } from '../../create-facility-route-constants';

// TODO: Phone validation (passes on 1 char entered)
// TODO: email validaion - create CommonEmail (like CommonName)
// TODO: Verify BCP Prac Number logic is correct (now just checking it's #s)

@Component({
  selector: 'app-applicant-info',
  templateUrl: './applicant-info.component.html',
  styleUrls: ['./applicant-info.component.scss']
})
export class ApplicantInfoComponent extends CreateFacilityForm implements OnInit {
  public loading = false;

  constructor(
    protected router: Router,
    public dataService: CreateFacilityDataService,
    private cdr: ChangeDetectorRef,
    private pageCheckService: CheckCompleteBaseService) {
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

  canContinue(){
    return this.form.valid && !this.showEmailMismatchError();
  }

  continue() {
    this.markAllInputsTouched();

    if (this.canContinue()) {
      const time = 2.5 * 1000;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.cdr.detectChanges();
        this.pageCheckService.setPageComplete();
        this.navigate(CREATE_FACILITY_PAGES.FACILITY_INFO.fullPath);
      }, time);

    } else {
      console.log('Form not valid', this.form);
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

}

