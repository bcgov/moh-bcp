import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFacilityMailingInfoComponent } from './review-facility-mailing-info.component';

describe('ReviewFacilityMailingInfoComponent', () => {
  let component: ReviewFacilityMailingInfoComponent;
  let fixture: ComponentFixture<ReviewFacilityMailingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewFacilityMailingInfoComponent ]
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
