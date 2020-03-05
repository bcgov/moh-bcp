import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ReviewComponent } from './review.component';
import { ReviewBCPComponent } from '../../components/review-bcp/review-bcp.component';
import { ReviewCancelFacilityComponent } from '../../components/review-cancel-facility/review-cancel-facility.component';
import { ReviewFacilityAdminComponent } from '../../components/review-facility-admin/review-facility-admin.component';
import { ReviewFacilityInfoComponent } from '../../components/review-facility-info/review-facility-info.component';
import { ReviewOtherRequestComponent } from '../../components/review-other-request/review-other-request.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreBCPModule } from '../../../core-bcp/core-bcp.module';


describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreBCPModule, ReactiveFormsModule, RouterTestingModule ],
      declarations: [
        ReviewComponent,
        ReviewBCPComponent,
        ReviewCancelFacilityComponent,
        ReviewFacilityAdminComponent,
        ReviewFacilityInfoComponent,
        ReviewOtherRequestComponent,
      ]
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
});
