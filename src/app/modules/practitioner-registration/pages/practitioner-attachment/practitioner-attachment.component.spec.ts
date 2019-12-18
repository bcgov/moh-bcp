import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionerAttachmentComponent } from './practitioner-attachment.component';

describe('PractitionerAttachmentComponent', () => {
  let component: PractitionerAttachmentComponent;
  let fixture: ComponentFixture<PractitionerAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PractitionerAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PractitionerAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
