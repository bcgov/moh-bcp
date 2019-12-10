import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Container, PageStateService } from 'moh-common-lib';
import { pages } from '../../practitioner-registration-page-routes';
import { HeaderService } from '../../../../services/header.service';
import { RegistrationContainerService } from '../../services/registration-container.service';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';


@Component({
  selector: 'bcp-registration-container',
  templateUrl: './registration-container.component.html',
  styleUrls: ['./registration-container.component.scss']
})
export class RegistrationContainerComponent extends Container implements AfterViewInit {

  useDefaultColor: boolean = true;
  submitLabel: string = 'Continue';
  isLoading: boolean = false;

  constructor( private headerService: HeaderService,
               private registrationContainerService: RegistrationContainerService,
               private pageStateService: PageStateService ) {
    super();
    this.setProgressSteps(pages);
    this.pageStateService.setPages( pages, PRACTITIONER_REGISTRATION_PAGES );
    this.headerService.setTitle('Practitioner Assignment to Medical Services Plan Facility for Business Cost Premium');
  }

  ngAfterViewInit() {
    this.registrationContainerService.$useDefaultColor
    .subscribe(
      (async (defaultColor) => {
        this.useDefaultColor = await defaultColor;
        console.log( 'defaultColor: ', this.useDefaultColor );
      }));

    this.registrationContainerService.$submitLabel
      .subscribe(
        (async (label) => {
          this.submitLabel = await label;
          console.log( 'button label: ', this.submitLabel );
        }));

    this.registrationContainerService.$isLoading
      .subscribe(
        (async (isLoading) => {
          this.isLoading = await isLoading;
          console.log( 'isLoading: ', this.isLoading );
        }));
  }

  continue() {
    console.log( 'continue: button clicked' );
    this.registrationContainerService.$continueBtnSubject.next();
  }

}
