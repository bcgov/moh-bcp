import { FormGroup } from '@angular/forms';

export function validMultiFormControl(fg: FormGroup, name: string) {
  if (fg.controls[name].pristine && fg.controls[name].untouched ) {
    return false;
  }
  return fg.controls[name].invalid;
}
