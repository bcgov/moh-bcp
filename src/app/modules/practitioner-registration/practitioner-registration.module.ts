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

@NgModule({
  declarations: [
    HomeComponent,
    PractitionerInfoComponent,
    FacilityInfoComponent,
    PractitionerAssignmentComponent,
    ReviewComponent,
    SubmissionComponent,
    RegistrationContainerComponent,
    ],
  imports: [
    CommonModule,
    PractitionerAssignmentRoutingModule
  ]
})
export class PractitionerRegistrationModule { }
