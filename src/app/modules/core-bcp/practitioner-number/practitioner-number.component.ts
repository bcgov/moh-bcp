import { Component, OnInit, Input, Output, EventEmitter, forwardRef, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'bcp-practitioner-number',
  templateUrl: './practitioner-number.component.html',
  styleUrls: ['./practitioner-number.component.scss'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     multi: true,
  //     useExisting: forwardRef(() => PractitionerNumberComponent),
  //   }
  // ]
})
export class PractitionerNumberComponent implements ControlValueAccessor, OnInit {
  private onChange;
  private onTouched;
  public pracNumber: string;


  // constructor(public ngControl: NgControl) {
  //   console.log('ngControl', ngControl);

  // }
  constructor(@Optional() @Self() public controlDir: NgControl) {
    console.log('ControlDir?', controlDir);
    if (controlDir) {
      controlDir.valueAccessor = this;
    }
  }

  ngOnInit() {
  }

  // validateFormat(val: string): boolean {
  //   // TODO: VERIFY THIS LOGIC!  THIS WAS A NAIVE IMPLEMENTATION, CHECK SPECS.
  //   return /^[0-9]*$/.test(val);
  // }

  inputChange(evt) {
    console.log('inputChange', evt);
    if (evt.target){
      this.onChange(evt.target.value);
    }
    // this.onTouched(evt);
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
