import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionerAttachmentComponent } from './practitioner-attachment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedCoreModule } from 'moh-common-lib';
import { RouterTestingModule } from '@angular/router/testing';
import { PRAC_ATTACHMENT_TYPE } from '../../models/practitioner-attachment';
import { parseISO } from 'date-fns';

fdescribe('PractitionerAttachmentComponent', () => {
  let component: PractitionerAttachmentComponent;
  let fixture: ComponentFixture<PractitionerAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, RouterTestingModule, SharedCoreModule ],
      declarations: [ PractitionerAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PractitionerAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should error out fields aren\'t filled out', () => {
    component.dataService.attachmentType = PRAC_ATTACHMENT_TYPE.TEMP;
    component.changeNewAttachmentType(true);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('should have valid form when all fields are filled out', () => {
    component.dataService.attachmentType = PRAC_ATTACHMENT_TYPE.TEMP;
    component.dataService.pracNewAttachmentType = true;
    component.dataService.facEffectiveDate = parseISO('2020-01-01');
    component.dataService.facCancelDate = parseISO('2021-01-01');
    component.dataService.manualReview = false;

    component.changeNewAttachmentType(true);
    fixture.detectChanges();
    component.formGroup.controls.attachmentType.setValue(PRAC_ATTACHMENT_TYPE.NEW);
    component.formGroup.controls.attachmentEffectiveDate.setValue(parseISO('2020-04-01'));
    component.formGroup.controls.attachmentCancelDate.setValue(parseISO('2020-05-01'));
    fixture.detectChanges();
    expect(component.formGroup.valid).toBeTruthy();
  });*/
  
  it('should error out when cancel date is out of range', () => {
    component.dataService.attachmentType = PRAC_ATTACHMENT_TYPE.TEMP;
    component.dataService.pracNewAttachmentType = true;
    component.dataService.facEffectiveDate = parseISO('2020-01-01');
    component.dataService.facCancelDate = parseISO('2021-01-01');
    component.dataService.manualReview = false;

    component.changeNewAttachmentType(true);
    fixture.detectChanges();
    component.formGroup.controls['attachmentType'].setValue(PRAC_ATTACHMENT_TYPE.NEW);
    component.formGroup.controls['attachmentEffectiveDate'].setValue(parseISO('2020-04-01'));
    component.formGroup.controls['attachmentCancelDate'].setValue(parseISO('2021-05-01'));
    component.formGroup.controls['attachmentCancelDate'].markAsTouched();
    fixture.detectChanges();
    const attachmentEffectiveDateEl = fixture.nativeElement.querySelectorAll('common-date[name=\'attachmentEffectiveDate\']');
    const attachmentCancelDateEl = fixture.nativeElement.querySelectorAll('common-date[name=\'attachmentCancelDate\']');
    
    console.log(attachmentEffectiveDateEl);
    expect(component.formGroup.valid).toBeFalsy();
  });
});
