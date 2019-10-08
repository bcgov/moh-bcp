import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ApplicantInfoComponent } from './pages/applicant-info/applicant-info.component';
import { FacilityInfoComponent } from './pages/facility-info/facility-info.component';
import { ReviewComponent } from './pages/review/review.component';
import { SubmissionComponent } from './pages/submission/submission.component';
import { RouteGuardService } from 'moh-common-lib';
/** The individual page routes only, does not include container */
export const createFacilityPageRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    // do NOT route-guard here, it's not necessary.
  },
  {
    path: 'facility-administrator',
    component: ApplicantInfoComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'facility-info',
    component: FacilityInfoComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'review',
    component: ReviewComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: 'submission',
    component: SubmissionComponent,
    canActivate: [RouteGuardService]
  },
];
