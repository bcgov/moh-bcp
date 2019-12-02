import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFacilityComponent } from './review-facility.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

fdescribe('ReviewFacilityComponent', () => {
  let component: ReviewFacilityComponent;
  let fixture: ComponentFixture<ReviewFacilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewFacilityComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
