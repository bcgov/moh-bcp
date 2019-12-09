import { Component, OnInit, Input, Self, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgControl } from '@angular/forms';
import { ErrorMessage } from 'moh-common-lib';

export interface CoreFacilityInfoFormItems {
  name: string;
  mspNumber: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
}

@Component({
  selector: 'bcp-core-facility-info',
  templateUrl: './core-facility-info.component.html',
  styleUrls: ['./core-facility-info.component.scss']
})
export class CoreFacilityInfoComponent implements OnInit {

  //formGroup: FormGroup;
  _defaultErrMsg: ErrorMessage = null;
  label: string = null;

  @Input()
  public showFaxNumber: boolean;
  
  public items: CoreFacilityInfoFormItems;
  public formGroup: FormGroup;
  public province: string;

  constructor( @Optional() @Self() public controlDir: NgControl,
               private fb: FormBuilder ) {
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
      name: [this.items.name, [Validators.required]],
      mspNumber: [this.items.mspNumber, [Validators.required]],
      address: [this.items.address, [Validators.required]],
      city: [this.items.city, [Validators.required]],
      postalCode: [this.items.postalCode, [Validators.required]],
    });
    this.province = this.items.province;
  }

  // Register change function
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  // Register touched function
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  writeValue(val: CoreFacilityInfoFormItems): void {
    if (val) {
      console.log("writeValue: ", val);
      this.items = val;
    }
  }
}
