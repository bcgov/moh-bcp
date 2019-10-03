import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ApplicantInfoComponent } from './pages/applicant-info/applicant-info.component';
import { FacilityInfoComponent } from './pages/facility-info/facility-info.component';
import { ReviewComponent } from './pages/review/review.component';
import { SubmissionComponent } from './pages/submission/submission.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'applicant-info',
    component: ApplicantInfoComponent
  },
  {
    path: 'facility-info',
    component: FacilityInfoComponent,
  },
  {
    path: 'review',
    component: ReviewComponent
  },
  {
    path: 'submission',
    component: SubmissionComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateFacilityRoutingModule { }
