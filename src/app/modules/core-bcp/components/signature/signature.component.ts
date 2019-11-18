import { Component, OnInit, ViewChild, ViewEncapsulation, Output } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ModalDirective } from 'ngx-bootstrap';


@Component({
  selector: 'bcp-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignatureComponent implements OnInit {
  showDemoError = false;

  @ViewChild(SignaturePad, {static: true}) signaturePad: SignaturePad;
  @ViewChild('signatureModal', {static: true}) public modal: ModalDirective;

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
    // TODO - Output the image (or use controlvalueaccessor?)
  }

  cancelModal(){
    this.modal.hide();
  }
}
