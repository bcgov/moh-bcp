import { Component, OnInit } from '@angular/core';
import { CREATE_FACILITY } from '../../modules/create-facility/create-facility-route-constants';

@Component({
  selector: 'bcp-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  registerFacility = CREATE_FACILITY;

  constructor() { }

  ngOnInit() {
  }

}
