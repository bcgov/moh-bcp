import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { Container, ContainerService, PageStateService } from 'moh-common-lib';
import { pages } from '../../practitioner-registration-page-routes';
import { HeaderService } from '../../../../services/header.service';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { SpaTextService } from '../../../../services/spa-text.service';


@Component({
  selector: 'bcp-registration-container',
  templateUrl: './registration-container.component.html',
  styleUrls: ['./registration-container.component.scss']
})
export class RegistrationContainerComponent extends Container implements AfterViewInit, OnDestroy {

  constructor( private headerService: HeaderService,
               private pageStateService: PageStateService,
               protected  containerService: ContainerService,
               private textService: SpaTextService) {
    super( containerService );
    this.setProgressSteps(pages);
    this.pageStateService.setPages( pages, PRACTITIONER_REGISTRATION_PAGES );

    this.textService.values.subscribe((values) => {
      this.headerService.setTitle(values.SPA_TEXT_PRACTITIONER_REG_TITLE);
    });
  }

  ngAfterViewInit() {
    this.subscribeFormBar();
  }

  ngOnDestroy() {
    this.unsubscribeFormBar();
  }
}
