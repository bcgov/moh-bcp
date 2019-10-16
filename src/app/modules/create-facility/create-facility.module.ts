import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateFacilityRoutingModule } from './create-facility-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ApplicantInfoComponent } from './pages/applicant-info/applicant-info.component';
import { FacilityInfoComponent } from './pages/facility-info/facility-info.component';
import { ReviewComponent } from './pages/review/review.component';
import { SubmissionComponent } from './pages/submission/submission.component';
import { CoreBCPModule } from '../core-bcp/core-bcp.module';
import { CreateFacilityContainerComponent } from './create-facility-container/create-facility-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AbstractPgCheckService, RouteGuardService, CheckCompleteBaseService, GeocoderService } from 'moh-common-lib';
import { CaptchaModule } from 'moh-common-lib/captcha';
import { BCPGeocoderService } from '../../services/bcp-geocoder.service';



@NgModule({
  declarations: [
    HomeComponent,
    ApplicantInfoComponent,
    FacilityInfoComponent,
    ReviewComponent,
    SubmissionComponent,
    CreateFacilityContainerComponent],
  imports: [
    CommonModule,
    CreateFacilityRoutingModule,
    CoreBCPModule,
    FormsModule,
    ReactiveFormsModule,
    CaptchaModule,
  ],
  providers: [
    {provide: AbstractPgCheckService, useExisting: CheckCompleteBaseService},
    RouteGuardService,
    {provide: GeocoderService, useExisting: BCPGeocoderService },
  ]
})
export class CreateFacilityModule { }
