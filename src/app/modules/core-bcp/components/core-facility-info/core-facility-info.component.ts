import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorMessage, Address } from 'moh-common-lib';
import { BaseDataService } from '../../../../services/base-data.service';

@Component({
  selector: 'bcp-core-facility-info',
  templateUrl: './core-facility-info.component.html',
  styleUrls: ['./core-facility-info.component.scss']
})
export class CoreFacilityInfoComponent {

  @Input() public showValidationError: boolean = false;
  public validationErrorMessage: string = 'This field does not match our records.';

  @Output() public addressSelected: EventEmitter<Address> = new EventEmitter<Address>();

  postalCodeErrorMsg: ErrorMessage = {
    required: 'A British Columbia postal code is required (example: V8W 9E3)'
  };

  @Input() public formGroup: FormGroup;

  physicalAddressSelected(address: Address) {
    this.addressSelected.emit(address);
  }
}
