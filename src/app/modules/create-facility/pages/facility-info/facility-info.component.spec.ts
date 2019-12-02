import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityInfoComponent } from './facility-info.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('FacilityInfoComponent', () => {
  let component: FacilityInfoComponent;
  let fixture: ComponentFixture<FacilityInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule ],
      declarations: [ FacilityInfoComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ FormBuilder ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
