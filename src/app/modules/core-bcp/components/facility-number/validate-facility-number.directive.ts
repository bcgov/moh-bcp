import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';

export const validateFacilityNumber: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const criteria: RegExp = /^\w*$/;

  if (control.value) {
    const result = criteria.test(control.value);
    return result ? null : { invalidFormat: true };
  }
  // return null;
  return { invalidFormat: true };
};

@Directive({
  selector: '[bcpValidateFacilityNumber]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidateFacilityNumberDirective, multi: true}]
})
export class ValidateFacilityNumberDirective implements Validator {

  constructor() {
   }
  validate(control: AbstractControl): { [key: string]: any } | null {
    return validateFacilityNumber(control);
  }

}
