import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ApplicantInfoComponent } from './pages/applicant-info/applicant-info.component';
import { FacilityInfoComponent } from './pages/facility-info/facility-info.component';
import { ReviewComponent } from './pages/review/review.component';
import { SubmissionComponent } from './pages/submission/submission.component';
import { CreateFacilityContainerComponent } from './create-facility-container/create-facility-container.component';

/** The individual page routes only, does not include container */
export const createFacilityPageRoutes: Routes = [
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

/** The top-level routes, including container, we pass to Angular  */
export const createFacilityRoutes: Routes = [
  {
    path: '',
    component: CreateFacilityContainerComponent,
    children: createFacilityPageRoutes,
    canActivateChild: []
  }
]

@NgModule({
  imports: [RouterModule.forChild(createFacilityRoutes)],
  exports: [RouterModule]
})
export class CreateFacilityRoutingModule { }
