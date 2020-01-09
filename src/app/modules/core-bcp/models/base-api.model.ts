


/**
 * Return codes in response messages
 */
export enum ReturnCodes {
  SUCCESS = '0',
  FAILURE = '1',
  WARNING = '2',
  SYSTEM_ERROR = '-1',  // Can actually be any negative number
  SYSTEM_DOWN = '-3' // Back-end exception eg. 404 error or timeout
}

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

  // TODO: If can use flag to indicate check for MD
  //       need to add another variable to message.
}

export interface FacilityValidationPartial {
  facilityName?: string;
  number?: string;  // facility number
  postalCode: string;
}

/**
 * Base response message structure
 */
export interface BaseResponse extends APIBase {
  returnCode: ReturnCodes;
}

/**
 * Response for validation requests
 */
export interface ValidationResponse extends BaseResponse {
  message: string;
}

export interface SubmissionResponse extends BaseResponse {
  referenceNumber?: string;
}
