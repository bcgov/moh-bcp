import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { Container, ContainerService, PageStateService } from 'moh-common-lib';
import { pages } from '../../update-facility-page-routes';
import { HeaderService } from '../../../../services/header.service';
import { UPDATE_FACILITY_PAGES } from '../../update-facility-route-constants';
import { SpaTextService } from '../../../../services/spa-text.service';


@Component({
  selector: 'bcp-facility-container',
  templateUrl: './facility-container.component.html',
  styleUrls: ['./facility-container.component.scss']
})
export class FacilityContainerComponent extends Container implements AfterViewInit, OnDestroy {

  constructor( private headerService: HeaderService,
               private pageStateService: PageStateService,
               protected  containerService: ContainerService,
               private spaTextService: SpaTextService) {
    super( containerService );
    this.setProgressSteps(pages);
    this.pageStateService.setPages( pages, UPDATE_FACILITY_PAGES );

    this.spaTextService.values.subscribe((values) => {
      this.headerService.setTitle(values.SPA_TEXT_UPDATE_FACILITY_TITLE);
    });

    // Set breadcrumb step titles to route title.
    this.progressSteps.forEach((step) => {
      const routeName = Object.keys(UPDATE_FACILITY_PAGES).find(key => UPDATE_FACILITY_PAGES[key].path === step.route);
      step.title = UPDATE_FACILITY_PAGES[routeName].title;
    });
  }

  ngAfterViewInit() {
    this.subscribeFormBar();
  }

  ngOnDestroy() {
    this.unsubscribeFormBar();
  }
}
