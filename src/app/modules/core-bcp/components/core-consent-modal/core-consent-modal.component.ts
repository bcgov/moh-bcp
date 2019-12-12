import { Component, Output, EventEmitter, Input, ViewChild, AfterViewInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { environment } from '../../../../../environments/environment';
import { ConsentModalComponent } from 'moh-common-lib';

@Component({
  selector: 'bcp-consent-modal',
  templateUrl: './core-consent-modal.component.html',
  styleUrls: ['./core-consent-modal.component.scss']
})
export class CoreConsentModalComponent implements AfterViewInit {
  captchaApiBaseUrl: string = environment.api.captcha;
  nonce: string = UUID.UUID();
  contactUsLink: string = environment.links.contactUs;

  @ViewChild('bcpConsentModal', { static: true }) bcpConsentModal: ConsentModalComponent;
  @Input() hasToken: boolean;
  @Output() onAccept: EventEmitter<boolean> = new EventEmitter<any>();
  @Output() onValidToken: EventEmitter<string> = new EventEmitter<any>();

  ngAfterViewInit() {
    this.bcpConsentModal.showFullSizeView();
  }

  accept(isChecked: boolean) {
    this.onAccept.emit(isChecked);
  }

  handleToken(token: string) {
    this.onValidToken.emit(token);
  }
}
