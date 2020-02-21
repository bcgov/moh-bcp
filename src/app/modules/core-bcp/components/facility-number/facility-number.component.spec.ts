import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedCoreModule } from 'moh-common-lib';

import { FacilityNumberComponent } from './facility-number.component';

describe('PractitionerNumberComponent', () => {
  let component: FacilityNumberComponent;
  let fixture: ComponentFixture<FacilityNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedCoreModule ],
      declarations: [ FacilityNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error for invalid entries', () => {
    component.facNumber = 'ab c';
    fixture.detectChanges();
    const errorContainerEl = fixture.debugElement.nativeElement.querySelector('common-error-container');
    expect(errorContainerEl).toBeTruthy();
  });

  it('should trigger change event', () => {
    const input = fixture.debugElement.query(By.css('input'));
    spyOn(component, 'inputChange');
    input.triggerEventHandler('change', {});
    expect(component.inputChange).toHaveBeenCalled();
  });

  it('should trigger blur event', () => {
    const input = fixture.debugElement.query(By.css('input'));
    spyOn(component, 'onBlur');
    input.triggerEventHandler('blur', {});
    expect(component.onBlur).toHaveBeenCalled();
  });
});
