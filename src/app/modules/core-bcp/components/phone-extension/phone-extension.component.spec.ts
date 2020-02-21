import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PhoneExtensionComponent } from './phone-extension.component';
import { SharedCoreModule } from 'moh-common-lib';

describe('PhoneExtensionComponent', () => {
  let component: PhoneExtensionComponent;
  let fixture: ComponentFixture<PhoneExtensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneExtensionComponent ],
      imports: [ SharedCoreModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle value change event', () => {
    const input = fixture.debugElement.query(By.css('input'));
    spyOn(component, 'onValueChange').and.callThrough();
    input.triggerEventHandler('change', {target: {value: 'mock-value'}});
    expect(component.onValueChange).toHaveBeenCalled();
  });

  it('should handle blur event', () => {
    const input = fixture.debugElement.query(By.css('input'));
    spyOn(component, 'onBlur').and.callThrough();
    input.triggerEventHandler('blur', {});
    expect(component.onBlur).toHaveBeenCalled();
  });

  it('should write value', () => {
    const mockValue = 'mock-value';
    component.writeValue(mockValue)
    expect(component.extNumber).toEqual(mockValue);
  });
});
