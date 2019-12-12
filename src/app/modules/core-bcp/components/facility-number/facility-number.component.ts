import { Component, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'bcp-facility-number',
  templateUrl: './facility-number.component.html',
  styleUrls: ['./facility-number.component.scss'],
})
export class FacilityNumberComponent implements ControlValueAccessor {
  private onChange;
  private onTouched;
  public facNumber: string;

  constructor(@Optional() @Self() public controlDir: NgControl) {
    if (controlDir) {
      controlDir.valueAccessor = this;
    }
  }

  inputChange(evt) {
    if (evt.target) {
      this.onChange(evt.target.value);
    }
  }

  onBlur(evt) {
    if (evt.target) {
      this.onTouched(evt.target.value);
    }
  }

  writeValue(value: any): void {
    this.facNumber = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
