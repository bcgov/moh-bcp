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

  it('should change attachment type', () => {
    component.changeAttachmentType('new-value');
    expect(component.dataService.pracAttachmentType).toEqual('new-value');
  });

  it('should mark inputs as touched when attempting to continue', () => {
    const markAllInputsTouchedSpy = jasmine.createSpy('markAllInputsTouched');
    Object.defineProperty(component, 'markAllInputsTouched', {value: markAllInputsTouchedSpy})
    component.continue();
    expect(markAllInputsTouchedSpy).toHaveBeenCalled();
  });

  it('should navigate when form is valid', () => {
    const markAllInputsTouchedSpy = jasmine.createSpy('markAllInputsTouched');
    const navigateSpy = jasmine.createSpy('navigate');
    Object.defineProperty(component, 'markAllInputsTouched', {value: markAllInputsTouchedSpy});
    Object.defineProperty(component, 'navigate', {value: navigateSpy});
    Object.defineProperty(component.formGroup, 'valid', {value: true});
    component.continue();
    expect(navigateSpy).toHaveBeenCalled();
  });
});
