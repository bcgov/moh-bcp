import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCoreModule } from 'moh-common-lib';
import { PractitionerNumberComponent } from './practitioner-number/practitioner-number.component';
import { FormsModule } from '@angular/forms';
import { ValidatePractitionerNumberDirective } from './practitioner-number/validate-practitioner-number.directive';

const exportables = [
  PractitionerNumberComponent,
  ValidatePractitionerNumberDirective,
];

@NgModule({
  declarations: [...exportables],
  imports: [
    CommonModule,
    SharedCoreModule,
    FormsModule
  ],
  exports: [
    SharedCoreModule,
    ...exportables
  ]
})
export class CoreBCPModule { }
