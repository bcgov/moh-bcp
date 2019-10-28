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



// RESPONSES

export interface ValidationResponse extends APIBase {
    valid: boolean;
    error: boolean;
}