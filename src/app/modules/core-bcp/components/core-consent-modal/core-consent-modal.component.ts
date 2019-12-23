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
  contactUsLink: string = environment.links.hibc;

  @ViewChild('bcpConsentModal', { static: true }) bcpConsentModal: ConsentModalComponent;
  @Input() hasToken: boolean;
  @Input() initialVisibility: boolean;
  @Output() accept: EventEmitter<boolean> = new EventEmitter<any>();
  @Output() validToken: EventEmitter<string> = new EventEmitter<any>();

  ngAfterViewInit() {
    if (this.initialVisibility) {
      this.bcpConsentModal.showFullSizeView();
    }
  }

  handleAccept(isChecked: boolean) {
    this.accept.emit(isChecked);
  }

  handleToken(token: string) {
    this.validToken.emit(token);
  }
}
