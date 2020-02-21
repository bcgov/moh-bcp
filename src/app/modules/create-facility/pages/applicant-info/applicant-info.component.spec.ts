import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantInfoComponent } from './applicant-info.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoreBCPModule } from '../../../core-bcp/core-bcp.module';
import { ReactiveFormsModule } from '@angular/forms';

class ApplicantInfoComponentTest extends ApplicantInfoComponent {
  handleErrorTest() {
    this.systemDownError = false;
    this.containerService = jasmine.createSpyObj('containerService', ['setIsLoading'])
    this.handleError();
    expect(this.systemDownError).toBeTruthy();
    expect(this.containerService.setIsLoading).toHaveBeenCalledWith(false);
  }

  handleValidationTest() {
    this.systemDownError = true;
    this.containerService = jasmine.createSpyObj('containerService', ['setIsLoading'])
    this.handleValidation(true);
    expect(this.showValidationError).toBeFalsy()
    expect(this.systemDownError).toBeFalsy();
    expect(this.containerService.setIsLoading).toHaveBeenCalledWith(false);
  }
}

describe('ApplicantInfoComponent', () => {
  let component: ApplicantInfoComponent;
  let fixture: ComponentFixture<ApplicantInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule, HttpClientTestingModule, CoreBCPModule, ReactiveFormsModule ],
      declarations: [ ApplicantInfoComponent, ApplicantInfoComponentTest ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should continue', () => {
    spyOn(component, 'canContinue').and.returnValue(false);
    component.continue();
    expect(component.canContinue).toHaveBeenCalled();
  });

  it('should handle error', () => {
    const fixture = TestBed.createComponent(ApplicantInfoComponentTest);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    component.handleErrorTest();
  });

  it('should handle validation', () => {
    const fixture = TestBed.createComponent(ApplicantInfoComponentTest);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    component.handleValidationTest();
  });
});
