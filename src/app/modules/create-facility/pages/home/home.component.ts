import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ConsentModalComponent, PageStateService, ContainerService } from 'moh-common-lib';
import { CreateFacilityDataService } from '../../services/create-facility-data.service';
import { CreateFacilityForm } from '../../models/create-facility-form';
import { Router } from '@angular/router';
import { CREATE_FACILITY_PAGES } from '../../create-facility-route-constants';

import { UUID } from 'angular2-uuid';
import { environment } from '../../../../../environments/environment';
import { BCPApiService } from '../../../../services/bcp-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends CreateFacilityForm implements OnInit, AfterViewInit {

  @ViewChild('bcpConsentModal', { static: true }) bcpConsentModal: ConsentModalComponent;
  nonce: string = UUID.UUID();
  captchaApiBaseUrl = environment.api.captcha;

  constructor(private dataService: CreateFacilityDataService,
              protected router: Router,
              private pageStateService: PageStateService,
              private ApiService: BCPApiService,
              protected containerService: ContainerService) {
    super(router, containerService);
  }

  get pageTitle() {
    return CREATE_FACILITY_PAGES.HOME.title;
  }

  ngOnInit() {
    this.containerService.setSubmitLabel();
    this.containerService.setUseDefaultColor();

    this.pageStateService.setPageIncomplete();
  }


  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (!this.dataService.informationCollectionNoticeConsent) {
      this.bcpConsentModal.showFullSizeView();
    }
  }

  onAccept(bool) {
    this.dataService.informationCollectionNoticeConsent = bool;
  }

  canContinue() {
    return this.dataService.informationCollectionNoticeConsent;
  }

  continue() {

    if (this.canContinue()) {
      this.pageStateService.setPageComplete();
      this.navigate(CREATE_FACILITY_PAGES.FACILITY_ADMIN.fullpath);
    }
  }

  hasCaptchaToken(): boolean {
    return this.ApiService.hasToken;
  }

  handleToken(token: string): void {
    this.ApiService.setToken(token);
  }
}
