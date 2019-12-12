import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface CorePractitionerInfoFormItems {
  firstName: string;
  lastName: string;
  mspPracNumber: string;
  email: string;
  phoneNumber: string;
  phoneNumberExt: string;
  faxNumber?: string;
}

@Component({
  selector: 'bcp-core-practitioner-info',
  templateUrl: './core-practitioner-info.component.html',
  styleUrls: ['./core-practitioner-info.component.scss']
})
export class CorePractitionerInfoComponent {

  showValidationError: boolean;
  validationErrorMessage: string;

  public items: CorePractitionerInfoFormItems;

  @Input()
  public formGroup: FormGroup;
}
