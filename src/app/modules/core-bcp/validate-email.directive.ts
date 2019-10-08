import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, Validator, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

// TODO: Move this directive into common library
// Create a "CommonEmail" component - similar to CommonName, and use this as validator.

@Directive({
  selector: '[bcpValidateEmail]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidateEmailDirective, multi: true}]
})
export class ValidateEmailDirective implements Validator {

  constructor() { }

 validate(control: AbstractControl): { [key: string]: any } | null {
   return emailValidator(control);
 }

}


export const emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const criteria: RegExp = /^(\S+)@(\S+)\.(\S+)$/;

  if (control.value) {
    const result = criteria.test(control.value);
    return result ? null : { invalidEmail: true };
  }
  return { invalidEmail: true };
};

// export function emailValidator(): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } | null => {
//       const forbidden = /^(\S+)@(\S+)\.(\S+)$/.test(
//       control.value
//       );
//       return forbidden
//           ? { invalidEmail: { value: control.value } }
//           : null;
//   };
// }
