import { Component, OnInit } from '@angular/core';
import { Container } from 'moh-common-lib';
import { createFacilityPageRoutes } from '../create-facility-page-routing';

@Component({
  selector: 'app-create-facility-container',
  templateUrl: './create-facility-container.component.html',
  styleUrls: ['./create-facility-container.component.scss']
})
export class CreateFacilityContainerComponent extends Container implements OnInit {

  constructor() {
    super();
    this.setProgressSteps( createFacilityPageRoutes );
  }

  ngOnInit() {
  }

}
