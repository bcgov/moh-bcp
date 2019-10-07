import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';

export const validatePractitionerNumber: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  // TODO: VERIFY THIS LOGIC!  THIS WAS A NAIVE IMPLEMENTATION, CHECK SPECS.
  const criteria: RegExp = /^[0-9]*$/;

  if (control.value) {
    const result = criteria.test(control.value);
    return result ? null : { invalidFormat: true };
  }
  // return null;
  return { invalidFormat: true };
};

@Directive({
  selector: '[bcpValidatePractitionerNumber]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidatePractitionerNumberDirective, multi: true}]
})
export class ValidatePractitionerNumberDirective implements Validator {

  constructor() {
   }
  validate(control: AbstractControl): { [key: string]: any } | null {
    return validatePractitionerNumber(control);
  }

}
