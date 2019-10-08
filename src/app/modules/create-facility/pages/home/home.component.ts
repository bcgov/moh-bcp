import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ConsentModalComponent } from 'moh-common-lib';
import { CreateFacilityDataService } from '../../services/create-facility-data.service';
import { CreateFacilityForm } from '../../models/create-facility-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends CreateFacilityForm implements AfterViewInit {

  @ViewChild('bcpConsentModal', { static: true }) bcpConsentModal: ConsentModalComponent;

  constructor(private dataService: CreateFacilityDataService, protected router: Router) {
    super(router);
  }

  ngAfterViewInit() {
    if (!this.dataService.informationCollectionNoticeConsent) {
      this.bcpConsentModal.showFullSizeView();
    }
  }

  onAccept(bool) {
    this.dataService.informationCollectionNoticeConsent = bool;
  }

  // continue() {
  //   // this.navigate('register-facility/facility-administrator');
  // }

}
