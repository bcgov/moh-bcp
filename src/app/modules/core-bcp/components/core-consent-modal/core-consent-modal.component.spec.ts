import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedCoreModule } from 'moh-common-lib';
import { CaptchaModule } from 'moh-common-lib/captcha';

import { CoreConsentModalComponent } from './core-consent-modal.component';

describe('CoreConsentModalComponent', () => {
  let component: CoreConsentModalComponent;
  let fixture: ComponentFixture<CoreConsentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CaptchaModule, SharedCoreModule ],
      declarations: [ CoreConsentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreConsentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle acceptance checkbox', () => {
    const input = fixture.debugElement.query(By.css('common-consent-modal'));
    spyOn(component, 'handleAccept').and.callThrough();
    input.triggerEventHandler('accept', {});
    expect(component.handleAccept).toHaveBeenCalled();
  });

  it('should handle token response', () => {
    const input = fixture.debugElement.query(By.css('common-captcha'));
    spyOn(component, 'handleToken').and.callThrough();
    input.triggerEventHandler('onValidToken', {});
    expect(component.handleToken).toHaveBeenCalled();
  });

  it('should show modal if specified', () => {
    fixture = TestBed.createComponent(CoreConsentModalComponent);
    component = fixture.componentInstance;
    component.initialVisibility = true;
    component.bcpConsentModal = jasmine.createSpyObj('bcpConsentModal', ['showFullSizeView']);
    fixture.detectChanges();
    expect(component.bcpConsentModal.showFullSizeView).toHaveBeenCalled();
  });
});
