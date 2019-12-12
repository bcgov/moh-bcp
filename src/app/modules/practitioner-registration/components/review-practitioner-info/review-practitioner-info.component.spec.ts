import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPractitionerInfoComponent } from './review-practitioner-info.component';

describe('ReviewPractitionerInfoComponent', () => {
  let component: ReviewPractitionerInfoComponent;
  let fixture: ComponentFixture<ReviewPractitionerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewPractitionerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPractitionerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
