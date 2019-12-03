import { Component, OnInit } from '@angular/core';
import { Container } from 'moh-common-lib';
import { Router } from '@angular/router';
import { pages } from '../../practitioner-registration-page-routes';

@Component({
  selector: 'bcp-registration-container',
  templateUrl: './registration-container.component.html',
  styleUrls: ['./registration-container.component.scss']
})
export class RegistrationContainerComponent extends Container implements OnInit {

  /**  Flag to indicate whether to show loading spinner or not */
  isLoading = false;

  constructor( private router: Router ) {
    super();
  }

  ngOnInit() {
    this.setProgressSteps( pages );
  }



  get submitLabel() {
    /*const index = this.stateSvc.findIndex( this.router.url );
    return this.stateSvc.finAssistApp.pageStatus[index ? index - 1 : 0].btnLabel;*/
    return 'Continue';
  }

  get useDefaultColor() {
  /*  const index = this.stateSvc.findIndex( this.router.url );
    return this.stateSvc.finAssistApp.pageStatus[index ? index - 1 : 0].btnDefaultColor; */
    return true;
  }

  continue() {
    return true;
  }
}
