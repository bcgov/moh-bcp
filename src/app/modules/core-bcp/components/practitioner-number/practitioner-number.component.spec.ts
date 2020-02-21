import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedCoreModule } from 'moh-common-lib';

import { PractitionerNumberComponent } from './practitioner-number.component';
import { NgControl } from '@angular/forms';

describe('PractitionerNumberComponent', () => {
  let component: PractitionerNumberComponent;
  let fixture: ComponentFixture<PractitionerNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedCoreModule ],
      declarations: [ PractitionerNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PractitionerNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error for invalid entries', () => {
    component.pracNumber = 'ab c';
    fixture.detectChanges();
    const errorContainerEl = fixture.debugElement.nativeElement.querySelector('common-error-container');
    expect(errorContainerEl).toBeTruthy();
  });

  it('should handle change event', () => {
    const input = fixture.debugElement.query(By.css('input'));
    spyOn(component, 'inputChange').and.callThrough();
    input.triggerEventHandler('change', {target: {value: 'mock-value'}});
    expect(component.inputChange).toHaveBeenCalled();
  });

  it('should handle blur event', () => {
    const input = fixture.debugElement.query(By.css('input'));
    spyOn(component, 'onBlur').and.callThrough();
    input.triggerEventHandler('blur', {target: {value: 'mock-value'}});
    expect(component.onBlur).toHaveBeenCalled();
  });

  it('should write value', () => {
    const mockValue = 'mock-value';
    component.writeValue(mockValue);
    expect(component.pracNumber).toEqual(mockValue);
  });
});
