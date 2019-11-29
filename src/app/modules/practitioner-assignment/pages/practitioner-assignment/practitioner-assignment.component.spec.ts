import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionerAssignmentComponent } from './practitioner-assignment.component';

describe('PractitionerAssignmentComponent', () => {
  let component: PractitionerAssignmentComponent;
  let fixture: ComponentFixture<PractitionerAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
