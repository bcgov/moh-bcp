import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { SharedCoreModule } from 'moh-common-lib';

import { CoreFacilityInfoComponent } from './core-facility-info.component';
import { FacilityNumberComponent } from '../facility-number/facility-number.component';

describe('CoreFacilityInfoComponent', () => {
  let component: CoreFacilityInfoComponent;
  let fixture: ComponentFixture<CoreFacilityInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedCoreModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        CoreFacilityInfoComponent,
        FacilityNumberComponent
      ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(CoreFacilityInfoComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({
      name: new FormControl(''),
      mspNumber: new FormControl(''),
      address: new FormControl(''),
      city: new FormControl(''),
      postalCode: new FormControl(''),
      faxNumber: new FormControl(''),
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
