import { Component, OnInit, OnDestroy } from '@angular/core';
import { Container, CheckCompleteBaseService } from 'moh-common-lib';
import { createFacilityPageRoutes } from '../create-facility-page-routing';
import { environment } from 'src/environments/environment';
import { CREATE_FACILITY, CREATE_FACILITY_PAGES } from '../create-facility-route-constants';
import { HeaderService } from 'src/app/services/header.service';
import { Routes, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SplunkLoggerService } from 'src/app/services/splunk-logger.service';


@Component({
  selector: 'app-create-facility-container',
  templateUrl: './create-facility-container.component.html',
  styleUrls: ['./create-facility-container.component.scss']
})
export class CreateFacilityContainerComponent extends Container implements OnInit, OnDestroy {

  hideStepper = false;
  routerSubscription: Subscription;

  constructor(private checkPageService: CheckCompleteBaseService,
              private headerService: HeaderService,
              private router: Router,
              private splunkLogger: SplunkLoggerService) {
    super();

    // 'Submission' should not be in the stepper.
    const pageRoutesWithoutSubmission = createFacilityPageRoutes
      .filter(x => x.path !== 'submission');

    this.setProgressSteps((pageRoutesWithoutSubmission as Route[]));
    // this.setProgressSteps( (createFacilityPageRoutes as Route[]) );

    // TODO: Refactor into new  service inheritis from CheckCompleteBaseService.
    // Re-consider when building out other forms and we can assess impact.
    this.checkPageService.pageCheckList = createFacilityPageRoutes.map(x => {
      return {
        route: x.path,
        isComplete: false,
      };
    });
    this.checkPageService.bypassGuards = environment.bypassGuards;
    this.checkPageService.startUrl = `/${CREATE_FACILITY}/home`;
    this.headerService.setTitle('Application for Medical Services Plan Facility Number');
  }

  ngOnInit() {

    this.routerSubscription = this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      // console.log('nav', this.router.url);
      this.setStepperVisibility();

      this.splunkLogger.log({
        event: 'navigation',
        url: this.router.url
      });
    });

    this.setStepperVisibility();
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  setStepperVisibility() {
    this.hideStepper = this.router.url.includes(CREATE_FACILITY_PAGES.SUBMISSION.path);
    // console.log('url', this.router.url, 'hideStepper', this.hideStepper);
    console.log({
      url: this.router.url,
      check: `${this.router.url}.includes('${CREATE_FACILITY_PAGES.SUBMISSION.path}')`,
      val: this.router.url.includes(CREATE_FACILITY_PAGES.SUBMISSION.path),
    });
  }

  logPage() {
    // this.splunkLogger.log()
  }

}

