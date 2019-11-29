import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'register-facility',
    loadChildren: () => import('./modules/create-facility/create-facility.module').then(m => m.CreateFacilityModule)
  },
  /*
  {
    path: 'practitioner-assignment',
    loadChilder: app/modules/pracitioner-assignment/practitioner-assignement#PractitionerAssignmentModule
  }
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
