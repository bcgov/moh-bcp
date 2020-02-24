import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ReviewComponent } from './review.component';
import { ReviewFormPageComponent } from '../../components/review-form-page/review-form-page.component';
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
        ReviewFormPageComponent,
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
