import {
  cCreateFacilityValidators,
  validMultiFormControl
} from './validators';
import { FormGroup, FormControl } from '@angular/forms';

describe('Validators', () => {
  it('should contain validators', () => {
    expect(cCreateFacilityValidators).toBeDefined();
  });

  it('should return false when control is pristine and untouched', () => {
    const name = 'controlName';
    const formGroup = new FormGroup({
      controlName: new FormControl('')
    });
    expect(validMultiFormControl(formGroup, name)).toBeFalsy();
  });
});
