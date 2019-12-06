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
export class CorePractitionerInfoComponent implements OnInit {

  _defaultErrMsg: ErrorMessage = null;
  label: string = null;

  @Input()
  public showFaxNumber: boolean;
  
  public items: CorePractitionerInfoFormItems;
  public formGroup: FormGroup;

  constructor(@Optional() @Self() public controlDir: NgControl, private fb: FormBuilder) {
    if (controlDir) {
      console.log('sig controldir', controlDir);
      controlDir.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.initForm();
    this.formGroup.valueChanges.subscribe(
      value => {
        console.log('%c Form changed: %o', 'color:red', value);
        this._onChange(value);
      }
    );
  }

  _onChange = (_: any) => { };
  _onTouched = (_?: any) => { };

  private initForm() {
    this.formGroup = this.fb.group({
      firstName: [this.items.firstName, [Validators.required]],
      lastName: [this.items.lastName, [Validators.required]],
      mspPracNumber: [this.items.mspPracNumber, [Validators.required]],
      email: [this.items.email, [Validators.email]],
      phoneNumber: [this.items.phoneNumber, [Validators.required]],
      phoneNumberExt: [this.items.phoneNumberExt],
      faxNumber: [this.items.faxNumber],
    });
  }

  // Register change function
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  // Register touched function
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  writeValue(val: CorePractitionerInfoFormItems): void {
    if (val) {
      console.log("writeValue: ", val);
      this.items = val;
    }
  }
}
