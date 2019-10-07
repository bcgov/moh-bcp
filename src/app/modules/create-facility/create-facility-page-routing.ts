import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ApplicantInfoComponent } from './pages/applicant-info/applicant-info.component';
import { FacilityInfoComponent } from './pages/facility-info/facility-info.component';
import { ReviewComponent } from './pages/review/review.component';
import { SubmissionComponent } from './pages/submission/submission.component';
/** The individual page routes only, does not include container */
export const createFacilityPageRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'facility-administrator',
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
];
