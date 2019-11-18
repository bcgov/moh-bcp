import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCoreModule } from 'moh-common-lib';
import { PractitionerNumberComponent } from './practitioner-number/practitioner-number.component';
import { FormsModule } from '@angular/forms';
import { ValidatePractitionerNumberDirective } from './practitioner-number/validate-practitioner-number.directive';
import { ReviewContainerComponent } from './review-container/review-container.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SignatureComponent } from './components/signature/signature.component';
import { ModalModule } from 'ngx-bootstrap';

const exportables = [
  PractitionerNumberComponent,
  ValidatePractitionerNumberDirective,
  ReviewContainerComponent,
  SignatureComponent
];

@NgModule({
  declarations: [...exportables],
  imports: [
    CommonModule,
    SharedCoreModule,
    FormsModule,
    SignaturePadModule,
    ModalModule.forRoot(),
  ],
  exports: [
    SharedCoreModule,
    ...exportables
  ]
})
export class CoreBCPModule { }
