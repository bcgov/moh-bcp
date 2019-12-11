import { AbstractReactForm, ContainerService } from 'moh-common-lib';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OnDestroy, AfterViewInit } from '@angular/core';

export class CreateFacilityForm extends AbstractReactForm implements AfterViewInit, OnDestroy {
  links = environment.links;

  private _subscription: Subscription;

  constructor(protected router: Router,
              protected containerService: ContainerService) {
    super(router);
  }

  ngAfterViewInit() {
    this._subscription = this.containerService.$continueBtn.subscribe(
      (obs) => {
        console.log( 'continue button clicked' );
        this.continue();
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  /**
   *  YOU MAY FREELY OVERRIDE THIS FUNCTION AS NEEDED ON A PAGE BY PAGE BASIS
   *
   *  Default functionality: checks if form is present/valid, then navigates to
   *  next page as ordered in routes file.
   */
  continue() {
    console.log('CreateFacilityForm - continue ');
  }
}
