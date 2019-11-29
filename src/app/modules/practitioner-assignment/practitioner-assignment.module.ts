import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PractitionerAssignmentRoutingModule } from './practitioner-assignment-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { PractitionerInfoComponent } from './pages/practitioner-info/practitioner-info.component';
import { FacilityInfoComponent } from './pages/facility-info/facility-info.component';
import { PractitionerAssignmentComponent } from './pages/practitioner-assignment/practitioner-assignment.component';
import { ReviewComponent } from './pages/review/review.component';
import { SubmissionComponent } from './pages/submission/submission.component';
import { PractAssignContainerComponent } from './components/pract-assign-container/pract-assign-container.component';
import { PractitionerAssignmentApi } from './models/practitioner-assignment-api.model/practitioner-assignment-api.model.component';


@NgModule({
  declarations: [HomeComponent, PractitionerInfoComponent, FacilityInfoComponent, PractitionerAssignmentComponent, ReviewComponent, SubmissionComponent, PractAssignContainerComponent, PractitionerAssignmentApi.ModelComponent],
  imports: [
    CommonModule,
    PractitionerAssignmentRoutingModule
  ]
})
export class PractitionerAssignmentModule { }
