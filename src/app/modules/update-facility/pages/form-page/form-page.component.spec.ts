import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPageComponent } from './form-page.component';
import { CoreBCPModule } from '../../../core-bcp/core-bcp.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('FormPageComponent', () => {
  let component: FormPageComponent;
  let fixture: ComponentFixture<FormPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreBCPModule, RouterTestingModule ],
      declarations: [ FormPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark inputs as touched when attempting to continue', () => {
    const markAllInputsTouchedSpy = jasmine.createSpy('markAllInputsTouched');
    Object.defineProperty(component, 'markAllInputsTouched', {value: markAllInputsTouchedSpy});
    Object.defineProperty(component.formGroup, 'valid', {value: false});
    const setIsLoadingSpy = jasmine.createSpy('setIsLoading');
    Object.defineProperty(component, 'containerService', {value: {setIsLoading: setIsLoadingSpy}});
    component.continue();
    expect(markAllInputsTouchedSpy).toHaveBeenCalled();
    expect(setIsLoadingSpy).not.toHaveBeenCalled();
  });
});
