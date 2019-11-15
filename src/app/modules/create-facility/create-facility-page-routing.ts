import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ApplicantInfoComponent } from './pages/applicant-info/applicant-info.component';
import { FacilityInfoComponent } from './pages/facility-info/facility-info.component';
import { ReviewComponent } from './pages/review/review.component';
import { SubmissionComponent } from './pages/submission/submission.component';
import { RouteGuardService } from 'moh-common-lib';
import { environment } from '../../../environments/environment';
import { CREATE_FACILITY_PAGES } from './create-facility-route-constants';



/** The individual page routes only, does not include container */
let defaultPages: Routes = [
  {
    path: '',
    component: HomeComponent,
    // do NOT route-guard here, it's not necessary.
  },
  {
    path: CREATE_FACILITY_PAGES.HOME.path,
    component: HomeComponent,
    // do NOT route-guard here, it's not necessary.
  },
  {
    path: CREATE_FACILITY_PAGES.FACILITY_ADMIN.path,
    component: ApplicantInfoComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: CREATE_FACILITY_PAGES.FACILITY_INFO.path,
    component: FacilityInfoComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: CREATE_FACILITY_PAGES.REVIEW.path,
    component: ReviewComponent,
    canActivate: [RouteGuardService]
  },
  {
    path: CREATE_FACILITY_PAGES.SUBMISSION.path,
    component: SubmissionComponent,
    canActivate: [RouteGuardService]
  },
];

// TODO: Not required, needs to be setup correctly - shared component needs to be.
// Ths bit of code is super helpful for local dev.  It lets us refresh on
// route-guarded pages directly (i.e. don't have to navigate back to page).
if (environment.bypassGuards) {
    // console.log('DEVELOPMENT ONLY - BYPASSING ROUTE GUARDS');
    defaultPages = defaultPages.map((x) => {
        x.canActivate = [];
        return x;
    });
}

export const createFacilityPageRoutes = defaultPages;
