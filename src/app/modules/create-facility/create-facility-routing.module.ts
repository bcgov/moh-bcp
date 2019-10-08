import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateFacilityContainerComponent } from './create-facility-container/create-facility-container.component';
import { createFacilityPageRoutes } from './create-facility-page-routing';

const createFacilityPageRoutesWithRedirct: Routes = [
  ...createFacilityPageRoutes,
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  }
]

/** The top-level routes, including container, we pass to Angular  */
export const createFacilityRoutes: Routes = [
  {
    path: '',
    component: CreateFacilityContainerComponent,
    children: createFacilityPageRoutesWithRedirct,
  }
]

@NgModule({
  imports: [RouterModule.forChild(createFacilityRoutes)],
  exports: [RouterModule]
})
export class CreateFacilityRoutingModule { }
