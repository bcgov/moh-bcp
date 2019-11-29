import { Component, OnInit } from '@angular/core';
import { BCP_ROUTES } from '../../modules/core-bcp/models/bcp-route-constanst';

@Component({
  selector: 'bcp-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  registerFacility = BCP_ROUTES.CREATE_FACILITY;
  practitionerAssignment = BCP_ROUTES.PRACTITIONER_REGISTRATION;

  constructor() { }

}
