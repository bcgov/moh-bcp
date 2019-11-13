import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateFacilityForm } from '../../models/create-facility-form';
import { CheckCompleteBaseService } from 'moh-common-lib';
import { CREATE_FACILITY_PAGES } from '../../create-facility-route-constants';
import { CreateFacilityDataService } from '../../services/create-facility-data.service';
import { BCPApiService } from 'src/app/services/bcp-api.service';
import { ValidationResponse, ReturnCodes } from '../../models/create-facility-api-model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent extends CreateFacilityForm implements OnInit {
  loading = false;
  displayError: boolean = false;
  confirmed: boolean = false;
  showDuplicateWarning = true;
  constructor(protected router: Router,
              private pageCheckService: CheckCompleteBaseService,
              private dataService: CreateFacilityDataService,
              private api: BCPApiService) {
    super(router);
   }

  ngOnInit() {
    this.pageCheckService.setPageIncomplete();
    this.showDuplicateWarning = this.dataService.apiDuplicateWarning;
  }


  toggleValidation(data) {
    console.log(data as boolean);

    this.confirmed = data as boolean;
    this.displayError = !this.confirmed;

    // TODO:  Inquire with Adam - what is this statment doing?? Are we to be setting the date of
    this.confirmed && this.confirmed === true ? this.dataService.dateOfAcceptance = (new Date()) : null;
  }

  canContinue() {
    // TODO : Write! By Defualt this just returns this.form.valid, But if we do
    // not want to setup a form, we must modify this to just ensure the
    // "Authorization of Submission" checkbox is written.
    this.displayError = !this.confirmed;
    return this.confirmed;
  }

  continue() {

    if (this.canContinue()) {
      this.submit();
      // this.pageCheckService.setPageComplete();
      // this.navigate(CREATE_FACILITY_PAGES.SUBMISSION.fullPath);
      // TODO: - API Request / Submission
    }
  }

  submit() {
    this.loading = true;
    this.dataService.dateOfSubmission = (new Date());
    const jsonPayLoad = this.dataService.getJSONPayload();
    this.api.createFacility(jsonPayLoad)
      .subscribe((res: ValidationResponse) => {
        this.dataService.jsonCreateFacility.response = res;

        if (res.returnCode === ReturnCodes.SUCCESS) {

          // this.pageCheckService.setPageComplete();
          // // this.navigate(CREATE_FACILITY_PAGES.SUBMISSION.fullPath);

        } else if (res.returnCode === ReturnCodes.WARNING || res.returnCode === ReturnCodes.FAILURE) {
          // we treat near match or exact match the same
          // this.handleAPIValidation(false);
        }
        this.loading = false;
        // this.navigate('register-facility/review');
        // TODO: Handle failure case, e.g. no backend, failed request, etc.
        this.pageCheckService.setPageComplete();
        this.navigate(CREATE_FACILITY_PAGES.SUBMISSION.fullPath);
      }, error => {
        console.log('ARC apiService onerror', error);
        this.handleError();
      });
  }

  private handleError(): void {
    this.loading = false;
  }

}
