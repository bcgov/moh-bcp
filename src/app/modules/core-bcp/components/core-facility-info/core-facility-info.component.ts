import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorMessage } from 'moh-common-lib';

@Component({
  selector: 'bcp-core-facility-info',
  templateUrl: './core-facility-info.component.html',
  styleUrls: ['./core-facility-info.component.scss']
})
export class CoreFacilityInfoComponent {

  _defaultErrMsg: ErrorMessage = null;
  label: string = null;

  @Input()
  public showFaxNumber: boolean;

  /** Show validationErrorMessage to user. Used when Validate Pracittioner check fails */
  @Input() public showValidationError: boolean = false;
  public validationErrorMessage: string = 'This field does not match our records.';

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
