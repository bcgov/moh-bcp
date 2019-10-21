import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewServiceTypesComponent } from './review-service-types.component';

describe('ReviewServiceTypesComponent', () => {
  let component: ReviewServiceTypesComponent;
  let fixture: ComponentFixture<ReviewServiceTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewServiceTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewServiceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
