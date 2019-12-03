import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFacilityMailingInfoComponent } from './review-facility-mailing-info.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ReviewFacilityMailingInfoComponent', () => {
  let component: ReviewFacilityMailingInfoComponent;
  let fixture: ComponentFixture<ReviewFacilityMailingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewFacilityMailingInfoComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewFacilityMailingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
