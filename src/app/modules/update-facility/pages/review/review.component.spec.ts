import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ReviewComponent } from './review.component';
import { ReviewFacilityAdminComponent } from '../../components/review-facility-admin/review-facility-admin.component';
import { ReviewCancelChangeComponent } from '../../components/review-cancel-change/review-cancel-change.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreBCPModule } from '../../../core-bcp/core-bcp.module';
import { ReviewFacilityInfoComponent } from '../../components/review-facility-info/review-facility-info.component';
import { ReviewBCPComponent } from '../../components/review-bcp/review-bcp.component';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreBCPModule, ReactiveFormsModule, RouterTestingModule ],
      declarations: [
        ReviewComponent,
        ReviewBCPComponent,
        ReviewFacilityAdminComponent,
        ReviewFacilityInfoComponent,
        ReviewCancelChangeComponent,
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
