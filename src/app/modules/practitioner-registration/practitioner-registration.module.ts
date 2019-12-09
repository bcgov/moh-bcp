import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PractitionerAssignmentRoutingModule } from './practitioner-registration-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { PractitionerInfoComponent } from './pages/practitioner-info/practitioner-info.component';
import { FacilityInfoComponent } from './pages/facility-info/facility-info.component';
import { ReviewComponent } from './pages/review/review.component';
import { SubmissionComponent } from './pages/submission/submission.component';
import { RegistrationContainerComponent } from './components/registration-container/registration-container.component';
import { PractitionerAssignmentComponent } from './pages/practitioner-assignment/practitioner-assignment.component';
import { CoreBCPModule } from '../core-bcp/core-bcp.module';
import { ReviewPractitionerInfoComponent } from './pages/review/review-practitioner-info/review-practitioner-info.component';
import { ReviewPractitionerAttachmentComponent } from './pages/review/review-practitioner-attachment/review-practitioner-attachment.component';
import { ReviewPractitionerFacilityComponent } from './pages/review/review-practitioner-facility/review-practitioner-facility.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedCoreModule } from 'moh-common-lib';

@NgModule({
  declarations: [
    HomeComponent,
    PractitionerInfoComponent,
    FacilityInfoComponent,
    PractitionerAssignmentComponent,
    ReviewComponent,
    SubmissionComponent,
    RegistrationContainerComponent,
    ReviewPractitionerAttachmentComponent,
    ReviewPractitionerFacilityComponent,
    ReviewPractitionerInfoComponent
  ],
  imports: [
    CommonModule,
    CoreBCPModule,
    FormsModule,
    PractitionerAssignmentRoutingModule,
    ReactiveFormsModule,
    SharedCoreModule,
  ]
})
export class PractitionerRegistrationModule { }
