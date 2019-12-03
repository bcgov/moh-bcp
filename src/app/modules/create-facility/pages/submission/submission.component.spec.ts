import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionComponent } from './submission.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedCoreModule } from 'moh-common-lib';

describe('SubmissionComponent', () => {
  let component: SubmissionComponent;
  let fixture: ComponentFixture<SubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, SharedCoreModule ],
      declarations: [ SubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
