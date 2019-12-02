import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureComponent } from './signature.component';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { ModalModule } from "ngx-bootstrap";
import { NgControl } from '@angular/forms';

@Component({selector: 'bs-modal', template: ''})
class BootstrapModalStub {}

class MockNgControl {}

describe('SignatureComponent', () => {
  let component: SignatureComponent;
  let fixture: ComponentFixture<SignatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModalModule.forRoot()],
      declarations: [ SignatureComponent, BootstrapModalStub ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [ {provide: NgControl, useValue: MockNgControl } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatureComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
