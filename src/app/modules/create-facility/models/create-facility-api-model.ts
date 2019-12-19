import { BaseResponse } from '../../core-bcp/models/base-api.model';

export interface CreateResponse extends BaseResponse {
  referenceNumber: string;
  facilityNumber?: string; // Depending on scenario, this field will be populated
}
