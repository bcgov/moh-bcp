import { Validators, FormGroup } from '@angular/forms';


export function validMultiFormControl(fg: FormGroup, name: string) {
    if (fg.controls[name].pristine && fg.controls[name].untouched ) return false;
    return fg.controls[name].invalid;
}

export const cCreateFacilityValidators = {

    facilityDetail: {
        facilityName: [
            Validators.required
        ],
        // phoneNumber: [
        //     Validators.required
        // ],
        faxNumber: [
            Validators.required
        ],
        isQualifyForBCP: [
            Validators.required
        ],
        isSameMailingAddress: [
            Validators.required
        ],
        effectiveDate: [
            Validators.required
        ],
        services: [
            Validators.required
        ]
    },
    address: {
        streetAddress: [
            Validators.required
        ],
        city: [
            Validators.required
        ],
        province: [Validators.required],
        postalCode: [
            Validators.required
        ],
    }
};
