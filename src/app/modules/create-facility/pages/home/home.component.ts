import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ConsentModalComponent } from 'moh-common-lib';
import { CreateFacilityDataService } from '../../services/create-facility-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('bcpConsentModal', {static: true}) bcpConsentModal: ConsentModalComponent;

  constructor(private dataService: CreateFacilityDataService) {
  }

  ngAfterViewInit() {
    if (!this.dataService.informationCollectionNoticeConsent){
      this.bcpConsentModal.showFullSizeView();
    }
  }

  onAccept(bool){
    this.dataService.informationCollectionNoticeConsent = bool;
  }

}
