import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateFacilityForm } from '../../models/create-facility-form';
import { PageStateService } from 'moh-common-lib';
import { CREATE_FACILITY_PAGES } from '../../create-facility-route-constants';
import { CreateFacilityDataService } from '../../services/create-facility-data.service';
import { BCPApiService } from 'src/app/services/bcp-api.service';
import { CreateResponse } from '../../models/create-facility-api-model';
import { SplunkLoggerService } from '../../../../services/splunk-logger.service';
import { ValidationResponse } from '../../models/create-facility-api-model';
import { SignatureComponent } from '../../../core-bcp/components/signature/signature.component';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent extends CreateFacilityForm implements OnInit, AfterViewInit {
  loading = false;
  showDuplicateWarning = true;

  @ViewChild(SignatureComponent, {static: true}) signature: SignatureComponent;

  constructor(protected router: Router,
              private pageStateService: PageStateService,
              public dataService: CreateFacilityDataService,
              private api: BCPApiService,
              private splunkLoggerService: SplunkLoggerService,
              private fb: FormBuilder) {
    super(router);
   }

  ngOnInit() {
    this.pageStateService.setPageIncomplete();
    this.showDuplicateWarning = this.dataService.apiDuplicateWarning;

    // Set isPrintView to false
    this.dataService.isPrintView = false;

    this.formGroup = this.fb.group({
      signature: [this.dataService.signature, [Validators.required]]
    });
  }

  ngAfterViewInit() {
    this.formGroup.valueChanges.subscribe( val => {

      console.log( 'on Change: ', val );

      // Update data service values
      this.dataService.signature = val.signature;
      this.dataService.dateOfAcceptance = val.signature ? new Date() : null;
    });
  }


  get pageTitle() {
    return CREATE_FACILITY_PAGES.REVIEW.title;
  }

  continue() {
    this.signature._onTouched();

    if (this.canContinue()) {
      this.submit();
    }
  }

  submit() {
    this.loading = true;
    this.dataService.dateOfSubmission = new Date();
    const jsonPayLoad = this.dataService.getJSONPayload();
    // this.api.createFacility(jsonPayLoad, this.dataService.applicationUUID)
    this.api.createFacility(jsonPayLoad, this.dataService.signature, this.dataService.applicationUUID)
      .subscribe((res: ValidationResponse) => {

        this.dataService.jsonCreateFacility.response = res;
        this.splunkLoggerService.log(
          this.dataService.getSubmissionLogObject<CreateResponse>(
            'Create Facility',
            this.dataService.jsonCreateFacility.response
          )
        );

        this.loading = false;
        // TODO: Handle failure case, e.g. no backend, failed request, etc.
        this.pageStateService.setPageComplete();
        this.navigate(CREATE_FACILITY_PAGES.SUBMISSION.fullpath);
      }, error => {
        console.log('ARC apiService onerror', error);
        this.handleError();
      });
  }

  private handleError(): void {
    this.loading = false;
  }

  log(x) {
    console.log('reviewLog', x);
  }

}
