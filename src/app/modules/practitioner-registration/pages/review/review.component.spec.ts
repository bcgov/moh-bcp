import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ReviewComponent } from './review.component';
import { ReviewPractitionerInfoComponent } from './review-practitioner-info/review-practitioner-info.component';
import { ReviewPractitionerFacilityComponent } from './review-practitioner-facility/review-practitioner-facility.component';
import { ReviewPractitionerAttachmentComponent } from './review-practitioner-attachment/review-practitioner-attachment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreBCPModule } from '../../../core-bcp/core-bcp.module';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreBCPModule, ReactiveFormsModule, RouterTestingModule ],
      declarations: [ ReviewComponent, ReviewPractitionerAttachmentComponent, ReviewPractitionerFacilityComponent, ReviewPractitionerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark inputs as touched if cannot continue form', () => {
    const markAllInputsTouchedSpy = jasmine.createSpy('markAllInputsTouched');
    const navigateSpy = jasmine.createSpy('navigate');
    const canContinueSpy = jasmine.createSpy('canContiue').and.returnValue(false);
    Object.defineProperty(component, 'markAllInputsTouched', {value: markAllInputsTouchedSpy});
    Object.defineProperty(component, 'navigate', {value: navigateSpy});
    Object.defineProperty(component, 'canContinue', {value: canContinueSpy});
    component.continue();
    expect(markAllInputsTouchedSpy).toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should navigate when form is valid', () => {
    const markAllInputsTouchedSpy = jasmine.createSpy('markAllInputsTouched');
    const navigateSpy = jasmine.createSpy('navigate');
    const canContinueSpy = jasmine.createSpy('canContiue').and.returnValue(true);
    Object.defineProperty(component, 'markAllInputsTouched', {value: markAllInputsTouchedSpy});
    Object.defineProperty(component, 'navigate', {value: navigateSpy});
    Object.defineProperty(component, 'canContinue', {value: canContinueSpy});
    component.continue();
    expect(markAllInputsTouchedSpy).not.toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalled();
  });
});
