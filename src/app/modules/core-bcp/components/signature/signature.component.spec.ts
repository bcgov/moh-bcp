import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SignatureComponent } from './signature.component';
import { ModalModule } from 'ngx-bootstrap';
import { SharedCoreModule, CommonImage } from 'moh-common-lib';
import { SignaturePadModule } from 'angular2-signaturepad';

class SignatureComponentTest extends SignatureComponent {
  drawCompleteTest() {
    this.blankCanvas = true;
    this.drawComplete();
    expect(this.blankCanvas).toBeFalsy();
  }

  clearTest() {
    this.blankCanvas = false;
    this.clear();
    expect(this.blankCanvas).toBeTruthy();
  }

  acceptModalTest() {
    this.blankCanvas = false;
    this.modal = jasmine.createSpyObj('modal', ['hide']);
    this.signaturePad = jasmine.createSpyObj('signaturePad', ['toDataURL']);
    this.acceptModal();
    expect(this.modal.hide).toHaveBeenCalled();
    expect(this.signaturePad.toDataURL).toHaveBeenCalled();
  }
}

describe('SignatureComponent', () => {
  let component: SignatureComponent;
  let fixture: ComponentFixture<SignatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ModalModule.forRoot(), SharedCoreModule, SignaturePadModule ],
      declarations: [ SignatureComponent, SignatureComponentTest ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    const input = fixture.debugElement.query(By.css('button'));
    spyOn(component, 'open').and.callThrough();
    input.triggerEventHandler('click', {});
    expect(component.open).toHaveBeenCalled();
  });

  it('should set draw complete flag', () => {
    const fixture = TestBed.createComponent(SignatureComponentTest);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    component.drawCompleteTest();
  });

  it('should clear canvas', () => {
    const fixture = TestBed.createComponent(SignatureComponentTest);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    component.clearTest();
  });

  it('should show the modal', () => {
    component.modal = jasmine.createSpyObj('modal', ['show']);
    component.signaturePad = jasmine.createSpyObj('signaturePad', ['clear', 'fromDataURL']);
    component.image = jasmine.createSpyObj('image', {
      fileContent: 'mock-file-content'
    })
    component.open();
    expect(component.modal.show).toHaveBeenCalled();
    expect(component.signaturePad.clear).toHaveBeenCalled();
    expect(component.signaturePad.fromDataURL).toHaveBeenCalled();
  });

  it('should accept the modal', () => {
    const fixture = TestBed.createComponent(SignatureComponentTest);
    const component = fixture.componentInstance;
    fixture.detectChanges();    
    component.acceptModalTest();
  });

  it('should hide the modal', () => {
    component.modal = jasmine.createSpyObj('modal', ['hide']);
    component.cancelModal();
    expect(component.modal.hide).toHaveBeenCalled();
  });

  it('should register the on change event', () => {
    const mockOnChange = 'mock-on-change-event';
    component.registerOnChange(mockOnChange);
    expect(component._onChange).toBe(mockOnChange);
  });

  it('should register the on touched event', () => {
    const mockOnTouched = 'mock-on-touched-event';
    component.registerOnTouched(mockOnTouched);
    expect(component._onTouched).toBe(mockOnTouched);
  });

  it('should write value', () => {
    const mockImage = new CommonImage('');
    component.signaturePad = jasmine.createSpyObj('signaturePad', ['fromDataURL']);
    component.writeValue(mockImage);
    expect(component.image).toBe(mockImage);
    expect(component.signaturePad.fromDataURL).toHaveBeenCalled();
  });
});
