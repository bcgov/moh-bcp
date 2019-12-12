import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConsentModalComponent } from 'moh-common-lib';
import { UUID } from 'angular2-uuid';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { RegistrationForm } from '../../models/registration-form';
import { ContainerService } from 'moh-common-lib';
import { BCPApiService } from '../../../../services/bcp-api.service';
import { CreatePractitionerDataService } from '../../services/create-practitioner-data.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'bcp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends RegistrationForm implements OnInit {

  @ViewChild('bcpConsentModal', { static: true }) bcpConsentModal: ConsentModalComponent;
  nonce: string = UUID.UUID();
  captchaApiBaseUrl = environment.api.captcha;
  initialModalVisibility: boolean = false;

  constructor( protected containerService: ContainerService,
               protected router: Router,
               private apiService: BCPApiService,
               private dataService: CreatePractitionerDataService ) {
    super(containerService, router);
  }


  ngOnInit() {
    this.containerService.setSubmitLabel();
    this.containerService.setUseDefaultColor();
    this.initialModalVisibility = !this.dataService.informationCollectionNoticeConsent;
  }

  continue() {
    console.log( 'Continue');
    this.navigate(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_INFO.fullpath);
  }

  hasToken(): boolean {
    return this.apiService.hasToken;
  }

  accept(isChecked: boolean) {
    this.dataService.informationCollectionNoticeConsent = isChecked;
  }

  setToken(token: string): void {
    this.apiService.setToken(token);
  }
}
