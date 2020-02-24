import { UPDATE_FACILITY_PAGES } from './update-facility-route-constants';
import { FormPageComponent } from './pages/form-page/form-page.component';

import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReviewComponent } from './pages/review/review.component';

/** The individual page routes only, does not include container */
export const pages: Route[] = [
  {
    path: UPDATE_FACILITY_PAGES.HOME.path,
    component: HomeComponent,
    data: {title: UPDATE_FACILITY_PAGES.HOME.title}
  },
  {
    path: UPDATE_FACILITY_PAGES.FORM_PAGE.path,
    component: FormPageComponent,
    data: {title: UPDATE_FACILITY_PAGES.FORM_PAGE.title}
  },
  {
    path: UPDATE_FACILITY_PAGES.REVIEW.path,
    component: ReviewComponent,
    data: {title: UPDATE_FACILITY_PAGES.REVIEW.title}
  },
  {
    path: '',
    redirectTo: UPDATE_FACILITY_PAGES.HOME.path,
    pathMatch: 'full'
  }
];
