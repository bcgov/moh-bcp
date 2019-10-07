import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCoreModule } from 'moh-common-lib';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedCoreModule
  ],
  exports: [
    SharedCoreModule
  ]
})
export class CoreBCPModule { }
