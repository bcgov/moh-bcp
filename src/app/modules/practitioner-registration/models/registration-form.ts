import { AbstractReactForm , ContainerService} from 'moh-common-lib';
import { OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';

export class RegistrationForm extends AbstractReactForm implements AfterViewInit, OnDestroy {

  links = environment.links;

  private _subscription: Subscription;

  constructor( protected containerService: ContainerService,
               protected router: Router ) {
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

  continue() {
    console.log( 'Continue: registration form to be overriden');
  }
}
