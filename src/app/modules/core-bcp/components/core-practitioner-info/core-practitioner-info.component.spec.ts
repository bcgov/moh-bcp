import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { SharedCoreModule } from 'moh-common-lib';

import { CorePractitionerInfoComponent } from './core-practitioner-info.component';
import { PractitionerNumberComponent } from '../practitioner-number/practitioner-number.component';
import { PhoneExtensionComponent } from '../phone-extension/phone-extension.component';

describe('CorePractitionerInfoComponent', () => {
  let component: CorePractitionerInfoComponent;
  let fixture: ComponentFixture<CorePractitionerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedCoreModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        CorePractitionerInfoComponent,
        PhoneExtensionComponent,
        PractitionerNumberComponent
      ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(CorePractitionerInfoComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      mspPracNumber: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      phoneNumberExt: new FormControl(''),
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
