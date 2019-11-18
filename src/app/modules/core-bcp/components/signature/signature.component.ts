import { Component, OnInit, ViewChild, ViewEncapsulation, Output, forwardRef } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ModalDirective } from 'ngx-bootstrap';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'bcp-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SignatureComponent),
    }
  ]
})
export class SignatureComponent implements OnInit {
  showDemoError = false;

  @ViewChild(SignaturePad, {static: true}) signaturePad: SignaturePad;
  @ViewChild('signatureModal', {static: true}) public modal: ModalDirective;

   // Required for implementing ControlValueAccessor
   _onChange = (_: any) => {};
   _onTouched = (_?: any) => {};

  public image;
 
  public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    // 'minWidth': 5,
    // 'maxWidth': 200,
    'canvasWidth': 500,
    'canvasHeight': 200
  };
 
  constructor() {
    // no-op
  }

  ngOnInit() {

  }
 
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
 

  clear() {
    this.signaturePad.clear();
  }

  open(){
    this.modal.show();
    this.signaturePad.clear();
    if (this.image) {
      this.signaturePad.fromDataURL(this.image);
    }
  }
  acceptModal(){
    this.image = this.signaturePad.toDataURL();
    this.modal.hide();
    this._onChange(this.image);
    // TODO - Output the image (or use controlvalueaccessor?)
  }

  cancelModal(){
    this.modal.hide();
  }


  // Register change function
  registerOnChange( fn: any ): void {
    this._onChange = fn;
  }

  // Register touched function
  registerOnTouched( fn: any ): void {
    this._onTouched = fn;
  }

  writeValue(val: any): void {
    if (val){
      this.image = val;
      this.signaturePad.fromDataURL(val);
    }
  }
}
