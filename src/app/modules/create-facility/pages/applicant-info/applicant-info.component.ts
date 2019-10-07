import { Component, OnInit } from '@angular/core';
import { CreateFacilityForm } from '../../models/create-facility-form';
import { Router } from '@angular/router';
import { CreateFacilityDataService } from '../../services/create-facility-data.service';
import { ValidatorFn, AbstractControl } from '@angular/forms';

// TODO: Phone validation
// TODO: Double check input names
// TODO: email validaion - create CommonEmail (like CommonName)
// TODO: Wire up 'Continue' button.

@Component({
  selector: 'app-applicant-info',
  templateUrl: './applicant-info.component.html',
  styleUrls: ['./applicant-info.component.scss']
})
export class ApplicantInfoComponent extends CreateFacilityForm implements OnInit {

  constructor(protected router: Router, public dataService: CreateFacilityDataService) {
    super(router);
   }

  ngOnInit() {
  }

  emailsMismatcherror(): boolean {
    // Haven't initialized yet
    if (!this.form.controls.emailConfirm || !this.form.controls.email){
      return null;
    }

    // Both inputs must be touched before we will show the error.
    if (!this.form.controls.emailConfirm.touched || !this.form.controls.email.touched) {
      return false;
    }

    return this.dataService.emailAddress !== this.dataService.confirmEmailAddress;
  }

}


// TODO - Move this into common library.
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = /^(\S+)@(\S+)\.(\S+)$/.test(
      control.value
      );
      return forbidden
          ? { invalidEmail: { value: control.value } }
          : null;
  };
}
