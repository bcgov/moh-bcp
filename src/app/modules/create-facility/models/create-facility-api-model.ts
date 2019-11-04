/**
 * Serves as base for both API requests *and* API responses.
 */
export interface APIBase {
    requestUUID: string;
    applicationUUID: string;
}

export interface PractitionerValidationPartial {
    firstName: string;
    lastName: string;
    number: string;
}

export interface ValidatePractitionerRequest extends APIBase {
    practitioner: PractitionerValidationPartial;
}


export interface FacilityValidationPartial {
    facilityName: string;
    postalCode: string;
}

export interface ValidateFacilityRequest extends APIBase {
    facility: FacilityValidationPartial;
}



// RESPONSES
export enum ReturnCodes {
    SUCCESS = "0",
    FAILURE = "1",
    WARNING = "2",
    SYSTEM_ERROR = "-1"  // Can actually be any negative number
}

export interface ValidationResponse extends APIBase {
    // valid: boolean;
    // error: boolean;
    returnCode: ReturnCodes;
    requestUUID: string;
    applicationUUID: string;
    message: string;
}