import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Container, PageStateService, ContainerService } from 'moh-common-lib';
import { createFacilityPageRoutes } from '../../create-facility-page-routing';
import { CREATE_FACILITY_PAGES } from '../../create-facility-route-constants';
import { HeaderService } from 'src/app/services/header.service';
import { SpaTextService } from '../../../../services/spa-text.service';


@Component({
  selector: 'app-create-facility-container',
  templateUrl: './create-facility-container.component.html',
  styleUrls: ['./create-facility-container.component.scss']
})
export class CreateFacilityContainerComponent extends Container implements AfterViewInit, OnDestroy {

  constructor(private pageStateService: PageStateService,
              private headerService: HeaderService,
              protected containerService: ContainerService,
              private textService: SpaTextService) {
    super(containerService);

    this.setProgressSteps(createFacilityPageRoutes);
    this.pageStateService.setPages( createFacilityPageRoutes, CREATE_FACILITY_PAGES );

    this.textService.values.subscribe((values) => {
      this.headerService.setTitle(values.SPA_TEXT_REGISTER_FACILITY_TITLE);
    });
  }

  ngAfterViewInit() {
    this.subscribeFormBar();
  }

  ngOnDestroy() {
    this.unsubscribeFormBar();
  }

}
