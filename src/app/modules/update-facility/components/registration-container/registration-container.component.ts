import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { Container, ContainerService, PageStateService } from 'moh-common-lib';
import { pages } from '../../update-facility-page-routes';
import { HeaderService } from '../../../../services/header.service';
import { UPDATE_FACILITY_PAGES } from '../../update-facility-route-constants';


@Component({
  selector: 'bcp-registration-container',
  templateUrl: './registration-container.component.html',
  styleUrls: ['./registration-container.component.scss']
})
export class RegistrationContainerComponent extends Container implements AfterViewInit, OnDestroy {

  constructor( private headerService: HeaderService,
               private pageStateService: PageStateService,
               protected  containerService: ContainerService) {
    super( containerService );
    this.setProgressSteps(pages);
    this.pageStateService.setPages( pages, UPDATE_FACILITY_PAGES );
    this.headerService.setTitle('Practitioner Attachment to Medical Services Plan Facility Number for Business Cost Premium');
  }

  ngAfterViewInit() {
    this.subscribeFormBar();
  }

  ngOnDestroy() {
    this.unsubscribeFormBar();
  }
}
