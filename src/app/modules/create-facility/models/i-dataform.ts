import { FormGroup } from '@angular/forms';

export function funcRandomNumber8Digit() {
    return Math.floor(Math.random() * 89999999 + 10000000).toString();
}

export interface IDataForm {
    patchValue(FormGroup);
}

export interface IApplicant {
    firstName?;
    lastName?;
    mspPractisionerNumber?;
    email?;
    confirmEmail?;
    mobile?;
    extension?;
}

export interface IFacilityInfo { 
    facilityName?;
    physicalAddress?;
    city?;
    province?;
    postalCode?;
    phoneNumber?;
    faxNumber?;
    effectiveDate?;
    isSameMailingAddress?;
    mailingForm?: {
        mailing_address?,
        mailing_city?;
        mailing_province?;
        mailing_postalCode?;
    };
    isQualifyForBCP?;    
}

export class RandomObjects {
    public static addSpaces = '';

    public static getFacilityInfo(prefix) {
        const obj: IFacilityInfo = {
            facilityName:
                RandomObjects.addSpaces +
                prefix +
                'Dr. Doe Medical Clinic' +
                RandomObjects.addSpaces,
            physicalAddress:
                RandomObjects.addSpaces +                
                '12345 Douglas Street' + 
                prefix +
                RandomObjects.addSpaces,
            city:
                RandomObjects.addSpaces + 'Victoria' + RandomObjects.addSpaces,
            province:
                'British Columbia',
            postalCode:
                'V8J 8J8',
            phoneNumber:
                '250-555-1234',
            faxNumber:
                '250-555-1234',
            effectiveDate:
                'April 15, 2020',
            isSameMailingAddress:
                false,
            mailingForm: {
                    mailing_address: '12345 Carson Street',
                    mailing_city: 'Victoria',
                    mailing_province: 'British Columbia',
                    mailing_postalCode: 'V8J 8J8',
                },
            isQualifyForBCP:  true,
        };
        return obj;
    }

    public static getApplicant(prefix) {
        const obj: IApplicant = {
            firstName:
                RandomObjects.addSpaces +
                prefix +
                'Jane' +
                RandomObjects.addSpaces,
            lastName:
                RandomObjects.addSpaces +
                prefix +
                'Doe' +
                RandomObjects.addSpaces,

            mspPractisionerNumber:'123456',
            email: 
                prefix + 'jane.doe@test.com',
            confirmEmail: 
                prefix + 'jane.doe@test.com',
            // formGroupEmail: {
            //     email: prefix + 'user@users.com',
            //     confirmEmail: prefix + 'user@users.com',
            // },

            mobile:  '250-555-1234',
            extension: RandomObjects.addSpaces + '222' + RandomObjects.addSpaces,
        };
        return obj;
    }
}