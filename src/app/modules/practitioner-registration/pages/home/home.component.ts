import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { RegistrationContainerService } from '../../services/registration-container.service';
import { Router } from '@angular/router';
import { ConsentModalComponent } from 'moh-common-lib';
import { UUID } from 'angular2-uuid';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../practitioner-registration-route-constants';
import { RegistrationForm } from '../../models/registration-form';
import { BCPApiService } from '../../../../services/bcp-api.service';
import { CreatePractitionerDataService } from '../../services/create-practitioner-data.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'bcp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends RegistrationForm implements OnInit, AfterViewInit {

  @ViewChild('bcpConsentModal', { static: true }) bcpConsentModal: ConsentModalComponent;
  nonce: string = UUID.UUID();
  captchaApiBaseUrl = environment.api.captcha;

  constructor( protected registrationContainerService: RegistrationContainerService,
               protected router: Router,
               private apiService: BCPApiService,
               private dataService: CreatePractitionerDataService ) {
    super(registrationContainerService, router);
  }

  ngOnInit() {
    this.registrationContainerService.$submitLabelSubject.next('Continue');
    this.registrationContainerService.$useDefaultColorSubject.next(true);
    super.ngOnInit();
  }

  ngAfterViewInit() {
    this.bcpConsentModal.showFullSizeView();
  }

  continue() {
    console.log( 'Continue');
    this.navigate(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_INFO.fullpath);
  }

  hasCaptchaToken(): boolean {
    return this.apiService.hasToken;
  }

  onAccept(isChecked) {
    this.dataService.informationCollectionNoticeConsent = isChecked;
  }

  handleToken(token: string): void {
    this.apiService.setToken(token);
  }
}
