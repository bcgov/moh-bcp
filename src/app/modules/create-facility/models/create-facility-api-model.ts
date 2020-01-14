import { SubmissionResponse } from '../../core-bcp/models/base-api.model';

export interface CreateResponse extends SubmissionResponse {
  number?: string; // Depending on scenario, this field will be populated
}
