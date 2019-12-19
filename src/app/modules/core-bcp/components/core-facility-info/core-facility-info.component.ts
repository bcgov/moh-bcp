import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorMessage, Address } from 'moh-common-lib';

@Component({
  selector: 'bcp-core-facility-info',
  templateUrl: './core-facility-info.component.html',
  styleUrls: ['./core-facility-info.component.scss']
})
export class CoreFacilityInfoComponent {

  @Input() public showValidationError: boolean = false;
  public validationErrorMessage: string = 'This field does not match our records.';

  @Input() public formGroup: FormGroup;

  physicalAddressSelected(address: Address) {
    this.formGroup.patchValue({
      address: address.addressLine1,
      city: address.city
    });
  }
}
