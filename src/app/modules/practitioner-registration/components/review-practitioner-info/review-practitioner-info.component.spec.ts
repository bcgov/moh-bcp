import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPractitionerInfoComponent } from './review-practitioner-info.component';
import { CoreBCPModule } from '../../../../core-bcp/core-bcp.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReviewPractitionerInfoComponent', () => {
  let component: ReviewPractitionerInfoComponent;
  let fixture: ComponentFixture<ReviewPractitionerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreBCPModule, RouterTestingModule ],
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
