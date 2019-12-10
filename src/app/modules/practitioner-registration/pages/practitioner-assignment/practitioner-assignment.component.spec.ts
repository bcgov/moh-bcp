import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionerAssignmentComponent } from './practitioner-assignment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedCoreModule } from 'moh-common-lib';

describe('PractitionerAssignmentComponent', () => {
  let component: PractitionerAssignmentComponent;
  let fixture: ComponentFixture<PractitionerAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, RouterTestingModule, SharedCoreModule ],
      declarations: [ PractitionerAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PractitionerAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
