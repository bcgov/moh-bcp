import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPractitionerAttachmentComponent } from './review-practitioner-attachment.component';
import { CoreBCPModule } from '../../../core-bcp/core-bcp.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReviewPractitionerAttachmentComponent', () => {
  let component: ReviewPractitionerAttachmentComponent;
  let fixture: ComponentFixture<ReviewPractitionerAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreBCPModule, RouterTestingModule ],
      declarations: [ ReviewPractitionerAttachmentComponent ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(ReviewPractitionerAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should get review items', () => {
    fixture = TestBed.createComponent(ReviewPractitionerAttachmentComponent);
    component = fixture.componentInstance;
    expect(component.review.sectionItems).not.toBeDefined();
    fixture.detectChanges();
    expect(component.review.sectionItems instanceof Array).toBeDefined();
  });
});
