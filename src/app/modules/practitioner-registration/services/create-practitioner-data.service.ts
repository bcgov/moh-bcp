import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreatePractitionerDataService {

  constructor() { }

  pracInfoFirstName: string;
  pracInfoLastName: string;
  pracInfoMSPPracNumber: string;
  pracInfoEmail: string;
  pracInfoPhoneNumber: string;
}
