import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPractitionerAttachmentComponent } from './review-practitioner-attachment.component';

describe('ReviewPractitionerAttachmentComponent', () => {
  let component: ReviewPractitionerAttachmentComponent;
  let fixture: ComponentFixture<ReviewPractitionerAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewPractitionerAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPractitionerAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
