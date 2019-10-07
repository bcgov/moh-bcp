import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedCoreModule } from 'moh-common-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedCoreModule // necessary here for CommonHeader at top level
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
