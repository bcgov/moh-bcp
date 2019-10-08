import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ConsentModalComponent, CheckCompleteBaseService } from 'moh-common-lib';
import { CreateFacilityDataService } from '../../services/create-facility-data.service';
import { CreateFacilityForm } from '../../models/create-facility-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends CreateFacilityForm implements OnInit, AfterViewInit {

  @ViewChild('bcpConsentModal', { static: true }) bcpConsentModal: ConsentModalComponent;

  constructor(private dataService: CreateFacilityDataService,
              protected router: Router,
              private checkPageService: CheckCompleteBaseService) {
    super(router);
  }

  ngOnInit(){
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
      this.navigate('register-facility/facility-administrator');
    }
  }

}
