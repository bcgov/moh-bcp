import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFacilityBcpComponent } from './review-facility-bcp.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ReviewFacilityBcpComponent', () => {
  let component: ReviewFacilityBcpComponent;
  let fixture: ComponentFixture<ReviewFacilityBcpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewFacilityBcpComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewFacilityBcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
