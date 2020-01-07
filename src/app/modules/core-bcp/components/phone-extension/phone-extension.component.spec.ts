import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneExtensionComponent } from './phone-extension.component';

describe('PhoneExtensionComponent', () => {
  let component: PhoneExtensionComponent;
  let fixture: ComponentFixture<PhoneExtensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneExtensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
