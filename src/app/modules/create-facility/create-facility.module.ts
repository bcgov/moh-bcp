import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateFacilityRoutingModule } from './create-facility-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ApplicantInfoComponent } from './pages/applicant-info/applicant-info.component';
import { FacilityInfoComponent } from './pages/facility-info/facility-info.component';
import { ReviewComponent } from './pages/review/review.component';
import { SubmissionComponent } from './pages/submission/submission.component';
import { CoreBCPModule } from '../core-bcp/core-bcp.module';


@NgModule({
  declarations: [HomeComponent, ApplicantInfoComponent, FacilityInfoComponent, ReviewComponent, SubmissionComponent],
  imports: [
    CommonModule,
    CreateFacilityRoutingModule,
    CoreBCPModule
  ]
})
export class CreateFacilityModule { }
