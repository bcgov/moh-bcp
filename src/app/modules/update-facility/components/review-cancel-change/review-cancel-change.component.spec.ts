import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCancelChangeComponent } from './review-cancel-change.component';
import { CoreBCPModule } from '../../../core-bcp/core-bcp.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReviewCancelChangeComponent', () => {
  let component: ReviewCancelChangeComponent;
  let fixture: ComponentFixture<ReviewCancelChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreBCPModule, RouterTestingModule ],
      declarations: [ ReviewCancelChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCancelChangeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });
});
