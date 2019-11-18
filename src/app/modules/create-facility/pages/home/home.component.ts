import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ConsentModalComponent, CheckCompleteBaseService } from 'moh-common-lib';
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
              private checkPageService: CheckCompleteBaseService,
              private ApiService: BCPApiService) {
    super(router);
  }

  ngOnInit() {
    this.checkPageService.setPageIncomplete();
  }

  ngAfterViewInit() {
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
      this.checkPageService.setPageComplete();
      this.navigate(CREATE_FACILITY_PAGES.FACILITY_ADMIN.fullpath);
    }
  }

  hasCaptchaToken(): boolean {
    return this.ApiService.hasToken;
  }

  handleToken(token: string): void {
    this.ApiService.setToken(token);
  }

  debug(a) {
    console.log('debug', a);
  }
}
