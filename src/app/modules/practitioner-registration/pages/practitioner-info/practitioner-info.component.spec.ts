import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionerInfoComponent } from './practitioner-info.component';

describe('PractitionerInfoComponent', () => {
  let component: PractitionerInfoComponent;
  let fixture: ComponentFixture<PractitionerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PractitionerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PractitionerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
