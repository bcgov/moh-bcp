import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ConsentModalComponent, PageStateService } from 'moh-common-lib';
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
export class HomeComponent extends CreateFacilityForm implements OnInit {

  initialModalVisibility: boolean = false;

  constructor(private dataService: CreateFacilityDataService,
              protected router: Router,
              private pageStateService: PageStateService,
              private ApiService: BCPApiService) {
    super(router);
  }

  get pageTitle() {
    return CREATE_FACILITY_PAGES.HOME.title;
  }

  ngOnInit() {
    this.pageStateService.setPageIncomplete();
    this.initialModalVisibility = !this.dataService.informationCollectionNoticeConsent;
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

  hasToken(): boolean {
    return this.ApiService.hasToken;
  }

  accept(isChecked: boolean) {
    this.dataService.informationCollectionNoticeConsent = isChecked;
  }

  setToken(token: string): void {
    this.ApiService.setToken(token);
  }

  debug(a) {
    console.log('debug', a);
  }
}
