import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantInfoComponent } from './applicant-info.component';

describe('ApplicantInfoComponent', () => {
  let component: ApplicantInfoComponent;
  let fixture: ComponentFixture<ApplicantInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
