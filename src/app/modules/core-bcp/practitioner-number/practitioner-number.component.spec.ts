import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionerNumberComponent } from './practitioner-number.component';

describe('PractitionerNumberComponent', () => {
  let component: PractitionerNumberComponent;
  let fixture: ComponentFixture<PractitionerNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PractitionerNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PractitionerNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
