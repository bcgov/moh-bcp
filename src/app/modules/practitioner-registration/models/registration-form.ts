import { AbstractReactForm } from 'moh-common-lib';

import { OnInit, OnDestroy } from '@angular/core';
import { RegistrationContainerService } from '../services/registration-container.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

export class RegistrationForm extends AbstractReactForm implements OnInit, OnDestroy {

  protected subscriptions: Subscription[] = [];

  constructor( protected registrationContainerService: RegistrationContainerService,
               protected router: Router ) {
    super(router);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.registrationContainerService.$continueBtn.subscribe(
        obs => {
          console.log( 'continue button clicked' );
          this.continue();
        })
      );
  }

  ngOnDestroy() {
    this.subscriptions.forEach( x => x.unsubscribe() );
  }

  continue() {
    console.log( 'Continue: registration form to be overriden');
  }
}
