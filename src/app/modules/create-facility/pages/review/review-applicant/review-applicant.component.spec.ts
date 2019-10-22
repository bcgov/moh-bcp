import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewApplicantComponent } from './review-applicant.component';

describe('ReviewApplicantComponent', () => {
  let component: ReviewApplicantComponent;
  let fixture: ComponentFixture<ReviewApplicantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewApplicantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
