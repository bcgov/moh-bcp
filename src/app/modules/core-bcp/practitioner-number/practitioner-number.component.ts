import { Component, OnInit, Input, Output, EventEmitter, forwardRef, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'bcp-practitioner-number',
  templateUrl: './practitioner-number.component.html',
  styleUrls: ['./practitioner-number.component.scss'],
})
export class PractitionerNumberComponent implements ControlValueAccessor, OnInit {
  private onChange;
  private onTouched;
  public pracNumber: string;

  constructor(@Optional() @Self() public controlDir: NgControl) {
    if (controlDir) {
      controlDir.valueAccessor = this;
    }
  }

  ngOnInit() {
  }


  inputChange(evt) {
    if (evt.target){
      this.onChange(evt.target.value);
    }
  }

  onBlur(evt){
    if (evt.target){
      this.onTouched(evt.target.value);
    }
  }

  writeValue(value: any): void {
    this.pracNumber = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
