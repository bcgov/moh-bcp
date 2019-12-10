import { Component, OnInit, Input, Self, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgControl } from '@angular/forms';
import { ErrorMessage } from 'moh-common-lib';

export interface CorePractitionerInfoFormItems {
  firstName: string;
  lastName: string;
  mspPracNumber: string,
  email: string,
  phoneNumber: string,
  phoneNumberExt: string,
  faxNumber?: string
}

@Component({
  selector: 'bcp-core-practitioner-info',
  templateUrl: './core-practitioner-info.component.html',
  styleUrls: ['./core-practitioner-info.component.scss']
})
export class CorePractitionerInfoComponent {

  showValidationError: boolean;
  validationErrorMessage: string;

  @Input()
  public showFaxNumber: boolean;
  
  public items: CorePractitionerInfoFormItems;
  
  @Input()
  public formGroup: FormGroup;

  _onChange = (_: any) => { };
  _onTouched = (_?: any) => { };

  // Register change function
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  // Register touched function
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
}
