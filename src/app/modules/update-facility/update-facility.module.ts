import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateFacilityRoutingModule } from './update-facility-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { FacilityAdminComponent } from './pages/facility-admin/facility-admin.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { ReviewComponent } from './pages/review/review.component';
import { SubmissionComponent } from './pages/submission/submission.component';
import { RegistrationContainerComponent } from './components/registration-container/registration-container.component';
import { CoreBCPModule } from '../core-bcp/core-bcp.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  SharedCoreModule,
  DefaultPageGuardService,
  AbstractPageGuardService,
  LoadPageGuardService,
  BYPASS_GUARDS,
  START_PAGE_URL
} from 'moh-common-lib';
import { UPDATE_FACILITY_PAGES } from './update-facility-route-constants';
import { ReviewFacilityAdminComponent } from './components/review-facility-admin/review-facility-admin.component';
import { ReviewFormPageComponent } from './components/review-form-page/review-form-page.component';
import { environment } from '../../../environments/environment';

@NgModule({
  declarations: [
    HomeComponent,
    FacilityAdminComponent,
    FormPageComponent,
    ReviewComponent,
    SubmissionComponent,
    RegistrationContainerComponent,
    ReviewFacilityAdminComponent,
    ReviewFormPageComponent
  ],
  imports: [
    CommonModule,
    CoreBCPModule,
    FormsModule,
    UpdateFacilityRoutingModule,
    ReactiveFormsModule,
    SharedCoreModule,
  ],
  providers: [
    { provide: BYPASS_GUARDS, useValue: environment.bypassGuards },
    { provide: START_PAGE_URL, useValue: UPDATE_FACILITY_PAGES.HOME.fullpath },
    DefaultPageGuardService,
    { provide: AbstractPageGuardService, useExisting: DefaultPageGuardService },
    LoadPageGuardService,
  ]
})
export class UpdateFacilityModule { }
