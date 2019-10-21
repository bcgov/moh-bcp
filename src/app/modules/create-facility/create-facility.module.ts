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
import { ReviewApplicantComponent } from './pages/review/review-applicant/review-applicant.component';
import { ReviewFacilityComponent } from './pages/review/review-facility/review-facility.component';
import { ReviewFacilityMailingInfoComponent } from './pages/review/review-facility-mailing-info/review-facility-mailing-info.component';
import { ReviewFacilityBcpComponent } from './pages/review/review-facility-bcp/review-facility-bcp.component';
import { ReviewServiceTypesComponent } from './pages/review/review-service-types/review-service-types.component';



@NgModule({
  declarations: [
    HomeComponent,
    ApplicantInfoComponent,
    FacilityInfoComponent,
    ReviewComponent,
    SubmissionComponent,
    CreateFacilityContainerComponent,
    ReviewApplicantComponent,
    ReviewFacilityComponent,
    ReviewFacilityMailingInfoComponent,
    ReviewFacilityBcpComponent,
    ReviewServiceTypesComponent],
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
  ]
})
export class CreateFacilityModule { }
