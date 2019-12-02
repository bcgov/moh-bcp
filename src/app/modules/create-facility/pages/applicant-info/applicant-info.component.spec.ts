import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantInfoComponent } from './applicant-info.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ApplicantInfoComponent', () => {
  let component: ApplicantInfoComponent;
  let fixture: ComponentFixture<ApplicantInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule, HttpClientTestingModule ],
      declarations: [ ApplicantInfoComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
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
