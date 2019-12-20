import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionComponent } from './submission.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedCoreModule } from 'moh-common-lib';

import { ReviewApplicantComponent } from '../review/review-applicant/review-applicant.component';
import { ReviewFacilityComponent } from '../review/review-facility/review-facility.component';
import { ReviewFacilityMailingInfoComponent } from '../review/review-facility-mailing-info/review-facility-mailing-info.component';
import { ReviewFacilityBcpComponent } from '../review/review-facility-bcp/review-facility-bcp.component';

import { ReviewContainerComponent } from '../../../core-bcp/components/review-container/review-container.component';

describe('SubmissionComponent', () => {
  let component: SubmissionComponent;
  let fixture: ComponentFixture<SubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, SharedCoreModule ],
      declarations: [
        ReviewApplicantComponent,
        ReviewContainerComponent,
        ReviewFacilityBcpComponent,
        ReviewFacilityComponent,
        ReviewFacilityMailingInfoComponent,
        SubmissionComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
